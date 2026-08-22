/* ============================================================================
   Service worker.

   The whole point: this app has to work in a car in south Iceland with no
   signal. The shell and every asset are precached on first visit.

   Bump CACHE when you change any file, or phones will keep serving the old
   copy. That is the one maintenance chore this file has.
   ========================================================================== */

var CACHE = "london-iceland-v3";

/* Same-origin. These MUST cache or the install fails - that is intentional,
   a half-installed offline app is worse than none. */
var CORE = [
  "./",
  "./index.html",
  "./styles.css",
  "./data.js",
  "./app.js",
  "./manifest.webmanifest",
  "./favicon.svg",
  "./robots.txt"
];

/* Cross-origin scenery. Cached opportunistically and individually: any of
   these can fail (Unsplash 503s, no network on first load) without taking the
   install down with it. A missing photo just means the card shows its
   gradient, which is a designed state, not a broken one. */
var PHOTOS = [
  "https://source.unsplash.com/1600x900/?big-ben,westminster,london",
  "https://source.unsplash.com/1600x900/?stonehenge,salisbury",
  "https://source.unsplash.com/1600x900/?thingvellir,iceland,rift",
  "https://source.unsplash.com/1600x900/?geysir,strokkur,iceland",
  "https://source.unsplash.com/1600x900/?gullfoss,waterfall,iceland",
  "https://source.unsplash.com/1600x900/?ice-cave,langjokull,glacier",
  "https://source.unsplash.com/1600x900/?reynisfjara,black-sand-beach,vik",
  "https://source.unsplash.com/1600x900/?icelandic-horses",
  "https://source.unsplash.com/1600x900/?aurora,northern-lights,iceland",
  "https://source.unsplash.com/1600x900/?reykjadalur,hot-river,iceland"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return c.addAll(CORE).catch(function () {
        /* One bad response would otherwise abort the whole install and leave
           no offline support. Retry each file on its own instead. */
        return Promise.all(CORE.map(function (u) {
          return c.add(u).catch(function () {});
        }));
      }).then(function () {
        /* fire and forget - never block or fail the install on these */
        PHOTOS.forEach(function (url) {
          c.add(new Request(url, { mode: "no-cors" })).catch(function () {});
        });
      });
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  /* Navigations: always hand back the shell so a cold offline launch works,
     including a deep link like #/aurora. */
  if (req.mode === "navigate") {
    e.respondWith(
      caches.match("./index.html").then(function (hit) {
        return hit || fetch(req).catch(function () { return caches.match("./"); });
      })
    );
    return;
  }

  /* Everything else: cache first (offline is the common case on this trip),
     then network, and stash whatever the network gives us for next time. */
  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && (res.ok || res.type === "opaque")) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy).catch(function () {}); });
        }
        return res;
      }).catch(function () {
        /* No network and nothing cached. For an image this resolves to a
           failed load, the <img> is removed, and the gradient shows. */
        return Response.error();
      });
    })
  );
});

/* lets the page ask for an immediate update */
self.addEventListener("message", function (e) {
  if (e.data === "skip-waiting") self.skipWaiting();
});
