// -----------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------

// Create head to head first
// This will put it on top of events table
new HeadToHead("Head-to-Head", 200);

// Create all events
events = [];

events.push(new Event("C Class Finale: " +
                      roadCircuits[1].name + " Circuit",
                      events.length,
                      "Complete this event to unlock B class! " +
                      "Podium placements are rewarded with a " +
                      "discount on a new car purchase!",
                      roadCircuits[1].name + " Circuit",
                      "168 353 490",
                      "road", "prog", "double", 600));

events.push(new Event("C Class Finale: " +
                      dirtScrambles[2].name + " Scramble",
                      events.length,
                      "Complete this event to unlock B class! " +
                      "Podium placements are rewarded with a " +
                      "discount on a new car purchase!",
                      dirtScrambles[2].name + " Scramble",
                      "138 618 342",
                      "dirt", "prog", "double", 600));

events.push(new Event("B Class Finale: " +
                      roadCircuits[11].name + " Circuit",
                      events.length,
                      "Complete this event to unlock A class! " +
                      "Podium placements are rewarded with a " +
                      "discount on a new car purchase!",
                      roadCircuits[11].name + " Circuit",
                      "628 612 139",
                      "road", "prog", "double", 700));

events.push(new Event("B Class Finale: " +
                      dirtScrambles[7].name + " Scramble",
                      events.length,
                      "Complete this event to unlock A class! " +
                      "Podium placements are rewarded with a " +
                      "discount on a new car purchase!",
                      dirtScrambles[7].name + " Scramble",
                      "462 558 415",
                      "dirt", "prog", "double", 700));

events.push(new Event("Grand Finale: The Colossus",
                      events.length,
                      "This is the final event, prepare accordingly!",
                      "The Colossus",
                      "120 289 492",
                      "road", "prog", "double", 800));

events.push(new Event("Grand Finale: The Gauntlet",
                      events.length,
                      "This is the final event, prepare accordingly!",
                      "The Gauntlet",
                      "757 020 992",
                      "dirt", "prog", "double", 800));

events.push(new Event("Classic Muscle: Gran Pantano Sprint",
                      events.length,
                      "Bring your Classic Muscle car " +
                      "to this power showdown!",
                      "Gran Pantano Sprint",
                      "935 382 632",
                      "both", "spec", "normal",
                      600, [[7, 3], [8, 2], [10, 7]]));

events.push(new Event("Group A Touring: Sierra Verde Sprint",
                      events.length,
                      "Bring your DTM legend " +
                      "to this road racing showdown!",
                      "Sierra Verde Sprint",
                      "306 811 911",
                      "road", "spec", "normal",
                      650, [[3, 2], [10, 3], [10, 4], [21, 2], [32, 1]]));

events.push(new Event("Fast and Furious: Tunnel Run",
                      events.length,
                      "Join the Fast and Furious Fan Club " +
                      "for this event! Hero car required, " +
                      "cosplay livery optional.",
                      "Tunnel Run",
                      "167 123 448",
                      "both", "spec", "normal",
                      660, [[1, 1], [5, 1], [7, 3], [8, 2], [10, 7], [19, 1], [23, 3], [24, 2], [29, 4]]));

events.push(new Event("Group A Rally: Bajío Trail",
                      events.length,
                      "Bring your WRC legend " +
                      "to this dirt racing showdown!",
                      "Bajío Trail",
                      "494 070 628",
                      "dirt", "spec", "normal",
                      670, [[23, 1], [28, 1], [29, 5]]));

events.push(new Event("Horizon Colorado: Copper Canyon Sprint",
                      events.length,
                      "Let this event take you back to your first " +
                      "Horizon Festival in Colorado! " +
                      "Featuring (almost) only cars that appeared " +
                      "in the first game in the series.",
                      "Copper Canyon Sprint",
                      "155 764 596",
                      "both", "spec", "normal",
                      770, [[2, 1], [3, 2], [7, 3], [8, 2], [10, 4], [14, 1], [18, 1], [19, 1], [19, 2], [21, 1], [23, 1], [24, 1], [24, 2], [24, 3], [25, 1], [26, 4], [28, 1], [29, 2], [29, 4], [29, 6], [31, 1], [31, 2]]));

