/* ============================================================================
   data.js  -  ALL trip content lives here.

   Sourced from ITINERARY.md. Em-dashes normalized to hyphens. No trip facts
   added that aren't in the itinerary.

   To edit content later you should only ever need to touch THIS file.
   See README.md > "Editing content later".
   ========================================================================== */

const TRIP = {

  /* --- trip-level facts ---------------------------------------------------- */
  meta: {
    title: "London + Iceland",
    who: "Ben & Sarah Alexander",
    start: "2026-10-10",              // first day of the trip
    end: "2026-10-17",                // last day (fly home)
    nights: 7,
    budgetCeiling: 5000,
    structure: "3 nights London (Oct 10, 11, 12) then 4 nights Iceland (Oct 13, 14, 15, 16), home midday Saturday Oct 17.",
    flightsNote: "Ben's MSN-LHR and KEF-MSN flights are covered by work. Everything costed here is out of pocket."
  },

  /* --- the must-do list, shown as a grid ----------------------------------- */
  mustDo: [
    { item: "Stonehenge",                 when: "Mon Oct 12" },
    { item: "Big Ben / London classics",  when: "Sat Oct 10" },
    { item: "LDS temple",                 when: "Sun Oct 11 (grounds) or Tue Oct 13 (session)" },
    { item: "Aurora hunting",             when: "All four Iceland nights" },
    { item: "Stargazing",                 when: "Wed-Fri, rural south Iceland" },
    { item: "Icelandic horses",           when: "Fri Oct 16" },
    { item: "Volcano",                    when: "Tue Oct 13 lava fields + Thu Oct 15 Lava Show" },
    { item: "Geysers",                    when: "Wed Oct 14 (Strokkur)" },
    { item: "Tourist hot spring",         when: "Wed Oct 14 (Secret Lagoon)" },
    { item: "Non-tourist hot spring",     when: "Fri Oct 16 (Reykjadalur)" },
    { item: "Glacier ice tunnel",         when: "Wed Oct 14 (Into the Glacier)" },
    { item: "Tectonic plates",            when: "Wed Oct 14 (Þingvellir) + Tue Oct 13 (Bridge Between Continents)" },
    { item: "Black sand beach",           when: "Thu Oct 15 (Reynisfjara)" }
  ],

  /* --- images -------------------------------------------------------------- */
  /* Every image has a designed gradient that renders FIRST and always. The
     photo layers on top only if it actually loads, so a dead network can never
     break the layout. To use your own photo instead, drop a file in docs/img/
     and change `src` to "img/yourfile.jpg" - the service worker will cache it. */
  images: {
    bigben: {
      src: "https://source.unsplash.com/1600x900/?big-ben,westminster,london",
      alt: "The Elizabeth Tower and Big Ben clock face above the Houses of Parliament, seen from Westminster Bridge under grey cloud.",
      grad: "radial-gradient(60% 40% at 70% 22%,rgba(255,255,255,.16),transparent 70%),linear-gradient(180deg,#93A3B1 0%,#788A99 44%,#3F4C58 46%,#212A32 100%)"
    },
    stonehenge: {
      src: "https://source.unsplash.com/1600x900/?stonehenge,salisbury",
      alt: "The standing stones and lintels of Stonehenge on open Salisbury Plain grassland.",
      grad: "radial-gradient(70% 45% at 30% 26%,rgba(255,240,210,.20),transparent 72%),linear-gradient(180deg,#9AA394 0%,#7E8574 40%,#59614F 42%,#2C3226 100%)"
    },
    thingvellir: {
      src: "https://source.unsplash.com/1600x900/?thingvellir,iceland,rift",
      alt: "The Almannagja rift at Thingvellir, a walled corridor of dark basalt where the tectonic plates pull apart.",
      grad: "linear-gradient(90deg,rgba(0,0,0,.42) 0 16%,transparent 38%,transparent 62%,rgba(0,0,0,.42) 84% 100%),linear-gradient(180deg,#8FA07E 0%,#5C6B4A 45%,#33402F 70%,#171D14 100%)"
    },
    geysir: {
      src: "https://source.unsplash.com/1600x900/?geysir,strokkur,iceland",
      alt: "Strokkur geyser throwing a column of boiling water and steam into the air above a pale geothermal field.",
      grad: "radial-gradient(26% 64% at 50% 58%,rgba(255,255,255,.60),transparent 72%),linear-gradient(180deg,#B9C8CE 0%,#93A6AE 46%,#6C838C 48%,#3B4C54 100%)"
    },
    gullfoss: {
      src: "https://source.unsplash.com/1600x900/?gullfoss,waterfall,iceland",
      alt: "The two tiers of Gullfoss waterfall dropping into a deep basalt canyon in glacial meltwater.",
      grad: "linear-gradient(180deg,#8FB0BA 0%,#6E93A0 34%,#4C7484 36%,#3E626E 62%,#22323A 64%,#16232A 100%)"
    },
    icetunnel: {
      src: "https://source.unsplash.com/1600x900/?ice-cave,langjokull,glacier",
      alt: "A carved tunnel inside the Langjokull glacier, walls of layered blue ice lit from within.",
      grad: "radial-gradient(58% 78% at 50% 58%,rgba(220,245,255,.72),rgba(90,170,205,.35) 45%,transparent 74%),linear-gradient(180deg,#2E6C89 0%,#1B4661 55%,#0E2C3E 100%)"
    },
    reynisfjara: {
      src: "https://source.unsplash.com/1600x900/?reynisfjara,black-sand-beach,vik",
      alt: "Reynisfjara black sand beach with the Reynisdrangar sea stacks offshore and white surf running up the dark sand.",
      grad: "linear-gradient(180deg,#9AA2AA 0%,#767F87 33%,#E6EAEC 36%,#CFD6DA 39%,#33393E 42%,#14171A 100%)"
    },
    horses: {
      src: "https://source.unsplash.com/1600x900/?icelandic-horses",
      alt: "Icelandic horses with thick manes standing in an autumn pasture of tan grass.",
      grad: "radial-gradient(70% 40% at 25% 20%,rgba(255,235,200,.24),transparent 70%),linear-gradient(180deg,#A9B4BC 0%,#8D8064 38%,#6B5334 40%,#33291A 100%)"
    },
    aurora: {
      src: "https://source.unsplash.com/1600x900/?aurora,northern-lights,iceland",
      alt: "Green aurora curtains rippling over a dark south Iceland landscape under stars.",
      grad: "radial-gradient(120% 55% at 25% 30%,rgba(63,227,155,.50),transparent 62%),radial-gradient(80% 45% at 78% 16%,rgba(90,200,220,.30),transparent 60%),linear-gradient(180deg,#061A22 0%,#04121A 60%,#020A0E 100%)"
    },
    reykjadalur: {
      src: "https://source.unsplash.com/1600x900/?reykjadalur,hot-river,iceland",
      alt: "Steam rising off the hot river in the Reykjadalur valley, with mossy green slopes on either side.",
      grad: "radial-gradient(45% 42% at 55% 52%,rgba(240,250,245,.44),transparent 70%),linear-gradient(180deg,#A8B899 0%,#7C8F6C 40%,#4A5C45 62%,#1E2A1F 100%)"
    }
  },

  /* --- the eight days ------------------------------------------------------ */
  /* half:    "london" | "iceland"  -> drives the card's basalt spine colour
     sun:     exactly as given in ITINERARY.md; null where not listed
     hazards: life-safety only. Renders hatched red. Do not dilute this.
     headsUp: logistics warning on a single item. Renders amber.               */
  days: [

    { id: "oct10", date: "2026-10-10", dow: "Saturday", half: "london",
      title: "Sarah lands, London on foot",
      sun: { sunrise: "7:20am", sunset: "6:15pm" },
      images: ["bigben"],
      intro: [
        "Sarah's overnight flight lands Heathrow early morning. Piccadilly line into town - cheap, and only marginally slower than the express.",
        "Today is deliberately low-effort because she'll be wrecked. All walking, all free."
      ],
      items: [
        { name: "Westminster & Big Ben", detail: "Then across Westminster Bridge for the classic view.", maps: "Big Ben, Westminster, London", ll: "51.5007,-0.1246" },
        { name: "Thames South Bank walk", detail: "East past the London Eye.", maps: "South Bank, London", ll: "51.5033,-0.1196" },
        { name: "Tower Bridge", detail: "And the Tower of London from outside.", maps: "Tower Bridge, London", ll: "51.5055,-0.0754" },
        { name: "Trafalgar Square and Buckingham Palace", detail: "If energy holds.", maps: "Trafalgar Square, London", ll: "51.5080,-0.1281" }
      ],
      notes: [
        { label: "Jet lag", text: "Stay outside in daylight as long as possible - it's the only thing that actually fixes jet lag." },
        { label: "Dinner", text: "Dishoom. Book ahead. Black daal and the chai." }
      ]
    },

    { id: "oct11", date: "2026-10-11", dow: "Sunday", half: "london",
      title: "Church + temple grounds",
      sun: { sunrise: null, sunset: "6:10pm" },
      images: [],
      intro: [],
      items: [
        { time: "Morning", name: "Sacrament meeting at the Hyde Park Chapel",
          detail: "64-68 Exhibition Road, South Kensington. South Kensington tube. The building also houses a visitors' center with exhibits on temples and the history of the Church in the British Isles - worth 30 minutes after the block.",
          maps: "Hyde Park Chapel, 64-68 Exhibition Road, London SW7 2PA", ll: "51.4956,-0.1745" },
        { time: "Afternoon", name: "London England Temple grounds",
          detail: "West Park Road, Newchapel, Lingfield, Surrey RH7 6HW.",
          maps: "London England Temple, West Park Road, Newchapel, Lingfield, Surrey RH7 6HW", ll: "51.1608,-0.0497",
          sub: [
            "Train from London Victoria or London Bridge toward East Grinstead or Lingfield, roughly 50 minutes.",
            "Grounds are open to all during daylight hours. Formal gardens, a large pond, and an oak on site that's over 450 years old - President McKay had it preserved when he chose the building site.",
            "The temple itself is closed Sundays, so this is a grounds visit only. Plan to be there well before sunset at 6:10pm."
          ],
          headsUp: "Lingfield station is 2 miles from the temple with no bus service - taxi or rideshare the last stretch. Arrange the return ride before you're dropped off; it's rural." },
        { time: "Evening", name: "Padella, Borough",
          detail: "Pasta - best cheap meal in the city. No reservations; go at 5pm.",
          maps: "Padella, Borough Market, London", ll: "51.5054,-0.0905" }
      ],
      notes: [
        { label: "Alternate", text: "If you'd rather attend an actual session than walk the grounds, see the Tuesday Temple Session Variant at the bottom of the Days view." }
      ]
    },

    { id: "oct12", date: "2026-10-12", dow: "Monday", half: "london",
      title: "Stonehenge",
      sun: null,
      images: ["stonehenge"],
      intro: ["The budget route beats the tour coaches."],
      items: [
        { name: "Train London Waterloo to Salisbury", detail: "About 90 minutes. Book advance tickets; walk-up fare is several times higher.", maps: "Salisbury railway station, Salisbury", ll: "51.0698,-1.8060" },
        { name: "The Stonehenge Tour bus", detail: "Runs from Salisbury station, and the fare bundles site admission.", maps: "Stonehenge, Amesbury, Salisbury", ll: "51.1789,-1.8262" },
        { name: "Back in London by early evening." }
      ],
      notes: [
        { label: "Optional upgrade", text: "English Heritage's Stone Circle Experience puts you inside the ring outside normal hours. Check October availability directly with English Heritage - some operators indicate special access isn't offered in October or November, so treat this as a bonus rather than a plan. About $150 for the two of you." },
        { label: "Evening", text: "Pack. Early flight tomorrow." }
      ]
    },

    { id: "oct13", date: "2026-10-13", dow: "Tuesday", half: "iceland",
      title: "Fly + volcano country",
      sun: { sunrise: "8:12am", sunset: "6:05pm" },
      images: [],
      intro: ["Every night in Iceland is an aurora night. The aurora panel is the most important page in this app."],
      items: [
        { time: "Morning", name: "Flight LHR to KEF", detail: "About 3 hours. Iceland is an hour behind London; you land around midday." },
        { name: "Pick up the rental car at KEF",
          detail: "A 2WD handles this entire route in mid-October and saves real money. Take the gravel and sand/ash damage waiver - that's a genuine Iceland risk, not an upsell.",
          maps: "Keflavik International Airport, Iceland", ll: "63.9850,-22.6056" },
        { time: "Afternoon", name: "Sundhnúkur / Fagradalsfjall lava fields",
          detail: "Marked trails cross lava from the 2021-2025 eruptions; some of it still radiates heat.",
          maps: "Fagradalsfjall, Reykjanes, Iceland", ll: "63.8958,-22.2725",
          headsUp: "Check safetravel.is and almannavarnir.is before driving out - exclusion zones move.",
          links: [
            { label: "safetravel.is", url: "https://safetravel.is/" },
            { label: "almannavarnir.is", url: "https://www.almannavarnir.is/" }
          ] },
        { name: "Bridge Between Continents", detail: "Footbridge over a rift between the North American and Eurasian plates. Ten minutes, on the way.", maps: "Bridge Between Continents, Reykjanes, Iceland", ll: "63.8686,-22.6752" },
        { name: "Gunnuhver", detail: "Violently boiling mud pots and steam vents.", maps: "Gunnuhver, Reykjanes, Iceland", ll: "63.8189,-22.6836" },
        { name: "Check into Reykjavík", detail: "Dinner: Messinn for fish, or Bæjarins Beztu for the hot dog.", maps: "Reykjavik, Iceland", ll: "64.1466,-21.9426", area: true }
      ],
      hazards: [
        { title: "Volcanic gas is what actually kills people here",
          text: "Never approach a fresh flow from downwind. Volcanic gas concentrations near vents are lethal, and that's how people actually die at these sites." },
        { title: "Hold car doors with both hands",
          text: "Wind rips them off the hinges every year and rental insurance does not cover it. This starts the moment you pick up the car at KEF." }
      ],
      aurora: { night: 1, spot: "Grótta lighthouse, Seltjarnarnes",
        text: "Fifteen minutes from downtown, free parking, dark enough to work.",
        maps: "Grotta lighthouse, Seltjarnarnes, Iceland", ll: "64.1655,-22.0208" },
      notes: [
        { label: "Variant", text: "Under the Tuesday temple session variant this becomes drive-and-aurora only, and the Reykjanes stops move to Friday afternoon. See the bottom of the Days view." }
      ]
    },

    { id: "oct14", date: "2026-10-14", dow: "Wednesday", half: "iceland",
      title: "Golden Circle + inside the glacier",
      sun: { sunrise: "8:15am", sunset: "6:01pm" },
      images: ["icetunnel", "thingvellir", "geysir", "gullfoss"],
      intro: ["Big day. Roll at 8:30."],
      items: [
        { time: "9:00", name: "Þingvellir National Park", detail: "Walk the Almannagjá rift where the plates pull apart. This is the tectonic plates park. Parking fee applies.", maps: "Thingvellir National Park, Iceland", ll: "64.2558,-21.1297" },
        { time: "10:45", name: "Geysir", detail: "Strokkur erupts every 5-10 minutes, dependably.", maps: "Geysir, Haukadalur, Iceland", ll: "64.3104,-20.3024" },
        { time: "11:45", name: "Gullfoss", detail: "The two-tier falls. Quick stop; you're coming back here.", maps: "Gullfoss, Iceland", ll: "64.3271,-20.1199" },
        { time: "13:00", name: "Into the Glacier, departing Gullfoss", detail: "About 3.5 hours. Sleipnir monster truck up onto Langjökull, then an hour walking through 1,600 feet of blue ice tunnel carved into the glacier, including the ice chapel. Thermal suits and helmets provided. Book direct; the Gullfoss departure is far cheaper than the Reykjavík pickup version.", maps: "Gullfoss departure point, Iceland", ll: "64.3271,-20.1199" },
        { time: "17:15", name: "Secret Lagoon, Flúðir", detail: "Iceland's oldest swimming pool, built 1891, in a geothermal field with a small geyser erupting alongside. Your tourist hot spring, at a fraction of Blue Lagoon's price and with more character.", maps: "Secret Lagoon, Fludir, Iceland", ll: "64.1372,-20.3106" },
        { name: "Drive to the guesthouse near Hella or Hvolsvöllur", detail: "Two nights here.", maps: "Hvolsvollur, Iceland", ll: "63.7494,-20.2225", area: true }
      ],
      aurora: { night: 2, spot: "Wherever you are - rural south Iceland",
        text: "Rural and dark. Statistically your best shot of the trip.",
        maps: "Hvolsvollur, Iceland", ll: "63.7494,-20.2225", area: true }
    },

    { id: "oct15", date: "2026-10-15", dow: "Thursday", half: "iceland",
      title: "South Coast + molten lava",
      sun: { sunrise: "8:18am", sunset: "5:58pm" },
      images: ["reynisfjara"],
      intro: [],
      items: [
        { name: "Seljalandsfoss", detail: "The waterfall you walk behind.", maps: "Seljalandsfoss, Iceland", ll: "63.6156,-19.9886",
          headsUp: "You will get drenched. Rain shells mandatory." },
        { name: "Skógafoss", detail: "200 feet, walk right to the base.", maps: "Skogafoss, Iceland", ll: "63.5321,-19.5114" },
        { name: "Dyrhólaey", detail: "Headland arch with the whole black coastline below.", maps: "Dyrholaey, Vik, Iceland", ll: "63.4020,-19.1290" },
        { name: "Reynisfjara black sand beach, Vík", detail: "Basalt columns and sea stacks.", maps: "Reynisfjara beach, Vik, Iceland", ll: "63.4033,-19.0447",
          links: [{ label: "safetravel.is conditions", url: "https://safetravel.is/" }] },
        { time: "Evening", name: "Lava Show, Vík", detail: "About 1 hour. They superheat real basalt to 1,100C and pour glowing lava into the room in front of you. You feel the heat on your face. With no eruption running, this is the closest you'll get, and it stands on its own merits.", maps: "Lava Show, Vik, Iceland", ll: "63.4186,-19.0060" },
        { name: "Back to the guesthouse." }
      ],
      hazards: [
        { title: "Reynisfjara sneaker waves. Safety, not boilerplate.",
          text: "Reynisfjara kills tourists every few years. Sneaker waves arrive with no warning and drag people out. Stay well up the beach, never turn your back on the water, and do not walk to the waterline for a photo." }
      ],
      aurora: { night: 3, spot: "South coast, back at the guesthouse",
        text: "Same dark skies as night 2. The Milky Way with no effort.",
        maps: "Hvolsvollur, Iceland", ll: "63.7494,-20.2225", area: true }
    },

    { id: "oct16", date: "2026-10-16", dow: "Friday", half: "iceland",
      title: "Hot river + horses",
      sun: { sunrise: "8:21am", sunset: "5:54pm" },
      images: ["reykjadalur", "horses"],
      intro: [],
      items: [
        { time: "Morning", name: "Reykjadalur, Hveragerði", detail: "Park at the trailhead and hike about 2 miles uphill through a steaming geothermal valley, 45-60 minutes. At the top, a river you sit down in, with boardwalks and changing screens. The water gets hotter further upstream - find your spot. Your non-tourist hot spring. Free, and the most Icelandic thing on this itinerary.", maps: "Reykjadalur trailhead, Hveragerdi, Iceland", ll: "64.0225,-21.2103" },
        { time: "Afternoon", name: "Icelandic horse riding", detail: "1-2 hours at a farm near Hveragerði or Selfoss. Ask specifically for a ride that demonstrates the tölt - the fifth gait unique to the breed, smooth enough to hold a drink while riding. Beginners are fine; these horses are famously calm.", maps: "Selfoss, Iceland", ll: "63.9333,-21.0000", area: true },
        { name: "Drive to lodging near Keflavík", detail: "About 1 hour, for the early flight.", maps: "Keflavik, Iceland", ll: "64.0049,-22.5644", area: true }
      ],
      aurora: { night: 4, spot: "Reykjanes lava fields",
        text: "Dark, and ten minutes from the airport hotels. Last chance.",
        maps: "Reykjanes peninsula, Iceland", ll: "63.8500,-22.4500", area: true }
    },

    { id: "oct17", date: "2026-10-17", dow: "Saturday", half: "iceland",
      title: "Home",
      sun: null,
      images: [],
      intro: [],
      items: [
        { name: "Early Icelandair KEF to Chicago O'Hare", detail: "Connect to Madison. Home early afternoon.", maps: "Keflavik International Airport, Iceland", ll: "63.9850,-22.6056" }
      ]
    }
  ],

  /* --- aurora field reference --------------------------------------------- */
  aurora: {
    lede: "This determines whether the trip delivers. Read it twice.",
    conditions: [
      { k: "Moon",       v: "New moon is Oct 10. All four Iceland nights have a thin crescent that sets early - essentially zero moonlight." },
      { k: "Darkness",   v: "Full darkness from about 7:30pm to 7:30am." },
      { k: "Kp needed",  v: "Iceland sits directly under the auroral oval, so you don't need a major storm. Kp 2-3 is enough." },
      { k: "Be outside", v: "9pm to 1am, dark-adapted." }
    ],
    rules: [
      { head: "The cloud map matters more than the Kp number.",
        body: "Check vedur.is every morning. It shows aurora activity and a cloud cover map. Clouds, not solar activity, are what ruin aurora trips." },
      { head: "If your area is socked in, drive.",
        body: "Iceland's weather changes completely over 50 miles. A clear window is often an hour away, and you have a car specifically so you can chase it." },
      { head: "Twenty full minutes with no phone screen.",
        body: "Before you decide nothing is happening. A phone screen resets your dark adaptation." },
      { head: "A moderate aurora is a pale grey-green smudge to the naked eye.",
        body: "It only goes vivid green on camera. A strong one is unmistakable and ripples like fabric. Both are worth the cold. Don't write off night one because it didn't look like the postcard." },
      { head: "Phone camera: night mode, 10-second exposure.",
        body: "Propped on a rock or a cheap tripod. That tripod is the best packing decision you'll make." },
      { head: "Stargazing bonus.",
        body: "The same dark skies on nights 2 and 3 give you the Milky Way with no effort." }
    ],
    tonight: [
      { id: "cloud",  text: "Check the cloud map on vedur.is" },
      { id: "drive",  text: "Socked in? Drive - a clear window is often an hour away" },
      { id: "adapt",  text: "20 minutes dark adaptation, no phone screen" },
      { id: "camera", text: "Phone on 10-second exposure, propped on something solid" }
    ],
    links: [
      { label: "vedur.is aurora + cloud forecast", url: "https://en.vedur.is/weather/forecasts/aurora/", note: "Check every morning" },
      { label: "road.is road conditions",          url: "https://www.road.is/",  note: "Before any night drive" },
      { label: "safetravel.is alerts",             url: "https://safetravel.is/", note: "Conditions and warnings" }
    ]
  },

  /* --- volcano contingency ------------------------------------------------- */
  volcano: {
    status: "No active eruption as of the writing of the itinerary. The last ran July 16 to early August 2025 - the ninth in the Sundhnúksgígar crater row. Magma continues accumulating beneath Svartsengi at record levels and the Icelandic Met Office considers another intrusion, possibly another eruption, the most likely outcome. Nobody can say whether that lands in October 2026.",
    steps: [
      { n: 1, text: "Check almannavarnir.is immediately. Civil Protection controls access, and early-stage eruptions are typically closed to the public for days." },
      { n: 2, text: "If ground access opens, hikes from the Reykjanes trailheads run 2-4 hours round trip over rough lava. Free." },
      { n: 3, text: "Helicopter tours launch within a day or two and give the best views, at $400-600 per person. That breaks the budget - your call in the moment." }
    ],
    hazard: { title: "Never approach a fresh flow from downwind.",
      text: "Volcanic gas concentrations near vents are lethal, and that's how people actually die at these sites." }
  },

  /* --- budget -------------------------------------------------------------- */
  /* Line ids are referenced by checklist items via budgetIds. Keep them stable. */
  budget: {
    sections: [
      { id: "flights", label: "Flights", lines: [
        { id: "flt-sarah",   label: "Sarah MSN-LHR + KEF-MSN",       planned: 900 },
        { id: "flt-lhrkef",  label: "LHR-KEF x2",                    planned: 300 }
      ]},
      { id: "lodging", label: "Lodging (7 nights)", lines: [
        { id: "lod-london",  label: "London x3",                     planned: 600 },
        { id: "lod-rvk",     label: "Reykjavík x1",             planned: 200 },
        { id: "lod-south",   label: "South Iceland guesthouse x2",   planned: 340 },
        { id: "lod-kef",     label: "Keflavík x1",              planned: 180 }
      ]},
      { id: "transport", label: "Transport", lines: [
        { id: "trn-car",     label: "Iceland rental car, 4 days",    planned: 340 },
        { id: "trn-fuel",    label: "Fuel",                          planned: 140 },
        { id: "trn-london",  label: "London transit",                planned: 80 }
      ]},
      { id: "excursions", label: "Excursions (both)", lines: [
        { id: "exc-stonehenge",  label: "Stonehenge - train + tour bus + admission", planned: 220 },
        { id: "exc-glacier",     label: "Into the Glacier from Gullfoss",            planned: 190 },
        { id: "exc-horses",      label: "Icelandic horse riding",                    planned: 220 },
        { id: "exc-lagoon",      label: "Secret Lagoon",                             planned: 80 },
        { id: "exc-lavashow",    label: "Lava Show, Vík",                       planned: 120 },
        { id: "exc-thingvellir", label: "Þingvellir parking",                   planned: 10 },
        { id: "exc-temple",      label: "Temple day train + taxi",                   planned: 20 },
        { id: "exc-reykjadalur", label: "Reykjadalur",                               planned: 0, free: true }
      ]},
      { id: "dinner", label: "One nice dinner", lines: [
        { id: "din-nice",    label: "One nice dinner",               planned: 150 }
      ]}
    ],
    headroomOptions: [
      "Sky Lagoon on the last evening (about $234)",
      "Stone Circle Experience at Stonehenge (about $150), if October slots exist",
      "Upgrade the London hotel from budget to mid-range (about $300)",
      "Hold as buffer - Sarah's one-way airfares are the least predictable number and could run $300-400 over estimate"
    ],
    cutIfOver: "Cut the nice dinner, and swap Secret Lagoon for a municipal geothermal pool like Laugardalslaug (about $12 for both, arguably more authentically Icelandic anyway)."
  },

  /* --- checklists ---------------------------------------------------------- */
  /* promoteAt / overdueAt are in DAYS BEFORE Oct 10. Urgency is computed from
     the trip date, never from these labels.
     budgetIds link an item to budget lines - checking it prompts for actuals.  */
  checklists: [
    { id: "this-week", label: "This week", promoteAt: 999, overdueAt: 42, items: [
      { id: "tw1", text: "Price Sarah's flights three ways: two separate one-ways, multi-city, and open-jaw. They routinely differ by hundreds.", budgetIds: ["flt-sarah"] },
      { id: "tw2", text: "Book Sarah MSN-LHR and KEF-MSN", budgetIds: ["flt-sarah"] },
      { id: "tw3", text: "Book LHR-KEF x2 (Play or Icelandair)", budgetIds: ["flt-lhrkef"] },
      { id: "tw4", text: "Reserve Iceland rental car - take gravel + sand/ash waiver", budgetIds: ["trn-car"] },
      { id: "tw5", text: "Check English Heritage for October Stone Circle Experience availability" },
      { id: "tw6", text: "Confirm both temple recommends are current" },
      { id: "tw7", text: "Check the London England Temple page for the October schedule and reservation link" },
      { id: "tw8", text: "Verify passports are valid at least 6 months past Oct 17, 2026" },
      { id: "tw9", text: "Apply for UK ETA for both of you - the UK has required an Electronic Travel Authorisation from US citizens since January 2025. Confirm the current fee and processing time on gov.uk before paying.", extra: true },
      { id: "tw10", text: "Check whether ETIAS is live for Iceland by October 2026 - the EU has delayed it repeatedly. If it is in force by then, both of you need one for the Schengen area.", extra: true },
    ]},
    { id: "four-six", label: "Four to six weeks out", promoteAt: 42, overdueAt: 7, items: [
      { id: "fs1",  text: "Book Into the Glacier - Gullfoss departure, not Reykjavík", budgetIds: ["exc-glacier"] },
      { id: "fs2",  text: "Book Icelandic horse riding farm near Hveragerði or Selfoss", budgetIds: ["exc-horses"] },
      { id: "fs3",  text: "Book Lava Show, Vík", budgetIds: ["exc-lavashow"] },
      { id: "fs4",  text: "Book London lodging x3 nights", budgetIds: ["lod-london"] },
      { id: "fs5",  text: "Book Reykjavík x1, south Iceland guesthouse x2, Keflavík x1", budgetIds: ["lod-rvk","lod-south","lod-kef"] },
      { id: "fs6",  text: "Buy advance Waterloo-Salisbury train tickets", budgetIds: ["exc-stonehenge"] },
      { id: "fs7",  text: "Book The Stonehenge Tour bus", budgetIds: ["exc-stonehenge"] },
      { id: "fs8",  text: "Reserve Dishoom" },
      { id: "fs9",  text: "Notify banks of travel; confirm no foreign transaction fees" },
      { id: "fs10", text: "Download offline maps for Iceland and southern England" }
    ]},
    { id: "week-of", label: "Week of", promoteAt: 7, overdueAt: 0, items: [
      { id: "wo1", text: "Confirm every booking by email" },
      { id: "wo2", text: "Check vedur.is and road.is daily starting three days out" },
      { id: "wo3", text: "Charge and pack the phone tripod" },
      { id: "wo4", text: "Screenshot all confirmations in case of no signal" }
    ]},
    { id: "packing", label: "Packing that actually matters", promoteAt: 7, overdueAt: 1, resettable: true, items: [
      { id: "pk1", text: "Waterproof shell + warm mid-layer - Iceland is 35-45F but wind is the real story" },
      { id: "pk2", text: "Waterproof boots with grip - Reykjadalur is muddy, Reynisfjara is wet, the glacier is ice" },
      { id: "pk3", text: "Swimsuit and quick-dry towel - used three separate times" },
      { id: "pk4", text: "Phone tripod for the aurora" },
      { id: "pk5", text: "Headlamp for the Reykjadalur trail and aurora nights" },
      { id: "pk6", text: "Temple recommends" },
      { id: "pk7", text: "Sunday clothes" },
      { id: "pk8", text: "Iceland is card-only in practice; skip cash" },
      { id: "pk9", text: "Hold car doors with both hands - wind rips them off hinges every year and rental insurance doesn't cover it" }
    ]}
  ],

  /* --- confirmations locker (structure only; values live in localStorage) --- */
  confirmations: [
    { id: "cf-flt-sarah-out", label: "Sarah MSN to LHR",               fields: ["Airline", "Flight no.", "Confirmation", "Times"] },
    { id: "cf-flt-sarah-ret", label: "Sarah KEF to MSN",               fields: ["Airline", "Flight no.", "Confirmation", "Times"] },
    { id: "cf-flt-lhrkef",    label: "LHR to KEF x2",                  fields: ["Airline", "Flight no.", "Confirmation", "Times"] },
    { id: "cf-flt-home",      label: "KEF to ORD to MSN (Oct 17)",     fields: ["Airline", "Flight no.", "Confirmation", "Times"] },
    { id: "cf-lod-london",    label: "London lodging x3",              fields: ["Name", "Address", "Confirmation", "Check-in / out"] },
    { id: "cf-lod-rvk",       label: "Reykjavík lodging x1",      fields: ["Name", "Address", "Confirmation", "Check-in / out"] },
    { id: "cf-lod-south",     label: "South Iceland guesthouse x2",    fields: ["Name", "Address", "Confirmation", "Check-in / out"] },
    { id: "cf-lod-kef",       label: "Keflavík lodging x1",       fields: ["Name", "Address", "Confirmation", "Check-in / out"] },
    { id: "cf-car",           label: "Iceland rental car",             fields: ["Company", "Confirmation", "Pickup / return", "Waiver taken?"] },
    { id: "cf-train",         label: "Waterloo to Salisbury train",    fields: ["Confirmation", "Times", "Seat / coach"] },
    { id: "cf-bus",           label: "The Stonehenge Tour bus",        fields: ["Confirmation", "Times"] },
    { id: "cf-glacier",       label: "Into the Glacier (Gullfoss)",    fields: ["Confirmation", "Meeting point", "Time"] },
    { id: "cf-horses",        label: "Icelandic horse riding",         fields: ["Farm", "Address", "Confirmation", "Time"] },
    { id: "cf-lavashow",      label: "Lava Show, Vík",            fields: ["Confirmation", "Time"] },
    { id: "cf-dishoom",       label: "Dishoom",                        fields: ["Location", "Confirmation", "Time"] }
  ],

  /* --- reference ----------------------------------------------------------- */
  reference: {
    emergency: { label: "Emergency in Iceland", value: "112", tel: "112" },
    links: [
      { label: "Road conditions",              value: "road.is",                     url: "https://www.road.is/" },
      { label: "Weather + aurora forecast",    value: "vedur.is/en/weather/aurora",  url: "https://en.vedur.is/weather/forecasts/aurora/" },
      { label: "Travel safety and alerts",     value: "safetravel.is",               url: "https://safetravel.is/" },
      { label: "Volcano access decisions",     value: "almannavarnir.is",            url: "https://www.almannavarnir.is/" },
      { label: "UK ETA application",           value: "gov.uk/apply-eta",            url: "https://www.gov.uk/apply-eta" },
      { label: "ETIAS status (Schengen)",      value: "travel-europe.europa.eu",     url: "https://travel-europe.europa.eu/etias_en" }
    ],
    embassies: [
      { label: "US Embassy Reykjavík", address: "Engjateigur 7, 105 Reykjavík", maps: "US Embassy, Engjateigur 7, 105 Reykjavik, Iceland", ll: "64.1442,-21.8880" },
      { label: "US Embassy London",        address: "33 Nine Elms Lane, London SW11 7US", maps: "US Embassy, 33 Nine Elms Lane, London SW11 7US", ll: "51.4805,-0.1300" }
    ],
    worship: [
      { label: "Hyde Park Chapel",
        address: "64-68 Exhibition Road, South Kensington, London SW7 2PA",
        maps: "Hyde Park Chapel, 64-68 Exhibition Road, London SW7 2PA", ll: "51.4956,-0.1745",
        notes: [
          "South Kensington tube.",
          "Sacrament meeting Sunday Oct 11, morning.",
          "Houses a visitors' center with exhibits on temples and the history of the Church in the British Isles - worth 30 minutes after the block."
        ]},
      { label: "London England Temple",
        address: "West Park Road, Newchapel, Lingfield, Surrey RH7 6HW",
        maps: "London England Temple, West Park Road, Newchapel, Lingfield, Surrey RH7 6HW", ll: "51.1608,-0.0497",
        notes: [
          "Train from London Victoria or London Bridge toward East Grinstead or Lingfield, roughly 50 minutes.",
          "Lingfield station is 2 miles from the temple with no bus service. Taxi or rideshare the last stretch, and arrange the return ride before you're dropped off - it's rural.",
          "Grounds are open to all during daylight hours. Formal gardens, a large pond, and an oak over 450 years old that President McKay had preserved when he chose the building site.",
          "Closed Sundays, so Oct 11 is a grounds visit only. Be there well before sunset at 6:10pm.",
          "For an actual session: Tuesday Oct 13 morning. Reservations available, walk-ins welcome, but without a reservation you may be asked to wait or participate in a different ordinance. Bring your own temple clothing; rental is available.",
          "Bring both recommends."
        ]}
    ]
  },

  /* --- appendix: Tuesday temple session variant ---------------------------- */
  variant: {
    title: "Tuesday Temple Session Variant",
    lede: "If you'd rather attend an actual session than just walk the grounds.",
    points: [
      "Move Sunday afternoon to something in London (Greenwich, British Museum).",
      "Tuesday Oct 13 morning: temple session at Newchapel. Reservations available, walk-ins welcome, but without a reservation you may be asked to wait or participate in a different ordinance. Bring your own temple clothing; rental is available.",
      "Fly to Iceland from Gatwick instead of Heathrow - the temple is a few miles west of it. Play and easyJet both serve LGW-KEF.",
      "Knock-on effect: you land in Iceland in the evening rather than midday, so Tuesday becomes drive-and-aurora only. Move the Reykjanes lava fields, Bridge Between Continents, and Gunnuhver to Friday afternoon, before checking in near Keflavík.",
      "Tradeoff: Friday gets tight - Reykjadalur, horses, and Reykjanes in one day, with the lava fields in fading light. Worth it if the session matters more than the volcano stop."
    ]
  }
};

if (typeof window !== "undefined") { window.TRIP = TRIP; }
