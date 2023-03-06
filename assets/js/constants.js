// -----------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------

const thisVersion = "0.2.0";

const defaultState = {
    version: thisVersion,
    name: "",
    xp: 1,
    lvl: 1,
    wins: 0,
    road: false,
    dirt: false,
    next: [],
    show: false,
    completed: [],
    money: 0,
    cEvent: null,
    cCar: -1,
    cars: []};

/*
Classic Muscle
Classic Rally
GT Cars
Hot Hatch
Modern Muscle
Modern Sports Cars
Retro Hot Hatch
Retro Muscle
Retro Rally
Retro Saloons
Retro Sports Cars
Retro Supercars
Super Hot Hatch
Super Saloons
Vans and Utility

        {name: "Corrado VR6", // 1
        {name: "Integra Type R", // 1
        {name: "TT RS Coupé", // 1
        {name: "Avant RS2", // 2
        {name: "M2 Coupé", // 1
        {name: "M3", // 2
        {name: "Regal GNX", // 1
        {name: "Impala Super Sport", // 1
        {name: "Corvette ZR-1", // 2
        {name: "Camaro Super Sport Coupe", // 3
        {name: "Challenger SRT Hellcat", // 1
        {name: "Charger R/T", // 2
        {name: "F355 Berlinetta", // 1
        {name: "Mustang GT", // 1
        {name: "Focus RS", // 2
        {name: "SVT Cobra R", // 3
        {name: "Sierra Cosworth RS500", // 4
        {name: "Mustang Boss 302", // 7
        {name: "Civic Type R", // 1
        {name: "Civic Type R", // 2
        {name: "NSX-R", // 3
        {name: "Limited Edition Gen-F GTS Maloo", // 1
        {name: "XKR-S", // 1
        {name: "Elise Series 1 Sport 190", // 1
        {name: "RX-7", // 1
        {name: "MX-5 Miata", // 2
        {name: "Savanna RX-7", // 3
        {name: "C 63 AMG Coupé Black Series", // 1
        {name: "190E 2.5-16 Evolution II", // 2
        {name: "John Cooper Works GP", // 1
        {name: "Lancer Evolution VI GSR", // 1
        {name: "GTO", // 2
        {name: "Eclipse GSX", // 3
        {name: "370Z", // 1
        {name: "Skyline GT-R V-Spec II", // 2
        {name: "240SX SE", // 3
        {name: "Firebird Trans AM", // 1
        {name: "Cayman GTS", // 1
        {name: "944 Turbo", // 2
        {name: "911 Turbo 3.3", // 4
        {name: "Megane R.S.", // 1
        {name: "Impreza 22B-STI Version", // 1
        {name: "GR Supra", // 1
        {name: "86", // 2
        {name: "Supra RZ", // 3
        {name: "Celica GT-Four ST205", // 4
        {name: "Sprinter Trueno GT Apex", // 5
        {name: "Corsa VXR", // 1
        {name: "Golf GTI 16V MK2", // 2
        {name: "242 Turbo Evolution", // 1
*/

