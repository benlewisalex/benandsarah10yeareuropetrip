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

  /* --- images -------------------------------------------------------------- */
  /* Every image has a designed gradient that renders FIRST and always. The
     photo layers on top only if it actually loads, so a dead network can never
     break the layout. To use your own photo instead, drop a file in docs/img/
     and change `src` to "img/yourfile.jpg" - the service worker will cache it. */
  /* One image left in the app: the Aurora hero. */
  images: {
    aurora: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Aurora%20Iceland.jpg?width=1600",
      alt: "Green aurora curtains rippling over a dark south Iceland landscape under stars.",
      credit: "Sean O Riordan / Wikimedia Commons",
      grad: "radial-gradient(120% 55% at 25% 30%,rgba(63,227,155,.50),transparent 62%),radial-gradient(80% 45% at 78% 16%,rgba(90,200,220,.30),transparent 60%),linear-gradient(180deg,#061A22 0%,#04121A 60%,#020A0E 100%)"
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
          maps: "Big Ben, Westminster, London", ll: "51.5007,-0.1246" },
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
          maps: "Tower Bridge, London", ll: "51.5055,-0.0754" },
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
          maps: "Thingvellir National Park, Iceland", ll: "64.2558,-21.1297" },
        { time: "10:25", name: "Geysir",
          travel: "55 min, about 60 km on Routes 365 and 37",
          mode: "car",
          dur: "45 min",
          detail: "Free. Stand upwind of the pool.",
          maps: "Geysir, Haukadalur, Iceland", ll: "64.3104,-20.3024" },
        { time: "11:20", name: "Gullfoss",
          travel: "10 min, about 10 km",
          mode: "car",
          dur: "30 min",
          detail: "Free, large car park, cafe. The snowmobile truck leaves from this car park, and you are back here at 16:00 if you want longer.",
          maps: "Gullfoss, Iceland", ll: "64.3271,-20.1199" },
        { time: "12:00", name: "Snowmobile on Langjökull, from Gullfoss",
          book: ["fs1"],
          travel: "You are already here - the monster truck leaves from the upper Gullfoss car park",
          mode: "none",
          dur: "4 hrs, about an hour of it riding",
          detail: "Mountaineers of Iceland, 33,500 ISK each. Departures at 12:00 and 14:00. Helmets, overalls, gloves and overshoes provided; wear warm layers and waterproof boots.",
          maps: "Gullfoss upper car park, Iceland", ll: "64.3271,-20.1199",
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
          maps: "Seljalandsfoss, Iceland", ll: "63.6156,-19.9886" },
        { time: "10:45", name: "Skógafoss",
          travel: "20 min, about 25 km further east on Route 1",
          mode: "car",
          dur: "45 min-1 hr",
          detail: "Free, large car park. The base for the photograph, the steps for the coastline view.",
          maps: "Skogafoss, Iceland", ll: "63.5321,-19.5114" },
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
          maps: "Reynisfjara beach, Vik, Iceland", ll: "63.4033,-19.0447",
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
          maps: "Reykjadalur trailhead, Hveragerdi, Iceland", ll: "64.0225,-21.2103" },
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
          maps: "Blue Lagoon, Grindavik, Iceland", ll: "63.8804,-22.4495",
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
    ]}
  ],

  /* --- reference ----------------------------------------------------------- */
  reference: {
    /* Two countries, two numbers. 112 works in both, but 999 is what a British
       operator expects to hear. */
    emergency: [
      { label: "Iceland", value: "112", tel: "112",
        note: "Police, fire and ambulance, anywhere in Iceland." },
      { label: "United Kingdom", value: "999", tel: "999",
        note: "Police, fire and ambulance. 112 also works. For non-urgent medical advice, 111." }
    ],

    /* Each link says what it answers and how often it is worth opening. A
       bookmark with no cadence never gets checked. */
    links: [
      { label: "Road conditions", value: "road.is", url: "https://www.road.is/",
        why: "Closures, ice and surface conditions on the roads you are actually driving.",
        when: "Every Iceland morning, before you set off." },
      { label: "Weather and aurora forecast", value: "vedur.is", url: "https://en.vedur.is/weather/forecasts/aurora/",
        why: "The cloud-cover map and the aurora activity number. Cloud decides the night, not the activity.",
        when: "Each afternoon, to choose where you stand after dark." },
      { label: "Travel safety and alerts", value: "safetravel.is", url: "https://safetravel.is/",
        why: "Trail and area closures, and live hazard alerts.",
        when: "Before the lava fields on the 13th, and before any hike." },
      { label: "Civil protection", value: "almannavarnir.is", url: "https://www.almannavarnir.is/",
        why: "Eruption and evacuation decisions. This is the one that says whether Grindavik and the Blue Lagoon are open.",
        when: "Weekly from late September, then the morning of the 16th and again on the 17th." }
    ],

    embassies: [
      { label: "US Embassy London", address: "33 Nine Elms Lane, London SW11 7US",
        maps: "US Embassy, 33 Nine Elms Lane, London SW11 7US", ll: "51.4805,-0.1300" },
      { label: "US Embassy Reykjavik", address: "Engjateigur 7, 105 Reykjavik",
        maps: "US Embassy, Engjateigur 7, 105 Reykjavik, Iceland", ll: "64.1442,-21.8880" }
    ]
  }
};

if (typeof window !== "undefined") { window.TRIP = TRIP; }
