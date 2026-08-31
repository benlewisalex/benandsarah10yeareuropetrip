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
    start: "2026-10-09",              // Sarah's departure day
    end: "2026-10-17",                // last day (fly home)
    nights: 7,
    budgetCeiling: 5000,
    structure: "Sarah flies Fri Oct 9, lands Sat Oct 10. 3 nights London (Oct 10, 11, 12): temple session Saturday, church and the Thames walk Sunday, Stonehenge Monday. Then 4 nights Iceland (Oct 13, 14, 15, 16), ending with Blue Lagoon on the way to the airport. Home late Saturday Oct 17.",
    flightsNote: "Ben's MSN-LHR and KEF-MSN flights are covered by work. Everything costed here is out of pocket, including getting to and from O'Hare and covering the kids at home."
  },

  /* --- the must-do list, shown as a grid ----------------------------------- */
  mustDo: [
    { item: "Stonehenge",                 when: "Mon Oct 12" },
    { item: "Big Ben / London classics",  when: "Sun Oct 11 afternoon" },
    { item: "LDS temple",                 when: "Sat Oct 10 - session at Newchapel" },
    { item: "Aurora hunting",             when: "All four Iceland nights" },
    { item: "Stargazing",                 when: "Wed-Fri, rural south Iceland" },
    { item: "Icelandic horses",           when: "Fri Oct 16" },
    { item: "Volcano",                    when: "Tue Oct 13 lava fields + Thu Oct 15 Lava Show" },
    { item: "Geysers",                    when: "Wed Oct 14 (Strokkur)" },
    { item: "Blue Lagoon",                when: "Sat Oct 17 (booked morning slot)" },
    { item: "Tourist hot spring",         when: "Sat Oct 17 (Blue Lagoon) + Wed Oct 14 (Secret Lagoon)" },
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
    bluelagoon: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Blue%20lagoon%20iceland.jpg?width=1600",
      alt: "Milky pale-blue geothermal water at the Blue Lagoon, steaming between low walls of black lava rock.",
      credit: "Delahanty / Wikimedia Commons (CC BY 4.0)",
      grad: "radial-gradient(58% 34% at 46% 34%,rgba(255,255,255,.26),transparent 74%),linear-gradient(180deg,#9BAAB4 0%,#7A8C97 32%,#2E3A40 42%,#6FA8B8 56%,#A9D6DE 100%)"
    },
    bigben: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Big%20Ben%20from%20the%20Westminster%20Bridge.jpg?width=1600",
      alt: "The Elizabeth Tower and Big Ben clock face above the Houses of Parliament, seen from Westminster Bridge under grey cloud.",
      credit: "Ryan Schwark / Wikimedia Commons",
      grad: "radial-gradient(60% 40% at 70% 22%,rgba(255,255,255,.16),transparent 70%),linear-gradient(180deg,#93A3B1 0%,#788A99 44%,#3F4C58 46%,#212A32 100%)"
    },
    towerbridge: {
      src: "img/towerbridge.jpg",
      alt: "Tower Bridge over the Thames, seen from the Tower of London side.",
      credit: "Historywriter / Wikimedia Commons",
      grad: "linear-gradient(180deg,#8EA3B4 0%,#647D90 46%,#2F4758 48%,#162530 100%)"
    },
    stonehenge: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Stonehenge%20Misty%20Sunrise.jpg?width=1600",
      alt: "The standing stones and lintels of Stonehenge on open Salisbury Plain grassland.",
      credit: "James Preston / Wikimedia Commons",
      grad: "radial-gradient(70% 45% at 30% 26%,rgba(255,240,210,.20),transparent 72%),linear-gradient(180deg,#9AA394 0%,#7E8574 40%,#59614F 42%,#2C3226 100%)"
    },
    thingvellir: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/%C3%9Eingvellir%20National%20Park%2C%20Iceland.JPG?width=1600",
      alt: "The Almannagja rift at Thingvellir, a walled corridor of dark basalt where the tectonic plates pull apart.",
      credit: "Beata May / Wikimedia Commons",
      grad: "linear-gradient(90deg,rgba(0,0,0,.42) 0 16%,transparent 38%,transparent 62%,rgba(0,0,0,.42) 84% 100%),linear-gradient(180deg,#8FA07E 0%,#5C6B4A 45%,#33402F 70%,#171D14 100%)"
    },
    geysir: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Strokkur%20Geyser%20%283357373256%29.jpg?width=1600",
      alt: "Strokkur geyser throwing a column of boiling water and steam into the air above a pale geothermal field.",
      credit: "Thomas Quine / Wikimedia Commons",
      grad: "radial-gradient(26% 64% at 50% 58%,rgba(255,255,255,.60),transparent 72%),linear-gradient(180deg,#B9C8CE 0%,#93A6AE 46%,#6C838C 48%,#3B4C54 100%)"
    },
    gullfoss: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Gullfoss%20Waterfall%20%2824852505304%29.jpg?width=1600",
      alt: "The two tiers of Gullfoss waterfall dropping into a deep basalt canyon in glacial meltwater.",
      credit: "Wikimedia Commons",
      grad: "linear-gradient(180deg,#8FB0BA 0%,#6E93A0 34%,#4C7484 36%,#3E626E 62%,#22323A 64%,#16232A 100%)"
    },
    icetunnel: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Ice%20Tunnel.jpg?width=1600",
      alt: "A carved tunnel inside the Langjokull glacier, walls of layered blue ice lit from within.",
      credit: "Wikimedia Commons",
      grad: "radial-gradient(58% 78% at 50% 58%,rgba(220,245,255,.72),rgba(90,170,205,.35) 45%,transparent 74%),linear-gradient(180deg,#2E6C89 0%,#1B4661 55%,#0E2C3E 100%)"
    },
    reynisfjara: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Black%20Sand%20Beach%20Iceland%2C%20Reynisfjara%20Beach.jpg?width=1600",
      alt: "Reynisfjara black sand beach with the Reynisdrangar sea stacks offshore and white surf running up the dark sand.",
      credit: "miketnorton / Wikimedia Commons",
      grad: "linear-gradient(180deg,#9AA2AA 0%,#767F87 33%,#E6EAEC 36%,#CFD6DA 39%,#33393E 42%,#14171A 100%)"
    },
    horses: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Icelandic%20Horse%20Face.jpg?width=1600",
      alt: "Close-up of an Icelandic horse with a thick mane.",
      credit: "Carl Young / Wikimedia Commons",
      pos: "center 45%",
      grad: "radial-gradient(70% 40% at 25% 20%,rgba(255,235,200,.24),transparent 70%),linear-gradient(180deg,#A9B4BC 0%,#8D8064 38%,#6B5334 40%,#33291A 100%)"
    },
    aurora: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Aurora%20Iceland.jpg?width=1600",
      alt: "Green aurora curtains rippling over a dark south Iceland landscape under stars.",
      credit: "Sean O Riordan / Wikimedia Commons",
      grad: "radial-gradient(120% 55% at 25% 30%,rgba(63,227,155,.50),transparent 62%),radial-gradient(80% 45% at 78% 16%,rgba(90,200,220,.30),transparent 60%),linear-gradient(180deg,#061A22 0%,#04121A 60%,#020A0E 100%)"
    },
    reykjadalur: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Hot%20spring%2C%20Reykjadalur%20Valley%2C%20Iceland%2C%2020230502%201411%204232.jpg?width=1600",
      alt: "Steam rising off the hot river in the Reykjadalur valley, with mossy green slopes on either side.",
      credit: "Jakub Halun / Wikimedia Commons",
      grad: "radial-gradient(45% 42% at 55% 52%,rgba(240,250,245,.44),transparent 70%),linear-gradient(180deg,#A8B899 0%,#7C8F6C 40%,#4A5C45 62%,#1E2A1F 100%)"
    },
    lava: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Aerial%20view%20of%20the%20recent%20Fagradalsfjall%20lava%20fields.jpg?width=1600",
      alt: "Fresh black lava fields across the Reykjanes Peninsula.",
      credit: "Gaggi96 / Wikimedia Commons",
      grad: "radial-gradient(48% 35% at 70% 18%,rgba(232,113,54,.34),transparent 64%),linear-gradient(180deg,#5F6462 0%,#3D403D 43%,#1E201E 45%,#080A09 100%)"
    },
    seljalandsfoss: {
      src: "img/seljalandsfoss.jpg",
      alt: "Seljalandsfoss dropping from a green cliff into mist.",
      credit: "Chmee2 / Wikimedia Commons",
      grad: "linear-gradient(180deg,#9DB0A0 0%,#667B63 42%,#DCE8E8 45%,#8CA2A0 58%,#26322C 100%)"
    },
    skogafoss: {
      src: "img/skogafoss.jpg",
      alt: "Skogafoss waterfall falling in a wide white sheet against dark green cliffs.",
      credit: "Luis Ascenso / Wikimedia Commons",
      ratio: "4 / 5",            /* the file is portrait; 16/9 cropped the falls away */
      grad: "linear-gradient(180deg,#82918A 0%,#52665A 40%,#E5EEEE 42%,#9AB0AE 55%,#1F2C28 100%)"
    }
  },

  /* --- the nine days ------------------------------------------------------- */
  /* half:    "london" | "iceland"  -> drives the card's basalt spine colour
     sun:     exactly as given in ITINERARY.md; null where not listed
     travel:  how you get there and how long, measured FROM THE PREVIOUS STOP
     dur:     how long you are actually there
     why:     what makes the place worth the time. Renders above the logistics.
     detail:  the logistics. What to do, book, pay, avoid.
     hazards: life-safety only. Renders hatched red. Do not dilute this.
     headsUp: logistics warning on a single item. Renders amber.               */
  days: [

    { id: "oct09", date: "2026-10-09", dow: "Friday", half: "london",
      title: "Sarah flies, Ben gets into position",
      sun: null,
      images: [],
      intro: [
        "Nothing happens together today. Sarah crosses the Atlantic overnight and Ben is already somewhere around London.",
        "The only job tonight is making sure tomorrow is not improvised - and tomorrow is now the temple day, so it has a booked session and a booked car in it."
      ],
      items: [
        { time: "11:00am", name: "Sarah leaves Madison for O'Hare",
          travel: "Drive, Madison to ORD, about 2.5 hrs",
          dur: "Budget 3.5 hrs door to gate",
          detail: "The 2.5 hours of driving is the predictable part. Parking, the shuttle from the lot to the terminal, and the bag drop are what actually eat the buffer, so aim to be at the terminal by 2:25pm for a 4:25pm departure." },
        { time: "4:25pm", name: "UA929, O'Hare to Heathrow",
          travel: "Nonstop, Boeing 767-300",
          dur: "8h 20m in the air, lands 6:45am Saturday",
          detail: "First checked bag is included; a second is $120. Sleep on this flight is worth more than the movie - tomorrow is a temple session on landing day, and how well she sleeps here is most of whether that goes well.",
          headsUp: "Pack the temple clothing and both recommends where they are reachable, not at the bottom of a checked bag. You go more or less straight from the airport to Newchapel." },
        { time: "Evening", name: "Ben: sort tonight's bed and tomorrow's pickup",
          dur: "20 minutes of planning, tonight not at 5am",
          detail: "Work out where you are sleeping, and confirm the car to Newchapel is booked for about 8:00am from Heathrow Terminal 2. Be at arrivals by 7:15am.",
          headsUp: "Friday night into Saturday is one of the nights the Piccadilly Night Tube runs, which makes an early Heathrow run much easier than it would be midweek. Confirm current times rather than assuming." }
      ],
      notes: [
        { label: "Home front", text: "Mom should already be at the house with the kids settled before Sarah leaves, not arriving the same afternoon." }
      ]
    },

    { id: "oct10", date: "2026-10-10", dow: "Saturday", half: "london",
      title: "Sarah lands, temple session at Newchapel",
      sun: { sunrise: "7:20am", sunset: "6:15pm" },
      images: [],
      intro: [
        "Straight from Heathrow to the temple. It is an ambitious first day and it is also the only day it can happen - the temple is closed Sunday and Monday, and Tuesday is the 7:50am flight to Iceland. Saturday or not at all.",
        "The upside is large: doing the session today leaves Sunday and Monday untouched and keeps the whole Iceland half exactly as booked."
      ],
      items: [
        { time: "6:45am", name: "Meet Sarah at Heathrow arrivals",
          travel: "Piccadilly line or Night Tube to LHR T2",
          dur: "Be at arrivals by 7:15am",
          detail: "United uses Terminal 2. Allow 45-60 minutes for immigration and bags before she appears. Confirm the terminal on the day.",
          maps: "Heathrow Terminal 2 arrivals, London", ll: "51.4700,-0.4520" },
        { time: "8:00am", name: "Car from Heathrow to Newchapel",
          travel: "Pre-booked car or rideshare, about 40 miles clockwise on the M25",
          dur: "About 1 hr",
          why: "Worth the money rather than the principle. Going by rail means Heathrow into central London, across to Victoria, out to Lingfield, then a taxi anyway - about two and a half hours with luggage and three changes, on no sleep. The car is one hour, door to door, with the suitcases in the boot.",
          detail: "Book it the night before rather than opening an app at 7:30am at Heathrow. Roughly $90-110 for the two of you plus bags, which is the single best-value line item on the London side of this trip.",
          maps: "London England Temple, West Park Road, Newchapel, Lingfield, Surrey RH7 6HW", ll: "51.1608,-0.0497" },
        { time: "Late morning", name: "Temple session, London England Temple",
          travel: "You are here",
          dur: "About 2 hrs including changing, plus time on the grounds",
          why: "Dedicated in 1958, this was the first temple in the British Isles and only the second in Europe. The grounds are worth the extra half hour on their own: formal gardens, a large pond, and an oak on site that is over 450 years old, which President McKay had preserved when he chose the building site. It is deep Surrey countryside, twenty minutes and a world away from Heathrow.",
          detail: "West Park Road, Newchapel, Lingfield, Surrey RH7 6HW. Reservations are available and walk-ins are welcome, but without a reservation you may be asked to wait or to participate in a different ordinance - so reserve. Bring your own temple clothing; rental is available on site. Both recommends need to be current.",
          maps: "London England Temple, West Park Road, Newchapel, Lingfield, Surrey RH7 6HW", ll: "51.1608,-0.0497",
          headsUp: "Book a late-morning or early-afternoon session, not the first one of the day. She will have had maybe four hours of bad airline sleep, and an hour of daylight and something to eat first is the difference between being present and being unconscious.",
          links: [{ label: "Temple schedule and reservations", url: "https://www.churchofjesuschrist.org/temples/details/london-england-temple" }],
          sub: [
            "Ask at the desk about somewhere to leave the suitcases during the session. There is patron accommodation on site and dressing-room lockers; confirm rather than assume.",
            "Confirm the October session times on the temple page before you book the car - the schedule shifts and a Saturday can fill up."
          ] },
        { time: "2:30pm", name: "Train back into London",
          travel: "Taxi to Lingfield (2 miles) or East Grinstead (4 miles), then train to Victoria or London Bridge",
          dur: "About 1hr 15min all in",
          detail: "Arrange the taxi to the station before you are dropped off in the morning. It is rural and you will not flag one down.",
          maps: "Lingfield railway station, Surrey", ll: "51.1889,-0.0139" },
        { time: "4:00pm", name: "Check into the London lodging",
          travel: "Tube from Victoria or London Bridge",
          dur: "Three nights",
          why: "This is the point of the day where doing nothing is the correct move. She has been awake for something like 24 hours and has crossed six time zones.",
          detail: "If she needs to lie down, let it be a hard 45 minutes with an alarm, not an open-ended nap. Then get back outside - daylight is the only thing that actually fixes jet lag, and sunset is 6:15pm.",
          area: true },
        { time: "Evening", name: "Dinner: Dishoom",
          travel: "Tube, 15-20 min from most central lodging",
          dur: "1.5 hrs",
          why: "Bombay-Irani cafe food in a room done up like a 1940s Bombay tearoom. It is the most reliably good and reliably reasonable dinner in London, and after a day like this one, being fed well in a warm dark room is the whole objective.",
          detail: "Book ahead - it is a Saturday night and the walk-in wait can be over an hour. Black daal and the chai. There are several branches; Covent Garden and Shoreditch are the usual picks.",
          maps: "Dishoom Covent Garden, London", ll: "51.5122,-0.1242" }
      ],
      notes: [
        { label: "This is the one shot", text: "Temples are closed Sunday and Monday, and Tuesday morning is the flight to Keflavík. If Saturday does not happen, there is no session on this trip - so build the day around it rather than fitting it in." },
        { label: "What this saved you", text: "The old plan had the session on Tuesday morning, which meant flying to Iceland out of Gatwick instead of Heathrow, landing in the evening, and pushing all of Reykjanes onto an already-full Friday. BA800 out of Heathrow T5 is booked. Doing the session today costs Iceland nothing." }
      ]
    },

    { id: "oct11", date: "2026-10-11", dow: "Sunday", half: "london",
      title: "Church, then London on foot",
      sun: { sunrise: null, sunset: "6:10pm" },
      images: ["bigben"],
      intro: [
        "Church in South Kensington, then the classic Thames walk in the afternoon. Sunset is 6:10pm, so you have roughly five hours of daylight after the block - enough for the river, not enough for the river plus museums.",
        "Everything in the afternoon is free, outdoors, and one continuous line along the Thames, so you can stop wherever you run out."
      ],
      items: [
        { time: "Morning", name: "Sacrament meeting at the Hyde Park Chapel",
          travel: "South Kensington tube, then a 3-min walk up Exhibition Road",
          dur: "The block, plus 30 min in the visitors' centre",
          why: "The building has been the Church's central London home since 1961 and it is hard to miss - a tall thin spire on a street of Victorian museums. It also houses a visitors' centre with exhibits on temples and on the history of the Church in the British Isles, which is worth the half hour after the block.",
          detail: "64-68 Exhibition Road, South Kensington. Confirm the meeting time on the ward or stake page before Sunday rather than assuming a standard schedule.",
          maps: "Hyde Park Chapel, 64-68 Exhibition Road, London SW7 2PA", ll: "51.4956,-0.1745" },
        { time: "12:45pm", name: "Westminster and Big Ben",
          travel: "District or Circle line, South Kensington to Westminster, 12 min",
          dur: "45 min including the bridge crossing",
          why: "Big Ben is the bell, not the tower - 13.7 tonnes of it, hung in what has been called the Elizabeth Tower since the Diamond Jubilee in 2012. Each of the four clock faces is about 7 metres across. Walk out onto Westminster Bridge and you get the view that every establishing shot of London has used for a century, with Parliament's whole river frontage in one frame.",
          detail: "Free, outdoors, open whenever you are. Cross to the south bank for the photograph - from the Parliament side you are too close to fit the tower in.",
          maps: "Big Ben, Westminster, London", ll: "51.5007,-0.1246", image: "bigben" },
        { time: "1:30pm", name: "Thames South Bank walk",
          travel: "On foot east from Westminster Bridge",
          dur: "45-55 min at a genuine stroll, about 2.5 miles",
          why: "The best free thing in London, and Sunday afternoon is when it is at its liveliest. A continuous riverside promenade with the whole city on the opposite bank: the London Eye, then Southbank Centre, then the reconstructed Globe, then the Tate Modern in a converted power station. Buskers, and secondhand book stalls under Waterloo Bridge.",
          detail: "Flat, paved, and impossible to get lost on - the river stays on your left the whole way. Duck into whatever looks interesting; the walk is the point, not the checklist.",
          maps: "South Bank, London", ll: "51.5033,-0.1196" },
        { time: "3:00pm", name: "Tower Bridge and the Tower of London",
          travel: "Continue on foot along the South Bank",
          dur: "30-40 min from outside",
          why: "Tower Bridge opened in 1894 and the bascules still lift for tall ships several hundred times a year, taking about five minutes to swing fully open. Across the water the White Tower has been standing since 1078, when William the Conqueror put it there specifically to intimidate the city it sits in. Both are free to look at, and the river is the better angle on both.",
          detail: "The high-level glass-floor walkway and the Tower itself are separate paid tickets. The Tower alone wants three hours, which you do not have today - if you want to go inside, that is the trade against the rest of the walk.",
          maps: "Tower Bridge, London", ll: "51.5055,-0.0754", image: "towerbridge" },
        { time: "4:15pm", name: "Trafalgar Square and Buckingham Palace",
          travel: "District or Circle line, Tower Hill to Embankment, 12 min",
          dur: "About an hour, if the light and the legs hold",
          why: "Nelson on a 52-metre column with the National Gallery behind him - and the Gallery is free to walk into, which makes it the best possible fallback if it starts raining. From there The Mall runs in a straight line to the palace.",
          detail: "Genuinely optional and the first thing to drop. Sunset is 6:10pm and after that this is two buildings in the dark.",
          maps: "Trafalgar Square, London", ll: "51.5080,-0.1281", alt: true },
        { time: "Evening", name: "Dinner: Padella, Borough",
          travel: "Northern or Jubilee line to London Bridge, 5-min walk",
          dur: "About an hour, including the queue",
          why: "Hand-rolled pasta at a counter for the price of a sandwich. The eight-hour beef shin ragu and the pici cacio e pepe are the two everyone comes back for, and it is comfortably the best cheap meal in the city.",
          detail: "No reservations - go at 5pm or join the queue. If you finish the walk at Tower Bridge, this is a ten-minute stroll west, which is why it is tonight and not another night.",
          maps: "Padella, Borough Market, London", ll: "51.5054,-0.0905" }
      ],
      notes: [
        { label: "Order matters today", text: "Church first, then the river, because the river works in fading light and church does not move. If the block runs long, drop Trafalgar rather than compressing the South Bank walk - the walk is the good part." }
      ]
    },

    { id: "oct12", date: "2026-10-12", dow: "Monday", half: "london",
      title: "Stonehenge, and the last London night",
      sun: null,
      images: ["stonehenge"],
      intro: [
        "A day trip built out of a train and a bus, which comes to roughly half the price of a coach tour and puts you on your own schedule.",
        "Take an early train. Round trip is about 7 hours door to door, and going early is what leaves the evening free for a West End show if you want one."
      ],
      items: [
        { time: "7:30am", name: "Train, London Waterloo to Salisbury",
          travel: "South Western Railway from Waterloo",
          dur: "About 90 min each way",
          detail: "Book advance tickets the moment the date is fixed; the walk-up fare is several times higher and this is the easiest place on the whole trip to waste money. Two singles are sometimes cheaper than a return, so price both.",
          maps: "Salisbury railway station, Salisbury", ll: "51.0698,-1.8060" },
        { time: "9:30am", name: "The Stonehenge Tour bus, and the stones",
          travel: "Tour bus from outside Salisbury station, about 30 min",
          dur: "1.5-2 hrs on site",
          why: "The scale only lands in person. The big sarsens weigh around 25 tonnes each and came about 20 miles from the Marlborough Downs; the smaller bluestones came from the Preseli Hills in Wales, roughly 140 miles away; and a 2024 study traced the Altar Stone all the way to northeast Scotland, something like 750 km. People moved them by hand around 2500 BC and aligned the whole ring on the midsummer sunrise. Mid-October means low light, thin crowds, and a real chance of the mist that makes it look like the postcard.",
          detail: "The bus fare bundles site admission, which is what makes this route cheaper than doing the two separately. Buses run on a loop - check the return times when you board, not at the end.",
          maps: "Stonehenge, Amesbury, Salisbury", ll: "51.1789,-1.8262", image: "stonehenge" },
        { time: "12:30pm", name: "Optional: Salisbury Cathedral",
          travel: "10-min walk from Salisbury station",
          dur: "45 min",
          why: "Britain's tallest spire at 123 metres, and one of only four surviving original copies of the 1215 Magna Carta, kept in the Chapter House. If the bus drops you back with an hour spare, this is the best possible use of it.",
          detail: "A donation is requested rather than a fixed admission. Check the closing time; it is earlier in October than in summer.",
          maps: "Salisbury Cathedral, Salisbury", ll: "51.0647,-1.7975", alt: true },
        { time: "3:30pm", name: "Back in London",
          travel: "Return train to Waterloo, about 90 min",
          dur: "Evening free" },
        { time: "7:30pm", name: "Optional: a West End show",
          travel: "10-min walk over Waterloo Bridge, or one tube stop to Covent Garden",
          dur: "About 2.5 hrs with the interval, out by 10:15pm",
          why: "London's theatre is the one thing here that genuinely beats New York, and it is cheaper - the West End runs about forty theatres inside a half-mile of Leicester Square, most of them Victorian, and a good seat costs a fraction of a Broadway equivalent. Les Misérables has been running since 1985 in the city it is set nowhere near; The Mousetrap has been running since 1952 and holds the record for the longest-running play anywhere.",
          detail: "Monday is a normal performance night for most shows; Sunday is dark almost everywhere, which is why this is tonight or not at all. Roughly $150-220 for two decent seats booked ahead, less at the TKTS booth in Leicester Square on the day or through a show's day-seat lottery.",
          links: [
            { label: "Official London Theatre", url: "https://officiallondontheatre.com/" },
            { label: "TKTS Leicester Square", url: "https://officiallondontheatre.com/tkts/" }
          ],
          headsUp: "The real cost is sleep. Curtain down at 10:15pm and a booked car at 4:45am is about five hours in bed before a flight and a full first day in Iceland. Worth it if you want it - just decide with that in front of you rather than behind you.",
          alt: true },
        { time: "Before bed", name: "Pack, and confirm the 4:45am car",
          dur: "30 min",
          detail: "Tomorrow's flight leaves Heathrow Terminal 5 at 7:50am and you want to be at T5 by about 5:50am. Oct 13 is a Tuesday, so there is no Night Tube - the car is not optional, and it needs to be booked, not summoned." }
      ],
      notes: [
        { label: "Optional upgrade", text: "English Heritage's Stone Circle Experience puts you inside the ring outside normal hours, which is a completely different experience from the roped path. Check October availability directly with English Heritage - some operators indicate special access is not offered in October or November, so treat this as a bonus rather than a plan. About $150 for the two of you." },
        { label: "You cannot have both", text: "The Stone Circle Experience and a West End show are each about $150-200, and the budget is already past its target. Pick one." }
      ]
    },

    { id: "oct13", date: "2026-10-13", dow: "Tuesday", half: "iceland",
      title: "Fly + volcano country",
      sun: { sunrise: "8:12am", sunset: "6:05pm" },
      images: ["lava"],
      intro: [
        "You land at 9:55am, which is the best thing about the booked flights - it buys most of a day on the Reykjanes peninsula instead of a scramble to Reykjavík.",
        "Everything today is on the same peninsula as the airport, so the driving is short and the order is flexible. Every night in Iceland is an aurora night, and the aurora panel is the most important page in this app."
      ],
      items: [
        { time: "7:50am", name: "BA800, Heathrow T5 to Keflavík",
          travel: "Booked car to Heathrow T5, 4:45-5:15am",
          dur: "3h 5m, lands 9:55am local",
          detail: "Iceland is an hour behind London, so the clock works in your favour. One checked bag each, 23kg.",
          headsUp: "Be at Terminal 5 by about 5:50am. No Night Tube on a Tuesday, so this is a booked-car morning, not a hopeful-first-train morning." },
        { time: "10:30am", name: "Pick up the rental car at KEF",
          travel: "Rental desks are in the terminal",
          dur: "30-45 min including the walk to the lot",
          why: "This car is the whole reason the aurora plan works. Iceland's weather changes completely over 50 miles, and having your own keys means a clouded-out night becomes an hour's drive instead of a write-off.",
          detail: "A 2WD handles this entire route in mid-October and saves real money over a 4x4 you will not need. Take the gravel and sand/ash damage waiver - that is a genuine Iceland risk, not an upsell.",
          maps: "Keflavik International Airport, Iceland", ll: "63.9850,-22.6056" },
        { time: "11:30am", name: "Sundhnúkur / Fagradalsfjall lava fields",
          travel: "30-min drive from KEF, Route 43 then 427",
          dur: "2-4 hrs round trip on foot, depending which trail is open",
          why: "This is the newest ground on earth. Marked trails cross lava from the 2021-2025 eruptions, and some of it still radiates heat you can feel through your boots - a black, glassy, buckled landscape that did not exist when you started planning this trip. It is also the only volcano stop on the itinerary you can actually walk on.",
          detail: "Free. Rough, ankle-turning ground: boots with grip, not trainers. There is no shelter of any kind out there, so the wind decides how long you last.",
          maps: "Fagradalsfjall, Reykjanes, Iceland", ll: "63.8958,-22.2725",
          image: "lava",
          headsUp: "Check safetravel.is and almannavarnir.is before driving out - exclusion zones move, and the trailhead that was open last week may not be.",
          links: [
            { label: "safetravel.is", url: "https://safetravel.is/" },
            { label: "almannavarnir.is", url: "https://www.almannavarnir.is/" }
          ] },
        { time: "3:00pm", name: "Bridge Between Continents",
          travel: "25-min drive northwest on Route 425",
          dur: "10 min, genuinely",
          why: "A small footbridge over the Álfagjá rift, a visible seam between the North American and Eurasian plates. It is a photo and a shrug, but it is free and directly on the road you are already driving, and it sets up Þingvellir tomorrow where the same rift is a canyon you walk through.",
          detail: "Small gravel car park right beside it. No facilities.",
          maps: "Bridge Between Continents, Reykjanes, Iceland", ll: "63.8686,-22.6752" },
        { time: "3:30pm", name: "Gunnuhver",
          travel: "10-min drive south on Route 425",
          dur: "20-30 min",
          why: "Iceland's largest mud pool, and violently unimpressed by your presence - boiling grey mud and steam vents roaring hard enough that you raise your voice over them. The vents have destroyed the boardwalks here more than once and they have simply been rebuilt further back. Named for Guðrún, a ghost the story says was lured into the spring to stop her haunting the district.",
          detail: "Free, boardwalked, ten minutes from the car. Stay on the boardwalk - the crust around these vents is thin and the water is well above boiling.",
          maps: "Gunnuhver, Reykjanes, Iceland", ll: "63.8189,-22.6836" },
        { time: "5:00pm", name: "Check into Reykjavík",
          travel: "55-min drive, about 60 km on Route 41",
          dur: "One night",
          detail: "Dinner: Messinn for fish, or Bæjarins Beztu for the hot dog that every visiting head of state gets photographed with. Both are walkable from downtown lodging.",
          maps: "Reykjavik, Iceland", ll: "64.1466,-21.9426", area: true }
      ],
      hazards: [
        { title: "Volcanic gas is what actually kills people here",
          text: "Never approach a fresh flow from downwind. Volcanic gas concentrations near vents are lethal, and that is how people actually die at these sites." },
        { title: "Hold car doors with both hands",
          text: "Wind rips them off the hinges every year and rental insurance does not cover it. This starts the moment you pick up the car at KEF." }
      ],
      aurora: { night: 1, spot: "Grótta lighthouse, Seltjarnarnes",
        text: "Fifteen minutes from downtown, free parking, dark enough to work. The lighthouse sits on a tidal island - check the tide before you walk out to it, because the causeway floods and people do get cut off.",
        maps: "Grotta lighthouse, Seltjarnarnes, Iceland", ll: "64.1655,-22.0208" },
      notes: [
        { label: "You will drive past Blue Lagoon today", text: "Resist it. It is fifteen minutes off this route, but Saturday morning is a booked slot with five empty hours around it, and today ends with aurora night 1. Doing it now would cost you the thing that makes Saturday worth having." }
      ]
    },

    { id: "oct14", date: "2026-10-14", dow: "Wednesday", half: "iceland",
      title: "Golden Circle + inside the glacier",
      sun: { sunrise: "8:15am", sunset: "6:01pm" },
      images: ["icetunnel", "thingvellir", "geysir", "gullfoss"],
      intro: [
        "The biggest day of the trip and the one with the least slack in it. Roll at 8:30 and the timings hold; leave at 9:30 and you are eating dinner at 10pm.",
        "About 190 miles of driving in total, all on good paved road, ending at a guesthouse in the rural south where aurora night 2 is statistically your best shot of the week."
      ],
      items: [
        { time: "9:00", name: "Þingvellir National Park",
          travel: "45-min drive from Reykjavík, about 49 km on Route 36",
          dur: "1-1.5 hrs",
          why: "Two things at once. Geologically, you walk down the Almannagjá - a canyon where the North American and Eurasian plates are pulling apart about 2cm a year, the same rift you stood on a footbridge over yesterday. Historically, this is where the Alþingi first met in 930 AD, making it the oldest parliament site still in existence anywhere. Icelanders came here for two weeks every summer for eight centuries to settle law and feuds.",
          detail: "Parking fee applies, paid at the machine or online rather than to a person. The main walk is the rift path from the upper car park down to the church - flat, gravelled, about 40 minutes.",
          maps: "Thingvellir National Park, Iceland", ll: "64.2558,-21.1297", image: "thingvellir" },
        { time: "10:45", name: "Geysir",
          travel: "55-min drive, about 60 km on Routes 365 and 37",
          dur: "45 min",
          why: "Every geyser in every language is named after this one - from the Icelandic verb geysa, to gush. The original Geysir is mostly dormant now, but Strokkur next door erupts every 5 to 10 minutes without fail, throwing water 20 metres or more. You get several goes at photographing it, which is rare for anything in Iceland.",
          detail: "Free. Watch the pool dome up and drop back a couple of times before it fires - that is the tell. Stand upwind unless you want to find out how hot the spray still is.",
          maps: "Geysir, Haukadalur, Iceland", ll: "64.3104,-20.3024", image: "geysir" },
        { time: "11:45", name: "Gullfoss",
          travel: "10-min drive, about 10 km",
          dur: "30-40 min",
          why: "The Hvítá drops 32 metres in two stages and vanishes into a canyon two and a half kilometres long, so from the upper viewpoint the river looks like it is falling into a crack in the ground. It was nearly dammed for hydro power a century ago, and the story goes that Sigríður Tómasdóttir, whose family owned the land, walked barefoot to Reykjavík to fight it and threatened to throw herself into the falls. There is a plaque to her on the path.",
          detail: "Free, large car park, and the only real cafe on this stretch. Quick stop - you are coming straight back here, because the glacier truck leaves from this car park.",
          maps: "Gullfoss, Iceland", ll: "64.3271,-20.1199", image: "gullfoss" },
        { time: "13:00", name: "Into the Glacier, departing Gullfoss",
          travel: "You are already here - the Sleipnir truck leaves from the Gullfoss car park",
          dur: "About 3.5 hrs including the drive up and back",
          why: "A man-made tunnel bored 30 metres down into Langjökull, Iceland's second-largest glacier, open since 2015. You ride up in Sleipnir, a converted missile carrier on tyres taller than you are, then walk about 1,600 feet through blue ice with the layers of a thousand winters stacked visibly in the walls, including a small ice chapel people genuinely get married in. There is nothing else like it on this itinerary and not much like it anywhere.",
          detail: "Thermal suits, helmets and crampons are provided; wear your own warm layers underneath and waterproof boots. Book direct and take the Gullfoss departure - the Reykjavík pickup version costs far more for the same tunnel.",
          maps: "Gullfoss departure point, Iceland", ll: "64.3271,-20.1199", image: "icetunnel" },
        { time: "17:15", name: "Secret Lagoon, Flúðir",
          travel: "45-min drive from Gullfoss, about 45 km on Route 30",
          dur: "1-1.5 hrs",
          why: "Gamla Laugin, built in 1891, is the oldest swimming pool in Iceland - locals were taught to swim here until 1909, and then it sat more or less abandoned for most of a century. The water sits around 38-40C, it is ringed by a raw geothermal field rather than architecture, and a small geyser erupts alongside every few minutes while you are in it. Older, smaller and far more low-key than Blue Lagoon, which is now booked for Saturday, so this earns its place on character rather than as a substitute.",
          detail: "Cheap by Icelandic lagoon standards. Towel rental is extra, so bring your own. This is the first line to cut if the budget gets tight - and cutting it gets you to the guesthouse with more left in the tank for aurora night 2.",
          maps: "Secret Lagoon, Fludir, Iceland", ll: "64.1372,-20.3106" },
        { time: "19:00", name: "Drive to the guesthouse near Hella or Hvolsvöllur",
          travel: "1-hr drive, about 70 km",
          dur: "Two nights here",
          detail: "Your base for the south coast. Rural, dark, and well positioned - everything on Thursday is within 40 minutes of it, and the sky above it is the reason you booked out here instead of commuting from Reykjavík.",
          maps: "Hvolsvollur, Iceland", ll: "63.7494,-20.2225", area: true }
      ],
      aurora: { night: 2, spot: "Wherever you are - rural south Iceland",
        text: "Rural and dark, with no town glow in any direction. Statistically your best shot of the trip, and you do not have to drive anywhere for it.",
        maps: "Hvolsvollur, Iceland", ll: "63.7494,-20.2225", area: true }
    },

    { id: "oct15", date: "2026-10-15", dow: "Thursday", half: "iceland",
      title: "South Coast + molten lava",
      sun: { sunrise: "8:18am", sunset: "5:58pm" },
      images: ["reynisfjara"],
      intro: [
        "The easiest driving day in Iceland. Everything is strung along Route 1 in a line east from the guesthouse, and the furthest point is only about 70 minutes out.",
        "Under 3 hours of driving all day, so this is the day with room to linger. It also has the one genuinely dangerous stop on the itinerary - read the hazard before Reynisfjara, not after."
      ],
      items: [
        { time: "9:30", name: "Seljalandsfoss",
          travel: "20-min drive from the guesthouse, about 28 km east on Route 1",
          dur: "45 min, more if you find Gljúfrabúi",
          why: "Sixty metres of Eyjafjallajökull meltwater falling clear of the cliff, with a path that goes right around the back of it. Standing behind a waterfall looking out through it is a genuinely strange thing to do and there are not many places you can. Ten minutes' walk north there is a second one, Gljúfrabúi, hidden inside a slot in the rock that most tour buses drive straight past - wade the shallow stream in and it opens into a mossy chamber with a shaft of daylight coming down.",
          detail: "Paid car park. The path behind the falls is wet rock and slippery in a way that catches people out every day.",
          maps: "Seljalandsfoss, Iceland", ll: "63.6156,-19.9886", image: "seljalandsfoss",
          headsUp: "You will get drenched - not damp, drenched. Rain shells mandatory, and keep the phone in a pocket until you are ready to shoot." },
        { time: "10:45", name: "Skógafoss",
          travel: "20-min drive, about 25 km further east on Route 1",
          dur: "45 min-1 hr",
          why: "Sixty metres high and twenty-five wide, dropping onto a flat black plain you can walk right out onto until the spray drives you back. On a bright day it throws a double rainbow across the base. There are 527 steps up the side to a viewing platform, and the same staircase is the start of the Fimmvörðuháls trail over the pass where the 2010 eruption happened. Local legend puts a Viking treasure chest behind the water.",
          detail: "Free, large car park. Walking to the base is the better photograph; climbing the steps is the better view of the coastline. You have time for both today.",
          maps: "Skogafoss, Iceland", ll: "63.5321,-19.5114", image: "skogafoss" },
        { time: "12:30", name: "Dyrhólaey",
          travel: "25-min drive, about 30 km, then a short climb on a side road",
          dur: "45 min",
          why: "A 120-metre promontory with a rock arch punched through it big enough that boats have sailed through, and from the top you see the entire black coastline running away in both directions with the Reynisdrangar stacks offshore. The puffins that nest here are long gone by October, which also means the summer access restrictions are gone.",
          detail: "The access road is steep and narrow but paved. Free. It is exposed at the top and the wind up there is strong enough to move you.",
          maps: "Dyrholaey, Vik, Iceland", ll: "63.4020,-19.1290" },
        { time: "14:00", name: "Reynisfjara black sand beach",
          travel: "20-min drive around the headland to the Vík side",
          dur: "45 min-1 hr",
          why: "Black volcanic sand, a cliff of hexagonal basalt columns stacked like organ pipes, a cave you can stand inside, and the Reynisdrangar sea stacks offshore - which the legend says are trolls caught out by the sunrise while dragging a ship ashore. It looks like nowhere else, and it is the image most people have in their head when they say Iceland.",
          detail: "Free car park with a cafe. Go for the columns and the cave at the western end; the open beach is the dangerous part.",
          maps: "Reynisfjara beach, Vik, Iceland", ll: "63.4033,-19.0447", image: "reynisfjara",
          links: [{ label: "safetravel.is conditions", url: "https://safetravel.is/" }] },
        { time: "Evening", name: "Lava Show, Vík",
          travel: "10-min drive into Vík",
          dur: "About 1 hr",
          why: "The only show of its kind anywhere. They melt real basalt, quarried from the 1918 Katla eruption, to 1,100C and pour it - glowing orange and moving like honey - into a channel a few metres in front of the seating. You feel the heat come off it on your face, and the smell is the part nobody warns you about. With no eruption running this is the closest you will get to molten rock, and it stands on its own merits either way.",
          detail: "Book ahead; the room is small and October sessions still sell out. Sessions run through the evening, so pick one that gets you back to the guesthouse before full dark for aurora night 3.",
          maps: "Lava Show, Vik, Iceland", ll: "63.4186,-19.0060" },
        { name: "Back to the guesthouse",
          travel: "1-hr drive west, about 75 km on Route 1",
          dur: "Second of two nights" }
      ],
      hazards: [
        { title: "Reynisfjara sneaker waves. Safety, not boilerplate.",
          text: "Reynisfjara kills tourists every few years. Sneaker waves arrive with no warning and drag people out - the beach shelves steeply and the undertow is unsurvivable. Stay well up the beach, never turn your back on the water, and do not walk to the waterline for a photo." }
      ],
      aurora: { night: 3, spot: "South coast, back at the guesthouse",
        text: "Same dark skies as night 2. Even if the aurora does nothing, this is the Milky Way with no effort and no driving.",
        maps: "Hvolsvollur, Iceland", ll: "63.7494,-20.2225", area: true }
    },

    { id: "oct16", date: "2026-10-16", dow: "Friday", half: "iceland",
      title: "Hot river + horses",
      sun: { sunrise: "8:21am", sunset: "5:54pm" },
      images: ["reykjadalur", "horses"],
      intro: [
        "Two things today, both the kind you will still be talking about in a year, and then a long westward drive to set up Saturday morning.",
        "Check out of the south coast guesthouse first thing - you do not come back this way."
      ],
      items: [
        { time: "9:00", name: "Reykjadalur, Hveragerði",
          travel: "50-min drive from the guesthouse, about 65 km west on Route 1",
          dur: "3-4 hrs total: 45-60 min up, 1-1.5 hrs in the water, 40 min down",
          why: "Reykjadalur means Steam Valley and it earns the name - you hike about 2 miles uphill through a green valley with steam venting out of the hillsides around you, and at the top there is a river you sit down in. Hot springs feed it from above and cold water joins from below, so it gets hotter the further upstream you go and you pick your own temperature. Boardwalks, changing screens, and nothing else. This is your non-tourist hot spring, it is completely free, and it is the most Icelandic thing on this itinerary.",
          detail: "Park at the trailhead in Hveragerði. The trail is uphill, muddy, and unshielded from the wind - waterproof boots, not trainers. Bring your own towel; there is nowhere to rent one and you will walk back down wet if you forget.",
          maps: "Reykjadalur trailhead, Hveragerdi, Iceland", ll: "64.0225,-21.2103", image: "reykjadalur" },
        { time: "14:00", name: "Icelandic horse riding",
          travel: "20-min drive to a farm near Hveragerði or Selfoss",
          dur: "1-2 hrs in the saddle",
          why: "The breed has been sealed for about a thousand years - Norse settlers brought them in the 9th century and export has been one-way ever since, so a horse that leaves Iceland can never come back. They have five gaits instead of the usual three, and the one to feel is the tölt: a four-beat gait so level that the party trick is holding a full drink while riding it. They are also famously unbothered by beginners.",
          detail: "Ask specifically for a ride that demonstrates the tölt when you book, or you may just walk. Helmets and usually overalls are provided. Wear boots you do not mind getting muddy twice in one day.",
          maps: "Selfoss, Iceland", ll: "63.9333,-21.0000", area: true, image: "horses" },
        { time: "17:00", name: "Drive to the Keflavík area",
          travel: "1hr 15min drive, about 100 km on Routes 1 and 41",
          dur: "One night, the last one",
          why: "Sleeping out here rather than in Reykjavík is deliberate: Blue Lagoon is a 20-minute drive from these beds on a booked 9am slot, and that is the whole reason tomorrow morning works.",
          detail: "Fill the tank tonight rather than tomorrow - it makes the last morning one step shorter.",
          maps: "Keflavik, Iceland", ll: "64.0049,-22.5644", area: true }
      ],
      aurora: { night: 4, spot: "Reykjanes lava fields",
        text: "Dark, and ten minutes from the airport hotels. Last chance - if the forecast is clear anywhere on the peninsula tonight, go, even if you are tired.",
        maps: "Reykjanes peninsula, Iceland", ll: "63.8500,-22.4500", area: true }
    },

    { id: "oct17", date: "2026-10-17", dow: "Saturday", half: "iceland",
      title: "Blue Lagoon, then home",
      sun: null,
      images: ["bluelagoon"],
      intro: [
        "FI853 does not leave until 4:25pm, so this is not the dawn-departure day the original plan assumed. That is what makes today the right home for Blue Lagoon.",
        "This is the only slot on the trip where the lagoon displaces nothing. Twenty minutes from the airport, five hours of runway, and no aurora night waiting at the other end of it."
      ],
      items: [
        { time: "8:30am", name: "Check out and drive to Blue Lagoon",
          travel: "20-min drive from the Keflavík area on Route 43",
          dur: "Allow 30 min with check-in",
          detail: "Take the bags with you rather than coming back for them - there is a paid luggage hold at the entrance and an airport-day visit is exactly what it exists for.",
          maps: "Blue Lagoon, Grindavik, Iceland", ll: "63.8804,-22.4495" },
        { time: "9:00am", name: "Blue Lagoon",
          travel: "You are here",
          dur: "2-2.5 hrs in the water",
          why: "The water is an accident. It is the outflow of the Svartsengi geothermal plant next door - about 70% seawater and 30% fresh, pulled up from 2,000 metres down, loaded with silica and algae that turn it opaque milky blue and hold it around 38-39C. People started bathing in the runoff in the 1980s because psoriasis got better in it, and it became a formal facility in 1992. Steam, black lava walls on every side, a mud mask, and a swim-up bar in the middle of a lava field. It is the most touristed thing in Iceland and it is still worth it.",
          detail: "Comfort admission is the tier that makes sense: entry, a towel, the silica mud mask and a drink at the bar. Premium adds a robe and slippers you will not use on the way to an airport, and the Retreat is a separate building at several times the price. Two to two and a half hours is right - long enough to stop checking the time, short enough that you are not shrivelled before a seven-hour flight.",
          maps: "Blue Lagoon, Grindavik, Iceland", ll: "63.8804,-22.4495", image: "bluelagoon",
          headsUp: "Timed entry, pre-booked - walk-ins are effectively not a thing. Take the earliest slot they sell: October opening is usually around 8am but verify, and an early slot is emptier and leaves all your afternoon slack intact.",
          links: [{ label: "bluelagoon.com", url: "https://www.bluelagoon.com/" }],
          sub: [
            "Work the free conditioner through your hair before you get in and keep your head above water. The silica wrecks hair, and you cannot fix it at 35,000 feet.",
            "Shower properly first, without a swimsuit on. It is not a suggestion here and the staff enforce it.",
            "Phone stays in the locker unless it is in a floating case. They fish handsets out of that water daily."
          ] },
        { time: "12:00pm", name: "Out, dried off, and on the road",
          travel: "20-min drive to KEF",
          dur: "Over an hour of slack before anything is urgent",
          detail: "Nothing is tight today. If the lagoon is going well, leaving at 12:30 still works." },
        { time: "1:30pm", name: "Fuel up, return the car, check in at KEF",
          travel: "The fuel station is before the airport turn, not at it",
          dur: "Allow 45 min for all three",
          detail: "Refuel before you hand the car back; airport fuel is the most expensive in Iceland. Two and a half hours before an international departure is comfortable at KEF, not excessive.",
          maps: "Keflavik International Airport, Iceland", ll: "63.9850,-22.6056" },
        { time: "4:25pm", name: "FI853, Keflavík to Chicago O'Hare",
          travel: "Nonstop Icelandair",
          dur: "6h 50m, lands ORD 6:15pm at Terminal 5",
          detail: "One checked bag included. Then the connection or the drive to Madison - realistically home late evening, not early afternoon.",
          headsUp: "Ben's KEF-MSN flight is booked separately through work. If it is not FI853, you are on different flights out of KEF and need to agree who returns the rental car." }
      ],
      notes: [
        { label: "If Blue Lagoon is closed", text: "It sits at Svartsengi, in the middle of the Reykjanes eruption zone, and it has closed for days at a time during past eruptions. Sky Lagoon in Reykjavík is the fallback: about 45 minutes from KEF, arguably the better building, with an ocean edge. Check almannavarnir.is the night before and rebook from the guesthouse rather than driving out to find a barrier across the road." },
        { label: "If you skip the water entirely", text: "If Tuesday ran short, Gunnuhver and the Bridge Between Continents are both more or less on the way back to the airport, and free." },
        { label: "Tell Mom", text: "She is covering the kids until you are actually back. Late evening, not mid-afternoon." }
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
      { n: 3, text: "Helicopter tours launch within a day or two and give the best views, at $400-600 per person. That breaks the budget - your call in the moment." },
      { n: 4, text: "Assume Blue Lagoon is shut. It sits at Svartsengi inside the affected area and closed repeatedly through the 2023-2025 sequence. Move Saturday morning to Sky Lagoon instead of waiting to see, and check the cancellation terms when you book so a closure is a refund and not a donation." }
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
        { id: "trn-car",     label: "Iceland rental car, 5 days (Oct 13-17)", planned: 425, estimate: true },
        { id: "trn-parkord", label: "O'Hare parking, Oct 9-17",       planned: 170, estimate: true },
        { id: "trn-msnord",  label: "Madison to O'Hare and back",     planned: 60,  estimate: true },
        { id: "trn-lhrcar",  label: "Pre-dawn car to Heathrow T5",    planned: 70,  estimate: true },
        { id: "trn-fuel",    label: "Fuel",                          planned: 140 },
        { id: "trn-london",  label: "London transit",                planned: 80 }
      ]},
      { id: "excursions", label: "Excursions (both)", lines: [
        { id: "exc-stonehenge",  label: "Stonehenge - train + tour bus + admission", planned: 220 },
        { id: "exc-glacier",     label: "Into the Glacier from Gullfoss",            planned: 190 },
        { id: "exc-horses",      label: "Icelandic horse riding",                    planned: 220 },
        { id: "exc-bluelagoon",  label: "Blue Lagoon, Comfort x2 + luggage hold",     planned: 210, estimate: true },
        { id: "exc-lagoon",      label: "Secret Lagoon",                             planned: 80 },
        { id: "exc-lavashow",    label: "Lava Show, Vík",                       planned: 120 },
        { id: "exc-thingvellir", label: "Þingvellir parking",                   planned: 10 },
        { id: "exc-temple",      label: "Temple day: Heathrow car + return train + taxis", planned: 150, estimate: true },
        { id: "exc-westend",     label: "West End show x2 (optional)",               planned: 0, free: true },
        { id: "exc-reykjadalur", label: "Reykjadalur",                               planned: 0, free: true }
      ]},
      { id: "home", label: "Home while you are away", lines: [
        { id: "home-momflights", label: "Mom's round-trip flights to Madison", planned: 400, estimate: true },
        { id: "home-momstay",    label: "Groceries and extras for her week",  planned: 120, estimate: true }
      ]},
      { id: "dinner", label: "One nice dinner", lines: [
        { id: "din-nice",    label: "One nice dinner",               planned: 150 }
      ]}
    ],
    headroomOptions: [
      "There is no headroom left. Planned now runs $5,335 against a $5,000 target - Blue Lagoon added $210, and the Saturday temple session turned a $20 train day into a $150 car day. Both were the right call; the target is what has to give. These are trades, not extras.",
      "Swap Secret Lagoon for a municipal pool like Laugardalslaug, about $12 for both: saves roughly $68, and Blue Lagoon already covers the tourist hot spring twice over",
      "Drop the nice dinner, $150. Together with the Secret Lagoon swap that pays for Blue Lagoon outright",
      "Trim the Oct 16 lodging - Keflavík and Reykjanesbær guesthouses run well under the $180 placeholder off-season",
      "A West End show on Monday evening runs about $150-220 for two decent seats. It is the best optional thing left in London, and it is a straight trade against the Stonehenge Stone Circle Experience - not both",
      "Sarah's one-way airfares are still the least predictable number here and could move $300-400 in either direction on their own"
    ],
    cutIfOver: "The realistic menu: swap Secret Lagoon for a municipal pool (~$68), cut the nice dinner ($150), and book the Keflavík and London beds at the low end of their placeholders (~$100). That is roughly $320 and it lands you back on $5,000 - but it costs you a nice dinner and a lagoon to save a number you set yourself. Do not cut Blue Lagoon, the temple car, or the horses; those are the trip. If something has to give, let it be the $5,000."
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
      { id: "tw6", text: "Confirm both temple recommends are current - the session is Sat Oct 10 and there is no second chance on this trip" },
      { id: "tw7", text: "Reserve the Sat Oct 10 temple session at Newchapel. Late morning or early afternoon, not the first slot of the day", budgetIds: ["exc-temple"] },
      { id: "tw16", text: "Book the Heathrow T2 to Newchapel car for about 8:00am Sat Oct 10 - roughly 1 hr via the M25, and far better than 2.5 hrs of rail with suitcases", budgetIds: ["exc-temple"], extra: true },
      { id: "tw17", text: "Confirm the temple can hold the suitcases during the session, or find somewhere that can", extra: true },
      { id: "tw8", text: "Verify passports are valid at least 6 months past Oct 17, 2026" },
      { id: "tw9", text: "Apply for UK ETA for both of you - the UK has required an Electronic Travel Authorisation from US citizens since January 2025. Confirm the current fee and processing time on gov.uk before paying.", extra: true },
      { id: "tw10", text: "Check whether ETIAS is live for Iceland by October 2026 - the EU has delayed it repeatedly. If it is in force by then, both of you need one for the Schengen area.", extra: true },
      { id: "tw11", text: "Confirm with Mom which dates she can actually cover - ideally Oct 8 through Oct 18, so there is a day of overlap at each end", extra: true },
      { id: "tw12", text: "Book Mom's round-trip flights to Madison", budgetIds: ["home-momflights"], extra: true },
      { id: "tw13", text: "Decide how Sarah gets to O'Hare on Oct 9: drive and park for eight days, or a drop-off", budgetIds: ["trn-parkord", "trn-msnord"], extra: true },
      { id: "tw14", text: "Confirm Ben's own KEF-MSN flight on Oct 17. If it is not FI853 at 4:25pm you are on separate flights and need to agree who returns the rental car", extra: true },
      { id: "tw15", text: "Work out how Ben gets to Heathrow Terminal 2 arrivals by about 7:15am on Oct 10, including where he sleeps on the 9th", extra: true },
    ]},
    { id: "four-six", label: "Four to six weeks out", promoteAt: 42, overdueAt: 7, items: [
      { id: "fs1",  text: "Book Into the Glacier - Gullfoss departure, not Reykjavík", budgetIds: ["exc-glacier"] },
      { id: "fs2",  text: "Book Icelandic horse riding farm near Hveragerði or Selfoss", budgetIds: ["exc-horses"] },
      { id: "fs3",  text: "Book Lava Show, Vík", budgetIds: ["exc-lavashow"] },
      { id: "fs4",  text: "Book London lodging x3 nights", budgetIds: ["lod-london"] },
      { id: "fs5",  text: "Book Reykjavík x1, south Iceland guesthouse x2, Keflavík x1", budgetIds: ["lod-rvk","lod-south","lod-kef"] },
      { id: "fs6",  text: "Buy advance Waterloo-Salisbury train tickets - an early train out, around 7:30am, is what leaves Monday evening free", budgetIds: ["exc-stonehenge"] },
      { id: "fs7",  text: "Book The Stonehenge Tour bus", budgetIds: ["exc-stonehenge"] },
      { id: "fs8",  text: "Reserve Dishoom for Sat Oct 10 evening - it is a Saturday night, so this one actually needs booking" },
      { id: "fs18", text: "Decide on a West End show for Mon Oct 12 evening. Sunday is dark almost everywhere, so Monday is the only night it fits. Trade against the Stone Circle Experience, not in addition to it", budgetIds: ["exc-westend"], extra: true },
      { id: "fs9",  text: "Notify banks of travel; confirm no foreign transaction fees" },
      { id: "fs19", text: "Sort international phone service for both phones, Oct 9-17. Check what your plan already covers in the UK and Iceland, then add a travel pass or an eSIM. You need data working for vedur.is cloud maps, road.is, offline-map fallback and Mom", extra: true },
      { id: "fs10", text: "Download offline maps for Iceland and southern England" },
      { id: "fs11", text: "Reserve O'Hare parking for Oct 9-17 - off-site lots are far cheaper than the terminal garage, and prepaying is cheaper again", budgetIds: ["trn-parkord"], extra: true },
      { id: "fs12", text: "Extend the Iceland rental car through Saturday afternoon - it is 5 days now, not 4", budgetIds: ["trn-car"], extra: true },
      { id: "fs13", text: "Book a car to Heathrow T5 for 4:45 to 5:15am on Tue Oct 13 - no Night Tube on a weekday", budgetIds: ["trn-lhrcar"], extra: true },
      { id: "fs14", text: "Book Blue Lagoon for Sat Oct 17 - Comfort x2, earliest timed slot, plus the luggage hold. Read the cancellation terms; an eruption closure should be refundable", budgetIds: ["exc-bluelagoon"], extra: true },
      { id: "fs15", text: "Book the Oct 16 lodging in the Keflavík / Reykjanesbær area after all - a 20-minute run to a 9am Blue Lagoon slot is worth more than a shorter Friday drive", budgetIds: ["lod-kef"], extra: true },
      { id: "fs16", text: "Write the week up for Mom: school runs, activities, bedtimes, pediatrician, insurance details, allergies, emergency contacts", extra: true },
      { id: "fs17", text: "Leave a signed medical-consent note so Mom can authorise treatment for the kids if she has to", extra: true }
    ]},
    { id: "week-of", label: "Week of", promoteAt: 7, overdueAt: 0, items: [
      { id: "wo1", text: "Confirm every booking by email" },
      { id: "wo2", text: "Check vedur.is and road.is daily starting three days out" },
      { id: "wo3", text: "Charge and pack the phone tripod" },
      { id: "wo4", text: "Screenshot all confirmations in case of no signal" },
      { id: "wo8", text: "Check almannavarnir.is for Reykjanes activity before Saturday - Blue Lagoon shuts when Svartsengi does, and Sky Lagoon is the rebook", extra: true },
      { id: "wo5", text: "Hand over to Mom: house keys, car seats, wifi password, pediatrician number, allergy notes, where everything lives", extra: true },
      { id: "wo6", text: "Send Mom every flight number and the link to this app", extra: true },
      { id: "wo7", text: "Set an out-of-office, and give Mom a way to reach you that works from Iceland", extra: true }
    ]},
    { id: "packing", label: "Packing that actually matters", promoteAt: 7, overdueAt: 1, resettable: true, items: [
      { id: "pk1", text: "Waterproof shell + warm mid-layer - Iceland is 35-45F but wind is the real story" },
      { id: "pk2", text: "Waterproof boots with grip - Reykjadalur is muddy, Reynisfjara is wet, the glacier is ice" },
      { id: "pk3", text: "Swimsuit and quick-dry towel - used at Secret Lagoon, Reykjadalur and Blue Lagoon. Comfort admission at Blue Lagoon includes a towel; the other two do not" },
      { id: "pk4", text: "Phone tripod for the aurora" },
      { id: "pk5", text: "Headlamp for the Reykjadalur trail and aurora nights" },
      { id: "pk6", text: "Temple recommends" },
      { id: "pk7", text: "Sunday clothes" },
      { id: "pk8", text: "Iceland is card-only in practice; skip cash" },
      { id: "pk9", text: "Hold car doors with both hands - wind rips them off hinges every year and rental insurance doesn't cover it" },
      { id: "pk10", text: "Plug adapters: the UK is Type G and Iceland is Type F. They are different plugs, so pack both", extra: true }
    ]}
  ],

  /* --- confirmations locker (structure only; values live in localStorage) --- */
  confirmations: [
    { id: "cf-flt-sarah-out", label: "Sarah ORD-LHR, UA929, Oct 9",   fields: ["Confirmation", "Seat", "Terminal", "Notes"] },
    { id: "cf-flt-lhrkef",    label: "LHR-KEF x2, BA800, Oct 13",      fields: ["Confirmation", "Seats", "Terminal", "Notes"] },
    { id: "cf-flt-sarah-ret", label: "Sarah KEF-ORD, FI853, Oct 17",   fields: ["Confirmation", "Ticket no.", "Seat", "Notes"] },
    { id: "cf-flt-ben-home",  label: "Ben KEF-MSN, Oct 17 (work)",     fields: ["Airline", "Flight no.", "Confirmation", "Times"] },
    { id: "cf-mom",           label: "Mom's flights to Madison",       fields: ["Airline", "Flight no.", "Confirmation", "Dates"] },
    { id: "cf-parkord",       label: "O'Hare parking",                 fields: ["Lot", "Confirmation", "Dates", "Shuttle"] },
    { id: "cf-lhrcar",        label: "Car to Heathrow T5, Oct 13",      fields: ["Company", "Confirmation", "Pickup time", "Address"] },
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
    { id: "cf-bluelagoon",    label: "Blue Lagoon, Oct 17",            fields: ["Confirmation", "Entry time", "Package", "Luggage hold?"] },
    { id: "cf-dishoom",       label: "Dishoom, Oct 10",                fields: ["Location", "Confirmation", "Time"] },
    { id: "cf-temple",        label: "Temple session, Oct 10",         fields: ["Session time", "Reservation", "Clothing rental?", "Notes"] },
    { id: "cf-templecar",     label: "Heathrow to Newchapel car",      fields: ["Company", "Confirmation", "Pickup time", "Terminal"] },
    { id: "cf-westend",       label: "West End show, Oct 12",          fields: ["Show", "Theatre", "Confirmation", "Curtain"] },
    { id: "cf-phone",         label: "International phone / eSIM",     fields: ["Carrier or eSIM", "Plan", "Dates", "Cost"] }
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
    title: "Why the London days are in this order",
    lede: "The order is forced by three fixed constraints, and it is worth knowing which ones so you do not accidentally undo it.",
    points: [
      "The temple is closed Sunday and Monday, and Tuesday is the 7:50am flight to Keflavík. Saturday is the only day in the London window when a session is possible at all - so the session drives the day Sarah lands, not the other way round.",
      "Church is Sunday morning and does not move, which puts the Thames walk in Sunday afternoon. That works because the whole walk is outdoors and free and reads fine in fading light; sunset is 6:10pm.",
      "Stonehenge needs a full day and cannot share one with church, so it lands on Monday. Take the early train out, around 7:30am, and Monday evening comes back free.",
      "West End theatre is dark on Sundays almost everywhere, so Monday evening is the only slot a show fits. The cost is sleep - curtain down at 10:15pm against a 4:45am car to Heathrow.",
      "What this replaced: the old plan put the session on Tuesday morning, which meant flying to Iceland out of Gatwick, landing in the evening, and pushing the entire Reykjanes afternoon onto an already-full Friday. BA800 out of Heathrow T5 is now booked, so that variant would also mean rebuying a flight. The Saturday session costs Iceland nothing and is strictly better."
    ]
  }
};

if (typeof window !== "undefined") { window.TRIP = TRIP; }
