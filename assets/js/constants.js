// -----------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------

const thisVersion = "0.3.1";

const rustCarValue = 5000;

const defaultState = {
    version: thisVersion,
    date: 0,
    road: false,
    dirt: false,
    show: false,
    next: [],
    rust: 0,
    progress: null,
    driving: -1,
    name: "",
    lvl: 2,
    xp: 1,
    money: 0,
    discountB: false,
    discountA: false,
    completed: [],
    garage: [],
    actions: []};

const makes = {
    acura:      1,
    audi:       2,
    bmw:        3,
    buick:      4,
    cadillac:   5,
    chevrolet:  6,
    dodge:      7,
    ferrari:    8,
    ford:       9,
    honda:      10,
    jaguar:     11,
    lancia:     12,
    lexus:      13,
    lotus:      14,
    mazda:      15,
    mercedes:   16,
    mini:       17,
    mitsubishi: 18,
    nissan:     19,
    pontiac:    20,
    porsche:    21,
    renault:    22,
    subaru:     23,
    toyota:     24,
    volkswagen: 25,
    volvo:      26
};

const cars = {
    integra:    0,
    tt:         1,
    m2:         2,
    m3:         3,
    regal:      4,
    ats:        5,
    corvette:   6,
    camaro:     7,
    challenger: 8,
    charger:    9,
    f355:       10,
    mustang:    11,
    focus:      12,
    cobra:      13,
    sierra:     14,
    boss:       15,
    fk8:        16,
    ek9:        17,
    nsx:        18,
    xkr:        19,
    delta:      20,
    rcf:        21,
    sc300:      22,
    exige:      23,
    fd:         24,
    miata:      25,
    fc:         26,
    c63:        27,
    e190:       28,
    mini:       29,
    evo:        30,
    gto:        31,
    eclipse:    32,
    z370:       33,
    r34:        34,
    sx240:      35,
    firebird:   36,
    cayman:     37,
    p944:       38,
    p911:       39,
    megane:     40,
    b22:        41,
    a90:        42,
    gt86:       43,
    a80:        44,
    celica:     45,
    ae86:       46,
    corrado:    47,
    golf:       48,
    v242:       49
};

