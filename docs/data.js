/* ============================================================================
   data.js  -  ALL trip content lives here.

   The single source of truth for trip content. Em-dashes normalized to hyphens. No trip facts
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
    structure: "Ben is already in England from Oct 3 on a work trip and moves to the Courtyard Heathrow on Fri Oct 9. Sarah flies Fri Oct 9, lands Sat Oct 10 and cabs straight to that hotel. 3 nights England (Oct 10, 11, 12): 1:00pm endowment session Saturday, church and the Thames walk Sunday, Westminster Abbey and Hamilton Monday. Saturday is at the work-paid Courtyard Heathrow with a one-day rental car; Sunday and Monday are in Paddington. Then 4 nights Iceland (Oct 13, 14, 15, 16), ending with Blue Lagoon on the way to the airport. Home late Saturday Oct 17.",
  },

  /* --- the must-do list, shown as a grid ----------------------------------- */
  mustDo: [
    { item: "West End show",              when: "Mon Oct 12 - Hamilton, 7:30pm" },
    { item: "Big Ben / London classics",  when: "Sun Oct 11 afternoon" },
    { item: "LDS temple",                 when: "Sat Oct 10 - 1:00pm endowment, Newchapel (booked)" },
    { item: "Aurora hunting",             when: "All four Iceland nights" },
    { item: "Stargazing",                 when: "Wed-Fri, rural south Iceland" },
    { item: "Icelandic horses",           when: "All week - roadside, and at the Rauduskridur farm" },
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
     sun:     null where the time is not known, rather than invented
     travel:  how you get there and how long, measured FROM THE PREVIOUS STOP
     dur:     how long you are actually there
     why:     what makes the place worth the time. Renders above the logistics.
     detail:  the logistics. What to do, book, pay, avoid.
     hazards: life-safety only. Renders hatched red. Do not dilute this.
     headsUp: logistics warning on a single item. Renders amber.
     book:    checklist item ids from `checklists` below that have to be booked
              for this stop. The Book tab shows one checkbox per stop driven by
              these, so ticking it there ticks the same to-do on the Prep tab -
              there is only ever one copy of that state. Leave `book` off a stop
              that needs no reservation and the Book tab shows N/A. The same id
              may appear on several stops when one booking covers them all (the
              Iceland lodging block, fs5, covers four nights in four places).   */
  days: [

    { id: "oct09", date: "2026-10-09", dow: "Friday", half: "london",
      title: "Sarah flies, Ben gets into position",
      /* Ben is crossing England while Sarah crosses the Atlantic. These items
         are two parallel threads, not one route, so no stop follows on from
         the one above it. */
      parallel: true,
      sun: null,
      images: [],
      intro: [
        "Nothing happens together today. Sarah crosses the Atlantic overnight while Ben finishes the work leg in Exeter and repositions to Heathrow.",
        "The important thing about tonight is that it is already solved. Work has Ben at the Courtyard Heathrow Marriott for Friday and Saturday, so there is no scramble for a bed and no 3pm check-in wait for Sarah tomorrow morning - she walks into a room that is already yours.",
        "Two jobs tonight: collect the rental car so tomorrow morning has no paperwork in it, and book Sarah's ride from the terminal."
      ],
      items: [
        { time: "Morning", name: "Ben checks out of Hotel Indigo Exeter",
          travel: "Exeter St Davids to London Paddington, about 2hr 15min by GWR",
          mode: "train",
          dur: "Work day ends, trip begins",
          detail: "Elizabeth line to Heathrow, then a taxi the last two miles.",
          maps: "Hotel Indigo Exeter, 3 Catherine Street, Exeter EX1 1EU", ll: "50.7228,-3.5305" },
        { time: "11:00am", name: "Sarah leaves Madison for O'Hare",
          book: ["tw13", "tw21"],
          travel: "Madison to ORD, about 2.5 hrs",
          mode: "car",
          dur: "Budget 3.5 hrs door to gate",
          detail: "Be at the terminal by 2:25pm. Park for the full Oct 9-17 window." },
        { time: "3:00pm UK", name: "Ben checks into the Courtyard Heathrow Marriott",
          book: ["tw15"],
          travel: "1 Nobel Drive, Harlington, Hayes UB3 5EY - about 2 miles north of the airport",
          mode: "car",
          dur: "Two nights, Fri and Sat, both paid by work",
          detail: "1 Nobel Drive, Hayes UB3 5EY. Tell the front desk Sarah joins the room from Saturday.",
          maps: "Courtyard by Marriott London Heathrow Airport, 1 Nobel Drive, Harlington, Hayes UB3 5EY", ll: "51.4934,-0.4192" },
        { time: "4:25pm", name: "UA929, O'Hare to Heathrow",
          book: ["tw2"],
          travel: "Nonstop, Boeing 767-300",
          mode: "plane",
          dur: "8h 20m in the air, lands 6:45am Saturday",
          detail: "First checked bag included, second is $120. Keep temple clothing and both recommends out of the checked bag." },
        { time: "8:00pm", name: "Collect the rental car at Heathrow",
          book: ["tw16"],
          travel: "Uber or the Hoppa from the Courtyard, about 2 miles. Not a walk - it is the A4 and the perimeter road",
          mode: "car",
          dur: "45-60 min including the desk and the walk to the lot",
          detail: "Enterprise, Northern Perimeter Road, TW6 2RY, 020 8150 1809. Branch shuts at 11:00pm. Economy automatic, a Vauxhall Corsa or similar, unlimited mileage. Return is Sat 8:00pm - it cannot be kept overnight.",
          maps: "Enterprise Rent-A-Car, Northern Perimeter Road, Heathrow TW6 2RY", ll: "51.4794,-0.4478" },
        { time: "Evening", name: "Ben: set up Sarah's ride from the terminal",
          book: ["tw18"],
          dur: "15 minutes of planning, tonight not at 5am",
          detail: "Terminal 2 arrivals to the hotel, about 7:45am. Send her the address, confirmation number, room number and a photo of the entrance." }
      ],
      notes: [
        { label: "Home front", text: "Mom should already be at the house with the kids settled before Sarah leaves, not arriving the same afternoon." },
        { label: "Why she is not being met at arrivals", text: "The hotel is about ten minutes from the terminal and Ben is already in the room. Meeting her airside costs an hour of standing in Terminal 2 and buys nothing - she is better off in a shower and a bed two hours earlier." }
      ]
    },

    { id: "oct10", date: "2026-10-10", dow: "Saturday", half: "london",
      title: "Sarah lands, 1:00pm endowment at Newchapel",
      sun: { sunrise: "7:20am", sunset: "6:15pm" },
      images: [],
      intro: [
        "The session is booked: 1:00pm endowment at the London England Temple. That one fact does more for this day than anything else in the plan, because it turns a scramble off a red-eye into a morning with actual slack in it.",
        "Sarah lands at 6:45am and is in the hotel room by about 8:15am - the room is already Ben's from Friday, so there is no waiting for check-in. Shower, eat, lie down for an hour, and still leave for Surrey at 11:00am with time to spare."
      ],
      items: [
        { time: "6:45am", name: "Sarah lands at Heathrow Terminal 2",
          travel: "UA929, arriving T2",
          mode: "plane",
          dur: "Allow 45-60 min for immigration and bags",
          detail: "United uses Terminal 2. Confirm on the day. Ben is not meeting her here.",
          maps: "Heathrow Terminal 2 arrivals, London", ll: "51.4700,-0.4520" },
        { time: "7:45am", name: "Sarah: cab straight to the Courtyard Heathrow",
          book: ["tw18"],
          travel: "Black cab, Uber, or the Heathrow Hoppa shuttle - about 2 miles",
          mode: "car",
          dur: "10-15 min",
          detail: "1 Nobel Drive, Harlington, Hayes UB3 5EY. Roughly 20-25 GBP by cab.",
          maps: "Courtyard by Marriott London Heathrow Airport, 1 Nobel Drive, Harlington, Hayes UB3 5EY", ll: "51.4934,-0.4192" },
        { time: "8:15am", name: "Breakfast, shower, and one hard-stop nap",
          travel: "You are here",
          mode: "none",
          dur: "About 2hr 30min before the car",
          detail: "Alarm at 10:30am. Change into temple clothes, or have them ready, before the car comes.",
          area: true },
        { time: "11:00am", name: "Drive to Newchapel",
          book: ["tw16"],
          travel: "Your own rental car, about 45 miles clockwise on the M25",
          mode: "car",
          dur: "1 hr to 1hr 15min - build in the longer number",
          detail: "Leave at 11:00 to arrive about 12:15.",
          maps: "London England Temple, West Park Road, Newchapel, Lingfield, Surrey RH7 6HW", ll: "51.1608,-0.0497" },
        { time: "12:15pm", name: "Arrive, recommend desk, and the grounds",
          book: ["tw6", "tw17"],
          travel: "You are here",
          mode: "none",
          dur: "45 min before the session",
          detail: "Recommend desk by 12:30. Bags stay in the room - you are back at the same hotel tonight.",
          maps: "London England Temple, West Park Road, Newchapel, Lingfield, Surrey RH7 6HW", ll: "51.1608,-0.0497" },
        { time: "1:00pm", name: "Endowment session, London England Temple",
          book: ["tw7"],
          travel: "You are here",
          mode: "none",
          dur: "About 2 hrs including changing",
          detail: "West Park Road, Newchapel, Lingfield, Surrey RH7 6HW. Bring your own temple clothing; rental available on site. Both recommends current.",
          maps: "London England Temple, West Park Road, Newchapel, Lingfield, Surrey RH7 6HW", ll: "51.1608,-0.0497",
          links: [{ label: "Temple schedule and reservations", url: "https://www.churchofjesuschrist.org/temples/details/london-england-temple" }] },
        { time: "4:00pm", name: "Drop the car, then back to the Courtyard",
          travel: "Back around the M25 to Northern Perimeter Road",
          mode: "car",
          dur: "About 1 hr driving, then 10 min to the hotel",
          detail: "Return is booked for 8:00pm and the branch shuts at 11:00pm, so drop it on the way in rather than keeping it. Then Uber or the Hoppa the 2 miles to the Courtyard - same room as this morning.",
          maps: "Courtyard by Marriott London Heathrow Airport, 1 Nobel Drive, Harlington, Hayes UB3 5EY", ll: "51.4934,-0.4192" },
        { time: "Evening", name: "Dinner near the hotel",
          travel: "Walkable from the hotel, or a five-minute cab",
          mode: "walk",
          dur: "1.5 hrs",
          detail: "Pubs and chains on the Bath Road strip.",
          maps: "Bath Road, Harlington, Hayes", ll: "51.4889,-0.4181" }
      ],
      notes: [
        { label: "This is the one shot", text: "Temples are closed Sunday and Monday, and Tuesday morning is the flight to Keflavík. The 1:00pm session is the only one on this trip - so the whole day is built around it rather than fitting it in." },
        { label: "Tonight is free", text: "Work booked the Courtyard for Friday and Saturday, so the first night of the trip together costs nothing and the London lodging budget is now two nights instead of three. That is roughly $200 back." },
        { label: "One problem that vanished", text: "The old plan had a whole sub-task about where to stow the suitcases during the session, because it assumed you were changing hotels today. You are not - the bags stay in the Courtyard room until Sunday morning." },
        { label: "What this saved you", text: "The old plan had the session on Tuesday morning, which meant flying to Iceland out of Gatwick instead of Heathrow, landing in the evening, and pushing all of Reykjanes onto an already-full Friday. BA800 out of Heathrow T5 is booked. Doing the session today costs Iceland nothing." }
      ]
    },

    { id: "oct11", date: "2026-10-11", dow: "Sunday", half: "london",
      title: "Church, then London on foot",
      sun: { sunrise: null, sunset: "6:10pm" },
      images: ["bigben"],
      intro: [
        "Church in South Kensington, then the classic Thames walk in the afternoon. Sunset is 6:10pm, so you have roughly five hours of daylight after the block - enough for the river, not enough for the river plus museums.",
        "The one piece of friction today is the bags, and it is a small one. You check out of the Courtyard this morning, ride one direct train to Paddington, and leave the suitcases at the hotel desk before church. That is the only time they move all week."
      ],
      items: [
        { time: "Early", name: "Check out of the Courtyard, one train to Paddington",
          book: ["fs4"],
          travel: "Hop to the terminal, then Elizabeth line straight to Paddington, about 30 min",
          mode: "train",
          dur: "About 50 min door to door",
          detail: "Leave by 8:00am. Bags to the Tudor Court, 10-12 Norfolk Square - they store them before the 3:00pm check-in. Paddington to South Kensington, 12 min.",
          maps: "London Paddington station", ll: "51.5154,-0.1755" },
        { time: "10:30am", name: "Sacrament meeting at the Hyde Park Chapel",
          travel: "South Kensington tube, then a 3-min walk up Exhibition Road",
          mode: "train",
          dur: "1 hr meeting, plus 30 min in the visitors' centre",
          detail: "64-68 Exhibition Road, SW7 2PA. Sacrament meetings at 9:00am, 10:30am, and 1:00pm (YSA). The 9:00 needs leaving the Courtyard by 7:30am.",
          maps: "Hyde Park Chapel, 64-68 Exhibition Road, London SW7 2PA", ll: "51.4956,-0.1745" },
        { time: "12:45pm", name: "Westminster and Big Ben",
          travel: "District or Circle line, South Kensington to Westminster, 12 min",
          mode: "train",
          dur: "45 min including the bridge crossing",
          detail: "Free and outdoors. Cross to the south bank for the photograph.",
          maps: "Big Ben, Westminster, London", ll: "51.5007,-0.1246", image: "bigben" },
        { time: "1:30pm", name: "Thames South Bank walk",
          travel: "On foot east from Westminster Bridge",
          mode: "walk",
          dur: "45-55 min at a genuine stroll, about 2.5 miles",
          detail: "Flat and paved, river on your left the whole way.",
          maps: "South Bank, London", ll: "51.5033,-0.1196" },
        { time: "3:00pm", name: "Tower Bridge and the Tower of London",
          travel: "Continue on foot along the South Bank",
          mode: "walk",
          dur: "30-40 min from outside",
          detail: "The glass-floor walkway and the Tower are separate paid tickets. The Tower alone wants three hours.",
          maps: "Tower Bridge, London", ll: "51.5055,-0.0754", image: "towerbridge" },
        { time: "4:15pm", name: "Trafalgar Square and Buckingham Palace",
          travel: "District or Circle line, Tower Hill to Embankment, 12 min",
          mode: "train",
          dur: "About an hour, if the light and the legs hold",
          detail: "Optional, and the first thing to drop. Sunset is 6:10pm.",
          maps: "Trafalgar Square, London", ll: "51.5080,-0.1281", alt: true },
        { time: "Evening", name: "Dinner: Padella, Borough",
          travel: "Northern or Jubilee line to London Bridge, 5-min walk",
          mode: "train",
          dur: "About an hour, including the queue",
          detail: "No reservations - go at 5pm or queue. Ten minutes west of Tower Bridge.",
          maps: "Padella, Borough Market, London", ll: "51.5054,-0.0905" },
        { time: "Evening", name: "Check into the Tudor Court Hotel",
          book: ["fs20"],
          travel: "London Bridge to Paddington, about 20-25 min",
          mode: "train",
          dur: "Two nights, Oct 11 and 12 - booked and paid",
          detail: "10-12 Norfolk Square, W2 1RS. Check-in 3:00pm to midnight, paid in full. At the desk: ask about Tuesday Elizabeth line works, book the 5:15am car, set a 4:30am wake-up call.",
          maps: "Tudor Court Hotel, 10-12 Norfolk Square, London W2 1RS", ll: "51.5147,-0.1757" }
      ],
      notes: [
        { label: "Order matters today", text: "Church first, then the river, because the river works in fading light and church does not move. If the block runs long, drop Trafalgar rather than compressing the South Bank walk - the walk is the good part." },
        { label: "Why Paddington", text: "It is the one place that works for all three days at once: a direct Elizabeth line train from Heathrow this morning, 12 minutes to church, 15 minutes to Hamilton tomorrow, and the only station with trains to Terminal 5 early enough on Tuesday." },
        { label: "Booked", text: "Tudor Court Hotel, 10-12 Norfolk Square. Two nights, triple room with a garden view, GBP 262.75 paid in full. Non-refundable, and the dates cannot be changed - which is fine, because Sarah's flight, the temple session and BA800 all pin this weekend in place. Full details under Where to book on the Info tab." }
      ]
    },

    { id: "oct12", date: "2026-10-12", dow: "Monday", half: "london",
      title: "Westminster Abbey, St Paul's, and Hamilton",
      sun: { sunrise: null, sunset: "6:05pm" },
      images: ["bigben"],
      intro: [
        "Stonehenge came out and this is what went in: the two great interiors that are closed to sightseeing on Sundays, so yesterday could only walk past them. Then Hamilton in the evening.",
        "Two ticketed things and a walk between them. Busy, not a march - and everything today is inside, which is the right shape for the one October day you have no weather plan for."
      ],
      items: [
        { time: "9:30am", name: "Westminster Abbey",
          travel: "Paddington to Westminster, Circle or District line, about 18 min",
          mode: "train",
          dur: "2 hrs",
          detail: "GBP 31 each, paid at the door - no booking needed, and there is no online discount. Opens 9:30am. Audio guide included; the Diamond Jubilee Galleries are a separate GBP 5.",
          maps: "Westminster Abbey, Dean's Yard, London SW1P 3PA", ll: "51.4994,-0.1273" },
        { time: "12:00pm", name: "Lunch: Dishoom Covent Garden",
          book: ["fs8"],
          travel: "20-25 min on foot from the Abbey, past Whitehall and Trafalgar Square",
          mode: "walk",
          dur: "About 1.5 hrs",
          detail: "12 Upper St Martin's Lane, WC2H 9FB. Open from 8am, one all-day menu. Reserve a lunch slot.",
          maps: "Dishoom Covent Garden, 12 Upper St Martin's Lane, London WC2H 9FB", ll: "51.5128,-0.1272" },
        { time: "2:00pm", name: "St Paul's Cathedral, and the dome",
          travel: "Covent Garden to Holborn, then Central to St Paul's, about 15 min. Or 30 min on foot down the Strand",
          mode: "train",
          dur: "1.5-2 hrs",
          detail: "GBP 27 each, paid at the door - no booking needed. Cathedral floor, crypt and the Dome Galleries are all included, plus the multimedia guide. The dome is 528 narrow spiral steps, one-way with no bail-out, and last dome entry is well before closing.",
          maps: "St Paul's Cathedral, London EC4M 8AD", ll: "51.5138,-0.0984" },
        { time: "4:30pm", name: "Back to Paddington, change, eat early",
          travel: "Circle line from St Paul's or Blackfriars, about 25 min",
          mode: "train",
          dur: "2 hrs of slack before the theatre",
          detail: "Eat near Paddington or Victoria. Norfolk Square is three minutes from the station. Do not plan to eat afterwards.",
          area: true },
        { time: "7:30pm", name: "Hamilton, Victoria Palace Theatre",
          book: ["fs18"],
          travel: "Paddington to Victoria, Circle line, about 15 min. Theatre is directly opposite the station",
          mode: "train",
          dur: "2hr 45min including a 15-min interval, out by 10:15pm",
          detail: "Grand Circle Row B, seats 10 and 11, in through Door 7. In your seat by 7:25pm - no late admission. E-tickets email 24 hours before.",
          maps: "Victoria Palace Theatre, 126 Victoria Street, London SW1E 5EA", ll: "51.4961,-0.1425",
          sub: [
            "Ticket protection runs until 7:30pm on Sun Oct 11 - cancel before then and you get a voucher to rebook rather than a refund. After that the tickets are yours.",
            "Door 7. Write it down; Victoria Palace has several entrances and finding the right one in a Monday-night crowd is the difference between a calm arrival and a scramble."
          ] },
        { time: "Before bed", name: "Pack, and lock in the morning",
          book: ["fs13"],
          dur: "30 min",
          detail: "Pack tonight. Confirm the 5:15am car, set two alarms plus a 4:30am wake-up call, and put food in the room. Kettle and fridge in the room." }
      ],
      notes: [
        { label: "Why this replaced Stonehenge", text: "Stonehenge was a 7-hour round trip built on a 7:30am train, and it made Monday the tiring day rather than the good one. Dropping it freed about $220, put two world-class interiors in walking distance of each other, and left an evening open for the show. The stones are not going anywhere." },
        { label: "The cheaper version of today", text: "Westminster Abbey is the one to keep. If you want to spend less, swap St Paul's for the British Museum or the National Gallery - both free, both excellent - and today costs $80 instead of $150." },
        { label: "Tuesday morning is handled", text: "A car at 5:15am from Norfolk Square to Terminal 5, about 40 minutes with empty roads. The hotel check-out window opens at midnight and the front desk is staffed 24 hours, so a 4:55am departure needs no special arrangement. The Elizabeth line also works - the 05:03 from Paddington reaches T5 at 05:39, and the station is three minutes from the door - but you do not want a first-train connection between you and an international flight. Book the car, and cancel it Monday if the trains look clean." }
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
        { time: "5:15am", name: "Car from Norfolk Square to Terminal 5",
          book: ["fs13"],
          travel: "Pre-booked minicab, about 40 min on empty roads",
          mode: "car",
          dur: "At T5 by about 6:00am",
          detail: "Booked with a minicab firm, not a scheduled Uber. Roughly 45-65 GBP. Hand the key back on the way past.",
          maps: "Heathrow Terminal 5, London", ll: "51.4723,-0.4885" },
        { time: "7:50am", name: "BA800, Heathrow T5 to Keflavík",
          book: ["tw3"],
          travel: "You are already at the terminal",
          mode: "none",
          dur: "3h 5m, lands 9:55am local",
          detail: "Bag drop closes about 7:05am. One checked bag each, 23kg. Iceland is an hour behind London." },
        { time: "10:30am", name: "Pick up the rental car at KEF",
          book: ["tw4", "fs12"],
          travel: "Rental desks are in the terminal",
          mode: "walk",
          dur: "30-45 min including the walk to the lot",
          detail: "2WD is fine for this route. Take the gravel and sand/ash damage waiver.",
          headsUp: "Hold car doors with both hands - wind rips them off and insurance does not cover it.",
          maps: "Keflavik International Airport, Iceland", ll: "63.9850,-22.6056" },
        { time: "11:45am", name: "Fagradalsfjall lava fields, Nátthagi trail",
          travel: "30 min from KEF: Route 43 to Grindavík, then 427 east. P1 car park is 7 km along, on the left at the bottom of the hill",
          mode: "car",
          dur: "1-1.5 hrs round trip on the Nátthagi trail, 2 km each way",
          detail: "Parking 1,000 ISK for 24 hrs at parka.is - there is no meter on site. Boots with grip; the ground is rough. Cooled lava and craters, no active flow. Check safetravel.is before driving out.",
          headsUp: "Never approach a fresh flow from downwind; volcanic gas near the vents is lethal.",
          maps: "Geldingadalir volcano car park P1, Route 427, Grindavík, Iceland", ll: "63.8586,-22.2896",
          image: "lava",
          links: [
            { label: "Pay for P1 parking", url: "https://www.parka.is/pay/geldingadalir/" },
            { label: "Trails and closures", url: "https://www.visitreykjanes.is/en/volcano-eruption/eruption-information-everything-you-need-to-know/hiking-and-parking" },
            { label: "safetravel.is", url: "https://safetravel.is/" }
          ] },
        { time: "1:30pm", name: "Brimketill",
          travel: "Back through Grindavík, then 10 min west on Route 425",
          mode: "car",
          dur: "10 min",
          detail: "Roadside parking right beside it. A lava rock pool cut into the shoreline by the surf.",
          maps: "Brimketill, Reykjanes, Iceland", ll: "63.8286,-22.5232" },
        { time: "2:00pm", name: "Gunnuhver",
          travel: "15 min further west on Route 425",
          mode: "car",
          dur: "25 min",
          detail: "Free, boardwalked, ten minutes from the car. Stay on the boardwalk.",
          maps: "Gunnuhver, Reykjanes, Iceland", ll: "63.8189,-22.6836" },
        { time: "2:30pm", name: "Valahnúkamöl and Reykjanesviti",
          travel: "5 min on, at the very tip of the peninsula",
          mode: "car",
          dur: "30 min",
          detail: "Free. Cliffs and a black boulder beach with Eldey island offshore, and Iceland's oldest lighthouse on the headland above.",
          maps: "Valahnukamol, Reykjanes, Iceland", ll: "63.8130,-22.7060",
          headsUp: "Stay well back from the water - exposed Atlantic cliff, same sneaker waves as Reynisfjara." },
        { time: "3:10pm", name: "Bridge Between Continents",
          travel: "10 min north on Route 425",
          mode: "car",
          dur: "10 min, genuinely",
          detail: "Small gravel car park right beside it. No facilities.",
          maps: "Bridge Between Continents, Reykjanes, Iceland", ll: "63.8686,-22.6752" },
        { time: "4:15pm", name: "Check into the Fosshotel Baron",
          book: ["fs22"],
          travel: "55 min, about 60 km on Route 41",
          mode: "car",
          dur: "One night, check-in from 3:00pm",
          detail: "Barónsstíg 2-4. Dinner: Messinn for fish, or Bæjarins Beztu for the hot dog, both a walk away. Buy breakfast tonight if it is not on the booking.",
          maps: "Fosshotel Baron, Baronsstigur 2-4, 101 Reykjavik, Iceland", ll: "64.1445,-21.9200" }
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
        "The biggest day of the trip and the one with the least slack in it. Roll at 8:30 and the timings hold; leave at 9:30 and you are eating dinner at 10pm. Checkout is not until noon, so nothing is chasing you out of the room - the 8:30 is about the day, not the hotel.",
        "About 190 miles of driving in total, all on good paved road, ending at a guesthouse in the rural south where aurora night 2 is statistically your best shot of the week."
      ],
      items: [
        { time: "8:30", name: "Þingvellir National Park",
          travel: "45 min from Reykjavík, about 49 km on Route 36. Leave the hotel at 7:45",
          mode: "car",
          dur: "1 hr",
          detail: "Parking fee at the machine or online. The rift path from the upper car park to the church is flat and gravelled, about 40 minutes.",
          maps: "Thingvellir National Park, Iceland", ll: "64.2558,-21.1297", image: "thingvellir" },
        { time: "10:25", name: "Geysir",
          travel: "55 min, about 60 km on Routes 365 and 37",
          mode: "car",
          dur: "45 min",
          detail: "Free. Stand upwind of the pool.",
          maps: "Geysir, Haukadalur, Iceland", ll: "64.3104,-20.3024", image: "geysir" },
        { time: "11:20", name: "Gullfoss",
          travel: "10 min, about 10 km",
          mode: "car",
          dur: "30 min",
          detail: "Free, large car park, cafe. The snowmobile truck leaves from this car park, and you are back here at 16:00 if you want longer.",
          maps: "Gullfoss, Iceland", ll: "64.3271,-20.1199", image: "gullfoss" },
        { time: "12:00", name: "Snowmobile on Langjökull, from Gullfoss",
          book: ["fs1"],
          travel: "You are already here - the monster truck leaves from the upper Gullfoss car park",
          mode: "none",
          dur: "4 hrs, about an hour of it riding",
          detail: "Mountaineers of Iceland, 33,500 ISK each. Departures at 12:00 and 14:00. Helmets, overalls, gloves and overshoes provided; wear warm layers and waterproof boots.",
          maps: "Gullfoss upper car park, Iceland", ll: "64.3271,-20.1199", image: "icetunnel",
          links: [{ label: "Mountaineers of Iceland", url: "https://mountaineers.is/tours/meet-us-at-gullfoss/" }] },
        { time: "16:45", name: "Secret Lagoon, Flúðir",
          travel: "45 min from Gullfoss, about 45 km on Route 30",
          mode: "car",
          dur: "1-1.5 hrs",
          detail: "Towel rental is extra, so bring your own.",
          maps: "Secret Lagoon, Fludir, Iceland", ll: "64.1372,-20.3106" },
        { time: "19:15", name: "Drive to Rauduskridur farm, the Green Cabin",
          book: ["fs24"],
          travel: "1 hr, about 70 km, then 6 km off Route 1 on Route 250",
          mode: "car",
          dur: "Two nights here, check-in any time after 4:00pm",
          detail: "Plus code QQ2H+QMJ, 860 Hvolsvöllur - save the latitude and longitude offline before you fly. Groceries in Hvolsvöllur on the way past; the cabin has a kitchen. Hosts Ingveldur and Steini, via the Airbnb thread.",
          maps: "QQ2H+QMJ 860 Hvolsvollur Iceland", ll: "63.7494,-20.2225" }
      ],
      aurora: { night: 2, spot: "The cabin terrace, Rauduskridur farm",
        text: "Statistically your best shot of the trip, and you do not have to drive anywhere for it - the terrace is the spot. Hvolsvöllur is 950 people and you are 6 km off the ring road, so there is no town glow and no passing headlights. Kill the cabin lights before you go out, and give it the full twenty minutes.",
        maps: "QQ2H+QMJ 860 Hvolsvollur Iceland", ll: "63.7494,-20.2225" }
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
          travel: "20 min from the guesthouse, about 28 km east on Route 1",
          mode: "car",
          dur: "45 min, more if you find Gljúfrabúi",
          detail: "Paid car park. The path behind the falls is wet, slippery rock. You will get drenched - rain shells.",
          maps: "Seljalandsfoss, Iceland", ll: "63.6156,-19.9886", image: "seljalandsfoss" },
        { time: "10:45", name: "Skógafoss",
          travel: "20 min, about 25 km further east on Route 1",
          mode: "car",
          dur: "45 min-1 hr",
          detail: "Free, large car park. The base for the photograph, the steps for the coastline view.",
          maps: "Skogafoss, Iceland", ll: "63.5321,-19.5114", image: "skogafoss" },
        { time: "12:30", name: "Dyrhólaey",
          travel: "25 min, about 30 km, then a short climb on a side road",
          mode: "car",
          dur: "45 min",
          detail: "Free. The access road is steep and narrow but paved. Exposed at the top.",
          maps: "Dyrholaey, Vik, Iceland", ll: "63.4020,-19.1290" },
        { time: "14:00", name: "Reynisfjara black sand beach",
          travel: "20 min around the headland to the Vík side",
          mode: "car",
          dur: "45 min-1 hr",
          detail: "Free car park with a cafe. The columns and the cave are at the western end.",
          headsUp: "Sneaker waves arrive with no warning and the undertow is unsurvivable. Stay well up the beach and never turn your back on the water.",
          maps: "Reynisfjara beach, Vik, Iceland", ll: "63.4033,-19.0447", image: "reynisfjara",
          links: [{ label: "safetravel.is conditions", url: "https://safetravel.is/" }] },
        { time: "17:00", name: "Lava Show, Vík",
          book: ["fs3"],
          travel: "10 min into Vík",
          mode: "car",
          dur: "About 1 hr, plus the 20 min they want you there early",
          detail: "Booked for 17:00. Be there by 16:40 - they ask for 20 minutes before the show. Reynisfjara finishes about 15:00, so there is room for food in Vík first.",
          maps: "Lava Show, Vik, Iceland", ll: "63.4186,-19.0060" },
        { time: "18:15", name: "Back to the cabin",
          travel: "1 hr west, about 75 km on Route 1, then 6 km on Route 250",
          mode: "car",
          dur: "Second of two nights",
          detail: "In about 7:15pm. Nothing to check into, and aurora night 3 is from the terrace." }
      ],
      aurora: { night: 3, spot: "The cabin terrace again",
        text: "Same dark skies as night 2, and the advantage of a second night in the same place: you already know where to stand and how long your eyes take. Even if the aurora does nothing, this is the Milky Way with no effort and no driving.",
        maps: "QQ2H+QMJ 860 Hvolsvollur Iceland", ll: "63.7494,-20.2225" }
    },

    { id: "oct16", date: "2026-10-16", dow: "Friday", half: "iceland",
      title: "Hot river, then west to Grindavík",
      sun: { sunrise: "8:21am", sunset: "5:54pm" },
      images: ["reykjadalur"],
      intro: [
        "A long soak in a river you hike to, then a westward drive to set up Saturday morning.",
        "Check out of the cabin first thing - you do not come back this way. Checkout is by 10:00am and you want to be rolling around 8:10 to make Reykjadalur for 9:00, so the deadline is not the thing pushing you."
      ],
      items: [
        { time: "9:00", name: "Reykjadalur, Hveragerði",
          travel: "50 min from the guesthouse, about 65 km west on Route 1",
          mode: "car",
          dur: "3-4 hrs total: 45-60 min up, 1-1.5 hrs in the water, 40 min down",
          detail: "Park at the trailhead in Hveragerði. Uphill and muddy - waterproof boots. Bring your own towel; there is nowhere to rent one.",
          maps: "Reykjadalur trailhead, Hveragerdi, Iceland", ll: "64.0225,-21.2103", image: "reykjadalur" },
        { time: "15:00", name: "Drive to Volcano Escape, Grindavík",
          book: ["fs15"],
          travel: "1hr 15min, about 100 km on Routes 1 and 41, then Route 43 south",
          mode: "car",
          dur: "One night, the last one. Check-in 3:00pm to 11:00pm",
          detail: "Arrive about 16:15, before dark. Fill the tank in Reykjanesbær or on Route 41 before turning south, and bring dinner. Contact the host for key pickup, and check almannavarnir.is before you drive down.",
          maps: "Thorkotlustadarvegur, 240 Grindavik, Iceland", ll: "63.8424,-22.4340" }
      ],
      aurora: { night: 4, spot: "Straight out of the door, Grindavík",
        text: "The one night you do not have to drive for it - Grindavík sits in the middle of the Reykjanes lava fields, so the dark is already outside. Last chance of the trip: if the forecast is clear anywhere on the peninsula tonight, go out, even if you are tired. And there is a hot tub to come back to.",
        maps: "Thorkotlustadarvegur, 240 Grindavik, Iceland", ll: "63.8424,-22.4340" }
    },

    { id: "oct17", date: "2026-10-17", dow: "Saturday", half: "iceland",
      title: "Blue Lagoon, then home",
      sun: null,
      images: ["bluelagoon"],
      intro: [
        "FI853 does not leave until 4:25pm, so this is not the dawn-departure day the original plan assumed. That is what makes today the right home for Blue Lagoon.",
        "This is the only slot on the trip where the lagoon displaces nothing, and it still leaves room for the one thing the plan never made space for: an unhurried drive along the coast. Ninety minutes in the water instead of two and a half funds the whole thing."
      ],
      items: [
        { time: "7:30am", name: "Check out and drive to Blue Lagoon",
          travel: "10 min from Grindavík on Route 43",
          mode: "car",
          dur: "Allow 30 min with check-in",
          detail: "Take the bags with you - there is a paid luggage hold at the entrance.",
          maps: "Blue Lagoon, Grindavik, Iceland", ll: "63.8804,-22.4495" },
        { time: "8:00am", name: "Blue Lagoon",
          book: ["fs14", "wo8"],
          travel: "You are here",
          mode: "none",
          dur: "Up to 3 hrs in the water",
          detail: "Booked: Comfort admission, 2 guests, 08:00 arrival. Sunrise is about 8:20, so you are in before light. Entry, towel, silica mud mask and a drink.",
          maps: "Blue Lagoon, Grindavik, Iceland", ll: "63.8804,-22.4495", image: "bluelagoon",
          links: [{ label: "bluelagoon.com", url: "https://www.bluelagoon.com/" }],
          sub: [
            "Work the free conditioner through your hair before you get in and keep your head above water. The silica wrecks hair, and you cannot fix it at 35,000 feet.",
            "Shower properly first, without a swimsuit on. It is not a suggestion here and the staff enforce it.",
            "Phone stays in the locker unless it is in a floating case. They fish handsets out of that water daily."
          ] },
        { time: "11:30am", name: "Fuel up, return the car, check in at KEF",
          travel: "The fuel station is before the airport turn, not at it",
          mode: "car",
          dur: "Allow 45 min for all three",
          detail: "Refuel before you hand the car back; airport fuel is the dearest in Iceland. Through security by about 12:15, which is a long wait for a 4:25pm flight - see fs14 if you would rather move the lagoon later.",
          maps: "Keflavik International Airport, Iceland", ll: "63.9850,-22.6056" },
        { time: "4:25pm", name: "FI853, Keflavík to Chicago O'Hare",
          book: ["tw2", "tw14"],
          travel: "Nonstop Icelandair, Boeing 737 MAX",
          mode: "plane",
          dur: "6h 50m, lands ORD 6:15pm at Terminal 5",
          detail: "Both of you on this flight. One checked bag included. Sarah's car out of the O'Hare lot, 2.5 hours to Madison, home around 10pm." }
      ],
      notes: [
        { label: "If Blue Lagoon is closed", text: "It sits at Svartsengi, in the middle of the Reykjanes eruption zone, and it has closed for days at a time during past eruptions. Sky Lagoon in Reykjavík is the fallback: about 45 minutes from KEF, arguably the better building, with an ocean edge. Check almannavarnir.is the night before and rebook from the guesthouse rather than driving out to find a barrier across the road." },
        { label: "Why the lagoon goes first", text: "The coast drive is the flexible half of this morning and the lagoon is a booked, timed slot - so the fixed thing goes first and the compressible thing second. Reverse the order and an overrun on the coast makes you late for a ticket you have already paid for." },
        { label: "If you skip the water entirely", text: "If Tuesday ran short, Gunnuhver and the Bridge Between Continents are on the same Route 425 stretch as the coast drive, and free." },
        { label: "Tell Mom", text: "She is covering the kids until you are actually back. Landing at O'Hare at 6:15pm means Madison around 10pm, not mid-afternoon." }
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
      { n: 4, text: "Assume Blue Lagoon is shut. It sits at Svartsengi inside the affected area and closed repeatedly through the 2023-2025 sequence. Move Saturday morning to Sky Lagoon instead of waiting to see." },
      { n: 5, text: "And assume you have lost the Friday bed too. Volcano Escape is in Grindavík, inside the evacuation zone, and non-refundable, so an eruption costs you the room whatever you do - that risk is knowingly accepted. The recovery is a same-day rebooking, and it lines up with the lagoon decision: Reykjavík for the bed, Sky Lagoon for the morning, 45 minutes to KEF. Check almannavarnir.is the night before so you are making that call from a warm cabin rather than a closed road." }
    ],
    hazard: { title: "Never approach a fresh flow from downwind.",
      text: "Volcanic gas concentrations near vents are lethal, and that's how people actually die at these sites." }
  },

  /* --- checklists ---------------------------------------------------------- */
  /* promoteAt / overdueAt are in DAYS BEFORE Oct 10. Urgency is computed from
     the trip date, never from these labels.
     An item referenced by a day item's `book` array shows up as that event's
     booking checkbox on the Agenda; the rest collect in the not-tied-to-a-day
     bucket at the top of that tab. Packing is rendered on Info.            */
  checklists: [
    { id: "this-week", label: "This week", promoteAt: 999, overdueAt: 42, items: [
      { id: "tw1", text: "Price Sarah's flights three ways: two separate one-ways, multi-city, and open-jaw. They routinely differ by hundreds." },
      { id: "tw2", text: "Book Sarah MSN-LHR and KEF-MSN" },
      { id: "tw3", text: "Book LHR-KEF x2 (Play or Icelandair)" },
      { id: "tw4", text: "Reserve Iceland rental car - take gravel + sand/ash waiver" },
      { id: "tw5", text: "Done - Hamilton booked. Mon Oct 12, 7:30pm, Victoria Palace, Grand Circle Row B seats 10 and 11, Door 7. E-tickets email 24 hrs before" },
      { id: "tw6", text: "Confirm both temple recommends are current - the 1:00pm endowment on Sat Oct 10 is booked and there is no second chance on this trip" },
      { id: "tw7", text: "Save the temple reservation confirmation somewhere offline. Session is booked: 1:00pm endowment, Sat Oct 10, London England Temple, Newchapel. Be at the recommend desk by 12:30" },
      { id: "tw16", text: "Done - Enterprise, Northern Perimeter Road TW6 2RY. Economy automatic, out Fri Oct 9 8:00pm, back Sat Oct 10 8:00pm. GBP 48.49 a day plus GBP 14.97 excess protection, CDW included, unlimited mileage", extra: true },
      { id: "tw17", text: "Done - no suitcase problem. You sleep at the Courtyard both Friday and Saturday, so the bags never leave the room on temple day", extra: true },
      { id: "tw18", text: "Set up Sarah's ride from Heathrow T2 to the Courtyard for about 7:45am Sat Oct 10, and send her the address, the hotel confirmation number, the room number and a photo of the hotel entrance before she flies", extra: true },
      { id: "tw19", text: "Tell the Courtyard Heathrow that Sarah is on the room for both nights - the work reservation is written for 1 adult", extra: true },
      { id: "tw20", text: "Sort how Ben gets to Madison airport on Oct 3. He returns to O'Hare on the 17th, not Madison, so leaving his own car in the MSN lot does not work - get a drop-off from Sarah", extra: true },
      { id: "tw21", text: "Done - O'Hare parking booked. 8135 Mannheim Road, Schiller Park. Rooftop, 4th floor only. In Oct 9 1:00pm, out Oct 17 11:00pm, 9 days for about $166. The voucher has to be shown to the cashier on the way out, so keep it on both phones" },
      { id: "tw8", text: "Verify passports are valid at least 6 months past Oct 17, 2026" },
      { id: "tw9", text: "Apply for UK ETA for both of you - the UK has required an Electronic Travel Authorisation from US citizens since January 2025. Confirm the current fee and processing time on gov.uk before paying.", extra: true },
      { id: "tw10", text: "Check whether ETIAS is live for Iceland by October 2026 - the EU has delayed it repeatedly. If it is in force by then, both of you need one for the Schengen area.", extra: true },
      { id: "tw11", text: "Confirm with Mom which dates she can actually cover - ideally Oct 8 through Oct 18, so there is a day of overlap at each end", extra: true },
      { id: "tw12", text: "Book Mom's round-trip flights to Madison", extra: true },
      { id: "tw13", text: "Done - covered by the O'Hare booking in tw21. You land back at ORD together at 6:15pm on the 17th and that car is the ride home for two, well inside the 11:00pm end time", extra: true },
      { id: "tw14", text: "Done - Ben is on FI853 KEF-ORD, 4:25pm Oct 17, same flight as Sarah, booked through Icelandair. One rental car return, one check-in", extra: true },
      { id: "tw15", text: "Done - work has Ben at the Courtyard Heathrow Marriott, 1 Nobel Drive, Hayes UB3 5EY, for Fri Oct 9 and Sat Oct 10", extra: true },
    ]},
    { id: "four-six", label: "Four to six weeks out", promoteAt: 42, overdueAt: 7, items: [
      { id: "fs1",  text: "Done - Snowmobiling Adventure on Langjokull from Gullfoss, Wed Oct 14 12:00pm, 2 adults, $515.20. Auto-payment comes off the card on Oct 12 while you are in London, so make sure the bank notification in fs9 is done first", extra: true },
      { id: "fs3",  text: "Done - Lava Show Vík, Thu Oct 15 at 17:00. They ask you to arrive 20 minutes early, so 16:40" },
      { id: "fs4",  text: "Done - Tudor Court Hotel, 10-12 Norfolk Square, Paddington. Two nights Oct 11-13, triple room with garden view, GBP 262.75 paid in full. Non-refundable" },
      { id: "fs21", text: "Message the Tudor Court through the booking and ask which floor the room is on, and whether there is a lift. No lift is listed and it is a Victorian townhouse - if you are three floors up, ask to be moved lower. You carry the bags down at 4:55am", extra: true },
      { id: "fs20", text: "At Tudor Court check-in on Sunday: ask about Elizabeth line engineering works for Tuesday, confirm the walk to the Elizabeth line and Heathrow Express platforms, book the 5:15am car, and set a 4:30am wake-up call. All four are things this hotel does", extra: true },
      { id: "fs5",  text: "Done - all six paid nights are booked. Oct 16 went to Volcano Escape in Grindavík rather than Reykjanesbær, which needs the backup in fs27" },
      { id: "fs24", text: "Done - Rauduskridur farm, the Green Cabin, Hvolsvöllur. Both nights Oct 14-16 in one place, entire cabin, 4.88 from 740 reviews" },
      { id: "fs25", text: "Resolve the cabin Plus code QQ2H+QMJ to latitude and longitude and save it offline. It is not a street address, it will not go into a car sat-nav, and you arrive in the dark at 8pm with no guarantee of signal", extra: true },
      { id: "fs26", text: "Message the cabin hosts: is there a yard light near the terrace and is it on all night, and is there any gas appliance or wood stove given there is no CO alarm reported", extra: true },
      { id: "fs22", text: "Done - Fosshotel Baron, Barónsstíg 2-4, 101 Reykjavík, Tue Oct 13. ISK 23,106, free to cancel until Oct 10" },
      { id: "fs23", text: "Fosshotel Baron follow-ups before Oct 10: add breakfast or accept that Wednesday starts unfed, ask for the TWIN beds rather than the queen, and check whether the on-site parking is free or paid", extra: true },
      { id: "fs7",  text: "Decide St Paul's or the British Museum for Monday afternoon. St Paul's is GBP 27 each at the door and the dome is 528 one-way spiral steps; the British Museum is free and 20 minutes away. No booking either way", extra: true },
      { id: "fs8",  text: "Book Dishoom Covent Garden for lunch on Mon Oct 12, around 11:45am. A table for two can only be reserved up to 5:45pm - after that it is walk-in queue only. Bookable up to 4 months ahead", extra: true },
      { id: "fs18", text: "Done - Hamilton, Mon Oct 12, 7:30pm. Every other big title is dark Mondays and matinee-only Sundays, so this was the only evening show available all week", extra: true },
      { id: "fs9",  text: "Notify banks of travel; confirm no foreign transaction fees" },
      { id: "fs19", text: "Sort international phone service for both phones, Oct 9-17. Check what your plan already covers in the UK and Iceland, then add a travel pass or an eSIM. You need data working for vedur.is cloud maps, road.is, offline-map fallback and Mom", extra: true },
      { id: "fs10", text: "Download offline maps for Iceland and southern England" },
      { id: "fs12", text: "Extend the Iceland rental car through Saturday afternoon - it is 5 days now, not 4", extra: true },
      { id: "fs13", text: "Book a minicab for 5:15am Tue Oct 13, Paddington to Terminal 5. Use a minicab firm, not a scheduled Uber - scheduling an Uber does not reserve a driver. Roughly 45-65 GBP; cancel free if the trains look clean on Monday", extra: true },
      { id: "fs14", text: "Done - Blue Lagoon, Sat Oct 17, 08:00 arrival, Comfort admission for 2. Luggage hold is paid on the day at the entrance. An 08:00 slot leaves roughly four hours at KEF before the 4:25pm flight - if that is too long a wait, Blue Lagoon lets you move the time up to 24 hrs ahead", extra: true },
      { id: "fs15", text: "Contact the Volcano Escape host for key pickup and arrival time. The confirmation says to, and Grindavík is largely depopulated - not a town to improvise in after dark", extra: true },
      { id: "fs27", text: "Decided: no backup bed. The risk is accepted and you rebook on the day if Grindavík closes. Read the Plan B on the Info tab once so you are not composing it at 5pm on your last Friday - the short version is sleep in Reykjavík, swim at Sky Lagoon, drive to KEF", extra: true },
      { id: "fs29", text: "Verify the coordinates for the Fagradalsfjall P1 (Geldingadalir) car park and save them offline. Searching \"Fagradalsfjall\" in a map app returns the mountain, which has no road access - you want the signed P1 car park 7 km east of Grindavík on Route 427", extra: true },
      { id: "fs28", text: "Check almannavarnir.is weekly from late September, then the night before and the morning of Oct 16. Since there is no backup booking, this check IS the plan - it is what turns an evacuation into a rebooking rather than a surprise at the door", extra: true },
      { id: "fs16", text: "Write the week up for Mom: school runs, activities, bedtimes, pediatrician, insurance details, allergies, emergency contacts", extra: true },
      { id: "fs17", text: "Leave a signed medical-consent note so Mom can authorise treatment for the kids if she has to", extra: true }
    ]},
    { id: "week-of", label: "Week of", promoteAt: 7, overdueAt: 0, items: [
      { id: "wo1", text: "Confirm every booking by email" },
      { id: "wo2", text: "Check vedur.is and road.is daily starting three days out" },
      { id: "wo3", text: "Charge and pack the phone tripod" },
      { id: "wo9", text: "Check TfL for Elizabeth line engineering works on Tue Oct 13, and confirm with BA that bag drop for BA800 closes 45 min before the 7:50am departure", extra: true },
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
      { id: "pk11", text: "Something smart-ish for Hamilton. The West End is not formal, but you will be glad not to be in hiking trousers", extra: true },
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
    { id: "cf-flt-ben-out",   label: "Ben MSN-ORD-LHR, Oct 3 (work)",  fields: ["Confirmation", "Seats", "Terminals", "Notes"] },
    { id: "cf-flt-ben-home",  label: "Ben KEF-ORD, FI853, Oct 17 (work)", fields: ["Confirmation", "Seat", "Ticket no.", "Notes"] },
    { id: "cf-lod-heathrow",  label: "Courtyard Heathrow, Oct 9-11 (work)", fields: ["Confirmation", "Room no.", "Sarah added?", "Notes"] },
    { id: "cf-lod-worktrip",  label: "Work hotels: Ipswich, Bristol, Exeter", fields: ["Ipswich conf", "Bristol conf", "Exeter conf"] },
    { id: "cf-sarah-cab",     label: "Sarah's LHR T2 to hotel ride, Oct 10", fields: ["Company", "Booking", "Pickup", "Cost"] },
    { id: "cf-mom",           label: "Mom's flights to Madison",       fields: ["Airline", "Flight no.", "Confirmation", "Dates"] },
    { id: "cf-parkord",       label: "O'Hare parking",                 fields: ["Lot", "Confirmation", "Dates", "Shuttle"] },
    { id: "cf-lhrcar",        label: "5:15am car to T5, Oct 13",        fields: ["Company", "Confirmation", "Pickup time", "Phone"] },
    { id: "cf-lod-london",    label: "Tudor Court, Paddington, Oct 11-13", fields: ["Booking no.", "PIN", "Room / floor", "Notes"] },
    { id: "cf-lod-rvk",       label: "Fosshotel Baron, Oct 13",   fields: ["Confirmation", "PIN", "Breakfast added?", "Bed type"] },
    { id: "cf-lod-south",     label: "Rauduskridur cabin, Oct 14-16",  fields: ["Airbnb code", "Lat / long", "Door code", "Host phone"] },
    { id: "cf-lod-kef",       label: "Volcano Escape, Grindavík, Oct 16", fields: ["Confirmation", "PIN", "Key pickup", "Host phone"] },
    { id: "cf-lod-backup",    label: "Reykjanesbær backup, Oct 16", fields: ["Name", "Confirmation", "Free until", "Notes"] },
    { id: "cf-car",           label: "Iceland rental car",             fields: ["Company", "Confirmation", "Pickup / return", "Waiver taken?"] },
    { id: "cf-abbey",         label: "Westminster Abbey, Oct 12",      fields: ["Confirmation", "Entry time"] },
    { id: "cf-stpauls",       label: "St Paul's, Oct 12",              fields: ["Confirmation", "Entry time"] },
    { id: "cf-snowmobile",    label: "Snowmobile, Gullfoss, Oct 14",  fields: ["Booking ref", "Confirmation", "Time", "Notes"] },
    { id: "cf-lavashow",      label: "Lava Show, Vík",            fields: ["Confirmation", "Time"] },
    { id: "cf-bluelagoon",    label: "Blue Lagoon, Oct 17",            fields: ["Confirmation", "Entry time", "Package", "Luggage hold?"] },
    { id: "cf-dishoom",       label: "Dishoom, Oct 10",                fields: ["Location", "Confirmation", "Time"] },
    { id: "cf-temple",        label: "Endowment, 1:00pm Sat Oct 10",   fields: ["Reservation", "Clothing rental?", "Notes"] },
    { id: "cf-templecar",     label: "Rental car, Heathrow, Oct 9-10", fields: ["Company", "Confirmation", "Reg / space", "Return by"] },
    { id: "cf-westend",       label: "Hamilton, Mon Oct 12, 7:30pm",   fields: ["Order no.", "Seats / door", "Price paid", "Notes"] },
    { id: "cf-phone",         label: "International phone / eSIM",     fields: ["Carrier or eSIM", "Plan", "Dates", "Cost"] }
  ],

  /* --- where to book each bed --------------------------------------------- */
  /* Six paid nights. Each entry is a search brief, not a booking: the area to
     filter on, the streets that qualify, what to rule out, and the one or two
     criteria that actually matter for that night. */
  lodging: {
    lede: "All six paid nights are booked. Grindavík on Fri Oct 16 sits inside the active volcano zone and is non-refundable; that risk is accepted deliberately, with a same-day Plan B instead of a backup bed. Oct 10 is work-paid at the Courtyard Heathrow and Oct 17 is spent on a plane. The unbooked entries below are search briefs - filter on the map, not on the hotel's name.",
    stays: [
      { id: "lg-pad", label: "Paddington, London", nights: "Sun Oct 11 - Tue Oct 13 (2 nights)",
        budget: "$180-230 a night",
        booked: {
          name: "Tudor Court Hotel",
          address: "10-12 Norfolk Square, Paddington, London W2 1RS",
          phone: "+44 20 7723 5157",
          room: "Triple Room with Garden View, booked for 2 adults",
          paid: "GBP 262.75 all in, about $356 - VAT included and paid in full",
          terms: "Non-refundable. Dates cannot be changed.",
          checkIn: "Sun Oct 11, 3:00pm to midnight",
          checkOut: "Tue Oct 13, any time from midnight to 10:00am",
          maps: "Tudor Court Hotel, 10-12 Norfolk Square, London W2 1RS", ll: "51.5147,-0.1757",
          wins: [
            "Check-out opens at MIDNIGHT, so leaving at 4:55am is inside the permitted window rather than a favour you have to ask for. Combined with the 24-hour front desk, Tuesday morning is genuinely solved.",
            "A triple room for two, with a garden view onto Norfolk Square - more space than the Compact Double you were looking at, and set back off Praed Street so it should be quieter. A triple is usually a full bed plus a single, which suits two sprawlers better than a shared double would have.",
            "Baggage storage and a wake-up service are both listed, which covers the Sunday morning bag drop and the 4:30am alarm.",
            "Norfolk Square scored 9.5 on location from 1,928 reviews, the highest of anything considered. Three to five minutes to the station."
          ],
          confirmOnArrival: [
            "Which floor, and is there a lift? No lift appeared in the amenity list and this is a Victorian townhouse. If it is three floors up, ask to be moved lower - you are carrying bags down at 4:55am. Message the property now through the booking rather than finding out on Sunday.",
            "That they will hold luggage on Sunday morning. Check-in is not until 3:00pm and you arrive around 9:00am.",
            "The room is already paid in full. If anyone asks for payment at the desk, show the confirmation. The property invoice will read GBP 281.52 because Booking.com covered GBP 18.77 of it - that is not a balance owing.",
            "Book the 5:15am car for Tuesday and set the wake-up call for 4:30am while you are at the desk on Sunday."
          ]
        },
        searchIn: [
          "Praed Street - directly opposite the station, the shortest walk there is",
          "London Street and Norfolk Place - 2 to 4 minutes",
          "Craven Road and Craven Hill - 4 to 6 minutes",
          "Eastbourne Terrace and Westbourne Terrace - 3 to 6 minutes",
          "Norfolk Square and the east end of Sussex Gardens - 5 to 8 minutes",
          "Paddington Basin / Merchant Square - 5 to 8 minutes, newer buildings"
        ],
        avoid: [
          "Lancaster Gate, Bayswater and Queensway - they show up in Paddington searches and are a 12 to 20 minute walk with suitcases",
          "The far west end of Sussex Gardens past Norfolk Square - it runs a long way and the numbers get high",
          "Edgware Road north of the flyover - different neighbourhood, longer walk"
        ],
        criteria: [
          "Set the booking site's map filter to 10 minutes' walk of Paddington station and ignore the name. Plenty of hotels called Paddington are nowhere near it.",
          "Confirm there is a LIFT. Much of this district is converted Georgian terraces - four floors, narrow staircases, no elevator, and your room on the third. That is the single most common unpleasant surprise here.",
          "Ask whether they hold luggage before check-in. Almost all will, and you arrive Sunday morning well before the room is ready.",
          "Ask how long the walk is to the Elizabeth line and Heathrow Express platforms specifically, not just to the station. Paddington is big and those platforms are a hike from some entrances."
        ],
        candidates: "The Hilton London Paddington is built into the station itself - the old Great Western Royal Hotel - which makes it the shortest possible walk at 5am, at a price. Hotel Indigo Paddington and the Premier Inn on the Praed Street side are the usual mid-range picks. Verify current locations and rates yourself; treat these as starting points, not recommendations." },

      { id: "lg-rvk", label: "Reykjavík", nights: "Tue Oct 13 - Wed Oct 14 (1 night)",
        budget: "$180-210",
        booked: {
          name: "Fosshotel Baron",
          address: "Barónsstíg 2-4, 101 Reykjavík",
          phone: "+354 562 3204",
          room: "Double or Twin Room, 205 sq ft, booked for 2 adults",
          paid: "ISK 23,106 all in, roughly $190 - VAT and city tax included, nothing charged yet",
          terms: "Free cancellation until 11:59pm GMT on Oct 10. From Oct 11 the full ISK 24,039 applies.",
          checkIn: "Tue Oct 13, from 3:00pm",
          checkOut: "Wed Oct 14, until 12:00pm",
          maps: "Fosshotel Baron, Baronsstigur 2-4, 101 Reykjavik, Iceland", ll: "64.1445,-21.9200",
          wins: [
            "On-site parking, which was the one criterion that actually mattered for this night. Central Reykjavík street parking is metered and scarce and you will have the rental car.",
            "24-hour front desk. Aurora night 1 is out at Grótta and you will be back around 1am - no lockout, and someone to ask about conditions before you drive out.",
            "Barónsstígur sits on the eastern edge of 101, between Laugavegur and the Sæbraut waterfront. Walkable to dinner, and already pointing the right way for Route 36 in the morning rather than untangling from the west end.",
            "Free cancellation until Oct 10 with nothing charged yet, so this is a free hold for another three weeks.",
            "8.0 from 1,060 reviews, location 9.2."
          ],
          confirmOnArrival: [
            "BREAKFAST IS PROBABLY NOT INCLUDED. The price breakdown is room + VAT + city tax with no breakfast line, and ISK 21,657 matches the cheaper of the two rates. Wednesday is the Golden Circle and Into the Glacier - out the door by 8:30am, first food at the Gullfoss cafe around 11:45. Reykjavík cafes mostly open at 8 or later, so add breakfast or buy something the night before.",
            "Pick the TWIN beds, not the queen. The room is sold as 'Double or Twin' and the listing let you choose, so message the hotel and say two singles - you are both sprawlers and two twins beat one queen.",
            "Is the parking free or paid? The listing icon suggested paid. Expect ISK 1,500-2,500. Still far better than hunting a meter.",
            "Booking.com charges the card automatically rather than the hotel taking payment, and the property invoice will read ISK 24,839 because Booking covered ISK 1,733. That is not a balance owing.",
            "Oct 10 is the decision deadline. After midnight on the 11th it is the full price."
          ]
        },
        searchIn: [
          "101 postcode - the centre. Laugavegur, Hverfisgata, Skólavörðustígur, around Tjörnin",
          "Skúlagata and the Sæbraut waterfront - still walkable in, much easier parking",
          "105 Borgartún / Túnin - about 15 minutes' walk from the centre, cheapest of the three, and already on the road out"
        ],
        avoid: [
          "Anything advertised as near the airport - that is Keflavík, 45 minutes away, and a completely different town",
          "Somewhere central with no parking provision at all"
        ],
        criteria: [
          "PARKING is the thing that matters here, not the address. You have a rental car and central Reykjavík parking is paid, metered and scarce. Filter for free or on-site parking and accept a 10-minute walk into town for it - that trade is worth more than being on Laugavegur.",
          "Walkable to dinner. Messinn for fish and Bæjarins Beztu for the hot dog are both central, and you do not want to drive after a long day.",
          "One night only, so nothing else really matters. This is the least fussy booking of the six."
        ] },

      { id: "lg-south", label: "South coast, Hvolsvöllur area", nights: "Wed Oct 14 - Fri Oct 16 (2 nights, same place)",
        budget: "$160-180 a night",
        booked: {
          name: "Rauduskridur farm - The Green Cabin",
          address: "Plus code QQ2H+QMJ, 860 Hvolsvöllur - about 6 km off Route 1 on Route 250",
          phone: "Airbnb message thread - hosts Ingveldur and Steini",
          room: "Entire standalone cabin, studio, 2 guests maximum",
          paid: "Airbnb, both nights - 4.88 from 740 reviews, Superhosts of 12 years",
          terms: "Check Airbnb for the cancellation window. Pets live on the property.",
          checkIn: "Wed Oct 14, after 4:00pm",
          checkOut: "Fri Oct 16, by 10:00am",
          maps: "QQ2H+QMJ 860 Hvolsvollur Iceland", ll: "63.7494,-20.2225",
          wins: [
            "4.88 from 740 reviews over 12 years of hosting. That is the strongest track record of any property on this trip, and a farm that advertises aurora viewing has had a lot of guests test the claim.",
            "Six kilometres off the ring road, which is the right distance - far enough that Route 1 headlights are not sweeping your sky, close enough to get back out fast when you need to chase a clear window.",
            "A kitchen, which quietly solves a real problem: evening food around Hvolsvöllur is thin and closes early. Shop in Hvolsvöllur on the way in on Wednesday and cook.",
            "Two single beds, which is the configuration you actually want - you are both sprawlers. No need to ask about pushing anything together.",
            "Every leg matches the timings already in this plan - about an hour from Secret Lagoon on Wednesday, 20-25 minutes to Seljalandsfoss on Thursday, 50 minutes to Reykjadalur on Friday.",
            "A 10:00am checkout is no constraint at all, because Friday has you leaving around 8:10am for Reykjadalur anyway."
          ],
          confirmOnArrival: [
            "SAVE THE COORDINATES OFFLINE BEFORE YOU FLY. The address is a Google Plus code, not a street address. It resolves in Google Maps but will not work in most car sat-navs, and it is useless without signal. Open it, grab the latitude and longitude, and write them down - you are arriving in the dark at 8pm.",
            "Ask about the farm yard light. It is a working farm, and one sodium lamp forty metres from the terrace does more damage to your dark adaptation than the entire town of Hvolsvöllur. Worth knowing whether it is on all night.",
            "No carbon monoxide alarm is reported, though there is a smoke alarm. Icelandic cabins are almost always geothermal heating and electric cooking, which means no CO source at all - but ask whether there is any gas appliance or wood stove. If there is, a portable detector is a cheap thing to pack.",
            "Pets live on the property. Fine unless either of you reacts to animals - worth a thought rather than a surprise."
          ]
        },
        searchIn: [
          "Hvolsvöllur and the farms immediately around it - best positioned for Thursday",
          "Anywhere along Route 1 between Hella and Hvolsvöllur",
          "Fljótshlíð, the valley road running north-east out of Hvolsvöllur - rural and dark",
          "Skógar, further east by Skógafoss - even better for Thursday, but a longer Wednesday drive"
        ],
        avoid: [
          "Hveragerði and Selfoss - too far west, and they add 40 minutes to every Thursday stop",
          "Vík - too far east, and it turns Wednesday's arrival into a slog",
          "Anything in the middle of a town with street lighting. Town glow is the thing you drove out here to escape."
        ],
        criteria: [
          "BOOK BOTH NIGHTS IN THE SAME PLACE. Do not move between aurora nights 2 and 3 - packing up mid-stay is how you end up watching the sky from a car park.",
          "Rural, with an unobstructed view north. Read the reviews for the words dark and aurora; guests always mention it.",
          "Some Icelandic hotels offer an AURORA WAKE-UP CALL - they ring the room if it appears. Across two nights out here that is worth paying a little extra for. Filter or ask for it specifically.",
          "Check whether dinner is served on site. Evening food around Hvolsvöllur is thin and closes early, and discovering that at 9pm on Wednesday after the glacier is a bad time to find out. Many of these are working farms that feed guests - that is the one to book."
        ],
        candidates: "Hótel Rangá, between Hella and Hvolsvöllur, is the famous aurora hotel - on-site observatory and a wake-up service - but it runs well above this budget. Stracta Hótel in Hella and Hótel Hvolsvöllur are the mainstream mid-range options, and the surrounding farm guesthouses are where the value is. Verify all of it yourself." },

      { id: "lg-kef", label: "Grindavík", nights: "Fri Oct 16 - Sat Oct 17 (1 night)",
        budget: "$120-180 was the plan; came in at about $256",
        booked: {
          name: "Volcano Escape Grindavík with hot tub",
          address: "Þórkötlustaðarvegur, 240 Grindavík",
          phone: "+354 768 2110",
          room: "One-Bedroom House, entire place, 2 adults",
          paid: "EUR 233.10 all in, about $256 - VAT and city tax included, paid in full",
          terms: "NON-REFUNDABLE. Dates cannot be changed.",
          checkIn: "Fri Oct 16, 3:00pm to 11:00pm",
          checkOut: "Sat Oct 17, any time from midnight to 11:00am",
          maps: "Thorkotlustadarvegur, 240 Grindavik, Iceland", ll: "63.8424,-22.4340",
          wins: [
            "A hot tub on the last night in Iceland, which is the one thing the south coast cabin did not have.",
            "Ten minutes to Blue Lagoon instead of twenty, so Saturday's 9am slot gets an even gentler start.",
            "An entire one-bedroom house rather than a room, and a midnight-to-11am checkout window so nothing rushes you.",
            "Grindavík sits inside the Reykjanes lava fields, which makes aurora night 4 a step outside the door rather than a drive."
          ],
          confirmOnArrival: [
            "READ THIS FIRST: Grindavík is the town the plan told you to avoid. It has been repeatedly evacuated since the Sundhnúkur eruptions began in November 2023, fissures have opened inside the town itself, and the Met Office considers another intrusion the most likely outcome. This booking is non-refundable and already paid, so the money is committed - what is not committed is having a fallback.",
            "DECISION: no backup bed. The risk is accepted - if Grindavík closes you rebook on the day, and October is off-season with real supply in both Reykjanesbær and Reykjavík. What follows is the Plan B, worth reading once now rather than composing at 5pm on your last Friday.",
            "Plan B, and it is more coherent than it sounds. The same closure that takes Grindavík almost certainly shuts Blue Lagoon, and the Blue Lagoon fallback is Sky Lagoon - which is in Reykjavík. So an evacuation pushes both decisions the same way: sleep in Reykjavík, swim at Sky Lagoon in the morning, drive the 45 minutes to KEF. That still lands comfortably ahead of a 4:25pm flight.",
            "Check almannavarnir.is weekly from late September, then the night before and the morning of the 16th. With no backup booked, this check is the plan - it is the difference between rebooking calmly from the cabin and finding a road closed.",
            "Keep the bags packed rather than spread out. It is one night, and if an evacuation comes at 2am you want to leave in five minutes.",
            "Arrange key pickup with the host now. The confirmation says to contact them to find out where the keys are and what time to arrive, and Grindavík is largely depopulated - this is not somewhere to improvise at 8pm.",
            "Do not count on fuel or food in Grindavík. Fill the tank in Reykjanesbær or on Route 41 on the way in, and bring dinner with you."
          ]
        },
        searchIn: [
          "Reykjanesbær - the municipality covering Keflavík and Njarðvík",
          "Keflavík harbour, which is the nicest part of it",
          "Ásbrú, the old NATO base by the airport - functional, cheap, very close"
        ],
        avoid: [
          "GRINDAVÍK. It is closer to Blue Lagoon, and it has been repeatedly evacuated since the 2023 eruptions began. Do not book there.",
          "Reykjavík - it is 45 minutes from the lagoon and undoes the reason you drove out here"
        ],
        criteria: [
          "Free parking, which is universal out here.",
          "This is the line most likely to come in under its placeholder. Off-season Reykjanesbær is cheap, so take the savings rather than upgrading.",
          "Book it refundable. If Svartsengi is erupting you are rebooking to Sky Lagoon and want to be near Reykjavík instead.",
          "Fill the fuel tank in town on Friday night, not on Saturday morning."
        ] }
    ],
    notes: [
      "Nothing left to book. The Grindavík night carries a known, accepted volcano risk and a same-day Plan B rather than a backup reservation - see that entry.",
      "Refundable where the plan is still moving: Reykjanesbær because of the volcano, and Paddington if you are still weighing the Courtyard.",
      "Work covers Fri Oct 9 and Sat Oct 10 at the Courtyard Heathrow, and Sat Oct 17 is spent flying. Neither needs booking."
    ]
  },

  /* --- Ben's work leg: booked and paid by work, Oct 3-11 -------------------- */
  /* These are real confirmations, not placeholders. They are here so the whole
     trip lives in one place and so the Oct 9-11 overlap with Sarah is visible. */
  workLeg: {
    lede: "Ben is in England from Oct 3 on a work trip. Everything below is booked and paid by work. It matters to the shared trip in two places: Ben is already on the ground when Sarah lands, and the Courtyard Heathrow covers Saturday Oct 10 for both of you.",
    flights: [
      { label: "Sat Oct 3 - UA1400", route: "Madison MSN 2:49pm to Chicago ORD 4:00pm, Terminal 1",
        meta: "1h 11m, Boeing 737-900. United" },
      { label: "Sat Oct 3 - UA920", route: "Chicago ORD 6:05pm, Terminal 1, to London LHR 8:30am Sun Oct 4, Terminal 2",
        meta: "8h 25m, Boeing 767. United. Seats not assigned yet - United is monitoring until departure day" },
      { label: "Sat Oct 17 - FI853", route: "Keflavík KEF 4:25pm to Chicago ORD 6:15pm, Terminal 5",
        meta: "6h 50m, Boeing 737 MAX. Same flight as Sarah. Seat status UN - unassigned" }
    ],
    hotels: [
      { label: "Novotel Ipswich", dates: "Sun Oct 4 3:00pm to Tue Oct 6 - 2 nights",
        address: "Grey Friars Road, Ipswich IP1 1UP", phone: "+44 1473 232400",
        rate: "GBP 185/night, approx GBP 257 total",
        cxl: "Free until 1 day before arrival; after that the first night is charged",
        maps: "Novotel Ipswich, Grey Friars Road, Ipswich IP1 1UP", ll: "52.0553,1.1478" },
      { label: "Novotel Bristol Centre", dates: "Tue Oct 6 2:00pm to Wed Oct 7 - 1 night",
        address: "Victoria Street, Bristol BS1 6HY", phone: "+44 117 9769988",
        rate: "GBP 154/night, approx $208 USD",
        cxl: "Free until 1 day before arrival",
        maps: "Novotel Bristol Centre, Victoria Street, Bristol BS1 6HY", ll: "51.4515,-2.5893" },
      { label: "Hotel Indigo Exeter", dates: "Wed Oct 7 3:00pm to Fri Oct 9 - 2 nights",
        address: "3 Catherine Street, Exeter EX1 1EU", phone: "+44 1392 301801",
        rate: "GBP 105/night, approx $142 USD",
        cxl: "Cancel by 4:00pm Tue Oct 6 or forfeit the first night",
        maps: "Hotel Indigo Exeter, 3 Catherine Street, Exeter EX1 1EU", ll: "50.7228,-3.5305" },
      { label: "Courtyard Heathrow Marriott", dates: "Fri Oct 9 3:00pm to Sun Oct 11 - 2 nights, Sarah on it from Saturday",
        address: "1 Nobel Drive, Harlington, Hayes UB3 5EY", phone: "+44 203 9885000",
        rate: "GBP 148.75/night, approx $201 USD - work-paid, so $0 to you",
        cxl: "Free up to 1 day before arrival; after that GBP 148.75",
        maps: "Courtyard by Marriott London Heathrow Airport, 1 Nobel Drive, Harlington, Hayes UB3 5EY", ll: "51.4934,-0.4192",
        key: true }
    ],
    notes: [
      "Confirmation numbers are deliberately not in this file - it is a public repository. They are in your work travel email, and you can copy them into the Confirmations tab, which stays on your phone.",
      "The reservations are written for 1 adult. Tell the Courtyard that Sarah is joining before you arrive on the 9th, not at the desk on the 10th.",
      "The Courtyard is about 2 miles north of the terminals. That is the whole reason Sarah cabs there directly instead of being met at arrivals.",
      "Work's last covered night is Saturday Oct 10. From Sunday morning the lodging is out of pocket, which is why the London budget is now 2 nights and not 3.",
      "Ben flies out of Madison on Oct 3 but lands back at O'Hare on Oct 17. His car cannot sit in the MSN lot - he needs a drop-off."
    ]
  },

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
          "Booked: 1:00pm endowment session, Saturday Oct 10. Be at the recommend desk by 12:30. Bring your own temple clothing; rental is available on site.",
          "Closed Sundays and Mondays, which is why Saturday is the only day a session fits this trip.",
          "Bring both recommends."
        ]}
    ]
  },

  /* --- appendix: Tuesday temple session variant ---------------------------- */
  variant: {
    title: "Why the London days are in this order",
    lede: "The order is forced by a handful of fixed constraints, and it is worth knowing which ones so you do not accidentally undo it.",
    points: [
      "The temple is closed Sunday and Monday, and Tuesday is the 7:50am flight to Keflavík. Saturday is the only day in the London window when a session is possible at all - so the session drives the day Sarah lands, not the other way round. It is booked for 1:00pm, which is late enough to give her a shower and an hour lying down first.",
      "Saturday night is at the Courtyard Heathrow because work already paid for it. That is why Saturday runs airport-temple-airport instead of ending in town, and why the London room is only two nights.",
      "Church is Sunday morning and does not move, which puts the Thames walk in Sunday afternoon. That works because the whole walk is outdoors and free and reads fine in fading light; sunset is 6:10pm.",
      "Monday is the only day the two great interiors are open to visitors. Westminster Abbey and St Paul's both close to sightseeing on Sundays, so yesterday could only walk past them - which is what makes Monday worth more than a second outdoor day.",
      "Hamilton is Monday because it is the only evening show that exists this week. Harry Potter, the Lion King and Wicked are all dark on Mondays and matinee-only on Sundays, and Hamilton is dark Sunday. One evening, one show, and it happened to be the first choice.",
      "The cost is sleep: curtain down at 10:15pm against a 5:15am car to Terminal 5. That is why the car is booked rather than hoped for, and why Monday ends with an early dinner instead of a late one.",
      "Paddington is the base for Sunday and Monday because it is the only district that serves all three days: a direct Elizabeth line train in from Heathrow, 12 minutes to church, 15 minutes to the theatre, and the only station with trains reaching Terminal 5 early enough on Tuesday.",
      "What this replaced: the old plan put the session on Tuesday morning, which meant flying to Iceland out of Gatwick, landing in the evening, and pushing the entire Reykjanes afternoon onto an already-full Friday. BA800 out of Heathrow T5 is now booked, so that variant would also mean rebuying a flight. The Saturday session costs Iceland nothing and is strictly better."
    ]
  }
};

if (typeof window !== "undefined") { window.TRIP = TRIP; }
