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

  /* A CDN edge, a captive-portal wifi, or a half-loaded page can hand back an
     error for data.js or styles.css while index.html itself loads fine. That
     used to leave a silent white screen. Say what happened and offer the fix.
     Deliberately styled inline: styles.css may be the thing that failed. */
  if (!D || !D.meta) {
    document.getElementById("main").innerHTML =
      '<div style="max-width:34rem;margin:2rem auto;padding:1.25rem;border:2px solid #A83A17;' +
      'border-radius:4px;background:#FBE7E0;color:#12171A;font:16px/1.5 system-ui,sans-serif">' +
      '<p style="font-weight:700;font-size:1.15rem;margin:0 0 .5rem">The trip content did not load.</p>' +
      '<p style="margin:0 0 .75rem">The page loaded but <code>data.js</code> did not. This is almost ' +
      'always a network hiccup or a stale cache, not lost data - nothing you have entered is affected.</p>' +
      '<p style="margin:0 0 1rem">Reload. If it happens twice, pull down to hard-refresh, or open the ' +
      'site once on wifi to re-cache it.</p>' +
      '<button id="reloadBtn" style="min-height:48px;padding:0 1.25rem;font:600 16px system-ui,sans-serif;' +
      'background:#12171A;color:#fff;border:0;border-radius:4px;cursor:pointer">Reload the page</button>' +
      "</div>";
    var rb = document.getElementById("reloadBtn");
    if (rb) rb.addEventListener("click", function () { location.reload(true); });
    return;
  }

  /* Content is fine but the stylesheet is not - readable, just unstyled. */
  if (window.__cssFail) {
    var warn = document.createElement("div");
    warn.setAttribute("role", "status");
    warn.style.cssText = "padding:12px;background:#FBF0DC;border-bottom:2px solid #8A5A0B;" +
      "color:#12171A;font:600 15px/1.4 system-ui,sans-serif";
    warn.textContent = "The stylesheet did not load, so this looks plain. Everything still works. Reload to fix it.";
    document.body.insertBefore(warn, document.body.firstChild);
  }

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
    dayOpen: "et26.dayopen",    // { dayId: true }
    itemOpen:"et26.itemopen",   // { "dayId:index": true }
    mapMode: "et26.mapmode",    // "live" | "vector"
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
    dayOpen: load(K.dayOpen, {}),
    itemOpen:load(K.itemOpen, {}),
    mapMode: load(K.mapMode, "live"),
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

  function isApple() { return /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent); }

  /* Drop a pin at exact coordinates. A plain text query gets resolved against
     wherever the phone currently is, which is how a London restaurant matched
     a similarly-named place in Wisconsin. Coordinates cannot be misread.
     `q` is carried along only as the pin's label. */
  function mapsUrl(q, ll) {
    var label = encodeURIComponent(q || "");
    if (ll) {
      var c = encodeURIComponent(ll);
      return isApple()
        ? "https://maps.apple.com/?ll=" + c + "&q=" + label + "&z=15"
        : "https://www.google.com/maps/search/?api=1&query=" + c;
    }
    return isApple()
      ? "https://maps.apple.com/?q=" + label
      : "https://www.google.com/maps/search/?api=1&query=" + label;
  }

  /* Turn-by-turn for a whole day, in order. */
  function routeUrl(stops) {
    var pts = stops.filter(function (x) { return x.ll; }).map(function (x) { return x.ll; });
    if (pts.length < 2) return null;
    if (isApple()) {
      return "https://maps.apple.com/?saddr=" + encodeURIComponent(pts[0]) +
             "&daddr=" + encodeURIComponent(pts[pts.length - 1]) + "&dirflg=d";
    }
    var u = "https://www.google.com/maps/dir/?api=1&travelmode=driving" +
      "&origin=" + encodeURIComponent(pts[0]) +
      "&destination=" + encodeURIComponent(pts[pts.length - 1]);
    if (pts.length > 2) {
      u += "&waypoints=" + pts.slice(1, -1).map(encodeURIComponent).join("%7C");
    }
    return u;
  }

  function mapsChip(q, label, ll) {
    if (!q && !ll) return "";
    return '<a class="maps" href="' + esc(mapsUrl(q, ll)) + '" target="_blank" rel="noopener">' +
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
    mapicon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 3.5 3 6v15l6-2.5 6 2.5 6-2.5V3.5L15 6 9 3.5Z"/><path d="M9 3.5v15M15 6v15"/></svg>',
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

  /* ------------------------------------------------------------ the stops */
  /* Every itinerary item that has a coordinate, in trip order. This is the
     single source for both the route map and the stop list. */
  function allStops() {
    var out = [];
    D.days.forEach(function (day, di) {
      (day.items || []).forEach(function (it) {
        if (!it.ll) return;
        out.push({
          ll: it.ll, name: it.name, maps: it.maps, area: !!it.area,
          day: day, dayIndex: di, half: day.half, time: it.time || null
        });
      });
      if (day.aurora && day.aurora.ll) {
        out.push({
          ll: day.aurora.ll, name: day.aurora.spot, maps: day.aurora.maps,
          area: !!day.aurora.area, day: day, dayIndex: di, half: day.half,
          time: "Night", aurora: day.aurora.night
        });
      }
    });
    return out;
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

  function photoCredit(im) {
    return im.credit ? esc(im.credit) : "Photo";
  }

  function imageStyle(im) {
    return "--grad:" + im.grad + (im.pos ? ";--pos:" + im.pos : "");
  }

  function shot(key, cls) {
    var im = D.images[key];
    if (!im) return "";
    return '<figure class="shot ' + (cls || "") + '" style="' + esc(imageStyle(im)) + '">' +
      '<img src="' + esc(im.src) + '" alt="' + esc(im.alt) + '" loading="lazy" decoding="async" data-shot>' +
      '<figcaption class="shot__credit">' + photoCredit(im) + "</figcaption>" +
      "</figure>";
  }

  function scene(key, cls) {
    var im = D.images[key];
    if (!im) return "";
    return '<figure class="itx__scene ' + (cls || "") + '" style="' + esc(imageStyle(im)) + '">' +
      '<img src="' + esc(im.src) + '" alt="' + esc(im.alt) + '" loading="lazy" decoding="async" data-shot>' +
      '<figcaption class="shot__credit">' + photoCredit(im) + "</figcaption>" +
      "</figure>";
  }

  function itemPhoto(key) {
    var im = D.images[key];
    if (!im) return "";
    return '<span class="itx__pic" style="' + esc(imageStyle(im)) + '" aria-hidden="true">' +
      '<img src="' + esc(im.src) + '" alt="" loading="lazy" decoding="async" data-shot></span>';
  }

  /* cls lets the hero reuse this with light-on-dark styling */
  function sunRow(day, cls) {
    var k = cls || "day__sun";
    if (!day.sun) {
      return '<div class="' + k + '"><div class="tiny">Sunrise and sunset are not listed in the itinerary for this day.</div></div>';
    }
    var parts = [];
    if (day.sun.sunrise) parts.push("<div>" + ICON.sunup + "<span>" + esc(day.sun.sunrise) + "</span></div>");
    if (day.sun.sunset)  parts.push("<div>" + ICON.sundn + "<span>" + esc(day.sun.sunset) + "</span></div>");
    return '<div class="' + k + '">' + parts.join("") + "</div>";
  }

  /* -------------------------------------------------------------- DAY CARD */
  /* Two levels, both collapsed by default. Level one is a day: date, title and
     a one-line summary, so all eight days fit on one screen. Level two is a
     single activity, opening to its detail plus hot buttons for maps and links.

     One thing never collapses: a life-safety hazard. The collapsed day row
     carries a warning chip, and expanding the day shows the hazard in full
     before any activity. Hiding a sneaker-wave warning behind two taps would
     defeat the entire point of it. */

  function itemFlags(it) {
    var f = [];
    if (it.headsUp) f.push('<span class="itx__flag itx__flag--warn" title="Heads up">' + ICON.alert + "</span>");
    if (it.maps) f.push('<span class="itx__flag" title="Has a map location">' + ICON.pin + "</span>");
    if (it.links) f.push('<span class="itx__flag" title="Has links">' + ICON.ext + "</span>");
    return f.length ? '<span class="itx__flags">' + f.join("") + "</span>" : "";
  }

  function itemRow(day, it, idx) {
    var key = day.id + ":" + idx;
    var open = !!S.itemOpen[key];
    var hasBody = it.detail || it.sub || it.headsUp || it.maps || it.links;
    var h = [];

    if (!hasBody) {
      /* nothing to expand into - render it as a plain line, not a dead button */
      h.push('<div class="itx itx--flat">' + itemPhoto(it.image) + '<span class="itx__time">' +
        (it.time ? esc(it.time) : "") + '</span><span class="itx__n">' + esc(it.name) + "</span></div>");
      return h.join("");
    }

    h.push('<div class="itx' + (open ? " is-open" : "") + '">');
    h.push('<button class="itx__h" data-itemopen="' + esc(key) + '" aria-expanded="' + open + '">');
    h.push(itemPhoto(it.image));
    h.push('<span class="itx__time">' + (it.time ? esc(it.time) : "") + "</span>");
    h.push('<span class="itx__n">' + esc(it.name) + itemFlags(it) + "</span>");
    h.push('<span class="itx__chev">' + ICON.chev + "</span>");
    h.push("</button>");

    h.push('<div class="itx__body">');
    if (it.image) h.push(scene(it.image));
    if (it.detail) h.push('<p class="itx__d">' + esc(it.detail) + "</p>");
    if (it.sub) {
      h.push('<ul class="tl__sub">');
      it.sub.forEach(function (x) { h.push("<li>" + esc(x) + "</li>"); });
      h.push("</ul>");
    }
    if (it.headsUp) h.push('<div class="headsup">' + ICON.alert + "<span>" + esc(it.headsUp) + "</span></div>");

    /* hot buttons: big, obvious, glove-sized */
    var hot = [];
    if (it.maps) {
      hot.push('<a class="hot" href="' + esc(mapsUrl(it.maps, it.ll)) + '" target="_blank" rel="noopener">' +
        ICON.pin + "<span>Open in maps</span></a>");
    }
    if (it.ll) {
      hot.push('<a class="hot" href="#/map/' + esc(day.id) + '">' + ICON.mapicon + "<span>Show on trip map</span></a>");
    }
    (it.links || []).forEach(function (l) {
      hot.push('<a class="hot" href="' + esc(l.url) + '" target="_blank" rel="noopener">' +
        ICON.ext + "<span>" + esc(l.label) + "</span></a>");
    });
    if (hot.length) h.push('<div class="hotrow">' + hot.join("") + "</div>");
    h.push("</div></div>");
    return h.join("");
  }

  /* the expanded content of a day, used by the accordion and by Today */
  function dayBody(day, withHero) {
    var h = [];

    if (withHero) {
      var key = (day.images && day.images[0]) || null;
      var im = key ? D.images[key] : null;
      h.push('<div class="day__hero day__hero--band' + (im ? "" : " day__hero--" + day.half) + '"' +
        (im ? ' style="--grad:' + im.grad + '"' : "") + ">");
      if (im) {
        h.push('<img src="' + esc(im.src) + '" alt="' + esc(im.alt) + '" loading="lazy" decoding="async" data-shot>');
        h.push('<figcaption class="shot__credit">' + photoCredit(im) + "</figcaption>");
      }
      h.push("</div>");
    }

    /* hazards first, always, never collapsed */
    (day.hazards || []).forEach(function (hz) {
      h.push('<div class="dayx__haz">' + hazardBlock(hz) + "</div>");
    });

    if ((day.intro || []).length) {
      h.push('<div class="dayx__intro">');
      day.intro.forEach(function (pp) { h.push("<p>" + esc(pp) + "</p>"); });
      h.push("</div>");
    }

    h.push('<div class="itxlist">');
    (day.items || []).forEach(function (it, idx) { h.push(itemRow(day, it, idx)); });
    h.push("</div>");

    if (day.images && day.images.length > 1) {
      h.push('<div class="shot-strip">');
      day.images.slice(1, 4).forEach(function (k) { h.push(shot(k, "shot--thumb")); });
      h.push("</div>");
    }

    if ((day.notes || []).length) {
      h.push('<div class="dayx__notes">');
      day.notes.forEach(function (n) {
        h.push('<div class="note"><b>' + esc(n.label) + "</b><span>" + esc(n.text) + "</span></div>");
      });
      h.push("</div>");
    }

    if (day.aurora) {
      h.push('<div class="aurora-cue">');
      h.push("<b>Aurora night " + day.aurora.night + "</b>");
      h.push("<p><strong>" + esc(day.aurora.spot) + "</strong> &middot; " + esc(day.aurora.text) + "</p>");
      h.push('<div class="hotrow">');
      if (day.aurora.maps) {
        h.push('<a class="hot" href="' + esc(mapsUrl(day.aurora.maps, day.aurora.ll)) +
          '" target="_blank" rel="noopener">' + ICON.pin + "<span>Directions</span></a>");
      }
      h.push('<a class="hot" href="#/aurora">' + ICON.info + "<span>Aurora plan</span></a>");
      h.push("</div></div>");
    }
    return h.join("");
  }

  /* the one-line summary on a collapsed day */
  function daySummary(day) {
    var bits = [];
    var n = (day.items || []).length;
    if (n) bits.push(n + " stop" + (n === 1 ? "" : "s"));
    if (day.sun && (day.sun.sunrise || day.sun.sunset)) {
      bits.push([day.sun.sunrise, day.sun.sunset].filter(Boolean).join(" to "));
    }
    if (day.aurora) bits.push("aurora night " + day.aurora.night);
    return bits.join(" &middot; ");
  }

  function dayAccordion(day, isToday) {
    var half = day.half === "london" ? "var(--london)" : "var(--iceland)";
    var im = (day.images && day.images[0]) ? D.images[day.images[0]] : null;
    var open = S.dayOpen[day.id];
    if (open === undefined) open = !!isToday;      /* today opens itself */
    var hz = (day.hazards || []).length;
    var h = [];

    h.push('<article class="dayx' + (open ? " is-open" : "") + '" id="day-' + day.id +
      '" style="--half:' + half + '">');
    h.push('<button class="dayx__h" data-dayopen="' + esc(day.id) + '" aria-expanded="' + open + '">');
    h.push('<span class="spine dayx__spine" aria-hidden="true"></span>');
    h.push('<span class="dayx__thumb' + (im ? "" : " dayx__thumb--" + day.half) + '"' +
      (im ? ' style="--grad:' + im.grad + '"' : "") + ' aria-hidden="true"></span>');
    h.push('<span class="dayx__t">');
    h.push('<span class="dayx__meta">' + esc(day.dow.slice(0, 3)) + " &middot; " + esc(prettyDate(day.date)) +
      " &middot; " + (day.half === "london" ? "England" : "Iceland") +
      (isToday ? ' <em class="dayx__today">Today</em>' : "") + "</span>");
    h.push("<b>" + esc(day.title) + "</b>");
    h.push('<span class="dayx__sum">' + daySummary(day) +
      (hz ? ' <span class="dayx__warn">' + ICON.alert + hz + " safety note" + (hz === 1 ? "" : "s") + "</span>" : "") +
      "</span>");
    h.push("</span>");
    h.push('<span class="dayx__chev">' + ICON.chev + "</span>");
    h.push("</button>");
    h.push('<div class="dayx__body">' + dayBody(day, true) + "</div>");
    h.push("</article>");
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

    h.push('<div class="dash">');
    h.push('<div class="dash__wide">');
    h.push('<div class="hero">');
    h.push('<div class="spine spine--both hero__spine" aria-hidden="true"></div>');
    h.push('<div class="hero__b">');
    h.push('<div class="hero__text">');
    h.push('<p class="eyebrow">Countdown</p>');
    h.push('<p class="countdown"><b>' + c.daysOut + "</b><span>day" + (c.daysOut === 1 ? "" : "s") +
      " to London</span></p>");
    h.push('<h1 class="hero__title">' + (od > 0 ? "You have overdue bookings." : "Booking phase.") + "</h1>");
    h.push('<p class="hero__sub">' + esc(D.meta.structure) + "</p>");
    h.push("</div>");

    h.push('<div class="tally">');
    h.push('<div class="tally__i' + (od > 0 ? " tally__i--bad" : "") + '"><b>' + od + "</b><span>Overdue</span></div>");
    h.push('<div class="tally__i"><b>' + (totalItems - totalDone) + "</b><span>To do</span></div>");
    h.push('<div class="tally__i"><b>' + b.entered + "/" + b.count + "</b><span>Costs logged</span></div>");
    h.push("</div>");

    var pctAll = totalItems ? Math.round(totalDone / totalItems * 100) : 0;
    h.push('<div class="heroprog">');
    h.push('<p class="heroprog__l"><span>Prep progress</span><span class="num">' + pctAll + "%</span></p>");
    h.push(meter(pctAll, false).replace('class="meter"', 'class="meter meter--onDark"'));
    h.push("</div>");
    h.push("</div></div>");
    h.push("</div>");                      /* /dash__wide */
    h.push('<div class="dash__main">');

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

    h.push("</div>");                      /* /dash__main */
    h.push('<div class="dash__side">');

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

    h.push("</div>");                      /* /dash__side  */
    h.push('<div class="dash__wide">' + tripGlance() + "</div>");
    h.push("</div>");                      /* /dash        */
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
    h.push(sunRow(day, "sunrow"));
    h.push("</div></div>");

    if (day.aurora) {
      h.push('<a class="linkout" href="#/aurora" style="border-color:var(--aurora);border-left:4px solid var(--aurora);margin-bottom:16px">' +
        '<div class="linkout__t"><b>Aurora night ' + day.aurora.night + " tonight</b><span>" +
        esc(day.aurora.spot) + "</span></div>" +
        '<span class="linkout__i">' + ICON.chev + "</span></a>");
    }

    h.push('<article class="dayx is-open dayx--bare" style="--half:' +
      (day.half === "london" ? "var(--london)" : "var(--iceland)") + '">' +
      '<div class="dayx__body">' + dayBody(day, false) + "</div></article>");

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
    h.push('<div class="section-head"><h1>Full itinerary</h1>' +
      '<a href="#/map">See it on the map</a></div>');
    h.push('<div class="dayx__tools">' +
      '<button class="chip" data-days="open">Expand all</button>' +
      '<button class="chip" data-days="shut">Collapse all</button></div>');
    h.push('<div class="daylist">');
    D.days.forEach(function (day) { h.push(dayAccordion(day, day.date === c.t)); });
    h.push("</div>");

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
    h.push('<figcaption class="shot__credit">' + photoCredit(im) + "</figcaption>");
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
        (d.aurora.maps ? "<br>" + mapsChip(d.aurora.maps, "Directions", d.aurora.ll) : "") + "</div></div>");
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


  /* ------------------------------------------------------- VIEW: THE MAP */
  /* A real map, drawn from real geography.

     geo.js carries Natural Earth 1:10m coastline and glacier outlines for the
     two regions, clipped and simplified at build time to 19 KB. No tiles, no
     map library, no network - which is the point, because the day you most
     need to know where you are is the day you have no signal.

     Two rules that came out of getting this wrong:
     1. Each region is projected into its OWN fixed bounds. England and Iceland
        are 1,900 km apart; one shared scale collapses both into a blob.
     2. Stops are CLUSTERED, never moved. An earlier version nudged overlapping
        dots apart, which was fine on a blank grid and became a lie the moment
        there was a coastline - it put pins in the sea. Six London landmarks
        inside 5 km are honestly one dot at this scale. */

  var GEOD = (typeof window !== "undefined" && window.GEO) || {};

  function regionFor(half) { return half === "london" ? GEOD.england : GEOD.iceland; }

  /* A region projects into fixed bounds, so land fills the panel predictably
     and the aspect ratio stays true. */
  function projector(region, w) {
    var b = region.bounds;                       /* [lat0, lat1, lng0, lng1] */
    var kx = Math.cos((b[0] + b[1]) / 2 * Math.PI / 180);
    var spanX = (b[3] - b[2]) * kx;
    var sc = w / spanX;
    var h = (b[1] - b[0]) * sc;
    return {
      w: w, h: h, sc: sc, kx: kx, b: b,
      kmPerPx: 111 / sc,
      xy: function (lng, lat) {
        return [(lng - b[2]) * kx * sc, (b[1] - lat) * sc];
      },
      ll: function (str) {
        var q = str.split(",");
        return this.xy(+q[1], +q[0]);
      }
    };
  }

  function ringsToPath(rings, pr) {
    var d = [];
    rings.forEach(function (ring) {
      for (var k = 0; k < ring.length; k++) {
        var q = pr.xy(ring[k][0], ring[k][1]);
        d.push((k ? "L" : "M") + q[0].toFixed(1) + " " + q[1].toFixed(1));
      }
      d.push("Z");
    });
    return d.join("");
  }

  function kmBetween(a, b) {
    var p1 = a.split(",").map(Number), p2 = b.split(",").map(Number);
    var R = 6371, toR = Math.PI / 180;
    var dLa = (p2[0] - p1[0]) * toR, dLo = (p2[1] - p1[1]) * toR;
    var x = Math.sin(dLa / 2) * Math.sin(dLa / 2) +
      Math.cos(p1[0] * toR) * Math.cos(p2[0] * toR) * Math.sin(dLo / 2) * Math.sin(dLo / 2);
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(x)));
  }

  /* Same-day stops that land within CLUSTER_R of each other become one pin.
     Honest at this scale, and it keeps every pin on dry land. */
  var CLUSTER_R = 27;

  function clusterStops(stops, pr) {
    var out = [];
    stops.forEach(function (st) {
      var q = pr.ll(st.ll);
      var hit = null;
      for (var k = 0; k < out.length; k++) {
        var c = out[k];
        if (c.dayId !== st.day.id) continue;
        if (Math.sqrt(Math.pow(c.x - q[0], 2) + Math.pow(c.y - q[1], 2)) < CLUSTER_R) { hit = c; break; }
      }
      if (hit) {
        hit.x = (hit.x * hit.items.length + q[0]) / (hit.items.length + 1);
        hit.y = (hit.y * hit.items.length + q[1]) / (hit.items.length + 1);
        hit.items.push(st);
      } else {
        out.push({
          dayId: st.day.id, day: st.day, dayIndex: st.dayIndex, half: st.half,
          x: q[0], y: q[1], items: [st]
        });
      }
    });
    return out;
  }

  var MAX_NUDGE = 16;

  /* Pins must not hide each other. This moves CLUSTERS only, never more than
     MAX_NUDGE px from true position, so nothing lands on the wrong side of a
     coastline. Anything further apart than that stays exactly where it is. */
  function unhide(cl) {
    cl.forEach(function (c) { c.x0 = c.x; c.y0 = c.y; });
    var min = 30;
    for (var pass = 0; pass < 60; pass++) {
      var moved = false;
      for (var a = 0; a < cl.length; a++) {
        for (var b = a + 1; b < cl.length; b++) {
          var dx = cl[b].x - cl[a].x, dy = cl[b].y - cl[a].y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < 0.01) { dx = 0.7; dy = -0.7; d = 1; }
          if (d < min) {
            var push = (min - d) / 2, ux = dx / d, uy = dy / d;
            cl[a].x -= ux * push; cl[a].y -= uy * push;
            cl[b].x += ux * push; cl[b].y += uy * push;
            moved = true;
          }
        }
      }
      cl.forEach(function (c) {
        var ddx = c.x - c.x0, ddy = c.y - c.y0;
        var dd = Math.sqrt(ddx * ddx + ddy * ddy);
        if (dd > MAX_NUDGE) {
          c.x = c.x0 + ddx / dd * MAX_NUDGE;
          c.y = c.y0 + ddy / dd * MAX_NUDGE;
        }
      });
      if (!moved) break;
    }
  }

  function panel(regionStops, allStopsList, highlightDay, half) {
    var region = regionFor(half);
    if (!region || !regionStops.length) return "";
    var w = 620;
    var pr = projector(region, w);
    var h = Math.round(pr.h);
    var cl = clusterStops(regionStops, pr);
    unhide(cl);
    var label = cl.length <= 8;
    var o = [];

    o.push('<div class="panel">');
    o.push('<p class="panel__t">' + esc(region.name) + "<span>" + regionStops.length +
      " stop" + (regionStops.length === 1 ? "" : "s") + "</span></p>");
    o.push('<svg class="routemap" viewBox="0 0 ' + w + " " + h +
      '" role="img" aria-label="Map of ' + esc(region.name) + " showing " +
      regionStops.length + ' trip stops">');

    /* sea */
    o.push('<rect class="rm-sea" x="0" y="0" width="' + w + '" height="' + h + '"/>');

    /* graticule on whole degrees - reads as a map, not a chart */
    var b = pr.b;
    for (var la = Math.ceil(b[0]); la <= b[1]; la++) {
      var y = pr.xy(b[2], la)[1];
      o.push('<line class="rm-grat" x1="0" y1="' + y.toFixed(1) + '" x2="' + w + '" y2="' + y.toFixed(1) + '"/>');
      o.push('<text class="rm-gratT" x="4" y="' + (y - 3).toFixed(1) + '">' + la + "°N</text>");
    }
    var step = (b[3] - b[2]) > 5 ? 2 : 1;
    for (var lo = Math.ceil(b[2]); lo <= b[3]; lo += step) {
      var x = pr.xy(lo, b[1])[0];
      o.push('<line class="rm-grat" x1="' + x.toFixed(1) + '" y1="0" x2="' + x.toFixed(1) + '" y2="' + h + '"/>');
      o.push('<text class="rm-gratT" x="' + (x + 3).toFixed(1) + '" y="' + (h - 4) + '">' +
        Math.abs(lo) + "°" + (lo < 0 ? "W" : "E") + "</text>");
    }

    /* land, then glacier on top of it */
    if (region.land && region.land.length) {
      o.push('<path class="rm-land" d="' + ringsToPath(region.land, pr) + '"/>');
    }
    if (region.glacier && region.glacier.length) {
      o.push('<path class="rm-ice" d="' + ringsToPath(region.glacier, pr) + '"/>');
    }

    /* route legs between consecutive pins */
    for (var n = 1; n < cl.length; n++) {
      var A = cl[n - 1], B = cl[n];
      var live = highlightDay && A.dayId === highlightDay && B.dayId === highlightDay;
      o.push('<line class="rm-leg' + (live ? " rm-leg--active" : "") +
        '" x1="' + A.x.toFixed(1) + '" y1="' + A.y.toFixed(1) +
        '" x2="' + B.x.toFixed(1) + '" y2="' + B.y.toFixed(1) + '"/>');
    }

    /* pins */
    var placed = [];
    cl.forEach(function (c) {
      var on = highlightDay && c.dayId === highlightDay;
      var dim = highlightDay && !on;
      var many = c.items.length > 1;
      var r = many ? 15 : 12;
      var gi = allStopsList.indexOf(c.items[0]);
      var names = c.items.map(function (x) { return x.name; }).join(", ");

      o.push('<g class="rm-g' + (dim ? " rm-dim" : "") + '">');
      o.push('<circle class="rm-halo" cx="' + c.x.toFixed(1) + '" cy="' + c.y.toFixed(1) +
        '" r="' + (r + 3) + '"/>');
      o.push('<circle class="rm-stop rm-stop--' + c.half + (on ? " rm-stop--active" : "") +
        '" cx="' + c.x.toFixed(1) + '" cy="' + c.y.toFixed(1) + '" r="' + r +
        '" tabindex="0" role="button" data-stop="' + gi + '">' +
        "<title>Day " + (c.dayIndex + 1) + ", " + esc(prettyDate(c.day.date)) + ": " +
        esc(names) + "</title></circle>");
      o.push('<text class="rm-n' + (on ? " rm-n--on" : "") + '" x="' + c.x.toFixed(1) +
        '" y="' + (c.y + 4).toFixed(1) + '">' + (c.dayIndex + 1) + "</text>");
      if (many) {
        o.push('<circle class="rm-badge" cx="' + (c.x + r - 2).toFixed(1) + '" cy="' + (c.y - r + 2).toFixed(1) + '" r="8"/>');
        o.push('<text class="rm-badgeT" x="' + (c.x + r - 2).toFixed(1) + '" y="' + (c.y - r + 5).toFixed(1) + '">' +
          c.items.length + "</text>");
      }
      if (label && !dim) {
        var nm = c.items[0].name;
        if (many) nm += " +" + (c.items.length - 1);
        if (nm.length > 22) nm = nm.slice(0, 21) + "…";
        var right = c.x < w * 0.6;
        var lx = c.x + (right ? r + 7 : -(r + 7));
        var wid = nm.length * 6.1;                    /* 11px sans, measured */
        var x0 = right ? lx : lx - wid;
        var x1 = x0 + wid;
        var ly = c.y + 4;
        /* real overlap test on the text box, and only the label moves */
        for (var t = 0; t < placed.length; t++) {
          var q = placed[t];
          if (Math.abs(q.y - ly) < 14 && x0 < q.x1 + 6 && x1 + 6 > q.x0) {
            ly = q.y + 15; t = -1;
          }
        }
        if (ly > h - 8) ly = c.y - 12;
        placed.push({ x0: x0, x1: x1, y: ly });
        o.push('<text class="rm-label" x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) +
          '" text-anchor="' + (right ? "start" : "end") + '">' + esc(nm) + "</text>");
      }
      o.push("</g>");
    });

    /* scale bar from the real projection */
    var target = [5, 10, 25, 50, 100].reduce(function (best, v) {
      return Math.abs(v / pr.kmPerPx - 95) < Math.abs(best / pr.kmPerPx - 95) ? v : best;
    }, 50);
    var barPx = target / pr.kmPerPx;
    var by = h - 16, bx = w - barPx - 18;
    o.push('<g class="rm-scaleG">');
    o.push('<line class="rm-scale" x1="' + bx + '" y1="' + by + '" x2="' + (bx + barPx) + '" y2="' + by + '"/>');
    o.push('<line class="rm-scale" x1="' + bx + '" y1="' + (by - 4) + '" x2="' + bx + '" y2="' + (by + 4) + '"/>');
    o.push('<line class="rm-scale" x1="' + (bx + barPx) + '" y1="' + (by - 4) + '" x2="' + (bx + barPx) + '" y2="' + (by + 4) + '"/>');
    o.push('<text class="rm-scaleT" x="' + (bx + barPx / 2).toFixed(1) + '" y="' + (by - 7) + '" text-anchor="middle">' +
      target + " km</text>");
    o.push("</g>");

    o.push("</svg></div>");
    return o.join("");
  }

  function dayForId(id) {
    var f = null;
    D.days.forEach(function (d) { if (d.id === id) f = d; });
    return f;
  }

  /* ------------------------------------------------------- the live map */
  /* Real OpenStreetMap tiles through Leaflet, vendored locally. This is the
     "you have signal" map: actual roads, town names, the lot.

     It cannot be made fully offline. OSM's tile policy forbids bulk
     pre-downloading, and pre-scraping a region would be abusing a free
     service. Tiles you have actually looked at are cached and will work
     again without signal; everything else falls back to the built-in vector
     map, which needs no network at all. That is why both exist. */

  var LMAPS = [];

  function teardownMaps() {
    LMAPS.forEach(function (m) { try { m.remove(); } catch (e) {} });
    LMAPS = [];
  }

  function wireMaps() {
    if (typeof L === "undefined") return;
    /* handy when debugging the map from the console */
    if (typeof window !== "undefined") window.tripMaps = LMAPS;
    Array.prototype.forEach.call(main.querySelectorAll("[data-leaflet]"), function (box) {
      var cfg;
      try { cfg = JSON.parse(box.getAttribute("data-leaflet")); } catch (e) { return; }
      var stops = allStops().filter(function (x) { return x.half === cfg.half; });
      if (!stops.length) return;

      var map = L.map(box, {
        scrollWheelZoom: false,          /* do not hijack the page scroll */
        zoomControl: true,
        attributionControl: true,
        zoomSnap: 0.25,                  /* whole steps overshot the fit badly */
        zoomDelta: 0.5
      });
      LMAPS.push(map);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        minZoom: 5, maxZoom: 17,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
      }).addTo(map);

      /* route in trip order */
      var line = stops.map(function (x) { return x.ll.split(",").map(Number); });
      if (line.length > 1) {
        L.polyline(line, { color: "#F2F7F8", weight: 2, opacity: .7, dashArray: "5 6" }).addTo(map);
      }

      var group = [];
      stops.forEach(function (st) {
        var dim = cfg.hi && st.day.id !== cfg.hi;
        var ll = st.ll.split(",").map(Number);
        var mk = L.marker(ll, {
          keyboard: true,
          title: st.name,
          icon: L.divIcon({
            className: "lmkw" + (dim ? " lmkw--dim" : ""),
            html: '<span class="lmk lmk--' + st.half + (cfg.hi && !dim ? " lmk--on" : "") + '">' +
                  (st.dayIndex + 1) + "</span>",
            iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14]
          })
        }).addTo(map);
        mk.bindPopup(
          '<b class="lpop__n">' + esc(st.name) + "</b>" +
          '<span class="lpop__m">Day ' + (st.dayIndex + 1) + " &middot; " +
          esc(st.day.dow.slice(0, 3) + " " + prettyDate(st.day.date)) +
          (st.time ? " &middot; " + esc(st.time) : "") + "</span>" +
          '<a class="lpop__a" href="' + esc(mapsUrl(st.maps, st.ll)) +
          '" target="_blank" rel="noopener">Open in maps</a>'
        );
        group.push(ll);
      });

      var focus = cfg.hi
        ? stops.filter(function (x) { return x.day.id === cfg.hi; }).map(function (x) { return x.ll.split(",").map(Number); })
        : group;
      var bounds = L.latLngBounds((focus.length ? focus : group));

      function fit() {
        map.invalidateSize({ animate: false });
        map.fitBounds(bounds, { padding: [18, 18], animate: false });
      }
      fit();
      requestAnimationFrame(fit);            /* after first layout */
      setTimeout(fit, 220);                  /* after fonts/scrollbars settle */

      /* a panel below the fold has no usable size until it is on screen */
      if (typeof ResizeObserver !== "undefined") {
        var seen = false;
        var ro = new ResizeObserver(function () {
          if (box.clientHeight > 0 && !seen) { seen = true; fit(); }
        });
        ro.observe(box);
        map.on("unload", function () { ro.disconnect(); });
      }

      map.once("focus", function () { map.scrollWheelZoom.enable(); });
      map.on("click", function () { map.scrollWheelZoom.enable(); });
    });
  }

  function liveMapPanel(half, hi, label, count) {
    return '<div class="lwrap"><p class="panel__t panel__t--light">' + esc(label) +
      "<span>" + count + " stop" + (count === 1 ? "" : "s") + "</span></p>" +
      '<div class="lmap" data-leaflet=\'{"half":"' + half + '","hi":' +
      (hi ? '"' + hi + '"' : "null") + '}\'></div></div>';
  }

  function viewMap(sub) {
    var stops = allStops();
    var scope = sub || "all";
    var dayId = /^oct\d+$/.test(scope) ? scope : null;
    var h = [];

    var shown = stops;
    if (scope === "england") shown = stops.filter(function (x) { return x.half === "london"; });
    else if (scope === "iceland") shown = stops.filter(function (x) { return x.half === "iceland"; });
    else if (dayId) shown = stops.filter(function (x) { return x.day.id === dayId; });

    /* one day alone has no context, so keep its region on screen and light up
       just that day */
    var drawn = shown, hi = null;
    if (dayId && shown.length) {
      var half = shown[0].half;
      drawn = stops.filter(function (x) { return x.half === half; });
      hi = dayId;
    }

    var eng = drawn.filter(function (x) { return x.half === "london"; });
    var ice = drawn.filter(function (x) { return x.half === "iceland"; });

    var heading = dayId
      ? prettyDate(dayForId(dayId).date) + " · " + dayForId(dayId).title
      : scope === "england" ? "England" : scope === "iceland" ? "Iceland" : "The whole trip";

    var offline = !navigator.onLine;
    var mode = (S.mapMode === "vector" || offline || typeof L === "undefined") ? "vector" : "live";

    h.push('<h1 class="sr-only">Route map</h1>');

    h.push('<div class="mapmode">');
    h.push('<div class="seg seg--sm">' +
      '<button data-mapmode="live" aria-pressed="' + (mode === "live") + '"' +
      (offline ? " disabled" : "") + ">Real map</button>" +
      '<button data-mapmode="vector" aria-pressed="' + (mode === "vector") + '">Offline map</button>' +
      "</div>");
    h.push('<p class="tiny">' + (mode === "live"
      ? "OpenStreetMap tiles. Needs signal; areas you have already viewed stay cached."
      : (offline
        ? "No signal, so this is the built-in vector map. It always works."
        : "Built-in vector map. No network needed, ever.")) + "</p>");
    h.push("</div>");

    if (mode === "live") {
      h.push('<div class="lpanels' + (eng.length && ice.length ? " lpanels--two" : "") + '">');
      if (eng.length) h.push(liveMapPanel("london", hi, "England", eng.length));
      if (ice.length) h.push(liveMapPanel("iceland", hi, "Iceland", ice.length));
      h.push("</div>");
      h.push('<div class="mapfilter mapfilter--light">');
      [["all", "Whole trip"], ["england", "England"], ["iceland", "Iceland"]].forEach(function (f) {
        h.push('<button data-map="' + f[0] + '" aria-pressed="' + (scope === f[0]) + '">' + f[1] + "</button>");
      });
      D.days.forEach(function (d) {
        if (!stops.filter(function (x) { return x.day.id === d.id; }).length) return;
        h.push('<button data-map="' + d.id + '" aria-pressed="' + (scope === d.id) + '">' +
          esc(d.dow.slice(0, 3) + " " + prettyDate(d.date)) + "</button>");
      });
      h.push("</div>");
      h.push(mapTail(shown, stops, scope, dayId));
      return h.join("");
    }

    h.push('<div class="mapwrap">');
    h.push('<div class="mapwrap__head"><div><p class="eyebrow">Where, and when</p><b>' +
      esc(heading) + "</b></div>" +
      '<span class="mapwrap__legend">' + shown.length + " stop" + (shown.length === 1 ? "" : "s") +
      "</span></div>");

    h.push('<div class="panels' + (eng.length && ice.length ? " panels--two" : "") + '">');
    h.push(panel(eng, stops, hi, "london"));
    h.push(panel(ice, stops, hi, "iceland"));
    h.push("</div>");

    h.push('<p class="mapwrap__note">' +
      (eng.length && ice.length
        ? "Two regions at their own scales, 1,900 km apart. You fly between them on Tue Oct 13. "
        : "") +
      "Numbers are the day of the trip. A pin with a badge is several stops in one place, " +
      "and pins that would hide each other are separated by a few pixels." +
      (ice.length ? " Pale shapes are glaciers." : "") + "</p>");

    h.push('<div class="mapfilter">');
    [["all", "Whole trip"], ["england", "England"], ["iceland", "Iceland"]].forEach(function (f) {
      h.push('<button data-map="' + f[0] + '" aria-pressed="' + (scope === f[0]) + '">' + f[1] + "</button>");
    });
    D.days.forEach(function (d) {
      if (!stops.filter(function (x) { return x.day.id === d.id; }).length) return;
      h.push('<button data-map="' + d.id + '" aria-pressed="' + (scope === d.id) + '">' +
        esc(d.dow.slice(0, 3) + " " + prettyDate(d.date)) + "</button>");
    });
    h.push("</div></div>");

    h.push(mapTail(shown, stops, scope, dayId));
    return h.join("");
  }

  function mapTail(shown, stops, scope, dayId) {
    var h = [];
    h.push('<div class="maplayout"><div>');
    h.push('<div class="section-head"><h2>Stops in order</h2>');
    var rl = routeUrl(shown);
    if (rl) h.push('<a href="' + esc(rl) + '" target="_blank" rel="noopener">Open route in maps</a>');
    h.push("</div>");

    h.push('<div class="card">');
    if (!shown.length) {
      h.push('<p class="empty">Nothing mapped for this selection.</p>');
    } else {
      shown.forEach(function (st) {
        h.push('<div class="stoplist__i stoplist__i--' + st.half + '" id="stop-' + stops.indexOf(st) + '">');
        h.push('<span class="stoplist__n">' + (st.dayIndex + 1) + "</span>");
        h.push('<div class="stoplist__t"><b>' + esc(st.name) +
          (st.area ? '<span class="approx">area</span>' : "") + "</b>");
        h.push("<span>" + esc(st.day.dow.slice(0, 3) + " " + prettyDate(st.day.date)) +
          (st.time ? " &middot; " + esc(st.time) : "") +
          (st.aurora ? " &middot; aurora night " + st.aurora : "") + "</span>");
        h.push(mapsChip(st.maps, "Open in maps", st.ll));
        h.push("</div></div>");
      });
    }
    h.push("</div></div><div>");

    h.push('<div class="section-head"><h2>How far</h2></div>');
    h.push('<div class="card"><div class="card__body"><div class="kv">');
    [["london", "England"], ["iceland", "Iceland"]].forEach(function (pair) {
      var seg = stops.filter(function (x) { return x.half === pair[0]; });
      var km = 0;
      for (var i3 = 1; i3 < seg.length; i3++) km += kmBetween(seg[i3 - 1].ll, seg[i3].ll);
      h.push('<div class="kv__r"><div class="kv__k">' + pair[1] + "</div>" +
        '<div class="kv__v"><b class="num">' + Math.round(km) + " km</b> " +
        '<span class="tiny">(' + Math.round(km * 0.621) + " mi)</span><br>" +
        '<span class="tiny">' + seg.length + " mapped stops</span></div></div>");
    });
    h.push("</div>");
    h.push('<p class="tiny" style="margin-top:14px">Straight-line, so real road mileage runs higher - ' +
      "the south coast road bends a long way around. Use <b>Open route in maps</b> for driving times.</p>");
    h.push("</div></div>");

    h.push('<div class="card"><div class="card__body">' +
      '<p class="eyebrow">About this map</p>' +
      '<p class="small muted" style="margin-top:6px">Coastlines and glaciers are real: ' +
      "Natural Earth 1:10m data, clipped to these two regions and shipped inside " +
      "the app, so the map works with no signal. Pins come from the coordinates in " +
      "<code>data.js</code>: same-day stops closer than about 5 km are grouped " +
      "into one pin, and a pin is never shifted more than a few pixels from its " +
      "true position, so nothing ends up on the wrong side of a coastline. " +
      'Stops marked <span class="approx">area</span> are a town centre, because ' +
      "the itinerary only gives an area for those. Tap a pin to jump to it in the " +
      "list.</p></div></div>");

    h.push("</div></div>");
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
    if (item.extra) tags.push('<span class="tag tag--extra" title="Not from ITINERARY.md">added</span>');
    if (compact && st) tags.push('<span class="tag">' + esc(st.group.label) + "</span>");
    (item.budgetIds || []).forEach(function (bid) {
      var bl = lineById(bid);
      if (!bl) return;
      var a = actualOf(bid);
      tags.push('<a class="tag tag--money" href="#/prep/money" data-focus="' + esc(bid) + '">' +
        ICON.money + esc(bl.line.label.length > 20 ? bl.line.label.slice(0, 19) + "…" : bl.line.label) +
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

    h.push('<div class="grid-2">');
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
    h.push("</div>");
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
        mapsChip(e.maps, "Open in maps", e.ll) + "</div></div>");
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
      h.push(mapsChip(w.maps, "Open in maps", w.ll));
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
    if (["today", "days", "map", "aurora", "prep", "info"].indexOf(view) === -1) { view = "today"; sub = ""; }
    return { view: view, sub: sub };
  }

  var pendingFocus = null;

  function render() {
    var r = route();
    var html;
    if (r.view === "days") html = viewDays();
    else if (r.view === "map") html = viewMap(r.sub);
    else if (r.view === "aurora") html = viewAurora();
    else if (r.view === "prep") html = viewPrep(r.sub);
    else if (r.view === "info") html = viewInfo(r.sub);
    else html = viewToday();

    teardownMaps();          /* Leaflet keeps handlers on detached nodes */
    main.innerHTML = html;
    document.title = ({
      today: "Today", days: "Itinerary", map: "Map", aurora: "Aurora",
      prep: "Prep", info: "Reference"
    }[r.view]) + " · London + Iceland";

    /* tab state */
    Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (t) {
      if (t.dataset.view === r.view) t.setAttribute("aria-current", "page");
      else t.removeAttribute("aria-current");
    });
    paintBadge();
    paintDateChip();
    wireShots();
    wireMaps();

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

    var dayBtn = t.closest && t.closest("[data-dayopen]");
    if (dayBtn) {
      var did = dayBtn.dataset.dayopen;
      var art = document.getElementById("day-" + did);
      var now = !art.classList.contains("is-open");
      art.classList.toggle("is-open", now);
      dayBtn.setAttribute("aria-expanded", String(now));
      S.dayOpen[did] = now;
      save(K.dayOpen, S.dayOpen);
      wireShots();
      return;
    }

    var itBtn = t.closest && t.closest("[data-itemopen]");
    if (itBtn) {
      var ik = itBtn.dataset.itemopen;
      var box = itBtn.parentNode;
      var nowI = !box.classList.contains("is-open");
      box.classList.toggle("is-open", nowI);
      itBtn.setAttribute("aria-expanded", String(nowI));
      if (nowI) S.itemOpen[ik] = true; else delete S.itemOpen[ik];
      save(K.itemOpen, S.itemOpen);
      return;
    }

    var daysAll = t.closest && t.closest("[data-days]");
    if (daysAll) {
      var wantOpen = daysAll.dataset.days === "open";
      D.days.forEach(function (d) { S.dayOpen[d.id] = wantOpen; });
      save(K.dayOpen, S.dayOpen);
      render();
      return;
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

    var mm = t.closest && t.closest("[data-mapmode]");
    if (mm) {
      S.mapMode = mm.dataset.mapmode;
      save(K.mapMode, S.mapMode);
      render();
      return;
    }

    var mf = t.closest && t.closest("[data-map]");
    if (mf) { location.hash = "#/map/" + mf.dataset.map; return; }

    var stopEl = t.closest && t.closest("[data-stop]");
    if (stopEl) {
      var row = document.getElementById("stop-" + stopEl.dataset.stop);
      if (row) {
        row.scrollIntoView({ block: "center", behavior: "smooth" });
        row.classList.remove("is-target");
        void row.offsetWidth;                 /* restart the flash */
        row.classList.add("is-target");
      }
      return;
    }

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
  function netChanged() {
    paintNet();
    if (route().view === "map") render();   /* live map needs signal */
  }
  window.addEventListener("online", netChanged);
  window.addEventListener("offline", netChanged);
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