const integra = {
    name: "Integra Type R",
    id: cars.integra,
    make: makes.acura,
    model: 1,
    pi: 596,
    cost: 42000, // 25k
    year: 2001,
    special: 1 // fnf
};
const tt = {
    name: "TT RS Coupé",
    id: cars.tt,
    make: makes.audi,
    model: 1,
    pi: 707,
    cost: 84000, // 66k
    year: 2010,
    special: 1 // hc
};
const m2 = {
    name: "M2 Coupé",
    id: cars.m2,
    make: makes.bmw,
    model: 1,
    pi: 718,
    cost: 84000, // 69k
    year: 2016,
    special: 0
};
const m3 = {
    name: "M3",
    id: cars.m3,
    make: makes.bmw,
    model: 2,
    pi: 583,
    cost: 36000, // 70k
    year: 1991,
    special: 2 // dtm, hc
};
const regal = {
    name: "Regal GNX",
    id: cars.regal,
    make: makes.buick,
    model: 1,
    pi: 564,
    cost: 26000, // 130k
    year: 1987,
    special: 1 // fnf
};
const ats = {
    name: "ATS-V",
    id: cars.ats,
    make: makes.cadillac,
    model: 1,
    pi: 716,
    cost: 88000, // 65k
    year: 2016,
    special: 0
};
const corvette = {
    name: "Corvette ZR-1",
    id: cars.corvette,
    make: makes.chevrolet,
    model: 1,
    pi: 693,
    cost: 68000, // 45k
    year: 1995,
    special: 0
};
const camaro = {
    name: "Camaro Super Sport Coupe",
    id: cars.camaro,
    make: makes.chevrolet,
    model: 2,
    pi: 585,
    cost: 32000, // 110k
    year: 1969,
    special: 3 // cm, fnf, hc
};
const challenger = {
    name: "Challenger SRT Hellcat",
    id: cars.challenger,
    make: makes.dodge,
    model: 1,
    pi: 755,
    cost: 94000, // 75k
    year: 2015,
    special: 0
};
const charger = {
    name: "Charger R/T",
    id: cars.charger,
    make: makes.dodge,
    model: 2,
    pi: 548,
    rollcage: 562,
    cost: 32000, // 103k
    year: 1969,
    special: 3 // cm, fnf, hc
};
const f355 = {
    name: "F355 Berlinetta",
    id: cars.f355,
    make: makes.ferrari,
    model: 1,
    pi: 717,
    cost: 142000, // 190k
    year: 1994,
    special: 0
};
const mustang = {
    name: "Mustang GT",
    id: cars.mustang,
    make: makes.ford,
    model: 1,
    pi: 756,
    cost: 88000, // 40k
    year: 2018,
    special: 0
};
const focus = {
    name: "Focus RS",
    id: cars.focus,
    make: makes.ford,
    model: 2,
    pi: 660,
    cost: 44000, // 25k
    year: 2009,
    special: 0
};
const cobra = {
    name: "SVT Cobra R",
    id: cars.cobra,
    make: makes.ford,
    model: 3,
    pi: 539,
    rollcage: 545,
    cost: 24000, // 28k
    year: 1993,
    special: 1 // dtm
};
const sierra = {
    name: "Sierra Cosworth RS500",
    id: cars.sierra,
    make: makes.ford,
    model: 4,
    pi: 604,
    cost: 42000, // 66k
    year: 1987,
    special: 2 // dtm, hc
};
const boss = {
    name: "Mustang Boss 302",
    id: cars.boss,
    make: makes.ford,
    model: 5,
    pi: 581,
    cost: 34000, // 230k
    year: 1969,
    special: 2 // cm, fnf
};
const fk8 = {
    name: "Civic Type R",
    id: cars.fk8,
    make: makes.honda,
    model: 1,
    pi: 727,
    cost: 78000, // 59k
    year: 2018,
    special: 0
};
const ek9 = {
    name: "Civic Type R",
    id: cars.ek9,
    make: makes.honda,
    model: 2,
    pi: 553,
    rollcage: 558,
    cost: 22000, // 25k
    year: 1997,
    special: 0
};
const nsx = {
    name: "NSX-R",
    id: cars.nsx,
    make: makes.honda,
    model: 3,
    pi: 691,
    cost: 72000, // 90k
    year: 1992,
    special: 0
};
const xkr = {
    name: "XKR-S",
    id: cars.xkr,
    make: makes.jaguar,
    model: 1,
    pi: 756,
    cost: 102000, // 100k
    year: 2012,
    special: 1 // hc
};
const delta = {
    name: "Delta",
    id: cars.delta,
    make: makes.lancia,
    model: 1,
    pi: 100,
    cost: 1,
    year: 1990,
    special: 1
};
const rcf = {
    name: "RC F",
    id: cars.rcf,
    make: makes.lexus,
    model: 1,
    pi: 741,
    cost: 94000, // 75k
    year: 2015,
    special: 0
};
const sc300 = {
    name: "SC300",
    id: cars.sc300,
    make: makes.lexus,
    model: 2,
    pi: 555,
    rollcage: 558,
    cost: 24000, // 25k
    year: 1997,
    special: 0
};
const exige = {
    name: "Exige S",
    id: cars.exige,
    make: makes.lotus,
    model: 1,
    pi: 754,
    cost: 92000, // 85k
    year: 2012,
    special: 1 // hc
};
const fd = {
    name: "RX-7",
    id: cars.fd,
    make: makes.mazda,
    model: 1,
    pi: 645,
    cost: 54000, // 35k
    year: 1997,
    special: 2 // fnf, hc
};
const miata = {
    name: "MX-5 Miata",
    id: cars.miata,
    make: makes.mazda,
    model: 2,
    pi: 445,
    rollcage: 446,
    cost: 12000, // 25k
    year: 1994,
    special: 1 // hc
};
const fc = {
    name: "Savanna RX-7",
    id: cars.fc,
    make: makes.mazda,
    model: 3,
    pi: 558,
    rollcage: 560,
    cost: 26000, // 25k
    year: 1990,
    special: 0
};
const c63 = {
    name: "C 63 AMG Coupé Black Series",
    id: cars.c63,
    make: makes.mercedes,
    model: 1,
    pi: 768,
    cost: 96000, // 150k
    year: 2012,
    special: 1 // hc
};
const e190 = {
    name: "190E 2.5-16 Evolution II",
    id: cars.e190,
    make: makes.mercedes,
    model: 2,
    pi: 579,
    cost: 36000, // 150k
    year: 1990,
    special: 1 // dtm
};
const mini = {
    name: "John Cooper Works GP",
    id: cars.mini,
    make: makes.mini,
    model: 1,
    pi: 719,
    cost: 74000, // 42k
    year: 2021,
    special: 0
};
const evo = {
    name: "Lancer Evolution VI GSR",
    id: cars.evo,
    make: makes.mitsubishi,
    model: 1,
    pi: 659,
    cost: 58000, // 28k
    year: 1999,
    special: 2 // wrc, hc
};
const gto = {
    name: "GTO",
    id: cars.gto,
    make: makes.mitsubishi,
    model: 2,
    pi: 610,
    cost: 56000, // 20k
    year: 1997,
    special: 0
};
const eclipse = {
    name: "Eclipse GSX",
    id: cars.eclipse,
    make: makes.mitsubishi,
    model: 3,
    pi: 543,
    rollcage: 545,
    cost: 24000, // 25k
    year: 1995,
    special: 1 // fnf
};
const z370 = {
    name: "370Z",
    id: cars.z370,
    make: makes.nissan,
    model: 1,
    pi: 688,
    cost: 52000, // 40k
    year: 2010,
    special: 1 // hc
};
const r34 = {
    name: "Skyline GT-R V-Spec II",
    id: cars.r34,
    make: makes.nissan,
    model: 2,
    pi: 657,
    cost: 58000, // 63k
    year: 2002,
    special: 2 // fnf, hc
};
const sx240 = {
    name: "240SX SE",
    id: cars.sx240,
    make: makes.nissan,
    model: 3,
    pi: 445,
    rollcage: 451,
    cost: 16000, // 25k
    year: 1993,
    special: 1 // hc
};
const firebird = {
    name: "Firebird Trans AM",
    id: cars.firebird,
    make: makes.pontiac,
    model: 1,
    pi: 418,
    rollcage: 436,
    cost: 16000, // 45k
    year: 1977,
    special: 1 // hc
};
const cayman = {
    name: "Cayman GTS",
    id: cars.cayman,
    make: makes.porsche,
    model: 1,
    pi: 767,
    cost: 112000, // 80k
    year: 2015,
    special: 0
};
const p944 = {
    name: "944 Turbo",
    id: cars.p944,
    make: makes.porsche,
    model: 2,
    pi: 651,
    cost: 62000, // 35k
    year: 1989,
    special: 0
};
const p911 = {
    name: "911 Turbo 3.3",
    id: cars.p911,
    make: makes.porsche,
    model: 3,
    pi: 666,
    cost: 86000, // 150k
    year: 1982,
    special: 1 // hc
};
const megane = {
    name: "Megane R.S.",
    id: cars.megane,
    make: makes.renault,
    model: 1,
    pi: 670,
    cost: 48000, // 37k
    year: 2018,
    special: 0
};
const b22 = {
    name: "Impreza 22B-STI Version",
    id: cars.b22,
    make: makes.subaru,
    model: 1,
    pi: 640,
    cost: 64000, // 110k
    year: 1998,
    special: 2 // wrc, hc
};
const a90 = {
    name: "GR Supra",
    id: cars.a90,
    make: makes.toyota,
    model: 1,
    pi: 731,
    cost: 82000, // 55k
    year: 2020,
    special: 0
};
const gt86 = {
    name: "86",
    id: cars.gt86,
    make: makes.toyota,
    model: 2,
    pi: 579,
    cost: 38000, // 28.8k
    year: 2013,
    special: 1 // hc
};
const a80 = {
    name: "Supra RZ",
    id: cars.a80,
    make: makes.toyota,
    model: 3,
    pi: 646,
    cost: 54000, // 38k
    year: 1998,
    special: 2 // fnf, hc
};
const celica = {
    name: "Celica GT-Four ST205",
    id: cars.celica,
    make: makes.toyota,
    model: 4,
    pi: 590,
    cost: 48000, // 20k
    year: 1994,
    special: 1 // wrc
};
const ae86 = {
    name: "Sprinter Trueno GT Apex",
    id: cars.ae86,
    make: makes.toyota,
    model: 5,
    pi: 480,
    rollcage: 485,
    cost: 14000, // 20k
    year: 1985,
    special: 1 // hc
};
const corrado = {
    name: "Corrado VR6",
    id: cars.corrado,
    make: makes.volkswagen,
    model: 1,
    pi: 533,
    rollcage: 537,
    cost: 24000, // 20k
    year: 1995,
    special: 1 // hc
};
const golf = {
    name: "Golf GTI 16V MK2",
    id: cars.golf,
    make: makes.volkswagen,
    model: 2,
    pi: 429,
    rollcage: 435,
    cost: 12000, // 20k
    year: 1992,
    special: 1 // hc
};
const v242 = {
    name: "242 Turbo Evolution",
    id: cars.v242,
    make: makes.volvo,
    model: 1,
    pi: 548,
    rollcage: 555,
    cost: 22000, // 45k
    year: 1983,
    special: 1 // dtm
};

