// -----------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------

const thisVersion = "0.1.0";

const defaultState = {
    version: thisVersion,
    name: "",
    tracks: {roadSprints: true,
             roadCircuits: true,
             dirtTrails: true,
             dirtScrambles: true,
             crossCountrySprints: true,
             crossCountryCircuits: true,
             streetSprints: true},
    hide: {autoshow: false,
           carPass: false,
           hotWheels: false,
           welcome: true,
           barnFind: false},
    dr: 100,
    iDR: 1,
    wins: 0,
    credits: 20000,
    cEvent: null,
    cCar: -1,
    cars: []};

const carList = [
    ["Choose manufacturer", "Choose model"],
    ["Acura", // 1
        {name: "Integra Type R", // 1
         pi: 596,
         cost: 25000,
         year: 2001,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Audi", // 2
        {name: "TT RS Coupé", // 1
         pi: 707,
         cost: 66000,
         year: 2010,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Sport Quattro", // 2
         pi: 638,
         cost: 175000,
         year: 1983,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["BMW", // 3
        {name: "M2 Coupé", // 1
         pi: 718,
         cost: 69000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M3", // 2
         pi: 583,
         cost: 70000,
         year: 1991,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Buick", // 4
        {name: "Regal GNX", // 1
         pi: 564,
         cost: 130000,
         year: 1987,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Chevrolet", // 5
        {name: "Impala Super Sport", // 1
         pi: 509,
         cost: 20000,
         year: 1996,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Corvette ZR-1", // 2
         pi: 693,
         cost: 45000,
         year: 1995,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Camaro Super Sport Coupe", // 3
         pi: 585,
         cost: 110000,
         year: 1969,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: true}],
    ["Dodge", // 6
        {name: "Challenger SRT Hellcat", // 1
         pi: 755,
         cost: 75000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Charger R/T", // 2
         pi: 548,
         cost: 103000,
         year: 1969,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Ferrari", // 7
        {name: "F355 Berlinetta", // 1
         pi: 717,
         cost: 190000,
         year: 1994,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Ford", // 8
        {name: "Mustang GT", // 1
         pi: 756,
         cost: 40000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Focus RS", // 2
         pi: 660,
         cost: 25000,
         year: 2009,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "SVT Cobra R", // 3
         pi: 539,
         cost: 28000,
         year: 1993,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Sierra Cosworth RS500", // 4
         pi: 604,
         cost: 66000,
         year: 1987,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Mustang Boss 302", // 5
         pi: 581,
         cost: 230000,
         year: 1969,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Honda", // 9
        {name: "Civic Type R", // 1
         pi: 727,
         cost: 59000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Civic Type R", // 2
         pi: 553,
         cost: 25000,
         year: 1997,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "NSX-R", // 3
         pi: 691,
         cost: 90000,
         year: 1992,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["HSV", // 10
        {name: "Limited Edition Gen-F GTS Maloo", // 1
         pi: 742,
         cost: 62000,
         year: 2014,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Jaguar", // 11
        {name: "XKR-S", // 1
         pi: 756,
         cost: 100000,
         year: 2012,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Lotus", // 12
        {name: "Elise Series 1 Sport 190", // 1
         pi: 711,
         cost: 81000,
         year: 1999,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Mazda", // 13
        {name: "RX-7", // 1
         pi: 645,
         cost: 35000,
         year: 1997,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "MX-5 Miata", // 2
         pi: 445,
         cost: 25000,
         year: 1994,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Savanna RX-7", // 3
         pi: 558,
         cost: 25000,
         year: 1990,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Mercedes-Benz", // 14
        {name: "C 63 AMG Coupé Black Series", // 1
         pi: 768,
         cost: 150000,
         year: 2012,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "190E 2.5-16 Evolution II", // 2
         pi: 579,
         cost: 150000,
         year: 1990,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Mini", // 15
        {name: "John Cooper Works GP",
         pi: 719,
         cost: 42000,
         year: 2021,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Mitsubishi", // 16
        {name: "Lancer Evolution VI GSR", // 1
         pi: 659,
         cost: 28000,
         year: 1999,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "GTO", // 2
         pi: 610,
         cost: 20000,
         year: 1997,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Eclipse GSX", // 3
         pi: 543,
         cost: 25000,
         year: 1995,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Nissan", // 17
        {name: "370Z", // 1
         pi: 688,
         cost: 40000,
         year: 2010,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Skyline GT-R V-Spec II", // 2
         pi: 657,
         cost: 63000,
         year: 2002,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "240SX SE", // 3
         pi: 445,
         cost: 25000,
         year: 1993,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Fairlady Z 432", // 4
         pi: 482,
         cost: 150000,
         year: 1969,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Pontiac", // 18
        {name: "Firebird Trans AM", // 1
         pi: 418,
         cost: 45000,
         year: 1977,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Porsche", // 19
        {name: "Cayman GTS", // 1
         pi: 767,
         cost: 80000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "944 Turbo", // 2
         pi: 651,
         cost: 35000,
         year: 1989,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "911 Turbo 3.3", // 3
         pi: 666,
         cost: 150000,
         year: 1982,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Renault", // 20
        {name: "Megane R.S.", // 1
         pi: 670,
         cost: 37000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Subaru", // 21
        {name: "Impreza 22B-STI Version", // 1
         pi: 640,
         cost: 110000,
         year: 1998,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Toyota", // 22
        {name: "GR Supra", // 1
         pi: 731,
         cost: 55000,
         year: 2020,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "86", // 2
         pi: 579,
         cost: 28800,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Supra RZ", // 3
         pi: 646,
         cost: 38000,
         year: 1998,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Celica GT-Four ST205", // 4
         pi: 590,
         cost: 20000,
         year: 1994,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Sprinter Trueno GT Apex", // 5
         pi: 480,
         cost: 20000,
         year: 1985,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Volkswagen", // 23
        {name: "Corrado VR6", // 1
         pi: 533,
         cost: 20000,
         year: 1995,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Golf GTI 16V MK2", // 2
         pi: 429,
         cost: 20000,
         year: 1992,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Volvo", // 24
        {name: "242 Turbo Evolution", // 1
         pi: 548,
         cost: 45000,
         year: 1983,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}]];

// Antique: more than 100 years old
// Vintage: 40 - 100 years old
// Retro: 20 - 30 years old

// 2000GT and Fairlady are gold
// Ferrari Dino 246 GT too? E-Type?
//const sportsCars60s = [
//    [76, 26], // Nissan Fairlady Z 1969 D482
//    [100, 19]]; // Toyota 2000GT 1969 D487

// Bronco, Scout, Series III and FJ40 are gold
// Jeep sticks out a little bit but kinda fits still (unless I find a better use for it?)
// Something out in the desert at first?
//const explorers70s = [
//    [33, 45], // Ford Bronco 1975 D421
//    [48, 1], // International Scout 1970 D384
//    [55, 6], // Land Rover Series III 1972 D100
//    [100, 17]]; // Toyota FJ40 1979 D269

// Fiesta, Civic and Golf are gold
// Mini is a bit smaller but works
// FWD only so no Gremlin ? try gremlin! gremlin could go with renault 5
// Try scirocco too!
// I want this to be rallycross folkrace kinda
//const hatchbacks70s = [
//    [33, 42], // Ford Fiesta 1981 D369
//    [41, 15], // Honda Civic 1974 D368
//    [104, 10]]; // Volkswagen Golf MK1 1983 D428

//const rallyGroupA = [
//    [70, 5], // Mitsubishi Evo VI 1999 B659
//    [99, 9], // Subaru Impreza 1998 B640
//    [100, 11], // Toyota Celica 1994 C590

//const supercars90s = [
//    [18, 4], // Bugatti EB110 1992 S805
//    [32, 27], // Ferrari F50 1995 A789
//    [50, 11], // Jaguar XJ220 1993 A786
//    [54, 18], // Lamborghini Diablo 1997 A763
//    [63, 14], // McLaren F1 1993 S817

const roadCircuitsBase = [
    "Bahía de Plano",
    "Arch of Mulegé",
    "Los Jardines",
    "Chihuahua",
    "Tierra Próspera",
    "Playa Azul",
    "Lookout",
    "Horizon Mexico",
    "Emerald",
    "Estadio",
    "Cathedral",
    "Plaza",
    "Bola Ocho"];

const dirtScramblesBase = [
    "River",
    "Mangrove",
    "Mulegé Town",
    "San Juan",
    "Horizon Baja",
    "Teotihuacan",
    "Caldera",
    "La Selva",
    "El Pípila"];

const endurances = [
    "The Goliath",
    "The Colossus",
    "The Gauntlet",
    "The Titan",
    "The Marathon"];

let roadCircuits = [];
for (let i = 0; i < roadCircuitsBase.length; i++) {
    roadCircuits.push(roadCircuitsBase[i] + " Circuit");
}
let dirtScrambles = [];
for (let i = 0; i < dirtScramblesBase.length; i++) {
    dirtScrambles.push(dirtScramblesBase[i] + " Scramble");
}

const classPI = [
    100,
    500,
    600,
    700,
    800,
    900,
    998,
    999];

const classPrize = [
    1, // Will maybe divide by
    5,
    10,
    15,
    20,
    30,
    40,
    50];

const classDR = [
    Math.pow(10, 0),
    Math.pow(10, 3),
    Math.pow(10, 4),
    Math.pow(10, 5),
    Math.pow(10, 6),
    Math.pow(10, 7),
    Math.pow(10, 8),
    Math.pow(10, 8)];

const classLetter = [
    "Invalid!",
    "D",
    "C",
    "B",
    "A",
    "S",
    "H",
    "X"];

const classColor = [
    "black",
    "#00a4ff",
    "#ffaf00",
    "#ff6d12",
    "#ea4e14",
    "#9d56ff",
    "#3460fc",
    "#67b648"];

const positionPrize = [
    0,
    900,
    600,
    400,
    300,
    200,
    100,
    0, 0, 0, 0, 0, 0];

const positionPoints = [
    1,
    20,
    16,
    14,
    12,
    10,
    8,
    6,
    5,
    4,
    3,
    2,
    1];

const positionDR = [
    -1,
    4,
    3,
    3,
    2,
    2,
    1,
    1,
    0,
    0,
    -1,
    -1,
    -1];

const positionName = [
    "DNF",
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th"];

