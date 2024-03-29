// -----------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------

// Create head to head first
// This will put it on top of events table
let headToHead = new HeadToHead("Head-to-Head", 200);

// Create all events
let events = [];
let roadSpecials = [];
let dirtSpecials = [];

const iEventsStart = events.length;
const iRoadsStart = events.length;

for (let t = 0; t < roadCircuits.length; t++) {
    events.push(new Event(roadCircuits[t].name + " Circuit",
        events.length,
        "Finish in the top half to get prize money!",
        roadCircuits[t].name + " Circuit",
        roadCircuits[t].sharecode,
        "road"
    ));
}

const iRoadsEnd = events.length;
const iDirtsStart = events.length;

for (let t = 0; t < dirtScrambles.length; t++) {
    events.push(new Event(dirtScrambles[t].name + " Scramble",
        events.length,
        "Finish in the top half to get prize money!",
        dirtScrambles[t].name + " Scramble",
        dirtScrambles[t].sharecode,
        "dirt"
    ));
}

const iDirtsEnd = events.length;
const iFinalesStart = events.length;

roadSpecials.push(events.length);
events.push(new Event("C Class Finale: " +
    roadCircuits[1].name + " Circuit",
    events.length,
    "Complete this event to unlock B class! " +
    "Podium placements are rewarded with a " +
    "discount on a new car purchase!",
    roadCircuits[1].name + " Circuit",
    "740 564 348",
    "road", "prog", "double", 600
));

dirtSpecials.push(events.length);
events.push(new Event("C Class Finale: " +
    dirtScrambles[2].name + " Scramble",
    events.length,
    "Complete this event to unlock B class! " +
    "Podium placements are rewarded with a " +
    "discount on a new car purchase!",
    dirtScrambles[2].name + " Scramble",
    "157 775 653",
    "dirt", "prog", "double", 600
));

roadSpecials.push(events.length);
events.push(new Event("B Class Finale: " +
    roadCircuits[11].name + " Circuit",
    events.length,
    "Complete this event to unlock A class! " +
    "Podium placements are rewarded with a " +
    "discount on a new car purchase!",
    roadCircuits[11].name + " Circuit",
    "153 714 647",
    "road", "prog", "double", 700
));

dirtSpecials.push(events.length);
events.push(new Event("B Class Finale: " +
    dirtScrambles[7].name + " Scramble",
    events.length,
    "Complete this event to unlock A class! " +
    "Podium placements are rewarded with a " +
    "discount on a new car purchase!",
    dirtScrambles[7].name + " Scramble",
    "655 476 110",
    "dirt", "prog", "double", 700
));

roadSpecials.push(events.length);
events.push(new Event("Grand Finale: The Colossus",
    events.length,
    "This is the final event, prepare accordingly!",
    "The Colossus",
    "920 574 421",
    "road", "prog", "double", 800
));

dirtSpecials.push(events.length);
events.push(new Event("Grand Finale: The Gauntlet",
    events.length,
    "This is the final event, prepare accordingly!",
    "The Gauntlet",
    "833 594 546",
    "dirt", "prog", "double", 800
));

const iFinalesEnd = events.length;
const iShowcasesStart = events.length;

events.push(new Event("<a href=/showcases>Showcase</a>: Vintage Hatchbacks",
    events.length,
    "A folkrace event on the Horizon Baja Scramble! " +
    "The Horizon Festival will lend you one of these " +
    "old beat up, race prepped cars for the event. " +
    "Prize money will only be given out for podium " +
    "placements, so don't hesitate to get dirty!",
    "Horizon Baja Scramble 7L",
    "160 653 933",
    "both", "show", "podium", 0, [],
    "vintageHatches"
));

events.push(new Event("<a href=/showcases>Showcase</a>: Vintage Explorers",
    events.length,
    "Explore the Mexican countryside in your choice " +
    "of race prepped old 4x4 offroaders, " +
    "courtesy of the Horizon Festival!",
    "The Titan",
    "122 617 132",
    "both", "show", "double", 0, [],
    "vintageExplorers"
));

events.push(new Event("<a href=/showcases>Showcase</a>: Fairlady vs. 2000GT",
    events.length,
    "A showcase race on the Horizon Mexico Circuit! " +
    "The Horizon Festival will lend you one of these " +
    "pristine stock cars for the event, " +
    "try not to damage it too much! " +
    "Prize money will be given out to all placements " +
    "for this event.",
    "Horizon Mexico Circuit 7L",
    "909 049 296",
    "both", "show", "all", 0, [],
    "vintageSports"
));

events.push(new Event("<a href=/showcases>Showcase</a>: 80s Supercars",
    events.length,
    "A top secret invitation to test drive these " +
    "80s dream supercars! " +
    "Take them out in the middle of the night to " +
    "avoid any attention. " +
    "Also, try to avoid damaging these " +
    "expensive poster cars!",
    "The Marathon",
    "134 356 221",
    "both", "show", "double", 0, [],
    "super80s"
));

