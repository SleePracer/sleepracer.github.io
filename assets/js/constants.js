// -----------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------

const thisVersion = "0.3.1";

const rustCarValue = 5000;

const defaultState = {
    version: thisVersion,
    date: 0,
    name: "",
    xp: 1,
    lvl: 1,
    discountB: false,
    discountA: false,
    wins: 0,
    road: false,
    dirt: false,
    next: [],
    show: false,
    completed: [],
    money: 0,
    cEvent: null,
    cCar: -1,
    cars: [],
    actions: []};

const carList = [
    ["Choose manufacturer", "Choose model"],
    ["Acura", // 1
        {name: "Integra Type R", // 1
         pi: 596,
         cost: 42000, // 25k
         year: 2001,
         special: 1, // fnf
         buyable: true}],
    ["Audi", // 2
        {name: "TT RS Coupé", // 1
         pi: 707,
         cost: 84000, // 66k
         year: 2010,
         special: 1, // hc
         buyable: true},
        {name: "Avant RS2", // 2 // TODO: remove in release
         pi: 601,
         cost: 0, // 50k
         year: 1995,
         buyable: false}],
    ["BMW", // 3
        {name: "M2 Coupé", // 1
         pi: 718,
         cost: 84000, // 69k
         year: 2016,
         special: 0,
         buyable: true},
        {name: "M3", // 2
         pi: 583,
         cost: 36000, // 70k
         year: 1991,
         special: 2, // dtm, hc
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
         special: 1, // fnf
         buyable: true}],
    ["Cadillac", // 6
        {name: "ATS-V",
         pi: 716,
         cost: 88000, // 65k
         year: 2016,
         special: 0,
         buyable: true}],
    ["Chevrolet", // 7
        {name: "Impala Super Sport", // 1 // TODO: remove in release
         pi: 509,
         cost: 0, // 20k
         year: 1996,
         buyable: false},
        {name: "Corvette ZR-1", // 2
         pi: 693,
         cost: 68000, // 45k
         year: 1995,
         special: 0,
         buyable: true},
        {name: "Camaro Super Sport Coupe", // 3
         pi: 585,
         cost: 32000, // 110k
         year: 1969,
         special: 3, // cm, fnf, hc
         buyable: true}],
    ["Dodge", // 8
        {name: "Challenger SRT Hellcat", // 1
         pi: 755,
         cost: 94000, // 75k
         year: 2015,
         special: 0,
         buyable: true},
        {name: "Charger R/T", // 2
         pi: 548,
         cost: 32000, // 103k
         year: 1969,
         rollcage: 562,
         special: 3, // cm, fnf, hc
         buyable: true}],
    ["Ferrari", // 9
        {name: "F355 Berlinetta", // 1
         pi: 717,
         cost: 142000, // 190k
         year: 1994,
         special: 0,
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
    ["Ford", // 10
        {name: "Mustang GT", // 1
         pi: 756,
         cost: 88000, // 40k
         year: 2018,
         special: 0,
         buyable: true},
        {name: "Focus RS", // 2
         pi: 660,
         cost: 44000, // 25k
         year: 2009,
         special: 0,
         buyable: true},
        {name: "SVT Cobra R", // 3
         pi: 539,
         cost: 24000, // 28k
         year: 1993,
         rollcage: 545,
         special: 1, // dtm
         buyable: true},
        {name: "Sierra Cosworth RS500", // 4
         pi: 604,
         cost: 42000, // 66k
         year: 1987,
         special: 2, // dtm, hc
         buyable: true},
        {name: "Fiesta XR2", // 5
         pi: 369,
         cost: 0, // 25k
         year: 1981,
         buyable: false,
         sharecode: "106 479 211"},
        {name: "Bronco", // 6
         pi: 421,
         cost: 0, // 38k
         year: 1975,
         buyable: false,
         sharecode: "282 480 610"},
        {name: "Mustang Boss 302", // 7
         pi: 581,
         cost: 34000, // 230k
         year: 1969,
         special: 2, // cm, fnf
         buyable: true}],
    ["Honda", // 11
        {name: "Civic Type R", // 1
         pi: 727,
         cost: 78000, // 59k
         year: 2018,
         special: 0,
         buyable: true},
        {name: "Civic Type R", // 2
         pi: 553,
         cost: 22000, // 25k
         year: 1997,
         rollcage: 558,
         special: 0,
         buyable: true},
        {name: "NSX-R", // 3
         pi: 691,
         cost: 72000, // 90k
         year: 1992,
         special: 0,
         buyable: true},
        {name: "Civic RS", // 4
         pi: 368,
         cost: 0, // 25k
         year: 1974,
         buyable: false,
         sharecode: "226 758 458"}],
    ["HSV", // 12 TODO: remove in release
        {name: "Limited Edition Gen-F GTS Maloo", // 1
         pi: 742,
         cost: 0, // 62k
         year: 2014,
         buyable: false}],
    ["International", // 13
        {name: "Scout 800A", // 1
         pi: 384,
         cost: 0, // 40k
         year: 1970,
         buyable: false,
         sharecode: "786 531 552"}],
    ["Jaguar", // 14
        {name: "XKR-S", // 1
         pi: 756,
         cost: 102000, // 100k
         year: 2012,
         special: 1, // hc
         buyable: true},
        {name: "XJ220", // 2
         pi: 786,
         cost: 0, // 350k
         year: 1993,
         buyable: false,
         sharecode: "734 670 250"}],
    ["Lamborghini", // 15
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
    ["Land Rover", // 16 TODO: remove in release
        {name: "Series III", // 1
         pi: 100,
         cost: 0, // 20k
         year: 1972,
         buyable: false,
         sharecode: "587 482 713"}],
    ["Lexus", // 17
        {name: "RC F", // 1
         pi: 741,
         cost: 94000, // 75k
         year: 2015,
         special: 0,
         buyable: true},
        {name: "SC300", // 2
         pi: 555,
         cost: 24000, // 25k
         year: 1997,
         rollcage: 558,
         special: 0,
         buyable: true}],
    ["Lotus", // 18
        {name: "Exige S", // 1
         pi: 754,
         cost: 92000, // 85k
         year: 2012,
         special: 1, // hc
         buyable: true},
        {name: "Elise Series 1 Sport 190", // 2 // TODO: remove in release
         pi: 711,
         cost: 0, // 81k
         year: 1999,
         buyable: false}],
    ["Mazda", // 19
        {name: "RX-7", // 1
         pi: 645,
         cost: 54000, // 35k
         year: 1997,
         special: 2, // fnf, hc
         buyable: true},
        {name: "MX-5 Miata", // 2
         pi: 445,
         cost: 12000, // 25k
         year: 1994,
         rollcage: 446,
         special: 1, // hc
         buyable: true},
        {name: "Savanna RX-7", // 3
         pi: 558,
         cost: 26000, // 25k
         year: 1990,
         rollcage: 560,
         special: 0,
         buyable: true}],
    ["McLaren", // 20
        {name: "F1", // 1
         pi: 817,
         cost: 0, // 15m
         year: 1993,
         buyable: false,
         sharecode: "179 587 003"}],
    ["Mercedes-Benz", // 21
        {name: "C 63 AMG Coupé Black Series", // 1
         pi: 768,
         cost: 96000, // 150k
         year: 2012,
         special: 1, // hc
         buyable: true},
        {name: "190E 2.5-16 Evolution II", // 2
         pi: 579,
         cost: 36000, // 150k
         year: 1990,
         special: 1, // dtm
         buyable: true}],
    ["Mini", // 22
        {name: "John Cooper Works GP", // 1
         pi: 719,
         cost: 74000, // 42k
         year: 2021,
         special: 0,
         buyable: true}],
    ["Mitsubishi", // 23
        {name: "Lancer Evolution VI GSR", // 1
         pi: 659,
         cost: 58000, // 28k
         year: 1999,
         special: 2, // wrc, hc
         buyable: true},
        {name: "GTO", // 2
         pi: 610,
         cost: 56000, // 20k
         year: 1997,
         special: 0,
         buyable: true},
        {name: "Eclipse GSX", // 3
         pi: 543,
         cost: 24000, // 25k
         year: 1995,
         rollcage: 545,
         special: 1, // fnf
         buyable: true}],
    ["Nissan", // 24
        {name: "370Z", // 1
         pi: 688,
         cost: 52000, // 40k
         year: 2010,
         special: 1, // hc
         buyable: true},
        {name: "Skyline GT-R V-Spec II", // 2
         pi: 657,
         cost: 58000, // 63k
         year: 2002,
         special: 2, // fnf, hc
         buyable: true},
        {name: "240SX SE", // 3
         pi: 445,
         cost: 16000, // 25k
         year: 1993,
         rollcage: 451,
         special: 1, // hc
         buyable: true},
        {name: "Fairlady Z 432", // 4
         pi: 482,
         cost: 0, // 150k
         year: 1969,
         buyable: false,
         sharecode: "Stock"}],
    ["Pontiac", // 25
        {name: "Firebird Trans AM", // 1
         pi: 418,
         cost: 16000, // 45k
         year: 1977,
         rollcage: 436,
         special: 1, // hc
         buyable: true}],
    ["Porsche", // 26
        {name: "Cayman GTS", // 1
         pi: 767,
         cost: 112000, // 80k
         year: 2015,
         special: 0,
         buyable: true},
        {name: "944 Turbo", // 2
         pi: 651,
         cost: 62000, // 35k
         year: 1989,
         special: 0,
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
         special: 1, // hc
         buyable: true}],
    ["Renault", // 27
        {name: "Megane R.S.", // 1
         pi: 670,
         cost: 48000, // 37k
         year: 2018,
         special: 0,
         buyable: true}],
    ["Subaru", // 28
        {name: "Impreza 22B-STI Version", // 1
         pi: 640,
         cost: 64000, // 110k
         year: 1998,
         special: 2, // wrc, hc
         buyable: true}],
    ["Toyota", // 29
        {name: "GR Supra", // 1
         pi: 731,
         cost: 82000, // 55k
         year: 2020,
         special: 0,
         buyable: true},
        {name: "86", // 2
         pi: 579,
         cost: 38000, // 28.8k
         year: 2013,
         special: 1, // hc
         buyable: true},
        {name: "Celica Sport Specialty II", // 3
         pi: 557,
         cost: 34000, // 250k
         year: 2003,
         special: 0,
         buyable: true},
        {name: "Supra RZ", // 4
         pi: 646,
         cost: 54000, // 38k
         year: 1998,
         special: 2, // fnf, hc
         buyable: true},
        {name: "Celica GT-Four ST205", // 5
         pi: 590,
         cost: 48000, // 20k
         year: 1994,
         special: 1, // wrc
         buyable: true},
        {name: "Sprinter Trueno GT Apex", // 6
         pi: 480,
         cost: 14000, // 20k
         year: 1985,
         rollcage: 485,
         special: 1, // hc
         buyable: true},
        {name: "FJ40", // 7
         pi: 269,
         cost: 0, // 55k
         year: 1979,
         buyable: false,
         sharecode: "539 560 580"},
        {name: "2000GT", // 8
         pi: 487,
         cost: 0, // 750k
         year: 1969,
         buyable: false,
         sharecode: "Stock"}],
    ["Vauxhall", // 30
        {name: "Corsa VXR", // 1 // TODO: remove in release
         pi: 584,
         cost: 0, // 28k
         year: 2016,
         buyable: false}],
    ["Volkswagen", // 31
        {name: "Corrado VR6", // 1
         pi: 533,
         cost: 24000, // 20k
         year: 1995,
         rollcage: 537,
         special: 1, // hc
         buyable: true},
        {name: "Golf GTI 16V MK2", // 2
         pi: 429,
         cost: 12000, // 20k
         year: 1992,
         rollcage: 435,
         special: 1, // hc
         buyable: true},
        {name: "Golf GTI", // 3
         pi: 428,
         cost: 0, // 20k
         year: 1983,
         buyable: false,
         sharecode: "110 055 064"}],
    ["Volvo", // 32
        {name: "242 Turbo Evolution", // 1
         pi: 548,
         cost: 22000, // 45k
         year: 1983,
         rollcage: 555,
         special: 1, // dtm
         buyable: true}]];

const roadCircuits = [
    {name: "Bahía de Plano", // 0
     sharecode: "130 995 031",
     next: [7, 8, 11]},
    {name: "Arch of Mulegé", // 1
     sharecode: "459 057 512",
     next: [7, 8, 9]},
    {name: "Los Jardines", // 2
     sharecode: "623 871 886",
     next: [3, 4, 5]},
    {name: "Chihuahua", // 3
     sharecode: "908 751 913",
     next: [2, 4, 6, 10, 12]},
    {name: "Tierra Próspera", // 4
     sharecode: "236 936 786",
     next: [2, 3, 5, 9, 12]},
    {name: "Playa Azul", // 5
     sharecode: "289 169 770",
     next: [2, 4, 9]},
    {name: "Lookout", // 6
     sharecode: "725 302 909",
     next: [3, 10, 11, 12]},
    {name: "Horizon Mexico", // 7
     sharecode: "275 594 929",
     next: [0, 1, 8, 9]},
    {name: "Emerald", // 8
     sharecode: "172 890 487",
     next: [0, 1, 7]},
    {name: "Estadio", // 9
     sharecode: "134 730 395",
     next: [1, 4, 5, 7, 10, 11, 12]},
    {name: "Cathedral", // 10
     sharecode: "526 809 505",
     next: [3, 6, 9, 11, 12]},
    {name: "Plaza", // 11
     sharecode: "140 331 213",
     next: [0, 6, 9, 10, 12]},
    {name: "Bola Ocho", // 12
     sharecode: "714 847 969",
     next: [3, 4, 6, 9, 10, 11]}];

const dirtScrambles = [
    {name: "River", // 0
     sharecode: "173 128 172",
     next: [2, 3, 6]},
    {name: "Mangrove", // 1
     sharecode: "432 344 336",
     next: [4, 6, 7]},
    {name: "Mulegé Town", // 2
     sharecode: "801 687 765",
     next: [0, 3, 5]},
    {name: "San Juan", // 3
     sharecode: "116 904 965",
     next: [0, 2, 4, 5, 7]},
//    "Horizon Baja",
    {name: "Teotihuacán", // 4
     sharecode: "129 877 344",
     next: [1, 3, 6, 7]},
    {name: "Caldera", // 5
     sharecode: "476 382 721",
     next: [2, 3, 7]},
    {name: "La Selva", // 6
     sharecode: "796 910 033",
     next: [0, 1, 4]},
    {name: "El Pípila", // 7
     sharecode: "140 003 168",
     next: [1, 3, 4, 5]}];

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
    5,
    5,
    4,
    3,
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
    podium: [0, // All classes
             18000,
             12000,
             8000,
             0, 0, 0, 0, 0, 0, 0, 0, 0],
    all: {
        C: [0, // D and C
            20000,
            16000,
            14000,
            12000,
            10000,
            8000,
            6000,
            5000,
            4000,
            3000,
            2000,
            1000],
        B: [0,
            20000,
            16000,
            14000,
            12000,
            10000,
            8000,
            6000,
            5000,
            4000,
            3000,
            2000,
            1000],
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
