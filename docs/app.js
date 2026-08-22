/* ============================================================================
   app.js  -  view switching, date logic, persistence.

   No framework, no router library. Views switch on the URL hash so it works
   identically from a file:// URL and from GitHub Pages.

   All CONTENT lives in data.js. You should not need to edit this file to
   change trip details.
   ========================================================================== */
(function () {
  "use strict";

  var D = window.TRIP;

  /* ------------------------------------------------------------ persistence */
  /* Everything the user types stays on the device. Nothing is ever sent
     anywhere - there is no server in this app.                              */
  var K = {
    checks:  "et26.checks",     // { itemId: true }
    custom:  "et26.custom",     // { groupId: [ {id,text} ] }
    actuals: "et26.actuals",    // { budgetLineId: "123.45" }
    conf:    "et26.conf",       // { "bookingId::Field": "value" }
    tonight: "et26.tonight",    // { cloud: true, ... }
    open:    "et26.open",       // { groupId: false }  (collapsed state)
    override:"et26.override",   // "2026-10-14"
    theme:   "et26.theme"       // "light" | "dark"
  };

  function load(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (e) { /* private mode / full quota - the app still works, just won't remember */ }
  }

  var S = {
    checks:  load(K.checks, {}),
    custom:  load(K.custom, {}),
    actuals: load(K.actuals, {}),
    conf:    load(K.conf, {}),
    tonight: load(K.tonight, {}),
    open:    load(K.open, {}),
    override:load(K.override, null)
  };

  /* -------------------------------------------------------------- utilities */

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function ymd(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function parseYMD(s) {
    var p = String(s).split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]);   // local midnight, no UTC drift
  }
  /* whole days from a to b; positive when b is later */
  function dayDiff(a, b) { return Math.round((parseYMD(b) - parseYMD(a)) / 86400000); }

  var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  function prettyDate(s) {
    var d = parseYMD(s);
    return MONTHS[d.getMonth()] + " " + d.getDate();
  }
  function money(n) {
    return "$" + Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 0 });
  }

  /* Opens the native maps app: Apple Maps on Apple platforms, Google elsewhere. */
  function mapsUrl(q) {
    var enc = encodeURIComponent(q);
    var apple = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);
    return apple ? "https://maps.apple.com/?q=" + enc
                 : "https://www.google.com/maps/search/?api=1&query=" + enc;
  }
  function mapsChip(q, label) {
    if (!q) return "";
    return '<a class="maps" href="' + esc(mapsUrl(q)) + '" target="_blank" rel="noopener">' +
      ICON.pin + esc(label || "Maps") + "</a>";
  }

  var ICON = {
    pin:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></svg>',
    info:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    lock:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
    chev:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="18" height="18" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
    ext:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    sunup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3v4M5.6 9.6 4.2 8.2M18.4 9.6l1.4-1.4M2 18h20M6 18a6 6 0 0 1 12 0"/></svg>',
    sundn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 9V3M5.6 9.6 4.2 8.2M18.4 9.6l1.4-1.4M2 18h20M6 18a6 6 0 0 1 12 0"/><path d="M9 6l3 3 3-3"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
    pencil:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 20h4l11-11a2.8 2.8 0 0 0-4-4L4 16v4Z"/></svg>',
    money: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><path d="M12 3v18M8 7h6a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h7"/></svg>'
  };

  /* ------------------------------------------------------------ date + phase */

  function today() { return S.override || ymd(new Date()); }

  /* Everything urgency-related derives from this, never from a static label. */
  function clock() {
    var t = today();
    var out = dayDiff(t, D.meta.start);        // >0 before the trip
    var back = dayDiff(D.meta.end, t);         // >0 after the trip
    var phase = out > 0 ? "before" : (back > 0 ? "after" : "during");
    return { t: t, daysOut: out, daysBack: back, phase: phase };
  }

  function dayForDate(s) {
    for (var i = 0; i < D.days.length; i++) if (D.days[i].date === s) return D.days[i];
    return null;
  }

  /* ---------------------------------------------------- checklist urgency */

  function itemsOf(group) {
    return group.items.concat(S.custom[group.id] || []);
  }
  function isDone(id) { return !!S.checks[id]; }

  /* rank: 0 overdue, 1 active now, 2 later, 3 finished */
  function groupState(group, c) {
    var items = itemsOf(group);
    var done = items.filter(function (i) { return isDone(i.id); }).length;
    var left = items.length - done;
    var promoted = c.daysOut <= group.promoteAt;
    var overdue = left > 0 && c.daysOut <= group.overdueAt;
    var rank = left === 0 ? 3 : (overdue ? 0 : (promoted ? 1 : 2));
    var label = ["Overdue", "Now", "Later", "Done"][rank];
    return {
      group: group, items: items, done: done, left: left, total: items.length,
      pct: items.length ? Math.round(done / items.length * 100) : 100,
      overdue: overdue, promoted: promoted, rank: rank, label: label,
      opensIn: promoted ? 0 : (c.daysOut - group.promoteAt)
    };
  }

  function allGroupStates() {
    var c = clock();
    return D.checklists.map(function (g) { return groupState(g, c); });
  }

  function overdueCount() {
    return allGroupStates().reduce(function (n, st) {
      return n + (st.overdue ? st.left : 0);
    }, 0);
  }

  /* the "next up" list on the Today view */
  function nextUp(limit) {
    var out = [];
    allGroupStates()
      .slice()
      .sort(function (a, b) { return a.rank - b.rank; })
      .forEach(function (st) {
        if (st.rank === 3) return;
        st.items.forEach(function (it) {
          if (!isDone(it.id)) out.push({ item: it, st: st });
        });
      });
    return out.slice(0, limit);
  }

  /* ------------------------------------------------------------- budget math */

  function budgetLines() {
    var out = [];
    D.budget.sections.forEach(function (s) {
      s.lines.forEach(function (l) { out.push({ section: s, line: l }); });
    });
    return out;
  }
  function actualOf(id) {
    var v = S.actuals[id];
    if (v === undefined || v === null || v === "") return null;
    var n = parseFloat(v);
    return isNaN(n) ? null : n;
  }
  function budgetTotals() {
    var planned = 0, actual = 0, projected = 0, entered = 0, count = 0;
    budgetLines().forEach(function (bl) {
      var a = actualOf(bl.line.id);
      planned += bl.line.planned;
      projected += (a === null ? bl.line.planned : a);
      if (a !== null) { actual += a; entered++; }
      count++;
    });
    return {
      planned: planned, actual: actual, projected: projected,
      entered: entered, count: count,
      ceiling: D.meta.budgetCeiling,
      variance: D.meta.budgetCeiling - projected,
      over: projected > D.meta.budgetCeiling
    };
  }
  function lineById(id) {
    var found = null;
    budgetLines().forEach(function (bl) { if (bl.line.id === id) found = bl; });
    return found;
  }

  /* ------------------------------------------------------------- components */

  /* pct   = solid fill (work actually done / money actually recorded)
     ghost = hatched projection behind it, so a full bar never implies the
             money has been spent when it is only planned
     mark  = tick at the planned total                                      */
  function meter(pct, over, mark, ghost) {
    var clamp = function (n) { return Math.max(0, Math.min(100, n)); };
    return '<span class="meter' + (over ? " meter--over" : "") + '">' +
      (ghost != null ? '<span class="meter__ghost" style="width:' + clamp(ghost) + '%"></span>' : "") +
      '<span class="meter__fill" style="width:' + clamp(pct) + '%"></span>' +
      (mark != null ? '<span class="meter__mark" style="left:' + clamp(mark) + '%"></span>' : "") +
      "</span>";
  }

  function hazardBlock(h) {
    return '<div class="hazard" role="note">' +
      '<div class="hazard__tape" aria-hidden="true"></div>' +
      '<div class="hazard__body">' +
        '<p class="hazard__title">' + ICON.alert + "<span>" + esc(h.title) + "</span></p>" +
        '<p class="hazard__text">' + esc(h.text) + "</p>" +
      "</div></div>";
  }

  function shot(key, cls) {
    var im = D.images[key];
    if (!im) return "";
    return '<figure class="shot ' + (cls || "") + '" style="--grad:' + im.grad + '">' +
      '<img src="' + esc(im.src) + '" alt="' + esc(im.alt) + '" loading="lazy" decoding="async" data-shot>' +
      '<figcaption class="shot__credit">Photo: Unsplash</figcaption>' +
      "</figure>";
  }

  function sunRow(day) {
    if (!day.sun) {
      return '<div class="sunrow"><div class="muted tiny">Sunrise and sunset for this day are not listed in the itinerary.</div></div>';
    }
    var parts = [];
    if (day.sun.sunrise) parts.push("<div>" + ICON.sunup + "<span>" + esc(day.sun.sunrise) + "</span></div>");
    if (day.sun.sunset)  parts.push("<div>" + ICON.sundn + "<span>" + esc(day.sun.sunset) + "</span></div>");
    return '<div class="sunrow">' + parts.join("") + "</div>";
  }

  /* -------------------------------------------------------------- DAY CARD */

  function dayCard(day, isToday, headless) {
    var half = day.half === "london" ? "var(--london)" : "var(--iceland)";
    var h = [];

    h.push('<article class="card day" id="day-' + day.id + '" style="--half:' + half + '">');
    h.push('<div class="spine day__spine" aria-hidden="true"></div>');
    h.push('<div class="day__b">');

    if (!headless) {
      h.push('<div class="day__head">');
      h.push('<p class="day__date"><span>' + esc(day.dow) + " &middot; " + esc(prettyDate(day.date)) + "</span>" +
        "<span>" + (day.half === "london" ? "London" : "Iceland") + "</span>" +
        (isToday ? '<span class="day__is-today">Today</span>' : "") + "</p>");
      h.push('<h3 class="day__title">' + esc(day.title) + "</h3>");
      h.push(sunRow(day));
      h.push("</div>");
    }

    if (day.images && day.images.length) h.push(shot(day.images[0]));
    if (day.images && day.images.length > 1) {
      h.push('<div class="shot-strip">');
      day.images.slice(1, 4).forEach(function (k) { h.push(shot(k, "shot--thumb")); });
      h.push("</div>");
    }

    h.push('<div class="tl">');
    (day.intro || []).forEach(function (p) {
      h.push('<p class="small muted" style="padding:12px 0 0">' + esc(p) + "</p>");
    });

    (day.items || []).forEach(function (it) {
      h.push('<div class="tl__i">');
      h.push('<div class="tl__t">' + (it.time ? esc(it.time) : "") + "</div>");
      h.push('<div class="tl__c">');
      h.push('<p class="tl__n">' + esc(it.name) + "</p>");
      if (it.detail) h.push('<p class="tl__d">' + esc(it.detail) + "</p>");
      if (it.sub) {
        h.push('<ul class="tl__sub">');
        it.sub.forEach(function (s) { h.push("<li>" + esc(s) + "</li>"); });
        h.push("</ul>");
      }
      if (it.headsUp) {
        h.push('<div class="headsup">' + ICON.alert + "<span>" + esc(it.headsUp) + "</span></div>");
      }
      if (it.maps) h.push(mapsChip(it.maps, "Open in maps"));
      h.push("</div></div>");
    });

    (day.notes || []).forEach(function (n) {
      h.push('<div class="note"><b>' + esc(n.label) + "</b><span>" + esc(n.text) + "</span></div>");
    });
    h.push("</div>");

    (day.hazards || []).forEach(function (hz) {
      h.push('<div style="padding:0 16px">' + hazardBlock(hz) + "</div>");
    });

    if (day.aurora) {
      h.push('<div class="aurora-cue">');
      h.push("<b>Aurora night " + day.aurora.night + "</b>");
      h.push("<p><strong>" + esc(day.aurora.spot) + "</strong> &middot; " + esc(day.aurora.text) + "</p>");
      h.push('<div style="display:flex;gap:8px;flex-wrap:wrap">');
      if (day.aurora.maps) h.push(mapsChip(day.aurora.maps, "Directions"));
      h.push('<a class="maps" href="#/aurora">Aurora plan</a>');
      h.push("</div></div>");
    }

    h.push("</div></article>");
    return h.join("");
  }

  /* --------------------------------------------------------- VIEW: TODAY */

  function viewToday() {
    var c = clock();
    if (c.phase === "before") return todayBefore(c);
    if (c.phase === "during") return todayDuring(c);
    return todayAfter(c);
  }

  /* The state that matters most right now: the prep dashboard. */
  function todayBefore(c) {
    var h = [];
    var states = allGroupStates().slice().sort(function (a, b) { return a.rank - b.rank; });
    var od = states.reduce(function (n, s) { return n + (s.overdue ? s.left : 0); }, 0);
    var totalItems = 0, totalDone = 0;
    states.forEach(function (s) { totalItems += s.total; totalDone += s.done; });
    var b = budgetTotals();

    h.push('<div class="hero">');
    h.push('<div class="spine spine--both hero__spine" aria-hidden="true"></div>');
    h.push('<div class="hero__b">');
    h.push('<p class="eyebrow">Countdown</p>');
    h.push('<p class="countdown"><b>' + c.daysOut + "</b><span>day" + (c.daysOut === 1 ? "" : "s") +
      " to London</span></p>");
    h.push('<h1 class="hero__title">' + (od > 0 ? "You have overdue bookings." : "Booking phase.") + "</h1>");
    h.push('<p class="hero__sub">' + esc(D.meta.structure) + "</p>");

    h.push('<div class="tally">');
    h.push('<div class="tally__i' + (od > 0 ? " tally__i--bad" : "") + '"><b>' + od + "</b><span>Overdue</span></div>");
    h.push('<div class="tally__i"><b>' + (totalItems - totalDone) + "</b><span>To do</span></div>");
    h.push('<div class="tally__i"><b>' + b.entered + "/" + b.count + "</b><span>Costs logged</span></div>");
    h.push("</div>");

    h.push('<div style="margin-top:16px">' + meter(totalItems ? totalDone / totalItems * 100 : 0, false) + "</div>");
    h.push("</div></div>");

    /* Next few unchecked items, right here, checkable in place. */
    var nu = nextUp(5);
    h.push('<div class="section-head"><h2>Next up</h2>' +
      '<a class="tiny" href="#/prep/lists">All ' + totalItems + " items</a></div>");
    h.push('<div class="card">');
    if (!nu.length) {
      h.push('<p class="empty">Every item is checked. Go pack.</p>');
    } else {
      nu.forEach(function (row) { h.push(checkRow(row.item, row.st, true)); });
    }
    h.push("</div>");

    /* Bucket status - shows which bucket is promoted and which is still shut */
    h.push('<div class="section-head"><h2>Where things stand</h2></div>');
    h.push('<div class="card"><div class="card__body stack">');
    states.forEach(function (st) {
      var pillCls = st.rank === 0 ? "overdue" : st.rank === 1 ? "now" : st.rank === 3 ? "done" : "later";
      h.push('<div><div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline">' +
        "<b>" + esc(st.group.label) + "</b>" +
        '<span class="pill pill--' + pillCls + '">' + st.label + "</span></div>" +
        '<div style="margin-top:6px">' + meter(st.pct, st.overdue) + "</div>" +
        '<p class="tiny muted" style="margin-top:4px">' + st.done + " of " + st.total +
        (st.rank === 2 && st.opensIn > 0 ? " &middot; promotes in " + st.opensIn + " days" : "") +
        "</p></div>");
    });
    h.push("</div></div>");

    /* Budget at a glance */
    h.push('<div class="section-head"><h2>Budget</h2><a class="tiny" href="#/prep/money">Enter actuals</a></div>');
    h.push('<div class="card"><div class="budget-top">');
    h.push('<div class="budget-fig"><b class="' + (b.over ? "is-over" : "") + '">' + money(b.projected) +
      "</b><span>of " + money(b.ceiling) + "</span></div>");
    h.push('<div style="margin-top:12px">' +
      meter(b.actual / b.ceiling * 100, b.over, b.planned / b.ceiling * 100, b.projected / b.ceiling * 100) + "</div>");
    h.push('<p class="budget-var">' + (b.over
      ? '<span class="is-over">' + money(-b.variance) + " over the ceiling</span>"
      : '<span class="is-under">' + money(b.variance) + " under the ceiling</span>") +
      ' <span class="muted tiny">&middot; ' + money(b.actual) + " actually recorded</span></p>");
    h.push("</div></div>");

    h.push(tripGlance());
    return h.join("");
  }

  function todayDuring(c) {
    var h = [];
    var day = dayForDate(c.t);
    var idx = D.days.indexOf(day);
    var next = D.days[idx + 1] || null;

    if (!day) return '<p class="empty">No plan on file for ' + esc(c.t) + ".</p>";

    var half = day.half === "london" ? "var(--london)" : "var(--iceland)";
    h.push('<div class="hero">');
    h.push('<div class="spine hero__spine" style="--half:' + half + '" aria-hidden="true"></div>');
    h.push('<div class="hero__b">');
    h.push('<p class="eyebrow">' + esc(day.dow) + " &middot; " + esc(prettyDate(day.date)) +
      " &middot; day " + (idx + 1) + " of " + D.days.length + "</p>");
    h.push('<h1 class="hero__title" style="font-size:var(--t-32);margin-top:8px">' + esc(day.title) + "</h1>");
    h.push(sunRow(day));
    h.push("</div></div>");

    if (day.aurora) {
      h.push('<a class="linkout" href="#/aurora" style="border-color:var(--aurora);border-left:4px solid var(--aurora);margin-bottom:16px">' +
        '<div class="linkout__t"><b>Aurora night ' + day.aurora.night + " tonight</b><span>" +
        esc(day.aurora.spot) + "</span></div>" +
        '<span class="linkout__i">' + ICON.chev + "</span></a>");
    }

    h.push(dayCard(day, true, true));   /* headless - the hero above says it all */

    if (next) {
      h.push('<div class="section-head"><h2>Tomorrow</h2></div>');
      h.push('<div class="card"><div class="card__body">' +
        '<p class="eyebrow">' + esc(next.dow) + " &middot; " + esc(prettyDate(next.date)) + "</p>" +
        '<p style="font-weight:700;font-size:var(--t-17);margin-top:4px">' + esc(next.title) + "</p>" +
        '<a class="btn btn--block" style="margin-top:12px" href="#/days">Full itinerary</a>' +
        "</div></div>");
    }
    return h.join("");
  }

  function todayAfter(c) {
    var h = [];
    h.push('<div class="hero">');
    h.push('<div class="spine hero__spine" style="--half:var(--iceland)" aria-hidden="true"></div>');
    h.push('<div class="hero__b">');
    h.push('<p class="eyebrow">Home</p>');
    h.push('<h1 class="hero__title" style="font-size:var(--t-32)">That was the trip.</h1>');
    h.push('<p class="hero__sub">London and Iceland, October 10 to 17, 2026. Seven nights, four aurora nights, one glacier.</p>');
    h.push('<p class="hero__sub" style="margin-top:12px">' + c.daysBack + " day" + (c.daysBack === 1 ? "" : "s") + " ago.</p>");
    h.push("</div></div>");

    var b = budgetTotals();
    h.push('<div class="section-head"><h2>What it came to</h2></div>');
    h.push('<div class="card"><div class="budget-top">');
    h.push('<div class="budget-fig"><b class="' +
      (b.entered === 0 ? "" : (b.over ? "is-over" : "is-under")) + '">' + money(b.projected) +
      "</b><span>against " + money(b.ceiling) + "</span></div>");
    h.push('<div style="margin-top:12px">' +
      meter(b.actual / b.ceiling * 100, b.over, b.planned / b.ceiling * 100, b.projected / b.ceiling * 100) + "</div>");
    h.push('<p class="budget-var muted">Planned ' + money(b.planned) + " &middot; " + b.entered +
      " of " + b.count + " lines recorded</p>");
    h.push("</div></div>");

    h.push('<div class="card"><div class="card__body stack">' +
      "<p>The itinerary, the aurora notes and every number you entered are all still here.</p>" +
      '<a class="btn btn--block" href="#/days">Read the itinerary again</a>' +
      '<a class="btn btn--block" href="#/prep/money">Final budget</a>' +
      "</div></div>");
    return h.join("");
  }

  function tripGlance() {
    var h = [];
    h.push('<div class="section-head"><h2>The trip</h2><a class="tiny" href="#/days">All 8 days</a></div>');
    h.push('<div class="card"><div class="card__body">');
    h.push('<div class="mustdo">');
    D.mustDo.forEach(function (m) {
      h.push('<div class="mustdo__i"><b>' + esc(m.item) + "</b><span>" + esc(m.when) + "</span></div>");
    });
    h.push("</div></div></div>");
    return h.join("");
  }

  /* ---------------------------------------------------------- VIEW: DAYS */

  function viewDays() {
    var c = clock();
    var h = [];
    h.push('<div class="section-head"><h1>Full itinerary</h1><span class="tiny muted">Oct 10&ndash;17</span></div>');
    D.days.forEach(function (day) { h.push(dayCard(day, day.date === c.t)); });

    h.push('<div class="section-head"><h2>Outside the main plan</h2></div>');
    h.push('<div class="card"><div class="card__body stack">');
    h.push('<p class="eyebrow">Appendix</p>');
    h.push("<h3>" + esc(D.variant.title) + "</h3>");
    h.push('<p class="small muted">' + esc(D.variant.lede) + "</p>");
    h.push("<ul class=\"tl__sub\">");
    D.variant.points.forEach(function (p) { h.push("<li>" + esc(p) + "</li>"); });
    h.push("</ul></div></div>");
    return h.join("");
  }

  /* -------------------------------------------------------- VIEW: AURORA */

  function viewAurora() {
    var im = D.images.aurora;
    var h = [];

    h.push('<div class="aurora-hero" style="--grad:' + im.grad + '">');
    h.push('<img src="' + esc(im.src) + '" alt="' + esc(im.alt) + '" loading="lazy" decoding="async" data-shot>');
    h.push('<div class="aurora-hero__b"><p class="eyebrow">Four nights, four chances</p>' +
      "<h1>The aurora plan</h1><p>" + esc(D.aurora.lede) + "</p></div>");
    h.push("</div>");

    /* the thing you actually tap outside in the cold */
    h.push('<div class="section-head"><h2>Tonight&rsquo;s checklist</h2>' +
      '<button class="chip" data-act="reset-tonight">Reset</button></div>');
    h.push('<div class="card tonight"><div class="card__body" style="padding:0">');
    D.aurora.tonight.forEach(function (t) {
      var on = !!S.tonight[t.id];
      h.push('<label class="check' + (on ? " is-done" : "") + '">' +
        '<input type="checkbox" data-tonight="' + esc(t.id) + '"' + (on ? " checked" : "") + ">" +
        '<span class="check__t">' + esc(t.text) + "</span></label>");
    });
    h.push("</div></div>");

    h.push('<div class="section-head"><h2>Check these first</h2></div>');
    h.push('<div class="stack">');
    D.aurora.links.forEach(function (l) {
      h.push('<a class="linkout" href="' + esc(l.url) + '" target="_blank" rel="noopener">' +
        '<div class="linkout__t"><b>' + esc(l.label) + "</b><span>" + esc(l.note) + "</span></div>" +
        '<span class="linkout__i">' + ICON.ext + "</span></a>");
    });
    h.push("</div>");

    h.push('<div class="section-head"><h2>Your conditions</h2></div>');
    h.push('<div class="card"><div class="card__body"><div class="kv">');
    D.aurora.conditions.forEach(function (r) {
      h.push('<div class="kv__r"><div class="kv__k">' + esc(r.k) + '</div><div class="kv__v">' + esc(r.v) + "</div></div>");
    });
    h.push("</div></div></div>");

    h.push('<div class="section-head"><h2>Field rules</h2></div>');
    h.push('<div class="card"><div class="card__body">');
    D.aurora.rules.forEach(function (r) {
      h.push('<div class="rule"><b>' + esc(r.head) + "</b><p>" + esc(r.body) + "</p></div>");
    });
    h.push("</div></div>");

    h.push('<div class="section-head"><h2>The four nights</h2></div>');
    h.push('<div class="card"><div class="card__body"><div class="kv">');
    D.days.forEach(function (d) {
      if (!d.aurora) return;
      h.push('<div class="kv__r"><div class="kv__k">Night ' + d.aurora.night + " &middot; " + esc(prettyDate(d.date)) +
        '</div><div class="kv__v"><b>' + esc(d.aurora.spot) + "</b><br>" + esc(d.aurora.text) +
        (d.aurora.maps ? "<br>" + mapsChip(d.aurora.maps, "Directions") : "") + "</div></div>");
    });
    h.push("</div></div></div>");

    /* volcano contingency lives here too - same "what do I do right now" job */
    h.push('<div class="section-head"><h2>Volcano contingency</h2></div>');
    h.push('<div class="card"><div class="card__body stack">');
    h.push('<p class="small muted">' + esc(D.volcano.status) + "</p>");
    h.push('<p class="eyebrow">If one starts while you are there</p>');
    h.push('<ol class="tl__sub tl__sub--num">');
    D.volcano.steps.forEach(function (s) {
      h.push('<li><b>' + s.n + ".</b> " + esc(s.text) + "</li>");
    });
    h.push("</ol>");
    h.push("</div>" + '<div style="padding:0 16px 16px">' + hazardBlock(D.volcano.hazard) + "</div></div>");

    return h.join("");
  }

  /* ---------------------------------------------------------- VIEW: PREP */

  function checkRow(item, st, compact) {
    var done = isDone(item.id);
    var h = [];
    h.push('<div class="check' + (done ? " is-done" : "") + (!done && st && st.overdue ? " is-overdue" : "") + '">');
    h.push('<input type="checkbox" id="ck-' + esc(item.id) + '" data-check="' + esc(item.id) + '"' +
      (done ? " checked" : "") + ">");
    h.push('<div class="check__t"><label for="ck-' + esc(item.id) + '">' + esc(item.text) + "</label>");

    var tags = [];
    if (!done && st && st.overdue) tags.push('<span class="tag tag--overdue">Overdue</span>');
    if (compact && st) tags.push('<span class="tag">' + esc(st.group.label) + "</span>");
    (item.budgetIds || []).forEach(function (bid) {
      var bl = lineById(bid);
      if (!bl) return;
      var a = actualOf(bid);
      tags.push('<a class="tag tag--money" href="#/prep/money" data-focus="' + esc(bid) + '">' +
        ICON.money + esc(bl.line.label.length > 26 ? bl.line.label.slice(0, 24) + "…" : bl.line.label) +
        " &middot; " + (a === null ? "add actual" : money(a)) + "</a>");
    });
    if (tags.length) h.push('<div class="check__tags">' + tags.join("") + "</div>");
    h.push("</div>");

    if (item.custom) {
      h.push('<div class="check__acts">' +
        '<button class="icon-btn" data-edit="' + esc(item.id) + '" aria-label="Edit item">' + ICON.pencil + "</button>" +
        '<button class="icon-btn" data-del="' + esc(item.id) + '" aria-label="Delete item">' + ICON.trash + "</button>" +
        "</div>");
    }
    h.push("</div>");
    return h.join("");
  }

  function viewPrep(sub) {
    var h = [];
    h.push('<h1 class="sr-only">Prep: checklists and budget</h1>');
    h.push('<div class="seg">' +
      '<button aria-pressed="' + (sub !== "money") + '" data-sub="lists">Checklists</button>' +
      '<button aria-pressed="' + (sub === "money") + '" data-sub="money">Budget</button>' +
      "</div>");
    h.push(sub === "money" ? prepMoney() : prepLists());
    return h.join("");
  }

  function prepLists() {
    var c = clock();
    var states = allGroupStates().slice().sort(function (a, b) { return a.rank - b.rank; });
    var totalItems = 0, totalDone = 0;
    states.forEach(function (s) { totalItems += s.total; totalDone += s.done; });
    var h = [];

    h.push('<div class="card"><div class="card__body">' +
      '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px">' +
      "<p class=\"eyebrow\">Overall</p><p class=\"num\" style=\"font-weight:700\">" + totalDone + " / " + totalItems + "</p></div>" +
      '<div style="margin-top:8px">' + meter(totalItems ? totalDone / totalItems * 100 : 0, false) + "</div>" +
      '<p class="tiny muted" style="margin-top:8px">Urgency is computed from the trip date' +
      (c.phase === "before" ? " &middot; " + c.daysOut + " days out" : "") + ", not from the bucket names.</p>" +
      "</div></div>");

    states.forEach(function (st) {
      var g = st.group;
      /* default open: anything not finished and not "later" */
      var isOpen = S.open[g.id];
      if (isOpen === undefined) isOpen = st.rank !== 3;
      var cls = st.rank === 0 ? "grp--overdue" : st.rank === 1 ? "grp--now" : st.rank === 2 ? "grp--later" : "";
      var pillCls = st.rank === 0 ? "overdue" : st.rank === 1 ? "now" : st.rank === 3 ? "done" : "later";

      h.push('<section class="grp ' + cls + (isOpen ? " is-open" : "") + '" data-grp="' + esc(g.id) + '">');
      h.push('<button class="grp__h" data-toggle="' + esc(g.id) + '" aria-expanded="' + isOpen + '">');
      h.push('<span class="grp__chev">' + ICON.chev + "</span>");
      h.push('<span class="grp__t"><b>' + esc(g.label) + ' <span class="pill pill--' + pillCls + '">' + st.label + "</span></b>" +
        meter(st.pct, st.overdue) + "</span>");
      h.push('<span class="grp__n">' + st.done + "/" + st.total + "</span>");
      h.push("</button>");

      h.push('<div class="grp__body">');
      if (st.rank === 2 && st.opensIn > 0) {
        h.push('<p class="tiny muted" style="padding:12px 16px 0">Not urgent yet. Promotes in ' + st.opensIn + " days.</p>");
      }
      st.items.forEach(function (it) { h.push(checkRow(it, st, false)); });

      h.push('<div class="addrow">' +
        '<input type="text" data-newitem="' + esc(g.id) + '" placeholder="Add your own item" aria-label="Add an item to ' + esc(g.label) + '">' +
        '<button class="btn btn--sm" data-add="' + esc(g.id) + '">Add</button></div>');

      if (g.resettable) {
        h.push('<div style="padding:12px 16px">' +
          '<button class="btn btn--block btn--danger" data-act="reset-group" data-grp="' + esc(g.id) + '">' +
          "Uncheck all " + esc(g.label.toLowerCase()) + " (you pack twice)</button></div>");
      }
      h.push("</div></section>");
    });
    return h.join("");
  }

  /* The headline block. Kept separate so entering an actual can update it in
     place instead of re-rendering the view out from under the input you are
     still tabbing through. */
  function moneySummary(b) {
    var h = [];
    h.push('<p class="eyebrow">Projected total</p>');
    h.push('<div class="budget-fig" style="margin-top:4px"><b class="' + (b.over ? "is-over" : "") + '">' +
      money(b.projected) + "</b><span>ceiling " + money(b.ceiling) + "</span></div>");
    h.push('<div style="margin-top:12px">' +
      meter(b.actual / b.ceiling * 100, b.over, b.planned / b.ceiling * 100, b.projected / b.ceiling * 100) + "</div>");
    h.push('<p class="budget-var">' + (b.over
      ? '<span class="is-over">' + money(-b.variance) + " OVER the " + money(b.ceiling) + " ceiling</span>"
      : '<span class="is-under">' + money(b.variance) + " under the ceiling</span>") + "</p>");
    h.push('<p class="tiny muted" style="margin-top:6px">Solid bar = recorded (' + money(b.actual) + " on " +
      b.entered + " of " + b.count + " lines). Hatched = projection. Tick = planned total, " +
      money(b.planned) + ".</p>");
    if (b.over) {
      h.push('<div style="margin-top:12px">' + hazardBlock({
        title: "Over the " + money(b.ceiling) + " ceiling",
        text: D.budget.cutIfOver
      }) + "</div>");
    }
    return h.join("");
  }

  /* "planned $1,200" until you enter something, then "$980 of $1,200" */
  function secSumText(sec) {
    var sp = 0, proj = 0, any = false;
    sec.lines.forEach(function (l) {
      sp += l.planned;
      var a = actualOf(l.id);
      if (a !== null) any = true;
      proj += (a === null ? l.planned : a);
    });
    if (!any) return "planned " + money(sp);
    var cls = proj > sp ? "is-over" : (proj < sp ? "is-under" : "");
    return '<span class="' + cls + '">' + money(proj) + "</span> of " + money(sp);
  }

  function refreshMoney() {
    var box = document.getElementById("moneySummary");
    if (!box) { render(); return; }
    var b = budgetTotals();
    box.innerHTML = moneySummary(b);
    D.budget.sections.forEach(function (sec) {
      var el = document.querySelector('[data-secsum="' + sec.id + '"]');
      if (el) el.innerHTML = secSumText(sec);
    });
  }

  function prepMoney() {
    var b = budgetTotals();
    var h = [];

    h.push('<div class="card"><div class="budget-top" id="moneySummary">' + moneySummary(b) + "</div></div>");

    D.budget.sections.forEach(function (sec) {
      h.push('<div class="card">');
      h.push('<div class="sec-sum"><span>' + esc(sec.label) + '</span><span data-secsum="' + esc(sec.id) + '">' +
        secSumText(sec) + "</span></div>");
      sec.lines.forEach(function (l) {
        var a = S.actuals[l.id];
        var av = actualOf(l.id);
        h.push('<div class="bl' + (av !== null && av > l.planned ? " bl--over" : "") +
          '" id="bl-' + esc(l.id) + '">');
        var delta = "";
        if (av !== null) {
          var d = av - l.planned;
          if (d > 0) delta = ' <span class="is-over">+' + money(d) + "</span>";
          else if (d < 0) delta = ' <span class="is-under">' + money(d) + "</span>";
          else delta = ' <span class="muted">on plan</span>';
        }
        h.push('<div class="bl__t"><label for="in-' + esc(l.id) + '">' + esc(l.label) + "</label>" +
          "<span>planned " + (l.free ? "free" : money(l.planned)) + delta + "</span></div>");
        h.push('<div class="bl__in"><input id="in-' + esc(l.id) + '" type="number" inputmode="decimal" min="0" step="1" ' +
          'placeholder="actual" data-actual="' + esc(l.id) + '" value="' + esc(a == null ? "" : a) + '" ' +
          'aria-label="Actual cost for ' + esc(l.label) + '"></div>');
        h.push("</div>");
      });
      h.push("</div>");
    });

    h.push('<div class="card"><div class="card__body">' +
      '<p class="eyebrow">What is not in these numbers</p>' +
      '<p class="small muted" style="margin-top:4px">' + esc(D.meta.flightsNote) + "</p></div></div>");

    h.push('<div class="section-head"><h2>Headroom</h2></div>');
    h.push('<div class="card"><div class="card__body stack">');
    h.push('<p class="small muted">Planned leaves about ' + money(b.ceiling - b.planned) + ". Options for it:</p>");
    h.push('<ul class="tl__sub">');
    D.budget.headroomOptions.forEach(function (o) { h.push("<li>" + esc(o) + "</li>"); });
    h.push("</ul>");
    h.push('<p class="eyebrow" style="margin-top:8px">Cut if running over</p>');
    h.push("<p class=\"small\">" + esc(D.budget.cutIfOver) + "</p>");
    h.push("</div></div>");

    h.push('<div class="card"><div class="card__body">' +
      '<button class="btn btn--block btn--danger" data-act="reset-actuals">Clear every actual I have entered</button>' +
      "</div></div>");
    return h.join("");
  }

  /* ---------------------------------------------------------- VIEW: INFO */

  function viewInfo(sub) {
    var h = [];
    h.push('<h1 class="sr-only">Reference and confirmations</h1>');
    h.push('<div class="seg">' +
      '<button aria-pressed="' + (sub !== "locker") + '" data-sub="ref">Reference</button>' +
      '<button aria-pressed="' + (sub === "locker") + '" data-sub="locker">Confirmations</button>' +
      "</div>");
    h.push(sub === "locker" ? infoLocker() : infoRef());
    return h.join("");
  }

  function infoRef() {
    var R = D.reference;
    var h = [];

    h.push('<a class="card" href="tel:' + esc(R.emergency.tel) + '" style="display:block;text-decoration:none;' +
      'border-color:var(--hazard);border-width:2px">' +
      '<div class="card__body" style="text-align:center">' +
      '<p class="eyebrow" style="color:var(--hazard)">' + esc(R.emergency.label) + "</p>" +
      '<p class="num" style="font-size:var(--t-44);font-weight:700;line-height:1.1;color:var(--hazard)">' +
      esc(R.emergency.value) + "</p>" +
      '<p class="tiny muted">Tap to call. Police, fire and ambulance, everywhere in Iceland.</p>' +
      "</div></a>");

    h.push('<div class="section-head"><h2>Key links</h2></div>');
    h.push('<div class="stack">');
    R.links.forEach(function (l) {
      h.push('<a class="linkout" href="' + esc(l.url) + '" target="_blank" rel="noopener">' +
        '<div class="linkout__t"><b>' + esc(l.label) + "</b><span>" + esc(l.value) + "</span></div>" +
        '<span class="linkout__i">' + ICON.ext + "</span></a>");
    });
    h.push("</div>");

    h.push('<div class="section-head"><h2>Embassies</h2></div>');
    R.embassies.forEach(function (e) {
      h.push('<div class="card"><div class="card__body">' +
        "<b>" + esc(e.label) + "</b>" +
        '<p class="small muted" style="margin-top:2px">' + esc(e.address) + "</p>" +
        mapsChip(e.maps, "Open in maps") + "</div></div>");
    });

    h.push('<div class="section-head"><h2>Temple and church</h2></div>');
    R.worship.forEach(function (w) {
      h.push('<div class="card"><div class="card__body">');
      h.push('<p class="eyebrow">Address</p>');
      h.push('<h3 style="margin-top:4px">' + esc(w.label) + "</h3>");
      h.push('<p class="small" style="margin-top:4px;font-family:var(--mono)">' + esc(w.address) + "</p>");
      h.push('<ul class="tl__sub" style="margin-top:12px">');
      w.notes.forEach(function (n) { h.push("<li>" + esc(n) + "</li>"); });
      h.push("</ul>");
      h.push(mapsChip(w.maps, "Open in maps"));
      h.push("</div></div>");
    });

    h.push('<div class="section-head"><h2>Safety</h2></div>');
    var hz = [];
    D.days.forEach(function (d) { (d.hazards || []).forEach(function (x) { hz.push(x); }); });
    hz.forEach(function (x) { h.push(hazardBlock(x)); });

    h.push('<div class="foot">');
    h.push("<p><b>" + esc(D.meta.who) + "</b> &middot; " + esc(D.meta.title) +
      ", October 10 to 17, 2026 &middot; " + D.meta.nights + " nights.</p>");
    h.push("<p><b>Photos</b> are pulled from Unsplash at run time. Where a photo has not loaded you are seeing " +
      "the card&rsquo;s own gradient, which is the intended fallback, not an error.</p>");
    h.push("<p><b>Content</b> comes from ITINERARY.md by way of <code>data.js</code>. " +
      "Sunrise and sunset times are shown only for the days the itinerary lists them.</p>");
    h.push("<p><b>Storage.</b> Every checkbox, actual cost and confirmation number lives in this browser&rsquo;s " +
      "localStorage on this device only. Clearing site data clears all of it.</p>");
    h.push("</div>");
    return h.join("");
  }

  function infoLocker() {
    var h = [];
    h.push('<div class="privacy">' + ICON.lock +
      "<div><b>This data lives only on this device.</b> Confirmation numbers you type here are stored in this " +
      "browser&rsquo;s localStorage. They are never written into the repository, never uploaded, and never leave " +
      "the phone. They will not appear on your wife&rsquo;s phone. If you clear site data or reinstall, they are gone.</div></div>");

    D.confirmations.forEach(function (bk) {
      h.push('<div class="card"><div class="card__body"><b>' + esc(bk.label) + "</b></div>");
      h.push('<div class="locker">');
      bk.fields.forEach(function (f) {
        var key = bk.id + "::" + f;
        h.push('<label class="field"><span class="field__l">' + esc(f) + "</span>" +
          '<input type="text" data-conf="' + esc(key) + '" value="' + esc(S.conf[key] || "") +
          '" autocomplete="off" spellcheck="false"></label>');
      });
      h.push("</div></div>");
    });

    h.push('<div class="card"><div class="card__body stack">');
    h.push('<p class="eyebrow">Danger zone</p>');
    h.push('<button class="btn btn--block" data-act="export">Export everything as a text file</button>');
    h.push('<p class="tiny muted">Read the warning first. Exporting puts your confirmation numbers into a plain, ' +
      "unencrypted file in your Downloads folder.</p>");
    h.push('<button class="btn btn--block btn--danger" data-act="wipe-conf">Erase all confirmations</button>');
    h.push("</div></div>");
    return h.join("");
  }

  /* -------------------------------------------------------------- ROUTING */

  var main = document.getElementById("main");

  function route() {
    var hash = location.hash.replace(/^#\/?/, "");
    var parts = hash.split("/");
    var view = parts[0] || "today";
    var sub = parts[1] || "";
    if (["today", "days", "aurora", "prep", "info"].indexOf(view) === -1) { view = "today"; sub = ""; }
    return { view: view, sub: sub };
  }

  var pendingFocus = null;

  function render() {
    var r = route();
    var html;
    if (r.view === "days") html = viewDays();
    else if (r.view === "aurora") html = viewAurora();
    else if (r.view === "prep") html = viewPrep(r.sub);
    else if (r.view === "info") html = viewInfo(r.sub);
    else html = viewToday();

    main.innerHTML = html;
    document.title = ({
      today: "Today", days: "Itinerary", aurora: "Aurora", prep: "Prep", info: "Reference"
    }[r.view]) + " · London + Iceland";

    /* tab state */
    Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (t) {
      if (t.dataset.view === r.view) t.setAttribute("aria-current", "page");
      else t.removeAttribute("aria-current");
    });
    paintBadge();
    paintDateChip();
    wireShots();

    if (pendingFocus) {
      var el = document.getElementById("bl-" + pendingFocus);
      var inp = document.querySelector('[data-actual="' + pendingFocus + '"]');
      if (el) {
        el.classList.add("is-target");
        el.scrollIntoView({ block: "center", behavior: "smooth" });
        if (inp) inp.focus();
      }
      pendingFocus = null;
    }
  }

  /* photos fade in only once they actually load; otherwise the gradient stays */
  function wireShots() {
    Array.prototype.forEach.call(main.querySelectorAll("img[data-shot]"), function (img) {
      var box = img.parentNode;
      if (img.complete && img.naturalWidth > 0) { box.classList.add("is-loaded"); return; }
      img.addEventListener("load", function () {
        if (img.naturalWidth > 0) box.classList.add("is-loaded");
      });
      img.addEventListener("error", function () { img.remove(); });
    });
  }

  function paintBadge() {
    var n = clock().phase === "before" ? overdueCount() : 0;
    var tab = document.querySelector('.tab[data-view="prep"]');
    var old = tab.querySelector(".tab__badge");
    if (old) old.remove();
    if (n > 0) {
      var b = document.createElement("span");
      b.className = "tab__badge";
      b.textContent = n > 99 ? "99+" : n;
      b.setAttribute("aria-label", n + " overdue items");
      tab.appendChild(b);
    }
  }

  function paintDateChip() {
    var chip = document.getElementById("dateChip");
    var label = document.getElementById("dateChipLabel");
    var c = clock();
    if (S.override) {
      chip.classList.add("chip--live");
      label.textContent = "Preview " + prettyDate(S.override);
    } else {
      chip.classList.remove("chip--live");
      label.textContent = c.phase === "before" ? "T−" + c.daysOut + "d" : prettyDate(c.t);
    }
    document.getElementById("dateInput").value = S.override || today();
  }

  /* ------------------------------------------------------------- LISTENERS */

  window.addEventListener("hashchange", function () {
    var jumping = pendingFocus !== null;   // render() will place focus itself
    render();
    if (!jumping) {
      window.scrollTo(0, 0);
      main.focus({ preventScroll: true });
    }
  });

  /* clicks - one delegated handler for the whole app */
  document.addEventListener("click", function (e) {
    var t = e.target;

    var moneyLink = t.closest ? t.closest("[data-focus]") : null;
    if (moneyLink) {
      pendingFocus = moneyLink.dataset.focus;
      /* if we are already on the budget view the hash will not change, so no
         hashchange fires and nothing would scroll - do it ourselves */
      if (location.hash === "#/prep/money") { e.preventDefault(); render(); }
    }

    /* Tapping anywhere in a checklist row toggles it. The checkbox itself is
       26px; the row is 56px. Gloves need the row. */
    var row = t.closest && t.closest(".check");
    if (row && !t.closest("a, button, input, label")) {
      var box = row.querySelector('input[type="checkbox"]');
      if (box) {
        box.checked = !box.checked;
        box.dispatchEvent(new Event("change", { bubbles: true }));
        return;
      }
    }

    var toggle = t.closest && t.closest("[data-toggle]");
    if (toggle) {
      var gid = toggle.dataset.toggle;
      var sec = document.querySelector('.grp[data-grp="' + gid + '"]');
      var nowOpen = !sec.classList.contains("is-open");
      sec.classList.toggle("is-open", nowOpen);
      toggle.setAttribute("aria-expanded", String(nowOpen));
      S.open[gid] = nowOpen;
      save(K.open, S.open);
      return;
    }

    var addBtn = t.closest && t.closest("[data-add]");
    if (addBtn) { addCustom(addBtn.dataset.add); return; }

    var del = t.closest && t.closest("[data-del]");
    if (del) { deleteCustom(del.dataset.del); return; }

    var ed = t.closest && t.closest("[data-edit]");
    if (ed) { editCustom(ed.dataset.edit); return; }

    var sub = t.closest && t.closest("[data-sub]");
    if (sub) {
      var r = route();
      location.hash = "#/" + r.view + "/" + sub.dataset.sub;
      return;
    }

    var jump = t.closest && t.closest("[data-jump]");
    if (jump) { setOverride(jump.dataset.jump); return; }

    var act = t.closest && t.closest("[data-act]");
    if (act) { doAction(act.dataset.act, act); return; }
  });

  /* changes - checkboxes and every text/number field */
  document.addEventListener("change", function (e) {
    var el = e.target;
    if (el.dataset.check) {
      var cid = el.dataset.check;
      if (el.checked) S.checks[cid] = true;
      else delete S.checks[cid];
      save(K.checks, S.checks);
      render();
      var again = document.querySelector('[data-check="' + cid + '"]');
      if (again) again.focus({ preventScroll: true });
      return;
    }
    if (el.dataset.tonight) {
      if (el.checked) S.tonight[el.dataset.tonight] = true;
      else delete S.tonight[el.dataset.tonight];
      save(K.tonight, S.tonight);
      el.closest(".check").classList.toggle("is-done", el.checked);
      return;
    }
    if (el.dataset.actual !== undefined) {
      var v = el.value.trim();
      if (v === "") delete S.actuals[el.dataset.actual];
      else S.actuals[el.dataset.actual] = v;
      save(K.actuals, S.actuals);
      refreshMoney();     /* in place - a full re-render would steal focus */
      return;
    }
    if (el.dataset.conf !== undefined) {
      var val = el.value;
      if (val === "") delete S.conf[el.dataset.conf];
      else S.conf[el.dataset.conf] = val;
      save(K.conf, S.conf);
      return;
    }
    if (el.id === "dateInput") { setOverride(el.value); return; }
  });

  /* Enter in the "add your own" box */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.dataset && e.target.dataset.newitem) {
      e.preventDefault();
      addCustom(e.target.dataset.newitem);
    }
  });

  /* -------------------------------------------------------------- ACTIONS */

  function customList(gid) {
    if (!S.custom[gid]) S.custom[gid] = [];
    return S.custom[gid];
  }
  function addCustom(gid) {
    var input = document.querySelector('[data-newitem="' + gid + '"]');
    if (!input) return;
    var text = input.value.trim();
    if (!text) { input.focus(); return; }
    customList(gid).push({ id: "cu" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), text: text, custom: true });
    save(K.custom, S.custom);
    S.open[gid] = true; save(K.open, S.open);
    render();
    var again = document.querySelector('[data-newitem="' + gid + '"]');
    if (again) again.focus();
  }
  function findCustom(id) {
    var hit = null;
    Object.keys(S.custom).forEach(function (gid) {
      S.custom[gid].forEach(function (it, i) { if (it.id === id) hit = { gid: gid, i: i, item: it }; });
    });
    return hit;
  }
  function editCustom(id) {
    var hit = findCustom(id);
    if (!hit) return;
    var next = window.prompt("Edit this item", hit.item.text);
    if (next === null) return;
    next = next.trim();
    if (!next) return;
    hit.item.text = next;
    save(K.custom, S.custom);
    render();
  }
  function deleteCustom(id) {
    var hit = findCustom(id);
    if (!hit) return;
    if (!window.confirm("Delete “" + hit.item.text + "”?")) return;
    S.custom[hit.gid].splice(hit.i, 1);
    delete S.checks[id];
    save(K.custom, S.custom); save(K.checks, S.checks);
    render();
  }

  function setOverride(v) {
    S.override = v || null;
    save(K.override, S.override);
    render();
  }

  function doAction(name, el) {
    if (name === "reset-tonight") {
      S.tonight = {}; save(K.tonight, S.tonight); render(); return;
    }
    if (name === "reset-group") {
      var gid = el.dataset.grp;
      var g = null;
      D.checklists.forEach(function (x) { if (x.id === gid) g = x; });
      if (!g) return;
      if (!window.confirm("Uncheck every item in “" + g.label + "”?")) return;
      itemsOf(g).forEach(function (i) { delete S.checks[i.id]; });
      save(K.checks, S.checks); render(); return;
    }
    if (name === "reset-actuals") {
      if (!window.confirm("Clear every actual cost you have entered? Planned amounts are not affected.")) return;
      S.actuals = {}; save(K.actuals, S.actuals); render(); return;
    }
    if (name === "wipe-conf") {
      if (!window.confirm("Erase every confirmation number, flight number and address you have entered? This cannot be undone.")) return;
      S.conf = {}; save(K.conf, S.conf); render(); return;
    }
    if (name === "export") { exportDialog(); return; }
  }

  /* Export is deliberately gated behind an explicit warning. */
  function exportDialog() {
    var wrap = document.createElement("div");
    wrap.className = "dialog-backdrop";
    wrap.innerHTML =
      '<div class="dialog" role="dialog" aria-modal="true" aria-labelledby="dlgT">' +
      '<h2 id="dlgT">Read this first</h2>' +
      "<p class=\"small\">This writes a <b>plain, unencrypted text file</b> to your Downloads folder containing every " +
      "confirmation number, flight number and address you have entered, plus your budget actuals.</p>" +
      "<p class=\"small\" style=\"margin-top:8px\">Anything in Downloads may be backed up to the cloud, synced to other " +
      "devices, or picked up by another app. Only do this if you are about to move the file somewhere you trust, " +
      "and delete it afterwards.</p>" +
      '<div class="dialog__acts">' +
      '<button class="btn" data-dlg="cancel">Cancel</button>' +
      '<button class="btn btn--danger" data-dlg="go">I understand, export</button>' +
      "</div></div>";
    document.body.appendChild(wrap);
    var first = wrap.querySelector("[data-dlg=cancel]");
    if (first) first.focus();

    wrap.addEventListener("click", function (e) {
      var b = e.target.closest("[data-dlg]");
      if (!b && e.target !== wrap) return;
      if (!b || b.dataset.dlg === "cancel") { wrap.remove(); return; }
      doExport();
      wrap.remove();
    });
    wrap.addEventListener("keydown", function (e) { if (e.key === "Escape") wrap.remove(); });
  }

  function doExport() {
    var lines = ["London + Iceland, Oct 10-17 2026", "Exported " + ymd(new Date()),
      "UNENCRYPTED. Delete this file when you are done with it.", ""];
    lines.push("== CONFIRMATIONS ==");
    D.confirmations.forEach(function (bk) {
      var any = bk.fields.some(function (f) { return S.conf[bk.id + "::" + f]; });
      if (!any) return;
      lines.push("", bk.label);
      bk.fields.forEach(function (f) {
        var v = S.conf[bk.id + "::" + f];
        if (v) lines.push("  " + f + ": " + v);
      });
    });
    lines.push("", "== BUDGET ACTUALS ==");
    budgetLines().forEach(function (bl) {
      var a = actualOf(bl.line.id);
      lines.push("  " + bl.line.label + ": planned " + money(bl.line.planned) +
        (a === null ? "" : ", actual " + money(a)));
    });
    var b = budgetTotals();
    lines.push("", "Projected " + money(b.projected) + " of " + money(b.ceiling));

    var blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "london-iceland-2026-private.txt";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  /* ------------------------------------------------------- CHROME WIRING */

  /* date override panel */
  var dateChip = document.getElementById("dateChip");
  var datePanel = document.getElementById("datePanel");
  dateChip.addEventListener("click", function () {
    var open = datePanel.hasAttribute("hidden");
    if (open) { datePanel.removeAttribute("hidden"); document.getElementById("dateInput").focus(); }
    else datePanel.setAttribute("hidden", "");
    dateChip.setAttribute("aria-expanded", String(open));
  });
  document.getElementById("dateReset").addEventListener("click", function () {
    setOverride(null);
    datePanel.setAttribute("hidden", "");
    dateChip.setAttribute("aria-expanded", "false");
  });

  /* theme: respects prefers-color-scheme until the user overrides it */
  var savedTheme = load(K.theme, null);
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
  document.getElementById("themeBtn").addEventListener("click", function () {
    var cur = document.documentElement.getAttribute("data-theme");
    var sysDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    var next = cur ? (cur === "dark" ? "light" : "dark") : (sysDark ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", next);
    save(K.theme, next);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", next === "dark" ? "#0A0D0F" : "#E7EAEC");
  });

  /* offline indicator */
  function paintNet() {
    var off = !navigator.onLine;
    document.body.classList.toggle("is-offline", off);
    var dot = document.getElementById("netdot");
    dot.className = "dot " + (off ? "dot--off" : "dot--on");
    dot.setAttribute("aria-label", off ? "Offline" : "Online");
  }
  window.addEventListener("online", paintNet);
  window.addEventListener("offline", paintNet);
  paintNet();

  /* service worker - http(s) only; a file:// page cannot register one */
  if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () { /* offline caching unavailable */ });
    });
  }

  /* re-evaluate the day if the app sits open across midnight */
  setInterval(function () {
    if (!S.override && document.visibilityState === "visible") {
      var t = ymd(new Date());
      if (t !== lastSeenDay) { lastSeenDay = t; render(); }
    }
  }, 60000);
  var lastSeenDay = ymd(new Date());

  /* go */
  if (!location.hash) location.replace("#/today");
  render();
})();