const carDataM = [
    ["Choose manufacturer", "Choose model"],
    ["Acura", // 1
        integra],
    ["Audi", // 2
        tt],
    ["BMW", // 3
        m2,
        m3],
    ["Buick", // 4
        regal],
    ["Cadillac", // 5
        ats],
    ["Chevrolet", // 6
        corvette,
        camaro],
    ["Dodge", // 7
        challenger,
        charger],
    ["Ferrari", // 8
        f355],
    ["Ford", // 9
        mustang,
        focus,
        cobra,
        sierra,
        boss],
    ["Honda", // 10
        fk8,
        ek9,
        nsx],
    ["Jaguar", // 11
        xkr],
    ["Lancia", // 12
        delta],
    ["Lexus", // 13
        rcf,
        sc300],
    ["Lotus", // 14
        exige],
    ["Mazda", // 15
        fd,
        miata,
        fc],
    ["Mercedes-Benz", // 16
        c63,
        e190],
    ["Mini", // 17
        mini],
    ["Mitsubishi", // 18
        evo,
        gto,
        eclipse],
    ["Nissan", // 19
        z370,
        r34,
        sx240],
    ["Pontiac", // 20
        firebird],
    ["Porsche", // 21
        cayman,
        p944,
        p911],
    ["Renault", // 22
        megane],
    ["Subaru", // 23
        b22],
    ["Toyota", // 24
        a90,
        gt86,
        a80,
        celica,
        ae86],
    ["Volkswagen", // 25
        corrado,
        golf],
    ["Volvo", // 26
        v242]
];

