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
    structure: "Ben is already in England from Oct 3 on a work trip and moves to the Courtyard Heathrow on Fri Oct 9. Sarah flies Fri Oct 9, lands Sat Oct 10 and cabs straight to that hotel. 3 nights England (Oct 10, 11, 12): 1:00pm endowment session Saturday, church and the Thames walk Sunday, Westminster Abbey and Hamilton Monday. Saturday is at the work-paid Courtyard Heathrow with a one-day rental car; Sunday and Monday are in Paddington. Then 4 nights Iceland (Oct 13, 14, 15, 16), ending with Blue Lagoon on the way to the airport. Home late Saturday Oct 17.",
    flightsNote: "Ben's MSN-ORD-LHR flights out, the KEF-ORD flight home, and every hotel night from Oct 3 through the morning of Oct 11 are booked and paid by work - including Sat Oct 10, which is a free night for both of you. Everything costed here is out of pocket: Sarah's airfare, London lodging from Oct 11, all of Iceland, getting to and from O'Hare, and covering the kids at home."
  },

  /* --- the must-do list, shown as a grid ----------------------------------- */
  mustDo: [
    { item: "West End show",              when: "Mon Oct 12 - Hamilton, 7:30pm" },
    { item: "Big Ben / London classics",  when: "Sun Oct 11 afternoon" },
    { item: "LDS temple",                 when: "Sat Oct 10 - 1:00pm endowment, Newchapel (booked)" },
    { item: "Aurora hunting",             when: "All four Iceland nights" },
    { item: "Stargazing",                 when: "Wed-Fri, rural south Iceland" },
    { item: "Icelandic horses",           when: "Fri Oct 16 - farm visit, no riding" },
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
          dur: "Work day ends, trip begins",
          detail: "Then Paddington to the Courtyard: the Elizabeth line to Heathrow is about 30 minutes, then a taxi or the Hoppa shuttle the last two miles.",
          maps: "Hotel Indigo Exeter, 3 Catherine Street, Exeter EX1 1EU", ll: "50.7228,-3.5305" },
        { time: "11:00am", name: "Sarah leaves Madison for O'Hare",
          book: ["tw13", "tw21"],
          travel: "Drive, Madison to ORD, about 2.5 hrs",
          dur: "Budget 3.5 hrs door to gate",
          detail: "The 2.5 hours of driving is the predictable part. Parking, the shuttle from the lot to the terminal, and the bag drop are what actually eat the buffer, so aim to be at the terminal by 2:25pm for a 4:25pm departure.",
          headsUp: "Park for the full Oct 9-17 window. You both fly back into O'Hare together on FI853 on the 17th, so this car is the ride home for two." },
        { time: "3:00pm UK", name: "Ben checks into the Courtyard Heathrow Marriott",
          book: ["tw15"],
          travel: "1 Nobel Drive, Harlington, Hayes UB3 5EY - about 2 miles north of the airport",
          dur: "Two nights, Fri and Sat, both paid by work",
          why: "This is the quiet win in the whole plan. A free bed on Saturday night that happens to be ten minutes from the terminal Sarah lands at, which is why she can go straight there at 8am instead of waiting until a 3pm check-in somewhere in town.",
          detail: "The reservation is written for 1 adult and Sarah is on it from Saturday, so tell the front desk tonight rather than arriving with her tomorrow and sorting it at the desk.",
          maps: "Courtyard by Marriott London Heathrow Airport, 1 Nobel Drive, Harlington, Hayes UB3 5EY", ll: "51.4934,-0.4192" },
        { time: "4:25pm", name: "UA929, O'Hare to Heathrow",
          book: ["tw2"],
          travel: "Nonstop, Boeing 767-300",
          dur: "8h 20m in the air, lands 6:45am Saturday",
          detail: "First checked bag is included; a second is $120. Sleep on this flight is worth more than the movie - tomorrow is an endowment session on landing day, and how well she sleeps here is most of whether that goes well.",
          headsUp: "Pack the temple clothing and both recommends where they are reachable, not at the bottom of a checked bag. There are only about two hours at the hotel between her cab and the car to Newchapel." },
        { time: "Evening", name: "Collect the rental car at Heathrow",
          book: ["tw16"],
          travel: "Hop to the terminal, rental desks are in the arrivals halls",
          dur: "45-60 min including the desk and the walk to the lot",
          why: "Tonight, not tomorrow morning. The desk queue and the paperwork are 45 minutes you do not want sitting between Sarah's nap and a 1:00pm session. Collected tonight, the car is in the hotel car park and tomorrow you simply get in and drive.",
          detail: "One day covers it - out Saturday morning, back Saturday evening. Take the excess waiver. Confirm the car is ULEZ-compliant; Heathrow is inside the zone and any modern car qualifies, but get it in writing rather than assuming.",
          headsUp: "This is your first driving of the trip, on the left, on the M25, against a fixed appointment. Knowing where the car is parked and how the lights work tonight is worth a lot at 10:45am tomorrow." },
        { time: "Evening", name: "Ben: set up Sarah's ride from the terminal",
          book: ["tw18"],
          dur: "15 minutes of planning, tonight not at 5am",
          detail: "Her ride from Terminal 2 arrivals to the hotel at about 7:45am. Send her the hotel address and the confirmation number so she is not reading a booking email on airport wifi.",
          headsUp: "Sarah is arriving into a country she has not been in, on no sleep, to a hotel booked in your name. Send the address, the confirmation number, the room number and a photo of the front of the building. That is the difference between a ten-minute cab and a bad forty-five minutes." }
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
          dur: "Allow 45-60 min for immigration and bags",
          detail: "United uses Terminal 2. Confirm the terminal on the day. Ben is not meeting her here - the plan is that she walks out and gets in a cab.",
          maps: "Heathrow Terminal 2 arrivals, London", ll: "51.4700,-0.4520" },
        { time: "7:45am", name: "Sarah: cab straight to the Courtyard Heathrow",
          book: ["tw18"],
          travel: "Black cab, Uber, or the Heathrow Hoppa shuttle - about 2 miles",
          dur: "10-15 min",
          why: "The hotel is close enough that being met at arrivals would cost an hour and buy nothing. Ben is already in the room with the kettle on.",
          detail: "1 Nobel Drive, Harlington, Hayes UB3 5EY. Roughly 20-25 GBP by cab, less on the Hoppa if it serves this hotel - confirm which before the day. Have the address, the confirmation number and the room number on her phone before she lands, because airport wifi at 7am is not the moment to go looking for them.",
          maps: "Courtyard by Marriott London Heathrow Airport, 1 Nobel Drive, Harlington, Hayes UB3 5EY", ll: "51.4934,-0.4192",
          headsUp: "She will have been awake around 20 hours and will be paying in a currency she has not used yet. Set the ride up in advance if you can rather than leaving her to hail one." },
        { time: "8:15am", name: "Breakfast, shower, and one hard-stop nap",
          travel: "You are here",
          dur: "About 2hr 30min before the car",
          why: "This is the buffer the 1:00pm session bought you, and the temptation will be to fritter it. Spend it deliberately: food, a shower, and a horizontal hour.",
          detail: "Set an alarm for 10:30am and treat it as non-negotiable. An open-ended nap on landing day is how people lose the afternoon. Change into temple clothes or pack them ready before the car comes.",
          area: true },
        { time: "11:00am", name: "Drive to Newchapel",
          book: ["tw16"],
          travel: "Your own rental car, about 45 miles clockwise on the M25",
          dur: "1 hr to 1hr 15min - build in the longer number",
          why: "The car beats every alternative here. By rail this is Heathrow into central London, across to Victoria, out to Lingfield, then a taxi anyway - about two and a half hours with three changes on no sleep. And your own keys beat a hired car twice over: no return pickup to arrange in rural Surrey, and no clock running while you are inside.",
          detail: "Leaving at 11:00 puts you there around 12:15 for a 1:00pm session, which is the right amount of early. The M25 anticlockwise on a Saturday is the one thing that could eat this margin, so leave on time rather than at 11:20.",
          maps: "London England Temple, West Park Road, Newchapel, Lingfield, Surrey RH7 6HW", ll: "51.1608,-0.0497",
          headsUp: "First UK driving of the trip. Left side, roundabouts, and the M25 is busy even on a Saturday. Set the route before you pull out, not at the first junction." },
        { time: "12:15pm", name: "Arrive, recommend desk, and the grounds",
          book: ["tw6", "tw17"],
          travel: "You are here",
          dur: "45 min before the session",
          why: "Dedicated in 1958, this was the first temple in the British Isles and only the second in Europe. The grounds are worth the walk on their own: formal gardens, a large pond, and an oak on site over 450 years old, which President McKay had preserved when he chose the building site.",
          detail: "Check in at the recommend desk by about 12:30 for a 1:00pm endowment. No suitcase problem today - you are back at the same hotel tonight, so the bags never leave the room.",
          maps: "London England Temple, West Park Road, Newchapel, Lingfield, Surrey RH7 6HW", ll: "51.1608,-0.0497" },
        { time: "1:00pm", name: "Endowment session, London England Temple",
          book: ["tw7"],
          travel: "You are here",
          dur: "About 2 hrs including changing",
          why: "Booked, confirmed, and the only day on this trip it could happen - the temple is closed Sunday and Monday, and Tuesday morning is the flight to Keflavík.",
          detail: "West Park Road, Newchapel, Lingfield, Surrey RH7 6HW. Bring your own temple clothing; rental is available on site. Both recommends need to be current.",
          maps: "London England Temple, West Park Road, Newchapel, Lingfield, Surrey RH7 6HW", ll: "51.1608,-0.0497",
          links: [{ label: "Temple schedule and reservations", url: "https://www.churchofjesuschrist.org/temples/details/london-england-temple" }] },
        { time: "4:00pm", name: "Drive back to the Courtyard Heathrow",
          travel: "Back around the M25, and drop the car at the airport on the way in",
          dur: "About 1 hr, in by 5:00pm",
          why: "Saturday night is at the airport hotel, not in town - work is paying for it, and going into central London tonight means unpacking in a place you leave in the morning anyway.",
          detail: "Same room you left this morning, nothing to check into. Return the car at the terminal and take the shuttle or a cab the last two miles, or keep it until the morning if the rate is the same - check which when you book. Tomorrow is when the bags move into London.",
          maps: "Courtyard by Marriott London Heathrow Airport, 1 Nobel Drive, Harlington, Hayes UB3 5EY", ll: "51.4934,-0.4192" },
        { time: "Evening", name: "Dinner, and where depends on how the day went",
          book: ["fs8"],
          travel: "Either walkable from the hotel, or 30 min each way on the Elizabeth line",
          dur: "1.5 hrs, or 3 hrs with the travel",
          why: "Two honest options and the right one is whichever matches how she actually feels at 5pm, not what sounded good in September.",
          detail: "Low-key: the Bath Road hotel strip has the usual pubs and chains within a short walk or a five-minute cab - unremarkable, but she has been awake 30 hours. Worth the trip: Dishoom, Bombay-Irani cafe food in a room done up like a 1940s Bombay tearoom, the most reliably good and reasonable dinner in London. Elizabeth line from Heathrow to Tottenham Court Road is about 30 minutes, so Covent Garden is the branch that makes sense. Book it either way - a Saturday walk-in wait can be over an hour, and you can always cancel.",
          maps: "Dishoom Covent Garden, London", ll: "51.5122,-0.1242",
          alt: true }
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
          dur: "About 50 min door to door",
          why: "This is the only time the bags move on the whole England leg, and it is deliberately the easiest possible version: one direct train from the airport you are already standing in, to a hotel you walk to from the station.",
          detail: "Drop the bags at the Tudor Court, 10-12 Norfolk Square, three to five minutes from the station - check-in is not until 3:00pm but baggage storage is one of their listed services. Then Paddington to South Kensington is about 12 minutes on the Circle or District line. Leave the Courtyard by about 8:00am to make a mid-morning block comfortably.",
          maps: "London Paddington station", ll: "51.5154,-0.1755",
          headsUp: "Paddington is a big station and the Elizabeth line platforms sit well below and away from the main concourse. Note how long that walk actually takes today, because you are doing it in reverse at 5am on Tuesday." },
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
          maps: "Padella, Borough Market, London", ll: "51.5054,-0.0905" },
        { time: "Evening", name: "Check into the Tudor Court Hotel",
          book: ["fs20"],
          travel: "London Bridge to Paddington, about 20-25 min",
          dur: "Two nights, Oct 11 and 12 - booked and paid",
          why: "Three to five minutes from the station, on a garden square set back off Praed Street. A triple room for the two of you, so more space than the night needs.",
          detail: "10-12 Norfolk Square, W2 1RS. Check-in runs 3:00pm to midnight, so arriving after dinner is fine. Already paid in full - if anyone asks for money at the desk, show the confirmation.",
          maps: "Tudor Court Hotel, 10-12 Norfolk Square, London W2 1RS", ll: "51.5147,-0.1757",
          headsUp: "Three things to do at the desk tonight: ask about Elizabeth line engineering works for Tuesday, book the 5:15am car, and set a 4:30am wake-up call. All three are services this hotel actually offers, which is why it was worth paying a little more for a 24-hour front desk." }
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
          book: ["fs6"],
          travel: "Paddington to Westminster, Circle or District line, about 18 min",
          dur: "2 hrs",
          why: "A thousand years of the country's history compressed into one building. Every coronation since 1066 has happened here, on the Coronation Chair you can still see. Seventeen monarchs are buried in it, and so are Newton, Darwin and Hawking - you walk over them. Poets' Corner has Chaucer, Dickens and Hardy. It is the single best Monday-only thing in London, because it is closed to visitors on Sundays for services.",
          detail: "About 30 GBP each. Opens 9:30am Monday - go at opening, because the nave fills by eleven and the Abbey is not a big space for the number of people in it. The included audio guide is genuinely worth using here; without it the floor is just names.",
          maps: "Westminster Abbey, Dean's Yard, London SW1P 3PA", ll: "51.4994,-0.1273",
          headsUp: "Book a timed slot online in advance. Walk-up queues in the cloister are long and outdoors." },
        { time: "11:45am", name: "Walk to the river, and lunch",
          travel: "On foot past Parliament and along Victoria Embankment",
          dur: "About 90 min including lunch",
          why: "You saw all of this from the far bank yesterday. Today you are on the Parliament side, which is the better angle on nothing in particular and a pleasant way to not be indoors between two cathedrals.",
          detail: "Plenty around Westminster and Embankment, though it is tourist-priced. Walk 10 minutes into St James's or up toward Strand and it improves sharply for the same money.",
          maps: "Victoria Embankment, London", ll: "51.5045,-0.1225" },
        { time: "2:00pm", name: "St Paul's Cathedral, and the dome",
          book: ["fs7"],
          travel: "District or Circle to Blackfriars, or a 25-min walk along the Embankment",
          dur: "1.5-2 hrs",
          why: "Wren's dome has been the shape of the London skyline since 1710, and it survived the Blitz when everything around it burned - the photograph of it standing in the smoke is the most famous British image of the war. Inside, the climb is the point: 257 steps to the Whispering Gallery, where a murmur against the wall carries right round, then 528 in total to the Golden Gallery and the best view in the city. Also closed for sightseeing on Sundays, which is why it is today.",
          detail: "About 26 GBP each. The climb is narrow, spiral, and one-way with no bail-out partway - decide at the bottom. The last dome entry is well before closing, so go up first and look at the floor afterwards.",
          maps: "St Paul's Cathedral, London EC4M 8AD", ll: "51.5138,-0.0984",
          headsUp: "If either of you would rather not do 528 steps in a stone spiral, swap this for the British Museum - free, 20 minutes away, and the Rosetta Stone and the Elgin Marbles are not a consolation prize." },
        { time: "4:30pm", name: "Back to Paddington, change, eat early",
          travel: "Circle line from St Paul's or Blackfriars, about 25 min",
          dur: "2 hrs of slack before the theatre",
          why: "You have been on your feet since 9:30 and the show is 2hr 45min sitting down. An hour off your feet and a real dinner beforehand is the difference between enjoying Hamilton and fighting sleep through the second act.",
          detail: "Eat near Paddington or near the theatre - Victoria has plenty within five minutes of the Palace. Norfolk Square is a three-minute walk from the station, so dropping back to change costs you almost nothing. Do not plan to eat afterwards; you are out at 10:15pm with a 5am start coming.",
          area: true },
        { time: "7:30pm", name: "Hamilton, Victoria Palace Theatre",
          book: ["fs18"],
          travel: "Paddington to Victoria, Circle line, about 15 min. Theatre is directly opposite the station",
          dur: "2hr 45min including a 15-min interval, out by 10:15pm",
          why: "The one evening show available to you all week, and the one you wanted. Every other big title - Harry Potter, Lion King, Wicked - is dark on Mondays and matinee-only on Sundays, so this is not a compromise pick, it is the only ticket that exists on the only free evening. Monday is also the cheapest night in its October run.",
          detail: "From 55 GBP each, but that is the restricted-view price - budget 110-180 GBP for two decent seats, plus booking fees. Latecomers are not admitted until a break, so be in your seat by 7:25pm.",
          maps: "Victoria Palace Theatre, Victoria Street, London SW1E 5EA", ll: "51.4961,-0.1425",
          links: [{ label: "London Theatre - Hamilton", url: "https://www.londontheatre.co.uk/" }],
          headsUp: "Book this well ahead. It runs about 93 percent full and the cheap seats go first." },
        { time: "Before bed", name: "Pack, and lock in the morning",
          book: ["fs13"],
          dur: "30 min",
          detail: "Bags packed tonight, not at 4:30am. Confirm the 5:15am car, set two alarms plus the front-desk wake-up call for 4:30am, and put something to eat in the room - nothing is open at Paddington that early and the next food is on the plane. The room has a kettle and a fridge, so tea and breakfast in the room are possible.",
          headsUp: "Curtain down 10:15pm, in bed by about 10:50pm, up at 4:30am. That is a short night before a 3-hour flight and a full first day in Iceland - which is exactly why the car is booked rather than hoped for." }
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
          dur: "At T5 by about 6:00am",
          why: "The deadline that matters is not the 7:50am departure - it is bag drop, which closes 45 minutes before, so about 7:05am. Arriving at 6:00am leaves an hour of genuine slack rather than a sprint.",
          detail: "Booked, not summoned. A scheduled Uber does not reserve a driver; a minicab firm does. Roughly 45-65 GBP - the hotel's partner firm may quote closer to 100, and you are not obliged to take it. Check-out opens at midnight and the desk is staffed round the clock, so just hand the key back on the way past.",
          maps: "Heathrow Terminal 5, London", ll: "51.4723,-0.4885",
          headsUp: "If you would rather take the train: Paddington is three minutes from the hotel door, the Elizabeth line reaches T5 at 05:39 and then 06:06, roughly :06 and :36 past each hour. Check the train actually serves Terminal 5 - most Elizabeth line services terminate at T2&3 or T4 and never get there." },
        { time: "7:50am", name: "BA800, Heathrow T5 to Keflavík",
          book: ["tw3"],
          travel: "You are already at the terminal",
          dur: "3h 5m, lands 9:55am local",
          detail: "Iceland is an hour behind London, so the clock works in your favour. One checked bag each, 23kg.",
          headsUp: "Bag drop closes about 7:05am. Confirm that with BA - it is the standard 45 minutes for European departures, but it is the only time today that is genuinely fixed." },
        { time: "10:30am", name: "Pick up the rental car at KEF",
          book: ["tw4", "fs12"],
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
          book: ["fs5"],
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
          book: ["fs1"],
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
          book: ["fs5"],
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
          book: ["fs3"],
          travel: "10-min drive into Vík",
          dur: "About 1 hr",
          why: "The only show of its kind anywhere. They melt real basalt, quarried from the 1918 Katla eruption, to 1,100C and pour it - glowing orange and moving like honey - into a channel a few metres in front of the seating. You feel the heat come off it on your face, and the smell is the part nobody warns you about. With no eruption running this is the closest you will get to molten rock, and it stands on its own merits either way.",
          detail: "Book ahead; the room is small and October sessions still sell out. Sessions run through the evening, so pick one that gets you back to the guesthouse before full dark for aurora night 3.",
          maps: "Lava Show, Vik, Iceland", ll: "63.4186,-19.0060" },
        { name: "Back to the guesthouse",
          book: ["fs5"],
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
      title: "Hot river + horse farm",
      sun: { sunrise: "8:21am", sunset: "5:54pm" },
      images: ["reykjadalur", "horses"],
      intro: [
        "A long soak in a river you hike to, an hour with the horses, and then a westward drive to set up Saturday morning.",
        "Check out of the south coast guesthouse first thing - you do not come back this way."
      ],
      items: [
        { time: "9:00", name: "Reykjadalur, Hveragerði",
          travel: "50-min drive from the guesthouse, about 65 km west on Route 1",
          dur: "3-4 hrs total: 45-60 min up, 1-1.5 hrs in the water, 40 min down",
          why: "Reykjadalur means Steam Valley and it earns the name - you hike about 2 miles uphill through a green valley with steam venting out of the hillsides around you, and at the top there is a river you sit down in. Hot springs feed it from above and cold water joins from below, so it gets hotter the further upstream you go and you pick your own temperature. Boardwalks, changing screens, and nothing else. This is your non-tourist hot spring, it is completely free, and it is the most Icelandic thing on this itinerary.",
          detail: "Park at the trailhead in Hveragerði. The trail is uphill, muddy, and unshielded from the wind - waterproof boots, not trainers. Bring your own towel; there is nowhere to rent one and you will walk back down wet if you forget.",
          maps: "Reykjadalur trailhead, Hveragerdi, Iceland", ll: "64.0225,-21.2103", image: "reykjadalur" },
        { time: "14:00", name: "Horse farm visit - meet them, don't ride them",
          book: ["fs2"],
          travel: "20-min drive to a farm near Hveragerði or Selfoss",
          dur: "About 1 hr on the ground",
          why: "The breed has been sealed for about a thousand years - Norse settlers brought them in the 9th century and export has been one-way ever since, so a horse that leaves Iceland can never come back. They have five gaits rather than the usual three, including the tölt, a four-beat gait so level the party trick is holding a full drink while riding it. They are small, shaggy, startlingly friendly, and completely unbothered by strangers - which is exactly why a stable visit works as well as a ride.",
          detail: "Plenty of farms around Selfoss and Hveragerði run short guided stable visits with no saddle involved - you meet the herd, hear about the breed and the gaits, and spend the time with your hands on them. Ask for a 'meet the horses' or 'horse farm visit' rather than a riding tour; expect 3,000-6,000 ISK each rather than the 12,000+ a ride costs. Book ahead anyway, because the small farms are not staffed for walk-ins in October.",
          maps: "Selfoss, Iceland", ll: "63.9333,-21.0000", area: true, image: "horses",
          headsUp: "Do not feed them, however much they ask. Iceland runs strict equine biosecurity - the herd has no immunity to anything from outside - and hand-feeding also makes them nippy with the next visitor. Flat palm, approach from the side, scratch the neck rather than the face.",
          sub: [
            "Free fallback: Icelandic horses stand at roadside fences all along the south coast, and greeting them over a fence is normal and welcome. Pull fully off the road, never into a field, and the same no-feeding rule applies.",
            "If you want something more structured, Friðheimar near Reykholt pairs a horse stable with a tomato-greenhouse restaurant and a short show about the breed. It is genuinely good, but it sits on Wednesday's Golden Circle route rather than today's, and Wednesday has no slack in it."
          ] },
        { time: "17:00", name: "Drive to the Keflavík area",
          book: ["fs15", "fs5"],
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
          book: ["fs14", "wo8"],
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
          book: ["tw2", "tw14"],
          travel: "Nonstop Icelandair, Boeing 737 MAX",
          dur: "6h 50m, lands ORD 6:15pm at Terminal 5",
          detail: "You are both on this flight - Ben's seat is work-booked through Icelandair. One checked bag included. Then Sarah's car out of the O'Hare lot and about 2.5 hours to Madison, so realistically home around 10pm.",
          headsUp: "Same flight resolves the old open question: one rental car return, one check-in, no splitting up at KEF. It also means Ben lands at O'Hare and not Madison - so whatever gets him to MSN on Oct 3 cannot be his own car left in the Madison lot, because he is not coming back to it." }
      ],
      notes: [
        { label: "If Blue Lagoon is closed", text: "It sits at Svartsengi, in the middle of the Reykjanes eruption zone, and it has closed for days at a time during past eruptions. Sky Lagoon in Reykjavík is the fallback: about 45 minutes from KEF, arguably the better building, with an ocean edge. Check almannavarnir.is the night before and rebook from the guesthouse rather than driving out to find a barrier across the road." },
        { label: "If you skip the water entirely", text: "If Tuesday ran short, Gunnuhver and the Bridge Between Continents are both more or less on the way back to the airport, and free." },
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
        { id: "flt-sarah",   label: "Sarah ORD-LHR + KEF-ORD",       planned: 900 },
        { id: "flt-lhrkef",  label: "LHR-KEF x2",                    planned: 300 }
      ]},
      { id: "lodging", label: "Lodging (6 paid nights of 7)", lines: [
        { id: "lod-london",  label: "Tudor Court, Paddington x2 (booked)", planned: 356 },
        { id: "lod-rvk",     label: "Reykjavík x1",             planned: 200 },
        { id: "lod-south",   label: "South Iceland guesthouse x2",   planned: 340 },
        { id: "lod-kef",     label: "Keflavík x1",              planned: 180 }
      ]},
      { id: "transport", label: "Transport", lines: [
        { id: "trn-car",     label: "Iceland rental car, 5 days (Oct 13-17)", planned: 425, estimate: true },
        { id: "trn-parkord", label: "O'Hare parking, Oct 9-17",       planned: 170, estimate: true },
        { id: "trn-msnord",  label: "Madison to O'Hare and back",     planned: 60,  estimate: true },
        { id: "trn-lhrcar",  label: "5:15am car, Paddington to T5",   planned: 70,  estimate: true },
        { id: "trn-fuel",    label: "Fuel",                          planned: 140 },
        { id: "trn-london",  label: "London transit",                planned: 80 }
      ]},
      { id: "excursions", label: "Excursions (both)", lines: [
        { id: "exc-monday",      label: "Westminster Abbey + St Paul's dome x2",    planned: 150 },
        { id: "exc-glacier",     label: "Into the Glacier from Gullfoss",            planned: 190 },
        { id: "exc-horses",      label: "Horse farm visit x2 (no riding)",           planned: 70 },
        { id: "exc-bluelagoon",  label: "Blue Lagoon, Comfort x2 + luggage hold",     planned: 210, estimate: true },
        { id: "exc-lagoon",      label: "Secret Lagoon",                             planned: 80 },
        { id: "exc-lavashow",    label: "Lava Show, Vík",                       planned: 120 },
        { id: "exc-thingvellir", label: "Þingvellir parking",                   planned: 10 },
        { id: "exc-temple",      label: "Temple day: 1-day rental car + fuel",       planned: 150, estimate: true },
        { id: "exc-westend",     label: "Hamilton x2, Mon Oct 12",                   planned: 190 },
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
      "Planned now runs $5,061 against a $5,000 target, with Paddington booked at a real $356 rather than a $400 placeholder. Dropping Stonehenge freed $220 and turning the horse ride into a farm visit freed $150; Hamilton put back $190 and Monday's two cathedrals $150. Net you are $61 over, which one small decision closes.",
      "Swap St Paul's for the British Museum or the National Gallery, both free: saves $70, and Westminster Abbey is still the centrepiece of the day",
      "Swap Secret Lagoon for a municipal pool like Laugardalslaug, about $12 for both: saves roughly $68, and Blue Lagoon already covers the tourist hot spring twice over",
      "Either of those on its own puts you under target. Both together lands you near $4,970",
      "Trim the Oct 16 lodging - Reykjanesbaer guesthouses run well under the $180 placeholder off-season, and this is the line most likely to come in cheap",
      "Take the Elizabeth line to Terminal 5 instead of the 5:15am car: saves about $55, at the cost of a first-train dependency on the morning of an international flight. Not worth it",
      "Drop the nice dinner, $150 - last resort, not first",
      "Sarah's one-way airfares are still the least predictable number here and could move $300-400 in either direction on their own"
    ],
    cutIfOver: "You are $61 over. Swapping St Paul's for the free British Museum covers it outright and barely changes Monday. After that, the Secret Lagoon swap (~$68). Do not cut Blue Lagoon, the rental car for the temple, Hamilton, or Westminster Abbey - those are the trip. If something still has to give, let it be the $5,000."
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
      { id: "tw5", text: "Book Hamilton for Mon Oct 12, 7:30pm at the Victoria Palace Theatre. It runs about 93 percent full, Monday is the cheapest night in its October run, and the 55 GBP price is restricted view - budget 110-180 GBP for two decent seats", budgetIds: ["exc-westend"] },
      { id: "tw6", text: "Confirm both temple recommends are current - the 1:00pm endowment on Sat Oct 10 is booked and there is no second chance on this trip" },
      { id: "tw7", text: "Save the temple reservation confirmation somewhere offline. Session is booked: 1:00pm endowment, Sat Oct 10, London England Temple, Newchapel. Be at the recommend desk by 12:30", budgetIds: ["exc-temple"] },
      { id: "tw16", text: "Reserve a one-day rental car at Heathrow for the temple trip. Collect it Friday evening so Saturday morning has no desk queue in it; take the excess waiver and confirm it is ULEZ-compliant", budgetIds: ["exc-temple"], extra: true },
      { id: "tw17", text: "Done - no suitcase problem. You sleep at the Courtyard both Friday and Saturday, so the bags never leave the room on temple day", extra: true },
      { id: "tw18", text: "Set up Sarah's ride from Heathrow T2 to the Courtyard for about 7:45am Sat Oct 10, and send her the address, the hotel confirmation number, the room number and a photo of the hotel entrance before she flies", extra: true },
      { id: "tw19", text: "Tell the Courtyard Heathrow that Sarah is on the room for both nights - the work reservation is written for 1 adult", extra: true },
      { id: "tw20", text: "Sort how Ben gets to Madison airport on Oct 3. He returns to O'Hare on the 17th, not Madison, so leaving his own car in the MSN lot does not work - get a drop-off from Sarah", extra: true },
      { id: "tw21", text: "Book Sarah's O'Hare parking, Oct 9-17 (8 nights). Off-site lots run roughly $10-14 a day with a shuttle against $40+ a day in the terminal garage, and prepaying online is cheaper again - the usual names are The Parking Spot, WallyPark and SpotHero. Prepay a reservation rather than turning up, and check the shuttle runs late: you both land at 6:15pm on the 17th and will be collecting the car in the evening", budgetIds: ["trn-parkord"] },
      { id: "tw8", text: "Verify passports are valid at least 6 months past Oct 17, 2026" },
      { id: "tw9", text: "Apply for UK ETA for both of you - the UK has required an Electronic Travel Authorisation from US citizens since January 2025. Confirm the current fee and processing time on gov.uk before paying.", extra: true },
      { id: "tw10", text: "Check whether ETIAS is live for Iceland by October 2026 - the EU has delayed it repeatedly. If it is in force by then, both of you need one for the Schengen area.", extra: true },
      { id: "tw11", text: "Confirm with Mom which dates she can actually cover - ideally Oct 8 through Oct 18, so there is a day of overlap at each end", extra: true },
      { id: "tw12", text: "Book Mom's round-trip flights to Madison", budgetIds: ["home-momflights"], extra: true },
      { id: "tw13", text: "Sarah drives to O'Hare on Oct 9 and parks the full window - you both land back at ORD together on the 17th, so that car is the ride home for two. Book the lot", budgetIds: ["trn-parkord", "trn-msnord"], extra: true },
      { id: "tw14", text: "Done - Ben is on FI853 KEF-ORD, 4:25pm Oct 17, same flight as Sarah, booked through Icelandair. One rental car return, one check-in", extra: true },
      { id: "tw15", text: "Done - work has Ben at the Courtyard Heathrow Marriott, 1 Nobel Drive, Hayes UB3 5EY, for Fri Oct 9 and Sat Oct 10", extra: true },
    ]},
    { id: "four-six", label: "Four to six weeks out", promoteAt: 42, overdueAt: 7, items: [
      { id: "fs1",  text: "Book Into the Glacier - Gullfoss departure, not Reykjavík", budgetIds: ["exc-glacier"] },
      { id: "fs2",  text: "Book a horse farm VISIT near Hveragerði or Selfoss for Fri Oct 16 - ask for a stable visit or 'meet the horses', not a riding tour. Roughly 3,000-6,000 ISK each. Small farms are not staffed for walk-ins in October", budgetIds: ["exc-horses"] },
      { id: "fs3",  text: "Book Lava Show, Vík", budgetIds: ["exc-lavashow"] },
      { id: "fs4",  text: "Done - Tudor Court Hotel, 10-12 Norfolk Square, Paddington. Two nights Oct 11-13, triple room with garden view, GBP 262.75 paid in full. Non-refundable", budgetIds: ["lod-london"] },
      { id: "fs21", text: "Message the Tudor Court through the booking and ask which floor the room is on, and whether there is a lift. No lift is listed and it is a Victorian townhouse - if you are three floors up, ask to be moved lower. You carry the bags down at 4:55am", extra: true },
      { id: "fs20", text: "At Tudor Court check-in on Sunday: ask about Elizabeth line engineering works for Tuesday, confirm the walk to the Elizabeth line and Heathrow Express platforms, book the 5:15am car, and set a 4:30am wake-up call. All four are things this hotel does", extra: true },
      { id: "fs5",  text: "Book the four Iceland beds: Reykjavík x1 (Oct 13), south coast x2 (Oct 14-15, same place), Reykjanesbær x1 (Oct 16). See Where to book on the Info tab - the south coast one has real criteria attached and is the only bed on this trip that is hard to substitute", budgetIds: ["lod-rvk","lod-south","lod-kef"] },
      { id: "fs6",  text: "Book a timed Westminster Abbey slot for 9:30am Mon Oct 12 - go at opening, the nave fills by eleven. About 30 GBP each", budgetIds: ["exc-monday"] },
      { id: "fs7",  text: "Book St Paul's for Mon Oct 12 afternoon, about 26 GBP each - or swap it for the free British Museum and save $70. The dome is 528 one-way spiral steps, so decide before you start", budgetIds: ["exc-monday"] },
      { id: "fs8",  text: "Reserve Dishoom Covent Garden for Sat Oct 10 evening - Saturday nights need booking, and it is cancellable if Sarah would rather eat near the hotel and sleep" },
      { id: "fs18", text: "Done - Hamilton, Mon Oct 12, 7:30pm. Every other big title is dark Mondays and matinee-only Sundays, so this was the only evening show available all week. Still needs actually booking: see tw5", budgetIds: ["exc-westend"], extra: true },
      { id: "fs9",  text: "Notify banks of travel; confirm no foreign transaction fees" },
      { id: "fs19", text: "Sort international phone service for both phones, Oct 9-17. Check what your plan already covers in the UK and Iceland, then add a travel pass or an eSIM. You need data working for vedur.is cloud maps, road.is, offline-map fallback and Mom", extra: true },
      { id: "fs10", text: "Download offline maps for Iceland and southern England" },
      { id: "fs12", text: "Extend the Iceland rental car through Saturday afternoon - it is 5 days now, not 4", budgetIds: ["trn-car"], extra: true },
      { id: "fs13", text: "Book a minicab for 5:15am Tue Oct 13, Paddington to Terminal 5. Use a minicab firm, not a scheduled Uber - scheduling an Uber does not reserve a driver. Roughly 45-65 GBP; cancel free if the trains look clean on Monday", budgetIds: ["trn-lhrcar"], extra: true },
      { id: "fs14", text: "Book Blue Lagoon for Sat Oct 17 - Comfort x2, earliest timed slot, plus the luggage hold. Read the cancellation terms; an eruption closure should be refundable", budgetIds: ["exc-bluelagoon"], extra: true },
      { id: "fs15", text: "Book Oct 16 in Reykjanesbær, NOT Grindavík - Grindavík is closer to Blue Lagoon but has been repeatedly evacuated for the eruptions since 2023. Reykjanesbær is 20 min from the lagoon and 5 from the airport", budgetIds: ["lod-kef"], extra: true },
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
    { id: "cf-lod-rvk",       label: "Reykjavík lodging x1",      fields: ["Name", "Address", "Confirmation", "Check-in / out"] },
    { id: "cf-lod-south",     label: "South Iceland guesthouse x2",    fields: ["Name", "Address", "Confirmation", "Check-in / out"] },
    { id: "cf-lod-kef",       label: "Keflavík lodging x1",       fields: ["Name", "Address", "Confirmation", "Check-in / out"] },
    { id: "cf-car",           label: "Iceland rental car",             fields: ["Company", "Confirmation", "Pickup / return", "Waiver taken?"] },
    { id: "cf-abbey",         label: "Westminster Abbey, Oct 12",      fields: ["Confirmation", "Entry time"] },
    { id: "cf-stpauls",       label: "St Paul's, Oct 12",              fields: ["Confirmation", "Entry time"] },
    { id: "cf-glacier",       label: "Into the Glacier (Gullfoss)",    fields: ["Confirmation", "Meeting point", "Time"] },
    { id: "cf-horses",        label: "Horse farm visit, Oct 16",       fields: ["Farm", "Address", "Confirmation", "Time"] },
    { id: "cf-lavashow",      label: "Lava Show, Vík",            fields: ["Confirmation", "Time"] },
    { id: "cf-bluelagoon",    label: "Blue Lagoon, Oct 17",            fields: ["Confirmation", "Entry time", "Package", "Luggage hold?"] },
    { id: "cf-dishoom",       label: "Dishoom, Oct 10",                fields: ["Location", "Confirmation", "Time"] },
    { id: "cf-temple",        label: "Endowment, 1:00pm Sat Oct 10",   fields: ["Reservation", "Clothing rental?", "Notes"] },
    { id: "cf-templecar",     label: "Rental car, Heathrow, Oct 9-10", fields: ["Company", "Confirmation", "Reg / space", "Return by"] },
    { id: "cf-westend",       label: "Hamilton, Mon Oct 12, 7:30pm",   fields: ["Confirmation", "Seats", "Booking ref", "Notes"] },
    { id: "cf-phone",         label: "International phone / eSIM",     fields: ["Carrier or eSIM", "Plan", "Dates", "Cost"] }
  ],

  /* --- where to book each bed --------------------------------------------- */
  /* Six paid nights. Each entry is a search brief, not a booking: the area to
     filter on, the streets that qualify, what to rule out, and the one or two
     criteria that actually matter for that night. */
  lodging: {
    lede: "Six paid nights. Paddington is booked; the four Iceland beds are not. Oct 10 is work-paid at the Courtyard Heathrow and Oct 17 is spent on a plane. The unbooked entries below are search briefs - filter on the map, not on the hotel's name.",
    stays: [
      { id: "lg-pad", label: "Paddington, London", nights: "Sun Oct 11 - Tue Oct 13 (2 nights)",
        budget: "$180-230 a night", budgetId: "lod-london",
        why: "The only London district that solves all three days at once: a direct Elizabeth line train in from Heathrow on Sunday, 12 minutes to church, 15 minutes to Hamilton, and the only station with trains reaching Terminal 5 early enough on Tuesday.",
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
            "A triple room for two, with a garden view onto Norfolk Square - more space than the Compact Double you were looking at, and set back off Praed Street so it should be quieter.",
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
        budget: "$180-210", budgetId: "lod-rvk",
        why: "You arrive about 5pm off the Reykjanes peninsula, want dinner downtown and aurora night 1 out at Grótta, and leave north-east on Route 36 for Þingvellir in the morning.",
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
        budget: "$160-180 a night", budgetId: "lod-south",
        why: "This is the important one. Aurora nights 2 and 3 happen here, and it is statistically your best chance of the week. It is also the base for Thursday's entire south-coast run, all of which sits east along Route 1.",
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

      { id: "lg-kef", label: "Reykjanesbær", nights: "Fri Oct 16 - Sat Oct 17 (1 night)",
        budget: "$120-180, and likely the cheap end", budgetId: "lod-kef",
        why: "Twenty minutes from Blue Lagoon for the 9am slot and five from the airport. That is the entire job of this bed.",
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
      "London is done. The three Iceland beds are what is left, and they are now the urgent ones - mid-October south-coast guesthouses are a small inventory and the rural aurora-friendly ones go early.",
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