events.push(new Event("Endurance: " +
                      roadCircuits[7].name + " Circuit",
                      events.length,
                      "An endurance race of 20 laps " +
                      "of the Horizon Mexico Circuit! " +
                      "Expect this race to take " +
                      "between 20 and 30 minutes.",
                      roadCircuits[7].name + " Circuit",
                      "147 109 808",
                      "road", "endu", "double"));

events.push(new Event("Endurance: " +
                      dirtScrambles[0].name + " Scramble",
                      events.length,
                      "An endurance race of 18 laps " +
                      "of the River Scramble! " +
                      "Expect this race to take " +
                      "between 20 and 30 minutes.",
                      dirtScrambles[0].name + " Scramble",
                      "149 664 189",
                      "dirt", "endu", "double"));

events.push(new Event("American All-Stars: Dunas Blancas Sprint",
                      events.length,
                      "An all American road racing showdown!",
                      "Dunas Blancas Sprint",
                      "719 725 279",
                      "road", "spec", "normal",
                      780, [[5, 1], [6, 1], [7, 2], [7, 3], [8, 1], [8, 2], [10, 1], [10, 2], [10, 3], [10, 4], [10, 7], [25, 1]]));

events.push(new Event("American All-Stars: Baja California Trail",
                      events.length,
                      "An all American dirt racing showdown!",
                      "Baja California Trail",
                      "165 262 645",
                      "dirt", "spec", "normal",
                      780, [[5, 1], [6, 1], [7, 2], [7, 3], [8, 1], [8, 2], [10, 1], [10, 2], [10, 3], [10, 4], [10, 7], [25, 1]]));

events.push(new Event("European All-Stars: Llanura Sprint",
                      events.length,
                      "An all European road racing showdown!",
                      "Llanura Sprint",
                      "141 574 519",
                      "road", "spec", "normal",
                      780, [[2, 1], [3, 1], [3, 2], [9, 1], [14, 1], [18, 1], [21, 1], [21, 2], [22, 1], [26, 1], [26, 2], [26, 4], [27, 1], [31, 1], [31, 2], [32, 1]]));

events.push(new Event("European All-Stars: Fuera del Camino Trail",
                      events.length,
                      "An all European dirt racing showdown!",
                      "Fuera del Camino Trail",
                      "137 089 941",
                      "dirt", "spec", "normal",
                      780, [[2, 1], [3, 1], [3, 2], [9, 1], [14, 1], [18, 1], [21, 1], [21, 2], [22, 1], [26, 1], [26, 2], [26, 4], [27, 1], [31, 1], [31, 2], [32, 1]]));

events.push(new Event("Japanese All-Stars: Riviera Sprint",
                      events.length,
                      "An all Japanese road racing showdown!",
                      "Riviera Sprint",
                      "957 580 514",
                      "road", "spec", "normal",
                      780, [[1, 1], [11, 1], [11, 2], [11, 3], [17, 1], [17, 2], [19, 1], [19, 2], [19, 3], [23, 1], [23, 2], [23, 3], [24, 1], [24, 2], [24, 3], [28, 1], [29, 1], [29, 2], [29, 3], [29, 4], [29, 5], [29, 6]]));

events.push(new Event("Japanese All-Stars: Tulum Trail",
                      events.length,
                      "An all Japanese dirt racing showdown!",
                      "Tulum Trail",
                      "118 732 056",
                      "dirt", "spec", "normal",
                      780, [[1, 1], [11, 1], [11, 2], [11, 3], [17, 1], [17, 2], [19, 1], [19, 2], [19, 3], [23, 1], [23, 2], [23, 3], [24, 1], [24, 2], [24, 3], [28, 1], [29, 1], [29, 2], [29, 3], [29, 4], [29, 5], [29, 6]]));