events.push(new Event("<a href=/showcases>Showcase</a>: 90s Supercars",
    events.length,
    "Take a lap around the Goliath " +
    "in your favourite 90s supercar, " +
    "courtesy of the Horizon Festival! " +
    "Prize money will be given out to all placements " +
    "for this event, so be extra careful " +
    "with these priceless supercars.",
    "The Goliath",
    "134 244 466",
    "both", "show", "all", 0, [],
    "super90s"
));

const iShowcasesEnd = events.length;
const iSpecialsStart = events.length;

roadSpecials.push(events.length);
events.push(new Event("Endurance: " +
    roadCircuits[7].name + " Circuit",
    events.length,
    "An endurance race of 20 laps " +
    "of the Horizon Mexico Circuit! " +
    "Expect this race to take " +
    "between 20 and 30 minutes.",
    roadCircuits[7].name + " Circuit",
    "573 804 064",
    "road", "endu", "double"
));

dirtSpecials.push(events.length);
events.push(new Event("Endurance: " +
    dirtScrambles[0].name + " Scramble",
    events.length,
    "An endurance race of 18 laps " +
    "of the River Scramble! " +
    "Expect this race to take " +
    "between 20 and 30 minutes.",
    dirtScrambles[0].name + " Scramble",
    "127 674 272",
    "dirt", "endu", "double"
));

roadSpecials.push(events.length);
events.push(new Event("American All-Stars: Dunas Blancas Sprint",
    events.length,
    "An all American road racing showdown!",
    "Dunas Blancas Sprint",
    "119 459 409",
    "road", "spec", "normal", 780,
    american
));

dirtSpecials.push(events.length);
events.push(new Event("American All-Stars: Baja California Trail",
    events.length,
    "An all American dirt racing showdown!",
    "Baja California Trail",
    "248 931 210",
    "dirt", "spec", "normal", 780,
    american
));

roadSpecials.push(events.length);
events.push(new Event("European All-Stars: Llanura Sprint",
    events.length,
    "An all European road racing showdown!",
    "Llanura Sprint",
    "159 807 312",
    "road", "spec", "normal", 780,
    european
));

dirtSpecials.push(events.length);
events.push(new Event("European All-Stars: Fuera del Camino Trail",
    events.length,
    "An all European dirt racing showdown!",
    "Fuera del Camino Trail",
    "848 026 897",
    "dirt", "spec", "normal", 780,
    european
));

roadSpecials.push(events.length);
events.push(new Event("Japanese All-Stars: Riviera Sprint",
    events.length,
    "An all Japanese road racing showdown!",
    "Riviera Sprint",
    "178 514 573",
    "road", "spec", "normal", 780,
    japanese
));

dirtSpecials.push(events.length);
events.push(new Event("Japanese All-Stars: Tulum Trail",
    events.length,
    "An all Japanese dirt racing showdown!",
    "Tulum Trail",
    "115 320 454",
    "dirt", "spec", "normal", 780,
    japanese
));

roadSpecials.push(events.length);
events.push(new Event("Group A Touring: Sierra Verde Sprint",
    events.length,
    "Bring your DTM legend " +
    "to this road racing showdown!",
    "Sierra Verde Sprint",
    "215 696 071",
    "road", "spec", "normal", 650,
    dtm
));

dirtSpecials.push(events.length);
events.push(new Event("Group A Rally: Bajío Trail",
    events.length,
    "Bring your WRC legend " +
    "to this dirt racing showdown!",
    "Bajío Trail",
    "285 004 086",
    "dirt", "spec", "normal", 670,
    wrc
));

events.push(new Event("Horizon Colorado: Copper Canyon Sprint",
    events.length,
    "Let this event take you back to your first " +
    "Horizon Festival in Colorado! " +
    "Featuring (almost) only cars that appeared " +
    "in the first game in the series.",
    "Copper Canyon Sprint",
    "277 643 292",
    "both", "spec", "normal", 770,
    hc
));

events.push(new Event("Fast and Furious: Tunnel Run",
    events.length,
    "Join the Fast and Furious Fan Club " +
    "for this event! Hero car required, " +
    "cosplay livery optional.",
    "Tunnel Run",
    "146 901 475",
    "both", "spec", "normal", 660,
    fnf
));

events.push(new Event("Classic Muscle: Gran Pantano Sprint",
    events.length,
    "Bring your Classic Muscle car " +
    "to this power showdown!",
    "Gran Pantano Sprint",
    "130 722 040",
    "both", "spec", "normal", 600,
    classicMuscle
));

const iSpecialsEnd = events.length;
const iEventsEnd = events.length;

// Initialize page
// yymmdd of latest news post
let news = 230926;

// Initialize state
let state = {};

// Initialize start game variables
let startPlayerName = "";
let startCarName = "";
let startCarID = 0;

// Go to start or game
if (JSON.parse(localStorage.getItem("state")) === null) {
    eStart.style.display = "block";
} else {
    eGame.style.display = "block";
    setStateFromString(localStorage.getItem("state"));
}