const carList = [
    ["Choose manufacturer", "Choose model"],
    ["Acura", // 1
        {name: "Integra Type R", // 1
         pi: 596,
         cost: 48000, // 25k
         year: 2001,
         buyable: true}],
    ["Audi", // 2
        {name: "TT RS Coupé", // 1
         pi: 707,
         cost: 84000, // 66k
         year: 2010,
         buyable: true},
        {name: "Avant RS2", // 2
         pi: 601,
         cost: 52000, // 50k
         year: 1995,
         buyable: true}],
    ["BMW", // 3
        {name: "M2 Coupé", // 1
         pi: 718,
         cost: 84000, // 69k
         year: 2016,
         buyable: true},
        {name: "M3", // 2
         pi: 583,
         cost: 36000, // 70k
         year: 1991,
         buyable: true}],
    ["Bugatti", // 4
        {name: "EB110 Super Sport", // 1
         pi: 805,
         cost: 0, // 1m 700k
         year: 1992,
         buyable: false,
         sharecode: "934 682 185"}],
    ["Buick", // 5
        {name: "Regal GNX", // 1
         pi: 564,
         cost: 26000, // 130k
         year: 1987,
         buyable: true}],
    ["Chevrolet", // 6
        {name: "Impala Super Sport", // 1
         pi: 509,
         cost: 22000, // 20k
         year: 1996,
         buyable: true},
        {name: "Corvette ZR-1", // 2
         pi: 693,
         cost: 64000, // 45k
         year: 1995,
         buyable: true},
        {name: "Camaro Super Sport Coupe", // 3
         pi: 585,
         cost: 32000, // 110k
         year: 1969,
         buyable: true}],
    ["Dodge", // 7
        {name: "Challenger SRT Hellcat", // 1
         pi: 755,
         cost: 94000, // 75k
         year: 2015,
         buyable: true},
        {name: "Charger R/T", // 2
         pi: 548,
         cost: 32000, // 103k
         year: 1969,
         buyable: true}],
    ["Ferrari", // 8
        {name: "F355 Berlinetta", // 1
         pi: 717,
         cost: 142000, // 190k
         year: 1994,
         buyable: true},
        {name: "F50", // 2
         pi: 789,
         cost: 0, // 2m
         year: 1995,
         buyable: false,
         sharecode: "139 425 209"},
        {name: "F40", // 3
         pi: 784,
         cost: 0, // 1m 200k
         year: 1987,
         buyable: false,
         sharecode: "158 350 366"}],
    ["Ford", // 9
        {name: "Mustang GT", // 1
         pi: 756,
         cost: 88000, // 40k
         year: 2018,
         buyable: true},
        {name: "Focus RS", // 2
         pi: 660,
         cost: 38000, // 25k
         year: 2009,
         buyable: true},
        {name: "SVT Cobra R", // 3
         pi: 539,
         cost: 24000, // 28k
         year: 1993,
         buyable: true},
        {name: "Sierra Cosworth RS500", // 4
         pi: 604,
         cost: 34000, // 66k
         year: 1987,
         buyable: true},
        {name: "Fiesta XR2", // 5
         pi: 369,
         cost: 0, // 25k
         year: 1981,
         buyable: false,
         sharecode: "337 396 243"},
        {name: "Bronco", // 6
         pi: 421,
         cost: 0, // 38k
         year: 1975,
         buyable: false,
         sharecode: "152 201 597"},
        {name: "Mustang Boss 302", // 7
         pi: 581,
         cost: 34000, // 230k
         year: 1969,
         buyable: true}],
    ["Honda", // 10
        {name: "Civic Type R", // 1
         pi: 727,
         cost: 78000, // 59k
         year: 2018,
         buyable: true},
        {name: "Civic Type R", // 2
         pi: 553,
         cost: 22000, // 25k
         year: 1997,
         buyable: true},
        {name: "NSX-R", // 3
         pi: 691,
         cost: 72000, // 90k
         year: 1992,
         buyable: true},
        {name: "Civic RS", // 4
         pi: 368,
         cost: 0, // 25k
         year: 1974,
         buyable: false,
         sharecode: "768 988 417"}],
    ["HSV", // 11
        {name: "Limited Edition Gen-F GTS Maloo", // 1
         pi: 742,
         cost: 86000, // 62k
         year: 2014,
         buyable: true}],
    ["International", // 12
        {name: "Scout 800A", // 1
         pi: 384,
         cost: 0, // 40k
         year: 1970,
         buyable: false,
         sharecode: "432 785 346"}],
    ["Jaguar", // 13
        {name: "XKR-S", // 1
         pi: 756,
         cost: 102000, // 100k
         year: 2012,
         buyable: true},
        {name: "XJ220", // 2
         pi: 786,
         cost: 0, // 350k
         year: 1993,
         buyable: false,
         sharecode: "734 670 250"}],
    ["Lamborghini", // 14
        {name: "Diablo SV", // 1
         pi: 763,
         cost: 0, // 174k
         year: 1997,
         buyable: false,
         sharecode: "676 750 822"},
        {name: "Countach LP5000 QV", // 2
         pi: 735,
         cost: 0, // 220k
         year: 1988,
         buyable: false,
         sharecode: "715 133 482"}],
    ["Land Rover", // 15
        {name: "Series III", // 1
         pi: 100,
         cost: 0, // 20k
         year: 1972,
         buyable: false,
         sharecode: "741 498 791"}],
    ["Lotus", // 16
        {name: "Elise Series 1 Sport 190", // 1
         pi: 711,
         cost: 76000, // 81k
         year: 1999,
         buyable: true}],
    ["Mazda", // 17
        {name: "RX-7", // 1
         pi: 645,
         cost: 54000, // 35k
         year: 1997,
         buyable: true},
        {name: "MX-5 Miata", // 2
         pi: 445,
         cost: 12000, // 25k
         year: 1994,
         buyable: true},
        {name: "Savanna RX-7", // 3
         pi: 558,
         cost: 26000, // 25k
         year: 1990,
         buyable: true}],
    ["McLaren", // 18
        {name: "F1", // 1
         pi: 817,
         cost: 0, // 15m
         year: 1993,
         buyable: false,
         sharecode: "179 587 003"}],
    ["Mercedes-Benz", // 19
        {name: "C 63 AMG Coupé Black Series", // 1
         pi: 768,
         cost: 96000, // 150k
         year: 2012,
         buyable: true},
        {name: "190E 2.5-16 Evolution II", // 2
         pi: 579,
         cost: 36000, // 150k
         year: 1990,
         buyable: true}],
    ["Mini", // 20
        {name: "John Cooper Works GP", // 1
         pi: 719,
         cost: 74000, // 42k
         year: 2021,
         buyable: true}],
    ["Mitsubishi", // 21
        {name: "Lancer Evolution VI GSR", // 1
         pi: 659,
         cost: 58000, // 28k
         year: 1999,
         buyable: true},
        {name: "GTO", // 2
         pi: 610,
         cost: 56000, // 20k
         year: 1997,
         buyable: true},
        {name: "Eclipse GSX", // 3
         pi: 543,
         cost: 24000, // 25k
         year: 1995,
         buyable: true}],
    ["Nissan", // 22
        {name: "370Z", // 1
         pi: 688,
         cost: 52000, // 40k
         year: 2010,
         buyable: true},
        {name: "Skyline GT-R V-Spec II", // 2
         pi: 657,
         cost: 58000, // 63k
         year: 2002,
         buyable: true},
        {name: "240SX SE", // 3
         pi: 445,
         cost: 16000, // 25k
         year: 1993,
         buyable: true},
        {name: "Fairlady Z 432", // 4
         pi: 482,
         cost: 0, // 150k
         year: 1969,
         buyable: false,
         sharecode: "Stock"}],
    ["Pontiac", // 23
        {name: "Firebird Trans AM", // 1
         pi: 418,
         cost: 16000, // 45k
         year: 1977,
         buyable: true}],
    ["Porsche", // 24
        {name: "Cayman GTS", // 1
         pi: 767,
         cost: 112000, // 80k
         year: 2015,
         buyable: true},
        {name: "944 Turbo", // 2
         pi: 651,
         cost: 62000, // 35k
         year: 1989,
         buyable: true},
        {name: "959", // 3
         pi: 764,
         cost: 0, // 2m
         year: 1987,
         buyable: false,
         sharecode: "138 366 112"},
        {name: "911 Turbo 3.3", // 4
         pi: 666,
         cost: 86000, // 150k
         year: 1982,
         buyable: true}],
    ["Renault", // 25
        {name: "Megane R.S.", // 1
         pi: 670,
         cost: 44000, // 37k
         year: 2018,
         buyable: true}],
    ["Subaru", // 26
        {name: "Impreza 22B-STI Version", // 1
         pi: 640,
         cost: 68000, // 110k
         year: 1998,
         buyable: true}],
    ["Toyota", // 27
        {name: "GR Supra", // 1
         pi: 731,
         cost: 82000, // 55k
         year: 2020,
         buyable: true},
        {name: "86", // 2
         pi: 579,
         cost: 46000, // 28.8k
         year: 2013,
         buyable: true},
        {name: "Supra RZ", // 3
         pi: 646,
         cost: 54000, // 38k
         year: 1998,
         buyable: true},
        {name: "Celica GT-Four ST205", // 4
         pi: 590,
         cost: 48000, // 20k
         year: 1994,
         buyable: true},
        {name: "Sprinter Trueno GT Apex", // 5
         pi: 480,
         cost: 14000, // 20k
         year: 1985,
         buyable: true},
        {name: "FJ40", // 6
         pi: 269,
         cost: 0, // 55k
         year: 1979,
         buyable: false,
         sharecode: "659 489 904"},
        {name: "2000GT", // 7
         pi: 487,
         cost: 0, // 750k
         year: 1969,
         buyable: false,
         sharecode: "Stock"}],
    ["Vauxhall", // 28
        {name: "Corsa VXR", // 1
         pi: 584,
         cost: 36000, // 28k
         year: 2016,
         buyable: true}],
    ["Volkswagen", // 29
        {name: "Corrado VR6", // 1
         pi: 533,
         cost: 24000, // 20k
         year: 1995,
         buyable: true},
        {name: "Golf GTI 16V MK2", // 2
         pi: 429,
         cost: 12000, // 20k
         year: 1992,
         buyable: true},
        {name: "Golf GTI", // 3
         pi: 428,
         cost: 0, // 20k
         year: 1983,
         buyable: false,
         sharecode: "125 978 062"}],
    ["Volvo", // 30
        {name: "242 Turbo Evolution", // 1
         pi: 548,
         cost: 22000, // 45k
         year: 1983,
         buyable: true}]];

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

