# London + Iceland, October 10-17 2026

A trip companion for Ben & Sarah Alexander. Plain HTML, CSS and vanilla JS - no
build step, no framework, no bundler. Edit a file, commit, push, done.

All content comes from `ITINERARY.md` and lives in one data file, `docs/data.js`.

**Open `docs/index.html` in a browser right now** and it works, including from a
`file://` URL. The only thing that needs a real web server is the service worker
(offline caching), which is why the deployed copy on GitHub Pages is the one to
put on your phones.

---

## What's in here

```
ITINERARY.md              the source of truth for all content
README.md                 this file
.nojekyll                 belt and braces (the one that matters is in docs/)
docs/                     <- this folder is what GitHub Pages serves
  index.html              the shell: top strip, <main>, bottom tab bar
  styles.css              design tokens + all styling
  data.js                 ALL TRIP CONTENT. This is the file you edit.
  app.js                  view switching, date logic, localStorage
  sw.js                   service worker (offline)
  manifest.webmanifest    lets you "Add to Home Screen"
  favicon.svg
  .nojekyll               stops GitHub trying to run Jekyll on this folder
  img/                    empty; drop your own photos here if you want
```

---

## Putting it on GitHub Pages

You know git. Pages has a couple of non-obvious steps, so here is all of it.

### 1. Make the repo

On github.com, click **New repository**. Name it something like
`europe-trip-2026`. **Leave it Public** - see the note on privacy below if that
makes you twitch. Don't add a README or .gitignore (you already have files).
Click **Create repository**.

### 2. Push what you have

From this folder:

```bash
git init
git add .
git commit -m "Trip companion for London + Iceland, Oct 2026"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/europe-trip-2026.git
git push -u origin main
```

### 3. Turn on Pages

This is the part that isn't obvious:

