/* ============================================================================
   Service worker.

   The whole point: this app has to work in a car in south Iceland with no
   signal. The shell and every asset are precached on first visit.

   Bump CACHE when you change any file, or phones will keep serving the old
   copy. That is the one maintenance chore this file has.
   ========================================================================== */

var CACHE = "london-iceland-v10";

/* Map tiles live in their own cache so they cannot crowd out the app shell,
   and so clearing them is easy. Tiles are cached only as they are actually
   viewed - OpenStreetMap's tile policy forbids bulk pre-downloading, so the
   live map is a when-you-have-signal feature and the built-in vector map is
   the guaranteed-offline one. */
var TILES = "osm-tiles-v1";

/* Same-origin. These MUST cache or the install fails - that is intentional,
   a half-installed offline app is worse than none. */
var CORE = [
  "./",
  "./index.html",
  "./styles.css",
  "./data.js",
  "./geo.js",
  "./vendor/leaflet.js",
  "./vendor/leaflet.css",
  "./img/towerbridge.jpg",
  "./img/seljalandsfoss.jpg",
  "./img/skogafoss.jpg",
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
  "https://commons.wikimedia.org/wiki/Special:FilePath/Big%20Ben%20from%20the%20Westminster%20Bridge.jpg?width=1600",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Stonehenge%20Misty%20Sunrise.jpg?width=1600",
  "https://commons.wikimedia.org/wiki/Special:FilePath/%C3%9Eingvellir%20National%20Park%2C%20Iceland.JPG?width=1600",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Strokkur%20Geyser%20%283357373256%29.jpg?width=1600",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Gullfoss%20Waterfall%20%2824852505304%29.jpg?width=1600",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Ice%20Tunnel.jpg?width=1600",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Black%20Sand%20Beach%20Iceland%2C%20Reynisfjara%20Beach.jpg?width=1600",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Icelandic%20Horse%20Face.jpg?width=1600",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Aurora%20Iceland.jpg?width=1600",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Hot%20spring%2C%20Reykjadalur%20Valley%2C%20Iceland%2C%2020230502%201411%204232.jpg?width=1600",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Aerial%20view%20of%20the%20recent%20Fagradalsfjall%20lava%20fields.jpg?width=1600",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Blue%20lagoon%20iceland.jpg?width=1600"
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
        return (k === CACHE || k === TILES) ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  /* tiles: cache-first into their own bucket, so revisiting an area works
     without signal even though we never bulk-download */
  if (req.url.indexOf("tile.openstreetmap.org") !== -1) {
    e.respondWith(
      caches.open(TILES).then(function (c) {
        return c.match(req).then(function (hit) {
          if (hit) return hit;
          return fetch(req).then(function (res) {
            if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone());
            return res;
          }).catch(function () { return Response.error(); });
        });
      })
    );
    return;
  }

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