const carDataV = [
    integra,
    tt,
    m2,
    m3,
    regal,
    ats,
    corvette,
    camaro,
    challenger,
    charger,
    f355,
    mustang,
    focus,
    cobra,
    sierra,
    boss,
    fk8,
    ek9,
    nsx,
    xkr,
    delta,
    rcf,
    sc300,
    exige,
    fd,
    miata,
    fc,
    c63,
    e190,
    mini,
    evo,
    gto,
    eclipse,
    z370,
    r34,
    sx240,
    firebird,
    cayman,
    p944,
    p911,
    megane,
    b22,
    a90,
    gt86,
    a80,
    celica,
    ae86,
    corrado,
    golf,
    v242
];

const rustBuckets = [null,
    cars.charger,
    cars.cobra,
    cars.ek9,
    cars.sc300,
    cars.miata,
    cars.fc,
    cars.eclipse,
    cars.sx240,
    cars.firebird,
    cars.ae86,
    cars.corrado,
    cars.golf,
    cars.v242
];

const fiestaxr2 = {
    name: "Fiesta XR2",
    make: "Ford",
    year: 1981,
    sharecode: "106 479 211"
};
const civicrs = {
    name: "Civic RS",
    make: "Honda",
    year: 1974,
    sharecode: "226 758 458"
};
const golfgti = {
    name: "Golf GTI",
    make: "Volkswagen",
    year: 1983,
    sharecode: "110 055 064"
};
const vintageHatches = {
    xp: 3000,
    pi: 600,
    rep: 10000 / 200,
    cars: [
        fiestaxr2,
        civicrs,
        golfgti
    ]
};