1. In your repo on github.com, click **Settings** (the tab, not your account
   settings).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
   (The other option, "GitHub Actions", is for sites that need a build step.
   This one doesn't.)
4. Under **Branch**, pick **main**, and in the folder dropdown next to it pick
   **/docs** - not `/ (root)`. Click **Save**.
5. Wait 1-2 minutes. Refresh the Pages settings page and a green banner appears
   with your URL:

   ```
   https://YOUR-USERNAME.github.io/europe-trip-2026/
   ```

   If you get a 404 at first, give it another minute. First deploys are slow.
   You can watch progress in the **Actions** tab - there'll be a
   "pages build and deployment" run.

### 4. Get it onto your phones

Open that URL on each phone, then:

- **iPhone / Safari:** Share button, then *Add to Home Screen*.
- **Android / Chrome:** three-dot menu, then *Add to Home screen* or *Install app*.

It launches full-screen with no browser chrome, and it works with the phone in
airplane mode once it has been opened online at least once.

**Do this before you leave, on both phones, while you have wifi.** The service
worker caches everything on the first visit. If the first time Sarah opens it is
in a car outside Vik with no signal, there is nothing cached and nothing works.
Open it at home, then turn wifi off and open it again to prove the cache took.

### 5. Updating it later

```bash
# edit docs/data.js
git add -A && git commit -m "Booked the rental car" && git push
```

Pages redeploys in about a minute.

**One gotcha:** phones aggressively cache a service-worker site. After you push a
change, bump the version string at the top of `docs/sw.js`:

```js
var CACHE = "london-iceland-v1";   // -> "london-iceland-v2"
```

Without that bump, a phone that already has the old copy may keep serving it.
This is the only maintenance chore in the whole project.

### A note on privacy

A public repo means anyone with the URL can read the site. That's fine, because
**nothing private is ever written into these files.** Confirmation numbers,
flight numbers, addresses and your actual costs are typed into the app and stored
in that phone's browser (`localStorage`) only. They never touch the repo and
never get uploaded anywhere - there is no server in this app.

Two consequences worth knowing:

- Your data and Sarah's data are separate. Nothing syncs between the phones.
- Clearing site data, or "Clear History and Website Data" on iOS, wipes it. There
  is an export button in the Confirmations tab, gated behind a warning, if you
  want a copy.

If you'd rather the site not be publicly readable at all, a private repo needs
GitHub Pages on a paid plan. The cheaper move is to keep it public and keep
typing the private bits into the app, which is how it's already designed.

---

## Editing content later

**Everything you'd want to change lives in `docs/data.js`.** You should never
have to open `index.html` or `app.js` to change a time, a price or a booking.
The file is commented and organised in the order the app uses it.

### Where checkmarks live (read this once)

Every checkbox, actual cost and confirmation number is stored in **that browser
on that device**, and nothing syncs. Verified behaviour: check two items, quit
the browser, reopen - they are still checked. Open the same URL in a different
browser or on a different phone - the list is empty.

So your phone, your laptop and Sarah's phone are three independent lists. That
is the cost of having no server and no accounts, and it is also why nothing
private is ever at risk. Two practical consequences:

- Pick **one device** to be the source of truth for working the pre-trip
  checklist. Doing half on the laptop and half on the phone will read as
  "nothing is done" on both.
- On iOS, add the site to the Home Screen. A Home Screen web app gets its own
  storage that Safari's 7-day script-storage eviction does not clear, which
  matters when the trip is weeks out.

### Change a time or an activity

Find the day in the `days:` array and edit it. Times are free text - `"9:00"`,
`"Morning"`, or omit `time` entirely and the item just has no time in the gutter.

```js
{ time: "13:00", name: "Into the Glacier, departing Gullfoss",
  detail: "About 3.5 hours. Sleipnir monster truck up onto Langjokull...",
  maps: "Into the Glacier, Klaki base camp, Iceland" },
```

- `maps:` is the pin's **label**; `ll:` is the actual target, `"lat,lng"`. The
  app builds an Apple Maps link on iPhones and a Google Maps link everywhere
  else, always pointing at the coordinate. This matters: a text-only search is
  resolved against wherever the phone currently is, which is how "Padella,
  Borough Market" once matched a similarly-named place in Wisconsin. If you add
  a stop, give it an `ll` or it will have the same problem.
- `area: true` marks a coordinate that is a town centre rather than an exact
  venue, because the itinerary only specifies an area (the south Iceland
  guesthouse, the horse farm near Selfoss). It renders an "area" badge.
- `headsUp:` on an item renders an amber logistics warning.
- `hazards:` on a **day** renders the hatched red block. That treatment is
  reserved for things that can actually hurt you (sneaker waves, volcanic gas,
  car doors in wind). Adding a fourth for a parking fee would blunt the other
  three, which is exactly the failure mode the hatching exists to prevent.

### Change sunrise / sunset

```js
sun: { sunrise: "8:15am", sunset: "6:01pm" },
```

Set `sun: null` for a day with no times, or `sunrise: null` if you only have one.
The app says "not listed in the itinerary" rather than inventing a time - Oct 12
and Oct 17 are in that state now because `ITINERARY.md` doesn't give them.

### Change the budget

Edit `planned` in `budget.sections`. The totals, the variance against the $5,000
ceiling and the meters all recompute themselves.

**Keep the line `id` values stable.** Two other things point at them: the
checklist items (via `budgetIds`) and anything already saved on your phone. If
you rename `trn-car` to `car-rental`, the "Reserve Iceland rental car" checklist
item stops linking to it and any actual cost you already entered for it is
orphaned.

### Change the checklists

Items live in `checklists`, grouped by the buckets from `ITINERARY.md`.

```js
{ id: "tw4", text: "Reserve Iceland rental car - take gravel + sand/ash waiver",
  budgetIds: ["trn-car"] },
```

- `budgetIds` is what wires a checklist item to a budget row. Checking the item
  shows a chip you can tap to jump straight to that row with the cost field
  focused, so you only update one place.
- `promoteAt` / `overdueAt` on a group are **days before Oct 10**, and they are
  the whole urgency system. `four-six` has `promoteAt: 42`, so it goes from
  "Later" to "Now" 42 days out; `overdueAt: 7` means anything still unchecked
  inside a week is flagged overdue. Nothing is hardcoded to a label - move the
  trip date in `meta.start` and every bucket re-sorts itself.
- Items you add in the app itself are stored per-device and don't need a code
  change. `data.js` items are the shared ones.

### Change the map

The Map view has no configuration and no map library. It reads every itinerary
item that has an `ll` and draws them in trip order. Add a stop with coordinates
and it appears on the map automatically.

It is a **schematic**, not a basemap: each region is projected at its own scale
(England and Iceland are 1,900 km apart, so one shared scale collapses both into
a blob), and stops are nudged apart so four London landmarks inside 3 km stay
readable. Coastlines are deliberately not drawn - inventing them would be
decoration posing as data. Every stop still deep-links to the real map, and
"Open route in maps" builds a multi-waypoint driving route.

### Change the confirmations locker

`confirmations` defines the labels and which fields each booking gets. The values
you type are never stored here - only on the device.

### Items I added that are not in ITINERARY.md

Two checklist items carry an **"added"** badge because they did not come from
your itinerary:

- **UK ETA.** The UK has required an Electronic Travel Authorisation from US
  citizens since January 2025, so you almost certainly need one for October
  2026. I have not stated a fee, because it changed once already and my
  information has a cutoff - confirm the current cost and processing time on
  gov.uk.
- **ETIAS** for Iceland (Schengen). Repeatedly delayed, and genuinely uncertain
  for October 2026. The item asks you to check whether it is in force rather
  than assuming.

Both are in the "This week" bucket with links under Info. Delete them from
`data.js` if you disagree - the badge exists so you can tell my additions from
your own content.

### Change the photos

The site uses a mix of local `docs/img/` files and Wikimedia Commons image URLs.
Each image still has a CSS gradient fallback. The fallback is intentional, not a
broken-image placeholder - it is built as a sky/horizon/land abstraction of the
location, so the layout and mood hold up with no network at all.

To use your own photos instead, which is the better end state:

1. Put `gullfoss.jpg` in `docs/img/`.
2. In `data.js`, change that image's `src` to `"img/gullfoss.jpg"` and update the
   `alt` text to describe your actual photo.
3. Add `"img/gullfoss.jpg"` to the `PHOTOS` array in `docs/sw.js` so it gets
   cached for offline use.
4. Bump `CACHE` in `sw.js`.

Every image keeps its `grad` as the fallback either way. For best offline
behavior, prefer local files in `docs/img/` for your own photos.

---

## How it works, briefly

- **One page.** Views switch on the URL hash (`#/today`, `#/prep/money`). No
  router library. Hash routing is also why it works from `file://` - a path-based
  router would need a server.
- **Today adapts to the date.** Before Oct 10 it's the prep dashboard: countdown,
  overdue count, the next few unchecked items checkable in place. Oct 10-17 it's
  that day's plan. After Oct 17 it's a farewell state. The date chip in the top
  strip overrides "today" so you can preview any day.
- **Offline** is a service worker that precaches the shell and assets. The dot in
  the top strip goes red and a banner appears when there's no connection.
- **Dark mode** follows `prefers-color-scheme`; the sun button overrides it.
  Image blocks are dimmed at night so a bright photo isn't glare in a dark car.

### The design, in one paragraph

Two structural colours because the trip has two halves: London is slate (wet
Portland stone, rain light), Iceland is basalt-teal (black rock, glacier rim).
The colour is information - it tells you which half a card belongs to. Aurora
green is quarantined: it appears nowhere except the aurora panel and the aurora
cue on a day card, so green always means aurora. No webfonts, because a font
request is a network dependency and this has to work in a car in south Iceland;
the discipline instead is that every number is monospace, which reads as a field
instrument for zero bytes. The one bold element is the basalt column spine - the
left edge of every day card, the checklist progress meter and the budget spend
bar are the same geological motif doing three jobs, in pure CSS. Everything else
stays flat and quiet.