const roadCircuits = [
    {name: "Bahía de Plano", // 0
     sharecode: "174 149 397",
     next: [7, 8, 11]},
    {name: "Arch of Mulegé", // 1
     sharecode: "198 555 229",
     next: [7, 8, 9]},
    {name: "Los Jardines", // 2
     sharecode: "184 187 485",
     next: [3, 4, 5]},
    {name: "Chihuahua", // 3
     sharecode: "136 078 938",
     next: [2, 4, 6, 10, 12]},
    {name: "Tierra Próspera", // 4
     sharecode: "130 808 076",
     next: [2, 3, 5, 9, 12]},
    {name: "Playa Azul", // 5
     sharecode: "150 442 354",
     next: [2, 4, 9]},
    {name: "Lookout", // 6
     sharecode: "438 034 248",
     next: [3, 10, 11, 12]},
    {name: "Horizon Mexico", // 7
     sharecode: "699 786 287",
     next: [0, 1, 8, 9]},
    {name: "Emerald", // 8
     sharecode: "919 021 268",
     next: [0, 1, 7]},
    {name: "Estadio", // 9
     sharecode: "121 779 947",
     next: [1, 4, 5, 7, 10, 11, 12]},
    {name: "Cathedral", // 10
     sharecode: "141 193 063",
     next: [3, 6, 9, 11, 12]},
    {name: "Plaza", // 11
     sharecode: "115 934 463",
     next: [0, 6, 9, 10, 12]},
    {name: "Bola Ocho", // 12
     sharecode: "833 236 086",
     next: [3, 4, 6, 9, 10, 11]}];