const bronco = {
    name: "Bronco",
    make: "Ford",
    year: 1975,
    sharecode: "282 480 610"
};
const scout = {
    name: "Scout 800A",
    make: "International",
    year: 1970,
    sharecode: "786 531 552"
};
const fj40 = {
    name: "FJ40",
    make: "Toyota",
    year: 1979,
    sharecode: "539 560 580"
};
const vintageExplorers = {
    xp: 7000,
    pi: 500,
    rep: 20000 / 200,
    cars: [
        bronco,
        scout,
        fj40
    ]
};

const fairlady = {
    name: "Fairlady Z 432",
    make: "Nissan",
    year: 1969,
    sharecode: "Stock"
};
const gt2000 = {
    name: "2000GT",
    make: "Toyota",
    year: 1969,
    sharecode: "Stock"
};
const vintageSports = {
    xp: 30000,
    pi: 500,
    rep: 50000 / 200,
    cars: [
        fairlady,
        gt2000
    ]
};

const f40 = {
    name: "F40",
    make: "Ferrari",
    year: 1987,
    sharecode: "158 350 366"
};
const countach = {
    name: "Countach LP5000 QV",
    make: "Lamborghini",
    year: 1988,
    sharecode: "715 133 482"
};
const p959 = {
    name: "959",
    make: "Porsche",
    year: 1987,
    sharecode: "138 366 112"
};
const super80s = {
    xp: 70000,
    pi: 800,
    rep: 120000 / 200,
    cars: [
        f40,
        countach,
        p959
    ]
};

const eb110 = {
    name: "EB110 Super Sport",
    make: "Bugatti",
    year: 1992,
    sharecode: "934 682 185"
};
const f50 = {
    name: "F50",
    make: "Ferrari",
    year: 1995,
    sharecode: "139 425 209"
};
const xj220 = {
    name: "XJ220",
    make: "Jaguar",
    year: 1993,
    sharecode: "734 670 250"
};
const diablo = {
    name: "Diablo SV",
    make: "Lamborghini",
    year: 1997,
    sharecode: "676 750 822"
};
const f1 = {
    name: "F1",
    make: "McLaren",
    year: 1993,
    sharecode: "179 587 003"
};
const super90s = {
    xp: 300000,
    pi: 810,
    rep: 200000 / 200,
    cars: [
        eb110,
        f50,
        xj220,
        diablo,
        f1
    ]
};

let loanCars = new Map();
loanCars.set("vintageHatches", vintageHatches);
loanCars.set("vintageSports", vintageSports);
loanCars.set("vintageExplorers", vintageExplorers);
loanCars.set("super80s", super80s);
loanCars.set("super90s", super90s);

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