events.push(new Event("Showcase: Vintage Hatchbacks",
                      events.length,
                      "A folkrace event on the Horizon Baja Scramble! " +
                      "The Horizon Festival will lend you one of these " +
                      "old beat up, race prepped cars for the event. " +
                      "Prize money will only be given out for podium " +
                      "placements, so don't hesitate to get dirty! " +
                      "\n\nNote that the difficulty starts at 60% " +
                      "to offset the difference in launch between " +
                      "you and the drivatars!",
                      "Horizon Baja Scramble 7L",
                      "225 814 856",
                      "both", "show", "podium",
                      0, [[10, 5], [11, 4], [31, 3]],
                      "vintageHatch"));

events.push(new Event("Showcase: Fairlady vs. 2000GT",
                      events.length,
                      "A showcase race on the Horizon Mexico Circuit! " +
                      "The Horizon Festival will lend you one of these " +
                      "pristine stock cars for the event, " +
                      "try not to damage it too much! " +
                      "Prize money will be given out to all placements " +
                      "for this event.",
                      "Horizon Mexico Circuit 7L",
                      "180 247 097",
                      "both", "show", "all",
                      0, [[24, 4], [29, 8]],
                      "vintageSport"));

events.push(new Event("Showcase: Vintage Explorers",
                      events.length,
                      "Explore the Mexican countryside in your choice " +
                      "of old 4x4 offroaders, " +
                      "courtesy of the Horizon Festival!",
                      "The Titan",
                      "169 663 287",
                      "both", "show", "double",
                      0, [[10, 6], [13, 1], [29, 7]],
                      "vintageExplorer"));

events.push(new Event("Showcase: 80s Supercars",
                      events.length,
                      "A top secret invitation to test drive these " +
                      "80s dream supercars! " +
                      "Take them out in the middle of the night to " +
                      "avoid any attention. " +
                      "Also, try to avoid damaging these " +
                      "expensive poster cars!",
                      "The Marathon",
                      "894 091 504",
                      "both", "show", "double",
                      0, [[9, 3], [15, 2], [26, 3]],
                      "80Super"));

events.push(new Event("Showcase: 90s Supercars",
                      events.length,
                      "Take a lap around the Goliath " +
                      "in your favourite 90s supercar, " +
                      "courtesy of the Horizon Festival! " +
                      "Prize money will be given out to all placements " +
                      "for this event, so be extra careful " +
                      "with these priceless supercars.",
                      "The Goliath",
                      "509 774 586",
                      "both", "show", "all",
                      0, [[4, 1], [9, 2], [14, 2], [15, 1], [20, 1]],
                      "90Super"));

let roadStart = events.length;
for (let t = 0; t < roadCircuits.length; t++) {
    events.push(new Event(roadCircuits[t].name + " Circuit",
                          events.length,
                          "Finish in the top half to get prize money!",
                          roadCircuits[t].name + " Circuit",
                          roadCircuits[t].sharecode,
                          "road"));
}

let dirtStart = events.length;
for (let t = 0; t < dirtScrambles.length; t++) {
    events.push(new Event(dirtScrambles[t].name + " Scramble",
                          events.length,
                          "Finish in the top half to get prize money!",
                          dirtScrambles[t].name + " Scramble",
                          dirtScrambles[t].sharecode,
                          "dirt"));
}

// Loan cars... this is a bit dirty but ok for now
let loanCars = new Map();
loanCars.set("vintageHatch", {pi: 600, rep: 10000 / 200});
loanCars.set("vintageSport", {pi: 500, rep: 50000 / 200});
loanCars.set("vintageExplorer", {pi: 500, rep: 20000 / 200});
loanCars.set("80Super", {pi: 800, rep: 120000 / 200});
loanCars.set("90Super", {pi: 810, rep: 200000 / 200});

// Initialize page
// yymmdd of latest news post
let news = 230716;

// Initialize state
let state = {};

// Initialize start game variables
let startPlayerName = "";
let startCarName = "";
let startCarMake = 0;
let startCarModel = 0;

// Go to start or game
if (JSON.parse(localStorage.getItem("state")) === null) {
    eStart.style.display = "block";
} else {
    eGame.style.display = "block";
    setStateFromString(localStorage.getItem("state"));
}