const dirtScrambles = [
    {name: "River", // 0
     sharecode: "484 606 232",
     next: [2, 3, 6]},
    {name: "Mangrove", // 1
     sharecode: "948 466 700",
     next: [4, 6, 7]},
    {name: "Mulegé Town", // 2
     sharecode: "124 178 785",
     next: [0, 3, 5]},
    {name: "San Juan", // 3
     sharecode: "906 146 632",
     next: [0, 2, 4, 5, 7]},
//    "Horizon Baja",
    {name: "Teotihuacán", // 4
     sharecode: "158 795 834",
     next: [1, 3, 6, 7]},
    {name: "Caldera", // 5
     sharecode: "154 507 944",
     next: [2, 3, 7]},
    {name: "La Selva", // 6
     sharecode: "835 943 619",
     next: [0, 1, 4]},
    {name: "El Pípila", // 7
     sharecode: "172 245 033",
     next: [1, 3, 4, 5]}];

const endurances = [
    "The Goliath",
    "The Colossus",
    "The Gauntlet",
    "The Titan",
    "The Marathon"];

const classPI = [
    100,
    500,
    600,
    700,
    800,
    900,
    998,
    999];

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

const classXP = [
    Math.pow(10, 0),
    Math.pow(10, 3),
    Math.pow(10, 4),
    Math.pow(10, 5),
    Math.pow(10, 6),
    Math.pow(10, 7),
    Math.pow(10, 8),
    Math.pow(10, 8)];

const classGameSpeed = [
    0,
    8,
    8,
    6,
    4,
    0,
    0,
    0];

const positionXP = [
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

const positionPrize = {
    normal: {
        C: [0, // D and C
            9000,
            6000,
            4000,
            3000,
            2000,
            1000,
            0, 0, 0, 0, 0, 0],
        B: [0,
            13000,
            9000,
            6000,
            4000,
            3000,
            2000,
            1000,
            0, 0, 0, 0, 0],
        A: [0,
            18000,
            13000,
            9000,
            6000,
            4000,
            3000,
            2000,
            1000,
            0, 0, 0, 0],
    },
    podium: [0,
             9000,
             6000,
             4000,
             0, 0, 0, 0, 0, 0, 0, 0, 0],
    all: {
        C: [0, // D and C
            10000,
            8000,
            7000,
            6000,
            5000,
            4000,
            3000,
            2500,
            2000,
            1500,
            1000,
            500],
        A: [0, // A and S
            40000,
            32000,
            28000,
            24000,
            20000,
            16000,
            12000,
            10000,
            8000,
            6000,
            4000,
            2000],
    },
};
