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
    tonight: "et26.tonight",    // { cloud: true, ... }
    open:    "et26.open",       // { groupId: false }  (collapsed state)
    dayOpen: "et26.dayopen",    // { dayId: true }
    itemOpen:"et26.itemopen",   // { "dayId:index": true }
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
    tonight: load(K.tonight, {}),
    open:    load(K.open, {}),
    dayOpen: load(K.dayOpen, {}),
    itemOpen:load(K.itemOpen, {}),
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
    /* skip alternatives - you pick one, you do not drive to all three */
    var pts = stops.filter(function (x) { return x.ll && !x.alt; }).map(function (x) { return x.ll; });
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
    chev:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="18" height="18" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
    ext:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
    pencil:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 20h4l11-11a2.8 2.8 0 0 0-4-4L4 16v4Z"/></svg>',
    route: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h6a3 3 0 0 0 3-3V8M15 5H9a3 3 0 0 0-3 3v8"/></svg>',
    /* One per travel mode. Which one to use is named in the data, not guessed
       from the prose - inference got the Hoppa and the tube legs wrong. */
    car:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><path d="M3 13l2-5.5A2 2 0 0 1 6.9 6h10.2a2 2 0 0 1 1.9 1.5L21 13v5H3v-5Z"/><circle cx="7.5" cy="16.5" r="1.4"/><circle cx="16.5" cy="16.5" r="1.4"/><path d="M3 13h18"/></svg>',
    train: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><rect x="5" y="3" width="14" height="13" rx="3"/><path d="M5 10h14M9.5 20l1.5-4M14.5 20l-1.5-4M7 20h10"/></svg>',
    walk:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><circle cx="13" cy="4" r="2"/><path d="M13 8l-2 4 3 3 1 5M11 12l-3 2-1 5M14 11l4 1"/></svg>',
    plane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><path d="M3 13l18-6-6 14-3-5-5-1z"/></svg>',
    bus:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><rect x="4" y="4" width="16" height="12" rx="2"/><path d="M4 10h16M7 20v-2M17 20v-2"/><circle cx="8" cy="16.5" r="1.2"/><circle cx="16" cy="16.5" r="1.2"/></svg>'
  };

  /* what the onward-travel line says before the prose */
  var MODE_LABEL = { car: "Drive", train: "Train", walk: "Walk", plane: "Fly", bus: "Shuttle" };

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

  /* --------------------------------------------------- booking, per stop */
  /* A stop's booking checkbox on the Book tab is NOT its own state. It IS the
     state of the checklist items named in the stop's `book` array, so ticking
     it there ticks the same to-do on the Prep tab and the other way round -
     there is only ever one copy. That is deliberate: two copies of "have I
     booked the rental car" is how you end up in Keflavik without a car.

     One booking can cover several stops (fs5 is four nights in four places),
     and one stop can need several bookings, which is why this returns a
     part/all split rather than a boolean. */

  function checkItemById(id) {
    var hit = null;
    D.checklists.forEach(function (g) {
      itemsOf(g).forEach(function (i) { if (i.id === id) hit = { item: i, group: g }; });
    });
    return hit;
  }

  /* null means this stop needs no reservation at all -> the tab shows N/A */
  function bookState(it) {
    var ids = (it && it.book) || [];
    if (!ids.length) return null;
    var rows = [], done = 0;
    ids.forEach(function (id) {
      var hit = checkItemById(id);
      if (!hit) return;               /* stale id: drop it rather than claim it */
      var d = isDone(id);
      if (d) done++;
      rows.push({ id: id, text: hit.item.text, done: d });
    });
    if (!rows.length) return null;
    return {
      ids: rows.map(function (r) { return r.id; }),
      rows: rows, done: done, total: rows.length,
      all: done === rows.length, part: done > 0 && done < rows.length
    };
  }

  /* ------------------------------------------------------------- components */

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

  /* The agenda carries no photography - only the Aurora hero still does, and it
     builds its own figure. shot() / scene() / itemPhoto() went with the old
     picture-heavy day cards. */

  /* ------------------------------------------------------------- CHECK ROW */
  /* One tickable to-do. The not-tied-to-a-day bucket on the Agenda is the only
     thing that renders these now. */

  function checkRow(item, st) {
    var done = isDone(item.id);
    var h = [];
    h.push('<div class="check' + (done ? " is-done" : "") + (!done && st && st.overdue ? " is-overdue" : "") + '">');
    h.push('<input type="checkbox" id="ck-' + esc(item.id) + '" data-check="' + esc(item.id) + '"' +
      (done ? " checked" : "") + ">");
    h.push('<div class="check__t"><label for="ck-' + esc(item.id) + '">' + esc(item.text) + "</label>");

    var tags = [];
    if (!done && st && st.overdue) tags.push('<span class="tag tag--overdue">Overdue</span>');
    if (item.extra) tags.push('<span class="tag tag--extra" title="Added while planning, not in the original brief">added</span>');
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

  /* ----------------------------------------------------------- AGENDA CARD */
  /* Two levels, both collapsed by default. Level one is a day: date, title and
     a one-line summary, so all nine days fit on one screen. Level two is one
     event, and it carries four things and no more - when it happens, what it
     is, how long the travel and the stop take, and whether it still needs
     booking. The long-form "why you would enjoy this" prose, the per-day
     essays and the photography are all deliberately gone: this is the page you
     read on the morning of, not the page you plan the trip with.

     One thing never collapses: a life-safety hazard. The collapsed day row
     carries a warning chip, and expanding the day shows the hazard in full
     before any event. Hiding a sneaker-wave warning behind two taps would
     defeat the entire point of it. */

  /* The booking marker. It sits on the collapsed row so the agenda can be
     scanned for gaps without opening anything, and it is tickable there.

     It is NOT its own state. It IS the state of the checklist items named in
     the event's `book` array, so ticking it here ticks the same to-do in the
     not-tied-to-a-day bucket and the other way round. There is only ever one
     copy - two copies of "have I booked the rental car" is how you end up in
     Keflavik without a car.

     One booking can cover several events, and one event can need several
     bookings, which is why bookState() returns a part/all split. */
  function agendaBook(it, key) {
    var bs = bookState(it);
    if (!bs) return '<span class="ag__bk" aria-hidden="true"></span>';
    var label = bs.rows.map(function (r) { return r.text; }).join("; ");
    if (label.length > 90) label = label.slice(0, 89) + "…";
    return '<span class="ag__bk">' +
      '<input type="checkbox" id="bk-' + esc(key) + '"' +
      ' data-book="' + esc(bs.ids.join(",")) + '"' +
      ' data-book-part="' + (bs.part ? "1" : "0") + '"' +
      (bs.all ? " checked" : "") +
      ' aria-label="Booked: ' + esc(label) + '">' +
      /* Only the half-done case earns a number. "0 of 2" is a slower way of
         saying the box is empty. */
      (bs.part ? '<span class="ag__bkn num">' + bs.done + "/" + bs.total + "</span>" : "") +
      "</span>";
  }

  /* The second line of a collapsed event: how long it takes, and whether it
     still owes a booking. A booked event says nothing extra - the tick is the
     whole message. */
  function agendaCue(it) {
    var bs = bookState(it);
    var bits = [];
    if (it.dur) bits.push(esc(it.dur));
    if (bs && !bs.all) {
      var left = bs.rows.filter(function (r) { return !r.done; });
      bits.push('<em class="ag__todo">' +
        (left.length === 1 ? "needs booking" : left.length + " to book") + "</em>");
    }
    return bits.length ? '<span class="ag__sub">' + bits.join(" &middot; ") + "</span>" : "";
  }

  /* One leg of travel, rendered as a labelled line. `lead` is what it is doing
     here: "Getting there" on the day's first stop, "Next" everywhere else. */
  function travelLine(item, lead, cls) {
    if (!item || !item.travel) return "";
    var mode = item.mode || "";
    if (mode === "none") return "";              /* you are already standing there */
    var icon = ICON[mode] || ICON.route;
    var label = MODE_LABEL[mode] || "Travel";
    return '<p class="' + cls + '">' + icon +
      "<span><b>" + esc(lead) + " &middot; " + esc(label) + ".</b> " + esc(item.travel) + "</span></p>";
  }

  function agendaItem(day, it, idx) {
    var key = day.id + ":" + idx;
    var open = !!S.itemOpen[key];
    var items = day.items || [];
    /* The travel field on an item describes how you REACH that item. So the
       leg out of this stop is the next stop's travel, which is what you
       actually want at the bottom of an entry. The day's first stop is the
       exception: nothing precedes it, so its own travel is the arrival leg and
       would otherwise never be shown at all.

       A day flagged `parallel` is not one route - Oct 9 has Ben crossing
       England while Sarah crosses the Atlantic. Chaining those would tell Ben
       to board Sarah's flight, so on those days every item just shows how it
       is reached and nothing claims to follow on from anything. */
    var parallel = !!day.parallel;
    var onward = parallel ? "" : travelLine(items[idx + 1], "Next", "ag__tr ag__tr--next");
    var arrival = (parallel || idx === 0) ? travelLine(it, "Getting there", "ag__tr") : "";
    var hasBody = it.detail || it.headsUp || it.maps || it.links || onward || arrival;
    var h = [];

    h.push('<div class="ag' + (open ? " is-open" : "") + '">');
    h.push('<div class="ag__row">');
    h.push('<span class="ag__time num">' + esc(it.time || "") + "</span>");
    if (hasBody) {
      h.push('<button class="ag__t" data-itemopen="' + esc(key) + '" aria-expanded="' + open + '">');
      h.push("<b>" + esc(it.name) + (it.alt ? ' <span class="pill pill--later">optional</span>' : "") + "</b>");
      h.push(agendaCue(it));
      h.push("</button>");
    } else {
      /* nothing to expand into - a plain line, not a dead button */
      h.push('<span class="ag__t ag__t--flat"><b>' + esc(it.name) + "</b>" + agendaCue(it) + "</span>");
    }
    h.push(agendaBook(it, key));
    if (hasBody) h.push('<span class="ag__chev">' + ICON.chev + "</span>");
    h.push("</div>");

    if (hasBody) {
      h.push('<div class="ag__body">');
      h.push(arrival);
      if (it.detail) h.push('<p class="ag__d">' + esc(it.detail) + "</p>");
      /* Safety note, nested in the event and deliberately quiet: one line, a
         thin rule, no banner. It keeps the hazard colour because it still has
         to be read, but it is a note rather than a billboard. */
      if (it.headsUp) h.push('<p class="ag__note">' + ICON.alert + "<span>" + esc(it.headsUp) + "</span></p>");

      var hot = [];
      if (it.maps) {
        hot.push('<a class="hot" href="' + esc(mapsUrl(it.maps, it.ll)) + '" target="_blank" rel="noopener">' +
          ICON.pin + "<span>Maps</span></a>");
      }
      (it.links || []).forEach(function (l) {
        hot.push('<a class="hot" href="' + esc(l.url) + '" target="_blank" rel="noopener">' +
          ICON.ext + "<span>" + esc(l.label) + "</span></a>");
      });
      if (hot.length) h.push('<div class="hotrow">' + hot.join("") + "</div>");
      /* last thing in the entry: how you get to the next one */
      h.push(onward);
      h.push("</div>");
    }
    h.push("</div>");
    return h.join("");
  }

  /* the expanded content of a day, used by the accordion and by Today */
  function agendaDayBody(day) {
    var h = [];

    h.push('<div class="aglist">');
    (day.items || []).forEach(function (it, idx) { h.push(agendaItem(day, it, idx)); });
    h.push("</div>");

    if (day.aurora) {
      h.push('<a class="linkout linkout--aurora" href="#/aurora">' +
        '<div class="linkout__t"><b>Aurora night ' + day.aurora.night + "</b><span>" +
        esc(day.aurora.spot) + "</span></div>" +
        '<span class="linkout__i">' + ICON.chev + "</span></a>");
    }
    return h.join("");
  }

  /* the one-line summary on a collapsed day: how much is on it, and what it
     still owes */
  function daySummary(day) {
    var bits = [];
    var n = (day.items || []).length;
    if (n) bits.push(n + " stop" + (n === 1 ? "" : "s"));
    var owed = 0;
    (day.items || []).forEach(function (it) {
      var bs = bookState(it);
      if (bs && !bs.all) owed++;
    });
    if (owed) bits.push(owed + " to book");
    if (day.aurora) bits.push("aurora night " + day.aurora.night);
    return bits.join(" &middot; ");
  }

  function agendaDay(day, isToday) {
    var half = day.half === "london" ? "var(--london)" : "var(--iceland)";
    var open = S.dayOpen[day.id];
    if (open === undefined) open = !!isToday;      /* today opens itself */
    var h = [];

    h.push('<article class="dayx dayx--slim' + (open ? " is-open" : "") + '" id="day-' + day.id +
      '" style="--half:' + half + '">');
    h.push('<button class="dayx__h" data-dayopen="' + esc(day.id) + '" aria-expanded="' + open + '">');
    h.push('<span class="spine dayx__spine" aria-hidden="true"></span>');
    h.push('<span class="dayx__t">');
    h.push('<span class="dayx__meta">' + esc(day.dow.slice(0, 3)) + " &middot; " + esc(prettyDate(day.date)) +
      " &middot; " + (day.half === "london" ? "England" : "Iceland") +
      (isToday ? ' <em class="dayx__today">Today</em>' : "") + "</span>");
    h.push("<b>" + esc(day.title) + "</b>");
    h.push('<span class="dayx__sum">' + daySummary(day) + "</span>");
    h.push("</span>");
    h.push('<span class="dayx__chev">' + ICON.chev + "</span>");
    h.push("</button>");
    h.push('<div class="dayx__body">' + agendaDayBody(day) + "</div>");
    h.push("</article>");
    return h.join("");
  }

  /* --------------------------------------------------------- VIEW: AGENDA */
  /* The whole plan on one tab. What used to be three - Days for the prose,
     Book for the booking grid, Prep for the checklists - is one scroll, because
     they were the same information at three different verbosities and keeping
     them in sync by eye was the actual failure mode. */

  /* Which checklist to-dos have no event to hang on: the flights, the ETA, the
     passports, the handover to Mom. Packing is excluded - it lives on Info. */
  function untiedGroups() {
    var tied = {};
    D.days.forEach(function (day) {
      (day.items || []).forEach(function (it) {
        (it.book || []).forEach(function (id) { tied[id] = true; });
      });
    });
    var out = [];
    allGroupStates().forEach(function (st) {
      if (st.group.id === "packing") return;
      var left = st.items.filter(function (i) { return !tied[i.id]; });
      if (left.length) out.push({ st: st, items: left });
    });
    return out;
  }

  /* Collapsed by default: on any given day this is not what you opened the app
     for. It is rendered at all only because these to-dos exist nowhere else. */
  function agendaBucket() {
    var groups = untiedGroups();
    if (!groups.length) return "";
    var total = 0, done = 0, overdue = false;
    groups.forEach(function (g) {
      g.items.forEach(function (i) {
        total++;
        if (isDone(i.id)) done++;
        else if (g.st.overdue) overdue = true;
      });
    });
    var open = S.open.untied === true;
    var h = [];

    h.push('<section class="grp grp--bucket' + (overdue ? " grp--overdue" : "") +
      (open ? " is-open" : "") + '" data-grp="untied">');
    h.push('<button class="grp__h" data-toggle="untied" aria-expanded="' + open + '">');
    h.push('<span class="grp__chev">' + ICON.chev + "</span>");
    h.push('<span class="grp__t"><b>Not tied to a day' +
      (overdue ? ' <span class="pill pill--overdue">Overdue</span>' : "") + "</b>" +
      '<span class="grp__hint">Flights, the ETA, passports, the handover to Mom</span></span>');
    h.push('<span class="grp__n">' + done + "/" + total + "</span>");
    h.push("</button>");

    h.push('<div class="grp__body">');
    groups.forEach(function (g) {
      h.push('<p class="grp__sub">' + esc(g.st.group.label) + "</p>");
      g.items.forEach(function (it) { h.push(checkRow(it, g.st)); });
      h.push('<div class="addrow">' +
        '<input type="text" data-newitem="' + esc(g.st.group.id) +
        '" placeholder="Add your own" aria-label="Add an item to ' + esc(g.st.group.label) + '">' +
        '<button class="btn btn--sm" data-add="' + esc(g.st.group.id) + '">Add</button></div>');
    });
    h.push("</div></section>");
    return h.join("");
  }

  function viewAgenda() {
    var c = clock();
    var stops = 0, booked = 0;
    D.days.forEach(function (day) {
      (day.items || []).forEach(function (it) {
        var bs = bookState(it);
        if (!bs) return;
        stops++;
        if (bs.all) booked++;
      });
    });
    var h = [];

    h.push('<div class="section-head"><h1>Agenda</h1><a href="#/map">On the map</a></div>');
    h.push(agendaBucket());

    h.push('<div class="dayx__tools">');
    h.push('<span class="dayx__count num">' + booked + " / " + stops + " booked</span>");
    h.push('<button class="chip" data-days="open">Expand all</button>');
    h.push('<button class="chip" data-days="shut">Collapse all</button>');
    h.push("</div>");

    h.push('<div class="daylist">');
    D.days.forEach(function (day) { h.push(agendaDay(day, day.date === c.t)); });
    h.push("</div>");
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


  /* ---------------------------------------------------------- VIEW: INFO */
  /* Reference only, and only what gets used. Links first, because this is the
     tab you open to check something. Then safety: the two emergency numbers,
     the notes lifted off the events that carry them, and the embassies. */

  function viewInfo() {
    var R = D.reference;
    var h = [];
    h.push('<h1 class="sr-only">Reference</h1>');

    h.push('<div class="section-head"><h2>Check these</h2></div>');
    h.push('<div class="stack">');
    R.links.forEach(function (l) {
      h.push('<a class="linkout linkout--ref" href="' + esc(l.url) + '" target="_blank" rel="noopener">' +
        '<div class="linkout__t">' +
          "<b>" + esc(l.label) + ' <span class="linkout__host">' + esc(l.value) + "</span></b>" +
          "<span>" + esc(l.why) + "</span>" +
          '<em class="linkout__when">' + esc(l.when) + "</em>" +
        "</div>" +
        '<span class="linkout__i">' + ICON.ext + "</span></a>");
    });
    h.push("</div>");

    h.push('<div class="section-head"><h2>Safety</h2></div>');

    /* Tap to call. Two countries, so two numbers side by side. */
    h.push('<div class="emg">');
    R.emergency.forEach(function (e) {
      h.push('<a class="emg__i" href="tel:' + esc(e.tel) + '">' +
        '<p class="eyebrow">' + esc(e.label) + "</p>" +
        '<p class="emg__n num">' + esc(e.value) + "</p>" +
        '<p class="tiny">' + esc(e.note) + "</p></a>");
    });
    h.push("</div>");

    /* The same notes that sit on their own events, collected so there is one
       place to read them all. */
    h.push('<div class="card"><div class="card__body"><ul class="tl__sub">');
    D.days.forEach(function (d) {
      (d.items || []).forEach(function (it) {
        if (it.headsUp) h.push("<li><b>" + esc(it.name) + ".</b> " + esc(it.headsUp) + "</li>");
      });
    });
    h.push("</ul></div></div>");

    R.embassies.forEach(function (e) {
      h.push('<div class="card"><div class="card__body">' +
        "<b>" + esc(e.label) + "</b>" +
        '<p class="small muted" style="margin-top:2px;font-family:var(--mono)">' + esc(e.address) + "</p>" +
        mapsChip(e.maps, "Maps", e.ll) + "</div></div>");
    });

    h.push('<div class="foot">');
    h.push("<p><b>" + esc(D.meta.who) + "</b> &middot; " + esc(D.meta.title) +
      ", October 10 to 17, 2026 &middot; " + D.meta.nights + " nights.</p>");
    h.push("<p><b>Storage.</b> Every checkbox lives in this browser&rsquo;s localStorage on this " +
      "device only. Clearing site data clears all of it.</p>");
    h.push("</div>");
    return h.join("");
  }

  /* -------------------------------------------------------------- ROUTING */

  var main = document.getElementById("main");

  function route() {
    var hash = location.hash.replace(/^#\/?/, "");
    var parts = hash.split("/");
    var view = parts[0] || "agenda";
    var sub = parts[1] || "";
    /* Days, Book and Prep merged into Agenda. Old hashes still land somewhere
       sensible rather than dumping you on Today - the app is installed as a
       PWA and those links are in people's home screens and in this repo. */
    if (view === "days" || view === "book" || view === "prep") { view = "agenda"; sub = ""; }
    /* map and today are gone; their old hashes land on the agenda */
    if (view === "map" || view === "today") { view = "agenda"; sub = ""; }
    if (["agenda", "aurora", "info"].indexOf(view) === -1) { view = "agenda"; sub = ""; }
    return { view: view, sub: sub };
  }

  /* set by a row tapping through to its own entry further down the agenda */
  var pendingDay = null;

  function render() {
    var r = route();
    var html;
    if (r.view === "aurora") html = viewAurora();
    else if (r.view === "info") html = viewInfo();
    else html = viewAgenda();

    main.innerHTML = html;
    document.title = ({
      agenda: "Agenda", aurora: "Aurora", info: "Reference"
    }[r.view]) + " · London + Iceland";

    /* tab state */
    Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (t) {
      if (t.dataset.view === r.view) t.setAttribute("aria-current", "page");
      else t.removeAttribute("aria-current");
    });
    paintBadge();
    paintDateChip();
    wireShots();
    wireBook();

    if (pendingDay) {
      var dEl = document.getElementById("day-" + pendingDay);
      if (dEl) {
        dEl.scrollIntoView({ block: "start", behavior: "smooth" });
        dEl.classList.remove("is-target");
        void dEl.offsetWidth;                 /* restart the flash */
        dEl.classList.add("is-target");
      }
      pendingDay = null;
    }
  }

  /* Native HTML has no attribute for a half-done checkbox, so it is set after
     the markup lands. It matters here: one stop can carry two bookings, and
     "one of the two done" must not look identical to "neither done". */
  function wireBook() {
    Array.prototype.forEach.call(main.querySelectorAll("[data-book]"), function (box) {
      box.indeterminate = box.dataset.bookPart === "1";
    });
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
    var tab = document.querySelector('.tab[data-view="agenda"]');
    if (!tab) return;
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
    var jumping = pendingDay !== null;   // render() places it
    render();
    if (!jumping) {
      window.scrollTo(0, 0);
      main.focus({ preventScroll: true });
    }
  });

  /* clicks - one delegated handler for the whole app */
  document.addEventListener("click", function (e) {
    var t = e.target;

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
      /* the toggle button is nested inside .ag__row, so the open class belongs
         on the .ag ancestor, not on the button's parent */
      var box = itBtn.closest(".ag") || itBtn.parentNode;
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
    if (el.dataset.book) {
      /* Writes straight into S.checks, the same store the not-tied-to-a-day
         bucket reads. A partly-done event completes on the first tap, which is
         what the native indeterminate-to-checked transition already does. */
      var bids = el.dataset.book.split(",");
      var want = el.checked;
      bids.forEach(function (id) {
        if (want) S.checks[id] = true;
        else delete S.checks[id];
      });
      save(K.checks, S.checks);
      render();
      var reBox = document.querySelector('[data-book="' + el.dataset.book + '"]');
      if (reBox) reBox.focus({ preventScroll: true });
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
  function netChanged() { paintNet(); }
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
  if (!location.hash) location.replace("#/agenda");
  render();
})();
