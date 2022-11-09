// -----------------------------------------------------------------------
// HTML elements
// -----------------------------------------------------------------------

let eStart = document.getElementById("start");
let eStartName = document.getElementById("startName");
let eStartClass = document.getElementById("startClass");
let eStartLoad = document.getElementById("startLoad");

let eGame = document.getElementById("game");
let eStateName = document.getElementById("stateName");
let eStateCar = document.getElementById("stateCar");
let eStateCredits = document.getElementById("stateCredits");
let eStateDR = document.getElementById("stateDR");
let eStateDRProgress = document.getElementById("stateDRProgress");
let eEvents = document.getElementById("eventsDiv");
let eEventsT = document.getElementById("eventsTable");
let eEventsTH = document.getElementById("eventsTableHead");
let eEventsTB = document.getElementById("eventsTableBody");
let eRacesT = document.getElementById("racesTable");
let eRacesTH = document.getElementById("racesTableHead");
let eRacesTB = document.getElementById("racesTableBody");
let eGarageTH = document.getElementById("garageTableHead");
let eToggleOptions = document.getElementById("toggleOptionsButton");
let eGarageTB = document.getElementById("garageTableBody");
let eNewCarRow = document.getElementById("newCarRow");
let eNewCarName = document.getElementById("newCarName");
let eNewCarMake = document.getElementById("newCarMake");
let eNewCarModel = document.getElementById("newCarModel");
let eGameSpeed = document.getElementById("gameSpeed");
let eAutoshow = document.getElementById("autoshowCheck");
let eCarPass = document.getElementById("carPassCheck");
let eHotWheels = document.getElementById("hotWheelsCheck");
let eWelcome = document.getElementById("welcomeCheck");
let eBarnFind = document.getElementById("barnFindCheck");
let eGameLoad = document.getElementById("gameLoad");

// -----------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------

const thisVersion = "0.1.0";

const defaultState = {
    version: thisVersion,
    name: "",
    iGS: 5,
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
    ["Acura",
        {name: "NSX",
         pi: 831,
         cost: 170000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "RSX Type S",
         pi: 585,
         cost: 25000,
         year: 2002,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Integra Type R",
         pi: 596,
         cost: 25000,
         year: 2001,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Alpine",
        {name: "A110",
         pi: 694,
         cost: 67500,
         year: 2017,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "A110 1600S",
         pi: 550,
         cost: 98000,
         year: 1973,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Alumi Craft",
        {name: "Class 10 Race Car",
         pi: 642,
         cost: 300000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["AMC",
        {name: "Gremlin X",
         pi: 403,
         cost: 35000,
         year: 1973,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["AMG Transport Dynamics",
        {name: "M12S Warthog CST",
         pi: 719,
         cost: 850000,
         year: 2554,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Apollo",
        {name: "Intensa Emozione \"Welcome Pack\"",
         pi: 998,
         cost: 1500000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: true,
         barnFind: false},
        {name: "Intensa Emozione",
         pi: 963,
         cost: 1500000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Ariel",
        {name: "Nomad",
         pi: 711,
         cost: 93000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Atom 500 V8",
         pi: 924,
         cost: 200000,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Ascari",
        {name: "KZ1R",
         pi: 829,
         cost: 250000,
         year: 2012,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Aston Martin",
        {name: "DBX",
         pi: 732,
         cost: 200000,
         year: 2021,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Valhalla Concept Car",
         pi: 959,
         cost: 1150000,
         year: 2019,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "DBS Superleggera",
         pi: 835,
         cost: 350000,
         year: 2019,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Vantage",
         pi: 801,
         cost: 430000,
         year: 2019,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Vulcan AMR Pro",
         pi: 953,
         cost: 2000000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "DB11",
         pi: 787,
         cost: 300000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Vantage GT12",
         pi: 829,
         cost: 400000,
         year: 2016,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "V12 Vantage S",
         pi: 796,
         cost: 240000,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "One-77",
         pi: 843,
         cost: 1400000,
         year: 2010,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "DB5",
         pi: 548,
         cost: 800000,
         year: 1964,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["ATS", // 10
        {name: "GT",
         pi: 877,
         cost: 850000,
         year: 2018,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Audi", // 11
        {name: "RS E-Tron GT",
         pi: 770,
         cost: 250000,
         year: 2021,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "RS 7 Sportback",
         pi: 768,
         cost: 250000,
         year: 2021,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "RS 3 Sedan",
         pi: 734,
         cost: 60000,
         year: 2020,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "RS 4 Avant",
         pi: 751,
         cost: 250000,
         year: 2018,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "RS 5 Coupe",
         pi: 750,
         cost: 95000,
         year: 2018,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "TT RS",
         pi: 748,
         cost: 75000,
         year: 2018,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "R8 V10 Plus",
         pi: 834,
         cost: 242000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "RS 6 Avant", // 8
         pi: 754,
         cost: 150000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "TTS Coupé",
         pi: 724,
         cost: 52000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "S1", // 10
         pi: 644,
         cost: 35000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "R8 Coupé V10 Plus 5.2 FSI Quattro",
         pi: 802,
         cost: 290000,
         year: 2013,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "RS 7 Sportback",
         pi: 739,
         cost: 225000,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "RS 4 Avant",
         pi: 728,
         cost: 83000,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "RS 5 Coupé",
         pi: 733,
         cost: 88000,
         year: 2011,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "RS 3 Sportback",
         pi: 682,
         cost: 42000,
         year: 2011,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "TT RS Coupé",
         pi: 707,
         cost: 66000,
         year: 2010,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "RS 6",
         pi: 722,
         cost: 155000,
         year: 2009,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "RS 4",
         pi: 710,
         cost: 53000,
         year: 2006,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "RS 6",
         pi: 677,
         cost: 105000,
         year: 2003,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "RS 4 Avant", // 20
         pi: 663,
         cost: 94000,
         year: 2001,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Avant RS2",
         pi: 601,
         cost: 50000,
         year: 1995,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Sport Quattro",
         pi: 638,
         cost: 175000,
         year: 1983,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Austin-Healey", // 12
        {name: "Sprite MKI",
         pi: 131,
         cost: 20000,
         year: 1958,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Auto Union",
        {name: "Type D",
         pi: 675,
         cost: 15000000,
         year: 1939,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["BAC",
        {name: "Mono",
         pi: 868,
         cost: 160000,
         year: 2014,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Bentley",
        {name: "Continental Supersports",
         pi: 769,
         cost: 200000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Bentayga",
         pi: 727,
         cost: 180000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Turbo R",
         pi: 543,
         cost: 250000,
         year: 1991,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Blower 4-1/2 Litre Supercharged",
         pi: 207,
         cost: 4000000,
         year: 1930,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "8 Litre",
         pi: 181,
         cost: 1500000,
         year: 1930,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["BMW", // 16
        {name: "M4 Competition Coupé",
         pi: 778,
         cost: 250000,
         year: 2021,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M8 Competition Coupe",
         pi: 791,
         cost: 175000,
         year: 2020,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Z4 Roadster",
         pi: 751,
         cost: 35000,
         year: 2019,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M5",
         pi: 784,
         cost: 105000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M4 GTS", // 5
         pi: 814,
         cost: 135000,
         year: 2016,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M2 Coupé",
         pi: 718,
         cost: 69000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "I8",
         pi: 764,
         cost: 140000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "X6 M",
         pi: 687,
         cost: 130000,
         year: 2015,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M4 Coupe",
         pi: 782,
         cost: 92000,
         year: 2014,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M6 Coupe", // 10
         pi: 758,
         cost: 120000,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M5",
         pi: 766,
         cost: 112000,
         year: 2012,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "X5 M FE",
         pi: 998,
         cost: 500000,
         year: 2011,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "1 Series M Coupe",
         pi: 712,
         cost: 55000,
         year: 2011,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "X5 M",
         pi: 666,
         cost: 100000,
         year: 2011,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M3 GTS",
         pi: 794,
         cost: 250000,
         year: 2010,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M5",
         pi: 719,
         cost: 90000,
         year: 2009,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M3",
         pi: 725,
         cost: 48000,
         year: 2008,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Z4 M Coupe",
         pi: 694,
         cost: 82000,
         year: 2008,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M3",
         pi: 675,
         cost: 33000,
         year: 2005,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M5", // 20
         pi: 694,
         cost: 30000,
         year: 2003,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M3-GTR",
         pi: 747,
         cost: 180000,
         year: 2002,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Z3 M Coupe",
         pi: 675,
         cost: 30000,
         year: 2002,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M3",
         pi: 665,
         cost: 35000,
         year: 1997,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M5",
         pi: 634,
         cost: 25000,
         year: 1995,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M3", // 25
         pi: 583,
         cost: 70000,
         year: 1991,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M5",
         pi: 583,
         cost: 54000,
         year: 1988,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M1", // 27
         pi: 629,
         cost: 585000,
         year: 1981,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "2002 Turbo", // 28
         pi: 531,
         cost: 26000,
         year: 1973,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: true},
        {name: "Isetta 300 Export",
         pi: 100,
         cost: 45000,
         year: 1957,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Brabham",
        {name: "BT62",
         pi: 974,
         cost: 1500000,
         year: 2019,
         autoshow: true,
         carPass: false,
         hotWheels: true,
         welcome: false,
         barnFind: false}],
    ["Bugatti", // 18
        {name: "Divo",
         pi: 958,
         cost: 3000000,
         year: 2019,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Chiron",
         pi: 927,
         cost: 2400000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Veyron Super Sport", // 3
         pi: 913,
         cost: 2200000,
         year: 2011,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "EB110 Super Sport",
         pi: 805,
         cost: 1700000,
         year: 1992,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Type 35 C",
         pi: 285,
         cost: 1300000,
         year: 1926,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Buick",
        {name: "Regal GNX",
         pi: 564,
         cost: 130000,
         year: 1987,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "GSX",
         pi: 558,
         cost: 80000,
         year: 1970,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Cadillac", // 20
        {name: "CTS-V Sedan",
         pi: 761,
         cost: 80000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "ATS-V",
         pi: 716,
         cost: 65000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Can-Am",
        {name: "Maverick X RS Turbo R",
         pi: 670,
         cost: 25000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Caterham",
        {name: "Superlight R500",
         pi: 786,
         cost: 82000,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Chevrolet", // 23
        {name: "Corvette Stingray Coupé",
         pi: 806,
         cost: 65000,
         year: 2020,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Corvette ZR1",
         pi: 871,
         cost: 255000,
         year: 2019,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Hot Wheels Copo Camaro",
         pi: 867,
         cost: 205000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: true,
         welcome: false,
         barnFind: false},
        {name: "Camaro ZL1 1LE",
         pi: 824,
         cost: 105000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Camaro ZL1", // 5
         pi: 821,
         cost: 60000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Colorado ZR2",
         pi: 530,
         cost: 46000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Corvette Z06",
         pi: 852,
         cost: 110000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Camaro Z/28",
         pi: 797,
         cost: 86000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Corvette ZR1",
         pi: 809,
         cost: 125000,
         year: 2009,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Corvette Z06", // 10
         pi: 722,
         cost: 35000,
         year: 2002,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Impala Super Sport", // 11
         pi: 509,
         cost: 20000,
         year: 1996,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Corvette ZR-1",
         pi: 693,
         cost: 45000,
         year: 1995,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Monte Carlo Super Sport",
         pi: 396,
         cost: 25000,
         year: 1988,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Camaro Z28",
         pi: 466,
         cost: 35000,
         year: 1979,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Corvette ZR-1",
         pi: 610,
         cost: 310000,
         year: 1970,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "El Camino Super Sport 454", // 16
         pi: 544,
         cost: 65000,
         year: 1970,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Camaro Z28",
         pi: 539,
         cost: 53000,
         year: 1970,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Chevelle Super Sport 454",
         pi: 531,
         cost: 80000,
         year: 1970,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Camaro Super Sport Coupe", // 19
         pi: 585,
         cost: 110000,
         year: 1969,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Nova Super Sport 396", // 20
         pi: 545,
         cost: 47000,
         year: 1969,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Corvette Stingray 427",
         pi: 623,
         cost: 150000,
         year: 1967,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Impala Super Sport 409",
         pi: 544,
         cost: 46000,
         year: 1964,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Corvette", // 23
         pi: 541,
         cost: 150000,
         year: 1960,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Bel Air",
         pi: 432,
         cost: 130000,
         year: 1957,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "150 Utility Sedan",
         pi: 360,
         cost: 35000,
         year: 1955,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Corvette FE",
         pi: 800,
         cost: 500000,
         year: 1953,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Corvette", // 27
         pi: 366,
         cost: 210000,
         year: 1953,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: true}],
    ["Datsun",
        {name: "510",
         pi: 264,
         cost: 25000,
         year: 1970,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Deberti",
        {name: "Toyota Tacoma TRD \"The Performance Truck\"",
         pi: 836,
         cost: 500000,
         year: 2019,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Chevrolet Silverado 1500 Drift Truck",
         pi: 798,
         cost: 300000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Wrangler Unlimited",
         pi: 749,
         cost: 200000,
         year: 2018,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "F-150 Prerunner",
         pi: 691,
         cost: 250000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Delorean", // 26
        {name: "DMC-12",
         pi: 464,
         cost: 15000,
         year: 1982,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Dodge", // 27
        {name: "Challenger SRT Demon",
         pi: 786,
         cost: 150000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Durango SRT",
         pi: 666,
         cost: 70000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Viper ACR",
         pi: 873,
         cost: 150000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Charger SRT Hellcat",
         pi: 762,
         cost: 80000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Challenger SRT Hellcat",
         pi: 755,
         cost: 75000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "SRT Viper GTS AE",
         pi: 900,
         cost: 250000,
         year: 2013,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "SRT Viper GTS",
         pi: 813,
         cost: 95000,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Viper SRT10 ACR",
         pi: 844,
         cost: 90000,
         year: 2008,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Magnum SRT-8",
         pi: 669,
         cost: 35000,
         year: 2008,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Viper GTS ACR", // 10
         pi: 717,
         cost: 75000,
         year: 1999,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: true},
        {name: "Coronet Super Bee",
         pi: 566,
         cost: 250000,
         year: 1970,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Challenger R/T",
         pi: 551,
         cost: 210000,
         year: 1970,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Charger R/T FE",
         pi: 900,
         cost: 70000,
         year: 1969,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Charger Daytona Hemi",
         pi: 595,
         cost: 900000,
         year: 1969,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Charger R/T", // 15
         pi: 548,
         cost: 103000,
         year: 1969,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Dart Hemi Super Stock",
         pi: 650,
         cost: 300000,
         year: 1968,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: true}],
    ["Donkervoort",
        {name: "D8 GTO",
         pi: 814,
         cost: 250000,
         year: 2013,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Eagle",
        {name: "Speedster",
         pi: 723,
         cost: 550000,
         year: 2012,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Exomotive", // 30
        {name: "Exocet Off-Road FE",
         pi: 800,
         cost: 500000,
         year: 2018,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Exocet Off-Road",
         pi: 682,
         cost: 50000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Extreme E",
        {name: "#125 ABT Cupra XE",
         pi: 748,
         cost: 700000,
         year: 2022,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#22 JBXE",
         pi: 748,
         cost: 700000,
         year: 2022,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#23 Genesys Andretti United",
         pi: 748,
         cost: 700000,
         year: 2022,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#42 XITE Racing Team",
         pi: 748,
         cost: 700000,
         year: 2022,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#44 X44",
         pi: 748,
         cost: 700000,
         year: 2022,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#5 Veloce Racing",
         pi: 748,
         cost: 700000,
         year: 2022,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#55 Acciona | Sainz XE Team",
         pi: 748,
         cost: 700000,
         year: 2022,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#6 Rosberg X Racing",
         pi: 748,
         cost: 700000,
         year: 2022,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#58 McLaren Racing",
         pi: 748,
         cost: 700000,
         year: 2022,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#99 Chip Ganassi Racing GMC Hummer EV",
         pi: 748,
         cost: 700000,
         year: 2022,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Ferrari", // 32
        {name: "SF90 Stradale",
         pi: 915,
         cost: 750000,
         year: 2020,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "F8 Tributo",
         pi: 891,
         cost: 300000,
         year: 2020,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "488 Pista",
         pi: 889,
         cost: 320000,
         year: 2019,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Monza SP2",
         pi: 867,
         cost: 2000000,
         year: 2019,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "FXX-K Evo",
         pi: 998,
         cost: 3000000,
         year: 2018,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Portofino",
         pi: 814,
         cost: 215000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#25 Corse Clienti 488 Challenge",
         pi: 911,
         cost: 400000,
         year: 2017,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "812 Superfast",
         pi: 878,
         cost: 350000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "J50",
         pi: 857,
         cost: 2500000,
         year: 2017,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "GTC4Lusso", // 10
         pi: 816,
         cost: 300000,
         year: 2017,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "F12TDF",
         pi: 884,
         cost: 500000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "488 GTB",
         pi: 863,
         cost: 290000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "FXX K",
         pi: 979,
         cost: 2700000,
         year: 2014,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "California T",
         pi: 784,
         cost: 250000,
         year: 2014,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "LaFerrari",
         pi: 934,
         cost: 1500000,
         year: 2013,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "458 Speciale",
         pi: 865,
         cost: 340000,
         year: 2013,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "599XX Evolution",
         pi: 952,
         cost: 2600000,
         year: 2012,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "599XX",
         pi: 924,
         cost: 2000000,
         year: 2010,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "599 GTO",
         pi: 828,
         cost: 350000,
         year: 2010,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "458 Italia", // 20
         pi: 823,
         cost: 225000,
         year: 2009,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "430 Scuderia",
         pi: 810,
         cost: 300000,
         year: 2007,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "FXX",
         pi: 956,
         cost: 2500000,
         year: 2005,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "360 Challenge Stradale",
         pi: 773,
         cost: 200000,
         year: 2003,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Enzo Ferrari",
         pi: 857,
         cost: 2800000,
         year: 2002,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "575M Maranello",
         pi: 747,
         cost: 250000,
         year: 2002,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "F50 GT",
         pi: 976,
         cost: 2000000,
         year: 1996,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "F50",
         pi: 789,
         cost: 2000000,
         year: 1995,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "F355 Berlinetta",
         pi: 717,
         cost: 190000,
         year: 1994,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "512 TR",
         pi: 733,
         cost: 270000,
         year: 1992,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "F40 Competizione", // 30
         pi: 947,
         cost: 2000000,
         year: 1989,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: true},
        {name: "F40",
         pi: 784,
         cost: 1200000,
         year: 1987,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "288 GTO",
         pi: 750,
         cost: 3500000,
         year: 1984,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Dino 246 GT",
         pi: 353,
         cost: 425000,
         year: 1969,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "365 GTB/4",
         pi: 637,
         cost: 600000,
         year: 1968,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#24 Ferrari Spa 330 P4",
         pi: 780,
         cost: 9000000,
         year: 1967,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "250 GTO",
         pi: 612,
         cost: 50000000,
         year: 1962,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: true},
        {name: "250 GT Berlinetta Lusso",
         pi: 590,
         cost: 2600000,
         year: 1962,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "250 Testa Rossa",
         pi: 691,
         cost: 16400000,
         year: 1957,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "250 California", // 39
         pi: 564,
         cost: 18500000,
         year: 1957,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Ford", // 33
        {name: "Mustang Mach-E 1400",
         pi: 900,
         cost: 750000,
         year: 2021,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Bronco",
         pi: 560,
         cost: 55000,
         year: 2021,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Mustang Shelby GT500",
         pi: 836,
         cost: 100000,
         year: 2020,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#2069 Ford Performance Bronco R \"Welcome Pack\"",
         pi: 800,
         cost: 250000,
         year: 2020,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: true,
         barnFind: false},
        {name: "#2069 Ford Performance Bronco R",
         pi: 544,
         cost: 250000,
         year: 2020,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Super Duty F-450 DRW Platinum",
         pi: 466,
         cost: 70000,
         year: 2020,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Ranger Raptor",
         pi: 451,
         cost: 58000,
         year: 2019,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#25 Mustang RTR",
         pi: 834,
         cost: 500000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#88 Mustang RTR",
         pi: 834,
         cost: 500000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Mustang RTR Spec 5", // 10
         pi: 757,
         cost: 105000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Mustang GT",
         pi: 756,
         cost: 40000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "GT",
         pi: 863,
         cost: 400000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#14 Rahal Letterman Lanigan Racing Fiesta",
         pi: 860,
         cost: 500000,
         year: 2017,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M-Sport Fiesta RS",
         pi: 808,
         cost: 500000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#25 \"Brocky\" Ultra4 Bronco RTR",
         pi: 748,
         cost: 500000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Focus RS",
         pi: 702,
         cost: 59000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "F-150 Raptor",
         pi: 559,
         cost: 63000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Shelby GT350R",
         pi: 815,
         cost: 75000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Falcon GT F 351",
         pi: 718,
         cost: 60000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#11 Rockstar F-150 Trophy Truck", // 20
         pi: 731,
         cost: 500000,
         year: 2014,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "FPV Limited Edition Pursuit Ute",
         pi: 685,
         cost: 50000,
         year: 2014,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Ranger T6 Rally Raid",
         pi: 643,
         cost: 250000,
         year: 2014,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Fiesta ST", // 23
         pi: 607,
         cost: 25000,
         year: 2014,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Shelby GT500",
         pi: 756,
         cost: 115000,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "F-150 SVT Raptor",
         pi: 518,
         cost: 42000,
         year: 2011,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Transit Supersportvan",
         pi: 347,
         cost: 50000,
         year: 2011,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Crown Victoria Police Interceptor", // 27
         pi: 462,
         cost: 25000,
         year: 2010,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Focus RS",
         pi: 660,
         cost: 25000,
         year: 2009,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "GT",
         pi: 786,
         cost: 300000,
         year: 2005,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Focus RS", // 30
         pi: 593,
         cost: 30000,
         year: 2003,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "F-150 SVT Lightning", // 31
         pi: 585,
         cost: 20000,
         year: 2003,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "SVT Cobra R",
         pi: 648,
         cost: 55000,
         year: 2000,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Racing Puma FE",
         pi: 900,
         cost: 500000,
         year: 1999,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Racing Puma", // 34
         pi: 514,
         cost: 20000,
         year: 1999,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Supervan 3",
         pi: 820,
         cost: 500000,
         year: 1994,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "SVT Cobra R",
         pi: 539,
         cost: 28000,
         year: 1993,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Escort RS Cosworth", // 37
         pi: 565,
         cost: 66000,
         year: 1992,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Sierra Cosworth RS500", // 38
         pi: 604,
         cost: 66000,
         year: 1987,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Mustang SVO", // 39
         pi: 525,
         cost: 15000,
         year: 1986,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Escort RS Turbo", // 40
         pi: 516,
         cost: 25000,
         year: 1986,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "RS200 Evolution",
         pi: 808,
         cost: 260000,
         year: 1985,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Fiesta XR2", // 42
         pi: 369,
         cost: 25000,
         year: 1981,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#5 Escort RS1800 MKII",
         pi: 662,
         cost: 300000,
         year: 1977,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Escort RS1800",
         pi: 477,
         cost: 88000,
         year: 1977,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Bronco", // 45
         pi: 421,
         cost: 38000,
         year: 1975,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Capri RS3100",
         pi: 497,
         cost: 55000,
         year: 1973,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Escort RS1600", // 47
         pi: 476,
         cost: 73000,
         year: 1973,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Falcon XA GT-HO",
         pi: 624,
         cost: 80000,
         year: 1972,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Mustang Mach 1",
         pi: 546,
         cost: 250000,
         year: 1971,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "GT70", // 50
         pi: 671,
         cost: 150000,
         year: 1970,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Mustang Boss 302",
         pi: 581,
         cost: 230000,
         year: 1969,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Mustang GT 2+2 Fastback",
         pi: 498,
         cost: 50000,
         year: 1968,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: true},
        {name: "Racing Escort MK1",
         pi: 636,
         cost: 500000,
         year: 1967,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: true},
        {name: "#2 GT40 MK II",
         pi: 771,
         cost: 11000000,
         year: 1966,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Lotus Cortina",
         pi: 389,
         cost: 50000,
         year: 1966,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Mustang GT Coupe",
         pi: 499,
         cost: 46000,
         year: 1965,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Transit", // 57
         pi: 100,
         cost: 25000,
         year: 1965,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "GT40 MKI",
         pi: 754,
         cost: 11000000,
         year: 1964,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Anglia 105E", // 59
         pi: 100,
         cost: 20000,
         year: 1959,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "F-100", // 60
         pi: 302,
         cost: 36000,
         year: 1956,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: true},
        {name: "De Luxe Coupe",
         pi: 130,
         cost: 44000,
         year: 1940,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "De Luxe Five-Window Coupe", // 62
         pi: 126,
         cost: 35000,
         year: 1932,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Formula Drift",
        {name: "#151 Toyota GR Supra",
         pi: 863,
         cost: 300000,
         year: 2020,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#91 BMW M2",
         pi: 839,
         cost: 300000,
         year: 2020,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#411 Toyota Corolla Hatchback",
         pi: 840,
         cost: 300000,
         year: 2019,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#64 Nissan 370Z",
         pi: 843,
         cost: 300000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#357 Chevrolet Corvette Z06",
         pi: 835,
         cost: 150000,
         year: 2017,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#530 HSV Maloo Gen-F",
         pi: 808,
         cost: 300000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#13 Ford Mustang",
         pi: 825,
         cost: 300000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#777 Chevrolet Corvette",
         pi: 848,
         cost: 300000,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#99 Mazda RX-8",
         pi: 829,
         cost: 300000,
         year: 2009,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#117 599 GTB Fiorano",
         pi: 852,
         cost: 500000,
         year: 2007,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#43 Dodge Viper SRT10",
         pi: 826,
         cost: 300000,
         year: 2006,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#777 Nissan 240SX",
         pi: 826,
         cost: 300000,
         year: 1997,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#34 Toyota Supra MKIV",
         pi: 845,
         cost: 300000,
         year: 1995,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#98 BMW 325I",
         pi: 813,
         cost: 300000,
         year: 1989,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Forsberg Racing",
        {name: "Nissan 'Safariz' 370Z Safari Rally Tribute",
         pi: 720,
         cost: 40000,
         year: 2014,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Toyota Gumout 2JZ Camry Stock Car",
         pi: 900,
         cost: 400000,
         year: 2010,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Nissan \"Gold Leader\" Datsun 280Z",
         pi: 791,
         cost: 100000,
         year: 1975,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Funco Motorsports",
        {name: "F9",
         pi: 821,
         cost: 500000,
         year: 2018,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["GMC", // 37
        {name: "Vandura G-1500",
         pi: 226,
         cost: 25000,
         year: 1983,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Jimmy",
         pi: 521,
         cost: 75000,
         year: 1970,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: true}],
    ["HDT", // 38
        {name: "VK Commodore Group A",
         pi: 550,
         cost: 250000,
         year: 1985,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Hennessey",
        {name: "Venom F5",
         pi: 964,
         cost: 3000000,
         year: 2021,
         autoshow: true,
         carPass: false,
         hotWheels: true,
         welcome: false,
         barnFind: false},
        {name: "Velociraptor 6X6",
         pi: 634,
         cost: 350000,
         year: 2019,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Venom GT",
         pi: 911,
         cost: 1200000,
         year: 2012,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Holden", // 40
        {name: "Torana A9X",
         pi: 517,
         cost: 130000,
         year: 1977,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Sandman HQ Panel Van",
         pi: 501,
         cost: 55000,
         year: 1974,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "HQ Monaro GTS 350",
         pi: 525,
         cost: 75000,
         year: 1973,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Honda", // 41
        {name: "Civic Type R",
         pi: 727,
         cost: 59000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Civic Coupe",
         pi: 861,
         cost: 155000,
         year: 2016,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Civic Type R",
         pi: 699,
         cost: 38000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "S2000 CR",
         pi: 635,
         cost: 25000,
         year: 2009,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Civic Type R", // 5
         pi: 574,
         cost: 20000,
         year: 2007,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "NSX-R GT",
         pi: 725,
         cost: 500000,
         year: 2005,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "NSX-R",
         pi: 691,
         cost: 150000,
         year: 2005,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Civic Type R",
         pi: 600,
         cost: 25000,
         year: 2004,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "S2000", // 9
         pi: 630,
         cost: 25000,
         year: 2003,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Civic Type R", // 10
         pi: 553,
         cost: 25000,
         year: 1997,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Prelude Si", // 11
         pi: 521,
         cost: 20000,
         year: 1994,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "NSX-R",
         pi: 691,
         cost: 90000,
         year: 1992,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "CR-X SiR", // 13
         pi: 534,
         cost: 20000,
         year: 1991,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Civic CRX Mugen",
         pi: 499,
         cost: 40000,
         year: 1984,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Civic RS", // 15
         pi: 368,
         cost: 25000,
         year: 1974,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Hoonigan",
        {name: "Gymkhana 10 Ford Focus RS RX",
         pi: 864,
         cost: 500000,
         year: 2016,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Ford Escort RS Cosworth \"Cossie V2\"",
         pi: 783,
         cost: 500000,
         year: 1994,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Mazda RX-7 Twerkstallion",
         pi: 799,
         cost: 50000,
         year: 1992,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Gymkhana 10 Ford Escort Cosworth Group A",
         pi: 862,
         cost: 500000,
         year: 1991,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Rauh-Welt Begriff Porsche 911 Turbo",
         pi: 811,
         cost: 160000,
         year: 1991,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Ford RS200 Evolution",
         pi: 904,
         cost: 500000,
         year: 1986,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Ford Escort RS1800",
         pi: 820,
         cost: 300000,
         year: 1978,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Gymkhana 10 Ford F-150 'Hoonitruck'",
         pi: 896,
         cost: 500000,
         year: 1977,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Chevrolet Napalm Nova",
         pi: 731,
         cost: 50000,
         year: 1972,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Gymkhana 10 Ford Hoonicorn Mustang",
         pi: 952,
         cost: 500000,
         year: 1965,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Ford \"Hoonicorn\" Mustang",
         pi: 951,
         cost: 500000,
         year: 1965,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Chevrolet Bel Air",
         pi: 621,
         cost: 76000,
         year: 1955,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Hot Wheels",
        {name: "2Jetz",
         pi: 854,
         cost: 250000,
         year: 2018,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Baja Bone Shaker",
         pi: 700,
         cost: 150000,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: true,
         welcome: false,
         barnFind: false},
        {name: "Bad to the Blade",
         pi: 998,
         cost: 200000,
         year: 2012,
         autoshow: true,
         carPass: false,
         hotWheels: true,
         welcome: false,
         barnFind: false},
        {name: "Rip Rod",
         pi: 715,
         cost: 300000,
         year: 2012,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Bone Shaker",
         pi: 790,
         cost: 150000,
         year: 2011,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Ford Mustang",
         pi: 819,
         cost: 300000,
         year: 2005,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Deora II",
         pi: 800,
         cost: 500000,
         year: 2000,
         autoshow: true,
         carPass: false,
         hotWheels: true,
         welcome: false,
         barnFind: false},
        {name: "Twin Mill",
         pi: 798,
         cost: 110000,
         year: 1969,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Nash Metropolitan Custom",
         pi: 631,
         cost: 250000,
         year: 1957,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Ford F-5 Dually Custom Hot Rod",
         pi: 630,
         cost: 250000,
         year: 1949,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["HSV",
        {name: "Limited Edition Gen-F GTS Maloo",
         pi: 742,
         cost: 62000,
         year: 2014,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Gen-F GTS",
         pi: 721,
         cost: 75000,
         year: 2014,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Hummer",
        {name: "H1 Alpha",
         pi: 354,
         cost: 112000,
         year: 2006,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Hyundai",
        {name: "Veloster N",
         pi: 645,
         cost: 30000,
         year: 2019,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Infiniti",
        {name: "Q60 Concept",
         pi: 735,
         cost: 50000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["International", // 48
        {name: "Scout 800A",
         pi: 384,
         cost: 40000,
         year: 1970,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Italdesign",
        {name: "Zerouno",
         pi: 869,
         cost: 2400000,
         year: 2018,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Jaguar", // 50
        {name: "I-Pace",
         pi: 705,
         cost: 87000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "F-Pace S",
         pi: 674,
         cost: 55000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "F-Type Project 7",
         pi: 786,
         cost: 190000,
         year: 2016,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "XKR-S GT",
         pi: 778,
         cost: 250000,
         year: 2015,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "F-Type R Coupé",
         pi: 777,
         cost: 110000,
         year: 2015,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "XFR-S",
         pi: 728,
         cost: 110000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "XE-S",
         pi: 671,
         cost: 57000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "XKR-S",
         pi: 756,
         cost: 100000,
         year: 2012,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "C-X75",
         pi: 880,
         cost: 1500000,
         year: 2010,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "XJ220S TWR", // 10
         pi: 848,
         cost: 400000,
         year: 1993,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "XJ220",
         pi: 786,
         cost: 350000,
         year: 1993,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Sport XJR-15",
         pi: 828,
         cost: 500000,
         year: 1991,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: true},
        {name: "XJ13", // 13
         pi: 779,
         cost: 18000000,
         year: 1966,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Lightweight E-Type",
         pi: 688,
         cost: 7500000,
         year: 1964,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "E-Type",
         pi: 525,
         cost: 150000,
         year: 1961,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "MK II 3.8", // 16
         pi: 448,
         cost: 80000,
         year: 1959,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "D-Type", // 17
         pi: 630,
         cost: 22000000,
         year: 1956,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Jeep", // 51
        {name: "Gladiator Rubicon",
         pi: 456,
         cost: 45000,
         year: 2020,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Grand Cherokee Trackhawk",
         pi: 749,
         cost: 73000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Trailcat",
         pi: 744,
         cost: 75000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Grand Cherokee SRT",
         pi: 680,
         cost: 80000,
         year: 2014,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Wrangler Rubicon",
         pi: 463,
         cost: 50000,
         year: 2012,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "CJ5 Renegade", // 6
         pi: 431,
         cost: 60000,
         year: 1976,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Koenigsegg",
        {name: "Jesko",
         pi: 971,
         cost: 2800000,
         year: 2020,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Agera RS",
         pi: 980,
         cost: 2000000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Regera",
         pi: 966,
         cost: 1900000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "One:1",
         pi: 983,
         cost: 2800000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Agera",
         pi: 894,
         cost: 1500000,
         year: 2011,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "CCGT",
         pi: 965,
         cost: 1000000,
         year: 2008,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "CC8S",
         pi: 846,
         cost: 400000,
         year: 2002,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["KTM",
        {name: "X-Bow GT4",
         pi: 845,
         cost: 400000,
         year: 2018,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "X-Bow R",
         pi: 802,
         cost: 105000,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Lamborghini", // 54
        {name: "Huracán Evo",
         pi: 851,
         cost: 340000,
         year: 2020,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Urus",
         pi: 767,
         cost: 150000,
         year: 2019,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Aventador SVJ",
         pi: 889,
         cost: 500000,
         year: 2018,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Huracán Performante",
         pi: 874,
         cost: 275000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Centenario LP 770-4",
         pi: 884,
         cost: 2300000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Aventador Superveloce", // 6
         pi: 872,
         cost: 480000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Huracán LP 610-4",
         pi: 838,
         cost: 240000,
         year: 2014,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Veneno",
         pi: 910,
         cost: 3000000,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Aventador LP700-4",
         pi: 847,
         cost: 380000,
         year: 2012,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Aventador J", // 10
         pi: 839,
         cost: 2700000,
         year: 2012,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Gallardo LP570-4 Spyder Performante",
         pi: 797,
         cost: 280000,
         year: 2012,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Sesto Elemento FE",
         pi: 998,
         cost: 2750000,
         year: 2011,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Sesto Elemento",
         pi: 936,
         cost: 2500000,
         year: 2011,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Gallardo LP 570-4 Superleggera",
         pi: 814,
         cost: 280000,
         year: 2011,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Murciélago LP 670-4 SV",
         pi: 818,
         cost: 500000,
         year: 2010,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Reventón",
         pi: 817,
         cost: 1375000,
         year: 2008,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Diablo GTR",
         pi: 881,
         cost: 1000000,
         year: 1999,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Diablo SV",
         pi: 763,
         cost: 174000,
         year: 1997,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Countach LP5000 QV",
         pi: 735,
         cost: 220000,
         year: 1988,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "LM 002", // 20
         pi: 562,
         cost: 180000,
         year: 1986,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Espada 400 GT",
         pi: 597,
         cost: 110000,
         year: 1973,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Miura P400",
         pi: 625,
         cost: 1000000,
         year: 1967,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Land Rover", // 55
        {name: "Defender 110 X",
         pi: 534,
         cost: 80000,
         year: 2020,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Range Rover Velar First Edition",
         pi: 638,
         cost: 85000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Range Rover Sport SVR",
         pi: 722,
         cost: 133000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Defender 90",
         pi: 366,
         cost: 30000,
         year: 1997,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Range Rover",
         pi: 274,
         cost: 50000,
         year: 1973,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Series III", // 6
         pi: 100,
         cost: 20000,
         year: 1972,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Lexus",
        {name: "RC F Track Edition",
         pi: 777,
         cost: 100000,
         year: 2020,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "RC F",
         pi: 741,
         cost: 75000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "LFA",
         pi: 810,
         cost: 500000,
         year: 2010,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "SC300",
         pi: 555,
         cost: 25000,
         year: 1997,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Local Motors",
        {name: "Rally Fighter",
         pi: 716,
         cost: 100000,
         year: 2014,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Lola",
        {name: "#6 Penske Sunoco T70 MKIIIB",
         pi: 818,
         cost: 850000,
         year: 1969,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Lotus", // 59
        {name: "Evija",
         pi: 994,
         cost: 2500000,
         year: 2020,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "3-Eleven",
         pi: 839,
         cost: 150000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Exige S",
         pi: 754,
         cost: 85000,
         year: 2012,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Elise Series 1 Sport 190",
         pi: 711,
         cost: 81000,
         year: 1999,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Elise GT1", // 5
         pi: 794,
         cost: 1800000,
         year: 1997,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Elan Sprint", // 6
         pi: 443,
         cost: 57000,
         year: 1971,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Lynk & Co", // 60
        {name: "03+",
         pi: 679,
         cost: 250000,
         year: 2021,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Maserati",
        {name: "Levante S",
         pi: 696,
         cost: 85000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Gran Turismo S FE",
         pi: 900,
         cost: 500000,
         year: 2010,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Gran Turismo S",
         pi: 702,
         cost: 156000,
         year: 2010,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "MC12 Versione Corsa",
         pi: 961,
         cost: 2500000,
         year: 2008,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "8CTF",
         pi: 657,
         cost: 10000000,
         year: 1939,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Mazda", // 62
        {name: "MX-5",
         pi: 620,
         cost: 35000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "MX-5",
         pi: 549,
         cost: 26000,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "RX-8 R3",
         pi: 624,
         cost: 27000,
         year: 2011,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Mazdaspeed MX-5",
         pi: 587,
         cost: 25000,
         year: 2005,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "RX-7 Spirit R Type-A", // 5
         pi: 687,
         cost: 30000,
         year: 2002,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "RX-7",
         pi: 645,
         cost: 35000,
         year: 1997,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "MX-5 Miata", // 7
         pi: 445,
         cost: 25000,
         year: 1994,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "323 GT-R", // 8
         pi: 589,
         cost: 25000,
         year: 1992,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Savanna RX-7", // 9
         pi: 558,
         cost: 25000,
         year: 1990,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["McLaren", // 63
        {name: "765LT",
         pi: 913,
         cost: 400000,
         year: 2021,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "620R",
         pi: 864,
         cost: 400000,
         year: 2021,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "GT",
         pi: 823,
         cost: 210000,
         year: 2020,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Speedtail",
         pi: 910,
         cost: 2250000,
         year: 2019,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "720S Spider",
         pi: 887,
         cost: 340000,
         year: 2019,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Senna",
         pi: 934,
         cost: 1000000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "720S Coupé",
         pi: 899,
         cost: 340000,
         year: 2018,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "600LT Coupé",
         pi: 868,
         cost: 260000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "650S Coupé",
         pi: 859,
         cost: 420000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "570S Coupé", // 10
         pi: 824,
         cost: 224000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "650S Spider",
         pi: 856,
         cost: 420000,
         year: 2014,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "P1",
         pi: 928,
         cost: 1350000,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "F1 GT",
         pi: 866,
         cost: 15000000,
         year: 1997,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "F1", // 14
         pi: 817,
         cost: 15000000,
         year: 1993,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Mercedes-AMG",
        {name: "Mercedes-AMG One",
         pi: 927,
         cost: 2700000,
         year: 2021,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "E 63 S",
         pi: 778,
         cost: 135000,
         year: 2018,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "GT 4-Door Coupé",
         pi: 768,
         cost: 175000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "GT R",
         pi: 837,
         cost: 295000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "C 63 S Coupé",
         pi: 755,
         cost: 90000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "GT S",
         pi: 797,
         cost: 250000,
         year: 2015,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Mercedes-Benz", // 65
        {name: "X-Class",
         pi: 368,
         cost: 65000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#24 Tankpook24 Racing Truck FE",
         pi: 800,
         cost: 750000,
         year: 2015,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#24 Tankpook24 Racing Truck",
         pi: 702,
         cost: 500000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "G 63 AMG 6x6",
         pi: 606,
         cost: 525000,
         year: 2014,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Unimog U5023", // 5
         pi: 103,
         cost: 100000,
         year: 2014,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "E 63 AMG",
         pi: 751,
         cost: 105000,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "A 45 AMG",
         pi: 707,
         cost: 65000,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "G 65 AMG",
         pi: 639,
         cost: 350000,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "C 63 AMG Coupé Black Series",
         pi: 768,
         cost: 150000,
         year: 2012,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "SLK 55 AMG", // 10
         pi: 740,
         cost: 78000,
         year: 2012,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "SLS AMG", // 11
         pi: 804,
         cost: 200000,
         year: 2011,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "AMG CLK GTR FE",
         pi: 998,
         cost: 2250000,
         year: 1998,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "AMG CLK GTR", // 12
         pi: 829,
         cost: 2000000,
         year: 1998,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "190E 2.5-16 Evolution II", // 14
         pi: 579,
         cost: 150000,
         year: 1990,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "AMG Hammer Coupe",
         pi: 681,
         cost: 165000,
         year: 1987,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "300 SLR",
         pi: 714,
         cost: 143000000,
         year: 1955,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "300 SL Coupé", // 17
         pi: 498,
         cost: 1200000,
         year: 1954,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "W154",
         pi: 672,
         cost: 20000000,
         year: 1939,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "SSK",
         pi: 256,
         cost: 7500000,
         year: 1929,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Mercury",
        {name: "Cyclone Spoiler",
         pi: 491,
         cost: 35000,
         year: 1970,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Meyers",
        {name: "Manx FE",
         pi: 800,
         cost: 500000,
         year: 1971,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Manx",
         pi: 291,
         cost: 35000,
         year: 1971,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["MG",
        {name: "MG3",
         pi: 444,
         cost: 250000,
         year: 2015,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "XPower SV-R",
         pi: 694,
         cost: 50000,
         year: 2005,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Metro 6R4",
         pi: 811,
         cost: 125000,
         year: 1986,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Mini", // 69
        {name: "John Cooper Works GP",
         pi: 719,
         cost: 42000,
         year: 2021,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "X-Raid John Cooper Works Buggy",
         pi: 632,
         cost: 250000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "John Cooper Works Countryman All4",
         pi: 537,
         cost: 38500,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "X-Raid All4 Racing Countryman",
         pi: 632,
         cost: 250000,
         year: 2013,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "John Cooper Works GP",
         pi: 628,
         cost: 38000,
         year: 2012,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "John Cooper Works",
         pi: 598,
         cost: 25000,
         year: 2009,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Cooper S FE",
         pi: 800,
         cost: 500000,
         year: 1965,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Cooper S", // 8
         pi: 281,
         cost: 30000,
         year: 1965,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Mitsubishi", // 70
        {name: "Lancer Evolution X GSR \"Welcome Pack\"",
         pi: 800,
         cost: 43000,
         year: 2008,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: true,
         barnFind: false},
        {name: "Lancer Evolution X GSR",
         pi: 649,
         cost: 43000,
         year: 2008,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Lancer Evolution IX MR",
         pi: 632,
         cost: 27000,
         year: 2006,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Lancer Evolution VIII MR",
         pi: 664,
         cost: 31000,
         year: 2004,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Lancer Evolution VI GSR", // 5
         pi: 659,
         cost: 28000,
         year: 1999,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "GTO",
         pi: 610,
         cost: 20000,
         year: 1997,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Eclipse GSX", // 7
         pi: 543,
         cost: 25000,
         year: 1995,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Starion ESI-R", // 8
         pi: 549,
         cost: 20000,
         year: 1988,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Morgan",
        {name: "3 Wheeler",
         pi: 488,
         cost: 50000,
         year: 2014,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Morris", // 72
        {name: "Minor 1000 FE",
         pi: 800,
         cost: 500000,
         year: 1953,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Minor 1000", // 2
         pi: 100,
         cost: 20000,
         year: 1953,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Mosler",
        {name: "MT900S",
         pi: 919,
         cost: 320000,
         year: 2010,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "MT900 GT3",
         pi: 910,
         cost: 500000,
         year: 2006,
         autoshow: true,
         carPass: false,
         hotWheels: true,
         welcome: false,
         barnFind: false}],
    ["Napier",
        {name: "Napier-Railton",
         pi: 603,
         cost: 1500000,
         year: 1933,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Nio",
        {name: "EP9",
         pi: 998,
         cost: 1500000,
         year: 2016,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Nissan", // 76
        {name: "GT-R Nismo (R35)",
         pi: 846,
         cost: 250000,
         year: 2020,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "370Z Nismo",
         pi: 718,
         cost: 50000,
         year: 2019,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Sentra Nismo",
         pi: 591,
         cost: 250000,
         year: 2018,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "GT-R (R35)",
         pi: 814,
         cost: 132000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Titan Warrior Concept",
         pi: 486,
         cost: 50000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "GT-R Black Edition (R35)",
         pi: 810,
         cost: 105000,
         year: 2012,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "370Z",
         pi: 688,
         cost: 40000,
         year: 2010,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Pickup #23 Rally Raid",
         pi: 577,
         cost: 500000,
         year: 2004,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Fairlady Z FE",
         pi: 800,
         cost: 500000,
         year: 2003,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Fairlady Z", // 10
         pi: 650,
         cost: 35000,
         year: 2003,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Skyline GT-R V-Spec II",
         pi: 657,
         cost: 63000,
         year: 2002,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Silvia Spec-R",
         pi: 632,
         cost: 35000,
         year: 2000,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "R390 (GT1)", // 13
         pi: 859,
         cost: 1250000,
         year: 1998,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Silvia K's Aero", // 14
         pi: 609,
         cost: 25000,
         year: 1998,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Skyline GT-R V-Spec", // 15
         pi: 635,
         cost: 37000,
         year: 1997,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Nismo GT-R LM",
         pi: 658,
         cost: 1100000,
         year: 1995,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Silvia K's",
         pi: 617,
         cost: 25000,
         year: 1994,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Fairlady Z Version S Twin Turbo",
         pi: 607,
         cost: 20000,
         year: 1994,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Skyline GT-R V-Spec",
         pi: 626,
         cost: 85000,
         year: 1993,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "240SX SE", // 20
         pi: 445,
         cost: 25000,
         year: 1993,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Silvia Club K's", // 21
         pi: 537,
         cost: 25000,
         year: 1992,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Pulsar GTI-R", // 22
         pi: 594,
         cost: 20000,
         year: 1990,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Skyline GTS-R (HR31)", // 23
         pi: 543,
         cost: 100000,
         year: 1987,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Skyline H/T 2000GT-R",
         pi: 518,
         cost: 170000,
         year: 1973,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Skyline 2000GT-R",
         pi: 493,
         cost: 60000,
         year: 1971,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Fairlady Z 432", // 26
         pi: 482,
         cost: 150000,
         year: 1969,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Noble",
        {name: "M600",
         pi: 877,
         cost: 450000,
         year: 2010,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "M400",
         pi: 829,
         cost: 100000,
         year: 2006,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Oldsmobile",
        {name: "Toronado",
         pi: 403,
         cost: 35000,
         year: 1966,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Opel",
        {name: "Manta 400",
         pi: 691,
         cost: 100000,
         year: 1984,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Pagani", // 80
        {name: "Huayra BC FE",
         pi: 998,
         cost: 2700000,
         year: 2016,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Huayra BC",
         pi: 929,
         cost: 2700000,
         year: 2016,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Zonda R",
         pi: 959,
         cost: 1800000,
         year: 2010,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Zonda Cinque Roadster",
         pi: 896,
         cost: 2100000,
         year: 2009,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Peel",
        {name: "Trident",
         pi: 100,
         cost: 250000,
         year: 1965,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "P50",
         pi: 100,
         cost: 250000,
         year: 1962,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Penhall",
        {name: "The Cholla",
         pi: 655,
         cost: 100000,
         year: 2011,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Peugeot", // 83
        {name: "207 Super 2000",
         pi: 755,
         cost: 150000,
         year: 2007,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "205 Rallye",
         pi: 462,
         cost: 20000,
         year: 1991,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "205 Turbo 16",
         pi: 616,
         cost: 200000,
         year: 1984,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Plymouth",
        {name: "Cuda 426 Hemi",
         pi: 547,
         cost: 160000,
         year: 1971,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Barracuda Formula-S",
         pi: 550,
         cost: 250000,
         year: 1968,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Polaris",
        {name: "RZR XP 1000 EPS",
         pi: 501,
         cost: 25000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Pontiac",
        {name: "Firebird Trans AM GTA FE",
         pi: 900,
         cost: 500000,
         year: 1987,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Firebird Trans AM GTA",
         pi: 485,
         cost: 25000,
         year: 1987,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Firebird Trans AM",
         pi: 418,
         cost: 45000,
         year: 1977,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "GTO",
         pi: 484,
         cost: 48000,
         year: 1965,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Porsche", // 87
        {name: "911 GT3",
         pi: 858,
         cost: 250000,
         year: 2021,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Taycan Turbo S \"Welcome Pack\"",
         pi: 900,
         cost: 185000,
         year: 2020,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: true,
         barnFind: false},
        {name: "Taycan Turbo S",
         pi: 807,
         cost: 185000,
         year: 2020,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "911 GT3 RS FE",
         pi: 900,
         cost: 255000,
         year: 2019,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "911 GT3 RS",
         pi: 860,
         cost: 255000,
         year: 2019,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "911 Carrera S",
         pi: 819,
         cost: 105000,
         year: 2019,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "911 Speedster",
         pi: 813,
         cost: 275000,
         year: 2019,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Macan Turbo",
         pi: 695,
         cost: 135000,
         year: 2019,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "911 GT2 RS",
         pi: 888,
         cost: 315000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "718 Cayman GTS", // 10
         pi: 785,
         cost: 90000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Cayenne Turbo",
         pi: 744,
         cost: 220000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Macan LPR Rally Raid",
         pi: 637,
         cost: 250000,
         year: 2018,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Panamera Turbo",
         pi: 767,
         cost: 150000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "911 GT3 RS",
         pi: 864,
         cost: 235000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Cayman GT4",
         pi: 819,
         cost: 85000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Cayman GTS",
         pi: 767,
         cost: 80000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "918 Spyder",
         pi: 920,
         cost: 850000,
         year: 2014,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "911 Turbo S",
         pi: 808,
         cost: 150000,
         year: 2014,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "911 GT2 RS",
         pi: 860,
         cost: 240000,
         year: 2012,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "911 GT3 RS 4.0", // 20
         pi: 825,
         cost: 250000,
         year: 2012,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "911 Sport Classic",
         pi: 756,
         cost: 205000,
         year: 2010,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "911 GT3",
         pi: 778,
         cost: 65000,
         year: 2004,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Carrera GT",
         pi: 845,
         cost: 1000000,
         year: 2003,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "911 GT1 Strassenversion",
         pi: 840,
         cost: 2500000,
         year: 1998,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "911 Carrera 2 by Gunther Werks",
         pi: 804,
         cost: 575000,
         year: 1995,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "911 GT2",
         pi: 753,
         cost: 550000,
         year: 1995,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "968 Turbo S",
         pi: 701,
         cost: 140000,
         year: 1993,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "911 Reimagined by Singer - DLS",
         pi: 830,
         cost: 1800000,
         year: 1990,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#65 Rothsport Racing 911 \"Desert Flyer\"",
         pi: 694,
         cost: 500000,
         year: 1989,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "944 Turbo", // 30
         pi: 651,
         cost: 35000,
         year: 1989,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "959",
         pi: 764,
         cost: 2000000,
         year: 1987,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#185 959 Prodrive Rally Raid",
         pi: 742,
         cost: 1500000,
         year: 1985,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "911 Turbo 3.3",
         pi: 666,
         cost: 150000,
         year: 1982,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "911 Carrera RS",
         pi: 601,
         cost: 350000,
         year: 1973,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: true},
        {name: "#23 917/20",
         pi: 849,
         cost: 15000000,
         year: 1971,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#3 917 LH",
         pi: 856,
         cost: 15000000,
         year: 1970,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "914/6", // 37
         pi: 427,
         cost: 24000,
         year: 1970,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "356 C Cabriolet Emory Special",
         pi: 651,
         cost: 400000,
         year: 1960,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "356 A 1600 Super",
         pi: 241,
         cost: 240000,
         year: 1959,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "550A Spyder", // 40
         pi: 514,
         cost: 600000,
         year: 1955,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Radical",
        {name: "RXC Turbo",
         pi: 928,
         cost: 330000,
         year: 2015,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Raesr",
        {name: "Tachyon Speed",
         pi: 983,
         cost: 1050000,
         year: 2019,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Ram", // 90
        {name: "2500 Power Wagon",
         pi: 467,
         cost: 47000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Reliant",
        {name: "Supervan III",
         pi: 100,
         cost: 35000,
         year: 1972,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Renault", // 92
        {name: "Megane R.S.",
         pi: 670,
         cost: 37000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Clio R.S. 200 EDC",
         pi: 595,
         cost: 29000,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Mégane R26.R",
         pi: 678,
         cost: 28000,
         year: 2008,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Clio Williams", // 4
         pi: 511,
         cost: 30000,
         year: 1993,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "5 Turbo",
         pi: 521,
         cost: 120000,
         year: 1980,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "4L Export", // 6
         pi: 100,
         cost: 20000,
         year: 1968,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: true},
        {name: "8 Gordini",
         pi: 435,
         cost: 65000,
         year: 1967,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Rimac",
        {name: "Concept Two",
         pi: 963,
         cost: 2000000,
         year: 2019,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["RJ Anderson",
        {name: "#37 Polaris RZR-Rockstar Energy Pro 2 Truck",
         pi: 776,
         cost: 500000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Saleen",
        {name: "S1",
         pi: 821,
         cost: 200000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "S7",
         pi: 855,
         cost: 388000,
         year: 2004,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Schuppan", // 96
        {name: "962CR",
         pi: 869,
         cost: 2500000,
         year: 1993,
         autoshow: true,
         carPass: false,
         hotWheels: true,
         welcome: false,
         barnFind: false}],
    ["Shelby",
        {name: "Cobra 427 S/C",
         pi: 694,
         cost: 2100000,
         year: 1965,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Cobra Daytona Coupe",
         pi: 637,
         cost: 30000000,
         year: 1965,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Sierra Cars",
        {name: "RX3",
         pi: 737,
         cost: 45000,
         year: 2021,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#23 Yokohama Alpha",
         pi: 986,
         cost: 70000,
         year: 2020,
         autoshow: true,
         carPass: false,
         hotWheels: true,
         welcome: false,
         barnFind: false}],
    ["Subaru", // 99
        {name: "STI S209",
         pi: 689,
         cost: 70000,
         year: 2019,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "WRX STI ARX Supercar",
         pi: 849,
         cost: 500000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: true,
         welcome: false,
         barnFind: false},
        {name: "WRX STI",
         pi: 675,
         cost: 42000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "BRZ",
         pi: 581,
         cost: 32000,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "WRX STI",
         pi: 668,
         cost: 33000,
         year: 2011,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Impreza WRX STI",
         pi: 649,
         cost: 31000,
         year: 2008,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Impreza WRX STI",
         pi: 669,
         cost: 51000,
         year: 2005,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Impreza WRX STI",
         pi: 652,
         cost: 28000,
         year: 2004,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Impreza 22B-STI Version",
         pi: 640,
         cost: 110000,
         year: 1998,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Legacy RS", // 10
         pi: 514,
         cost: 250000,
         year: 1990,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Toyota", // 100
        {name: "GR Supra",
         pi: 731,
         cost: 55000,
         year: 2020,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Tundra TRD Pro",
         pi: 562,
         cost: 60000,
         year: 2020,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "4Runner TRD Pro",
         pi: 531,
         cost: 250000,
         year: 2019,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Tacoma TRD Pro",
         pi: 518,
         cost: 50000,
         year: 2019,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Land Cruiser Arctic Trucks AT37",
         pi: 404,
         cost: 250000,
         year: 2016,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "86",
         pi: 579,
         cost: 28800,
         year: 2013,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Hilux Arctic Trucks AT38",
         pi: 457,
         cost: 250000,
         year: 2007,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Celica Sport Specialty II",
         pi: 557,
         cost: 250000,
         year: 2003,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Supra RZ \"Welcome Pack\"",
         pi: 800,
         cost: 38000,
         year: 1998,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: true,
         barnFind: false},
        {name: "Supra RZ", // 10
         pi: 646,
         cost: 38000,
         year: 1998,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Celica GT-Four ST205", // 11
         pi: 590,
         cost: 20000,
         year: 1994,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#1 T100 Baja Truck",
         pi: 693,
         cost: 500000,
         year: 1993,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: true},
        {name: "Supra 2.0 GT", // 13
         pi: 558,
         cost: 20000,
         year: 1992,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Celica GT-Four RC ST185", // 14
         pi: 544,
         cost: 25000,
         year: 1992,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "MR2 SC", // 15
         pi: 502,
         cost: 20000,
         year: 1989,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Sprinter Trueno GT Apex", // 16
         pi: 480,
         cost: 20000,
         year: 1985,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "FJ40", // 17
         pi: 269,
         cost: 55000,
         year: 1979,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Celica GT", // 18
         pi: 315,
         cost: 20000,
         year: 1974,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "2000GT",
         pi: 487,
         cost: 750000,
         year: 1969,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["TVR", // 101
        {name: "Griffith",
         pi: 825,
         cost: 105000,
         year: 2018,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Sagaris",
         pi: 779,
         cost: 86000,
         year: 2005,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Cerbera Speed 12",
         pi: 861,
         cost: 500000,
         year: 1998,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Ultima",
        {name: "Evolution Coupe 1020",
         pi: 961,
         cost: 300000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Vauxhall",
        {name: "Corsa VXR",
         pi: 584,
         cost: 28000,
         year: 2016,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Monaro VXR",
         pi: 696,
         cost: 25000,
         year: 2005,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Lotus Carlton",
         pi: 635,
         cost: 250000,
         year: 1990,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Volkswagen", // 104
        {name: "Golf R",
         pi: 668,
         cost: 65000,
         year: 2021,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#34 Andretti Beetle",
         pi: 851,
         cost: 500000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Golf R", // 3
         pi: 663,
         cost: 50000,
         year: 2014,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Scirocco R",
         pi: 663,
         cost: 45000,
         year: 2011,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Golf R",
         pi: 645,
         cost: 64000,
         year: 2010,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Golf R32",
         pi: 618,
         cost: 20000,
         year: 2003,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "GTI VR6 MK3",
         pi: 510,
         cost: 25000,
         year: 1998,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Corrado VR6", // 8
         pi: 533,
         cost: 20000,
         year: 1995,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Golf GTI 16V MK2",
         pi: 429,
         cost: 20000,
         year: 1992,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Golf GTI", // 10
         pi: 428,
         cost: 20000,
         year: 1983,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Pickup LX", // 11
         pi: 100,
         cost: 20000,
         year: 1982,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Scirocco S", // 12
         pi: 293,
         cost: 20000,
         year: 1981,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "#1107 Desert Dingo Racing Stock Bug",
         pi: 371,
         cost: 25000,
         year: 1970,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Class 5/1600 Baja Bug",
         pi: 349,
         cost: 60000,
         year: 1969,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Beetle FE",
         pi: 900,
         cost: 500000,
         year: 1963,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Beetle", // 16
         pi: 100,
         cost: 20000,
         year: 1963,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Type 2 De Luxe", // 17
         pi: 100,
         cost: 40000,
         year: 1963,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Volvo", // 105
        {name: "V60 Polestar",
         pi: 662,
         cost: 62000,
         year: 2015,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "850 R",
         pi: 511,
         cost: 25000,
         year: 1997,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "242 Turbo Evolution",
         pi: 548,
         cost: 45000,
         year: 1983,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Vuhl",
        {name: "05RR",
         pi: 886,
         cost: 100000,
         year: 2017,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Willys", // 107
        {name: "MB Jeep",
         pi: 198,
         cost: 40000,
         year: 1945,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Wuling",
        {name: "Sunshine S",
         pi: 207,
         cost: 250000,
         year: 2013,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Xpeng",
        {name: "P7",
         pi: 722,
         cost: 250000,
         year: 2020,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Zenvo", // 110
        {name: "TSR-S",
         pi: 927,
         cost: 1200000,
         year: 2019,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "ST1",
         pi: 883,
         cost: 1000000,
         year: 2016,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}]];

// Antique: more than 100 years old
// Vintage: 40 - 100 years old
// Retro: 20 - 30 years old

// D Class 20k cars
// Austin-Healey Sprite 1958 D131
    // vintageRoadsters
// Delorean DMC-12 1982 D464
    // wedges
// Ford Anglia 1959 D100
    // vintageEconoboxes
// Land Rover Series III 1972 D100
    // explorers70s
// Morris Minor 1953 D100
    // vintageEconoboxes
// Peugeot 205 1991 D462
    // hatchbacksEarly90s
// Renault 4L 1968 D100
    // vintageEconoboxes
// Toyota AE86 1985 D480
    // sportLiftbacks80s
// Toyota Celica 1975 D315
    // sportsCars70s
// Volkswagen Golf MK2 1992 D429
    // hatchbacksEarly90s
// Volkswagen Golf MK1 1983 D428
    // hatchbacks70s
// Volkswagen Pickup 1982 D100
    // vintageUtility
// Volkswagen Scirocco 1981 D293
    // hatchbacks70s
// Volkswagen Beetle 1963 D100
    // vintageEconoboxes

// C Class 20k cars
// Chevrolet Impala 1996 C509
    // policeCars
// Ford F-150 Lightning 2003 C585
    // fastAndFurious
// Ford Puma 1999 C514
    // hatchbacksLate90s
// Ford Mustang 1986 C525
    // sportLiftbacks80s
// Honda Civic 2007 C574
    // hondaCivics
// Honda Prelude 1994 C521
    // granTurismoStart
// Honda CR-X 1991 C534
    // granTurismoStart
// Mitsubishi Starion 1988 C549
    // sportLiftbacks80s
// Nissan Pulsar 1990 C594
    // rallyGroupA
// Toyota Celica 1994 C590
    // rallyGroupA
// Toyota Supra 1992 C558
    // sportLiftbacks80s
// Toyota MR2 1989 C502
    // sportLiftbacks80s
// Volkswagen Corrado 1995 C533
    // lakesideDiner

// B Class 20k cars
// Mitsubishi GTO 1997 B610
    // topJapanese90s
// Nissan Fairlady 1994 B607
    // topJapanese90s
// Volkswagen Golf 2003 B618
    // volkswagenGolfs

// What about sprite? Roadsters if enough, or Sport cars
// Sprite is gold
// Corvette is roadster, probably good
// Ferrari is roaster, probably good but C class
// Check the otehrs?
const vintageRoadsters = [
    [12, 1], // Austin-Healey Sprite 1958 D131
    [23, 23], // Chevrolet Corvette 1960 C541
    [23, 27], // Chevrolet Corvette 1953 D366
    [32, 39], // Ferrari 250 Cali 1957 C564
    [97, 1]]; // Shelby Cobra 427 1965 B694

// Porsche is roadster, but race car? like jag
// Ferrari Testa Rossa is like D-type and 550
// Jag D-type is like porsche kinda (literally competed in 24LM)
// MB 300 is sports
const vintageRaceCars = [
    [32, 38], // Ferrari 250 TR 1957 C691
    [50, 13], // Jaguar XJ13 1966 A779
    [50, 17], // Jaguar D-Type 1956 C630
    [65, 16], // Mercedes-Benz 300 SLR 1955 A714
    [87, 40]]; // Porsche 550A 1955 C514

// Anglia and Minor are gold, Beetle works too
// Renault 4L is later, but it fits the theme kinda
// Mini is pushing it since it's so small
// Renault 8 Gordini? No, rally car?
// Austin-Healey sticks out as a cabriolet too, more of a sports car
// Some easy cruises on tarmac, at most a 50/50 rally track
// Reservorio -> Llanuras -> El Pípila? some dirt at the end?
// Or maybe just Panorámica
const vintageEconoboxes = [
    [33, 59], // Ford Anglia 1959 D100
    [72, 2], // Morris Minor 1953 D100
    [92, 6], // Renault 4L 1968 D100
    [104, 16]]; // Volkswagen Beetle 1963 D100

const vintageUtility = [
    [23, 16], // Chevrolet El Camino 1970 C544
    [33, 57], // Ford Transit 1965 D100
    [33, 60], // Ford F-100 1956 D302
    [37, 1], // GMC Vandura 1983 D226
    [37, 2], // GMC Jimmy 1970 C521
    [40, 2], // Holden Sandman 1974 C501
    [104, 11], // Volkswagen Pickup 1982 D100
    [104, 17], // Volkswagen Type 2 1963 D100
    [107, 1]]; // Willys Jeep 1945 D198

// 2000GT and Fairlady are gold
// Ferrari Dino 246 GT too? E-Type?
const sportsCars60s = [
    [76, 26], // Nissan Fairlady Z 1969 D482
    [100, 19]]; // Toyota 2000GT 1969 D487

// Where does Celica 75 belong?
// Not with skyline 73 or Z/2000GT
// With Escort, 2002 and Skyline 71
// Possibly with 914 and Elan
const sportsCars70s = [
    [16, 28], // BMW 2002 1973 C531
    [33, 47], // Ford Escort 1973 D476
    [59, 6], // Lotus Elan 1971 D443
    [76, 25], // Nissan Skyline 1971 D493
    [87, 37], // Porsche 914 1970 D427
    [100, 18]]; // Toyota Celica 1975 D315

// Bronco, Scout, Series III and FJ40 are gold
// Jeep sticks out a little bit but kinda fits still (unless I find a better use for it?)
// Something out in the desert at first?
const explorers70s = [
    [33, 45], // Ford Bronco 1975 D421
    [48, 1], // International Scout 1970 D384
    [51, 6], // Jeep CJ5 1976 D431
    [55, 6], // Land Rover Series III 1972 D100
    [100, 17]]; // Toyota FJ40 1979 D269

// Fiesta, Civic and Golf are gold
// Mini is a bit smaller but works
// FWD only so no Gremlin ? try gremlin! gremlin could go with renault 5
// Try scirocco too!
// I want this to be rallycross folkrace kinda
const hatchbacks70s = [
    [33, 42], // Ford Fiesta 1981 D369
    [41, 15], // Honda Civic 1974 D368
    [69, 8], // Mini Cooper 1965 D281
    [104, 10]]; // Volkswagen Golf MK1 1983 D428

// Delorean and M1
const wedges80s = [
    [16, 27], // BMW M1 1981 B629
    [26, 1]]; // Delorean DMC-12 1982 D464

const sportSedans80s = [
    [16, 25], // BMW M3 1991 C583
    [38, 1], // HDT VK Commodore 1985 C550
    [65, 14], // Mercedes 190E 1990 C579
    [76, 21], // Nissan S13 1992 C537
    [76, 23], // Nissan R31 1987 C543
    [105, 3]]; // Volvo 242 1983 C548

const sportLiftbacks80s = [
    [33, 38], // Ford Sierra 1987 C604
    [33, 39], // Ford Mustang 1986 C525
    [62, 9], // Mazda RX-7 1990 C558
    [70, 8], // Mitsubishi Starion 1988 C549
    [87, 30], // Porsche 944 1989 B651
    [100, 13], // Toyota Supra 1992 C558
    [100, 15], // Toyota MR2 1989 C502
    [100, 16]]; // Toyota AE86 1985 D480

// Should 205 + MK2 be available in D? Probably...
const hatchbacksEarly90s = [
    [83, 2], // Peugeot 205 1991 D462
    [92, 4], // Renault Clio 1993 C511
    [104, 9]]; // Volkswagen Golf MK2 1992 D429

const hatchbacksLate90s = [
    [33, 34], // Ford Puma 1999 C514
    [41, 10], // Honda Civic 1997 C553
    [104, 7]]; // Volkswagen Golf MK3 1998 C510

const rallyGroupA = [
    [33, 37], // Ford Escort 1992 C565
    [62, 8], // Mazda 323 1992 C589
    [70, 5], // Mitsubishi Evo VI 1999 B659
    [76, 22], // Nissan Pulsar 1990 C594
    [99, 9], // Subaru Impreza 1998 B640
    [99, 10], // Subaru Legacy 1990 C514
    [100, 11], // Toyota Celica 1994 C590
    [100, 14]]; // Toyota Celica 1992 C544

const topJapanese90s = [
    [41, 12], // Honda NSX-R 1992 B691
    [62, 6], // Mazda RX-7 1997 B645
    [70, 5], // Mitsubishi Evo VI 1999 B659
    [70, 6], // Mitsubishi GTO 1997 B610
    [76, 15], // Nissan R33 1997 B635
    [76, 18], // Nissan Fairlady Z 1994 B607
    [76, 19], // Nissan R32 1993 B626
    [99, 9], // Subaru Impreza 1998 B640
    [100, 10], // Toyota Supra 1998 B646
    [100, 11]]; // Toyota Celica 1994 C590

const supercars90s = [
    [18, 4], // Bugatti EB110 1992 S805
    [32, 27], // Ferrari F50 1995 A789
    [50, 11], // Jaguar XJ220 1993 A786
    [50, 12], // Jaguar XJR-15 1991 S828
    [54, 18], // Lamborghini Diablo 1997 A763
    [63, 14], // McLaren F1 1993 S817
    [87, 26], // Porsche 911 GT2 1995 A753
    [96, 1], // Schuppan 962CR 1993 S869
    [101, 3]]; // TVR Cerbera 1998 S861

const topRaceCars90s = [
    [32, 26], // Ferrari F50 1996 H976
    [50, 10], // Jaguar XJ220S 1993 S848
    [54, 17], // Lamborghini Diablo 1999 S881
    [59, 5], // Lotus Elise GT1 1997 A794
    [63, 13], // McLaren F1 1997 S866
    [65, 12], // Mercedes AMG CLK GTR 1998 S829
    [76, 13], // Nissan R390 1998 S859
    [87, 24]]; // Porsche 911 GT1 1998 S840

const worldRallyCars00s = [
    [33, 28], // Ford Focus 2009 B660
    [33, 30], // Ford Focus 2003 C593
    [70, 3], // Mitsubishi Evo IX 2006 B632
    [70, 4], // Mitsubishi Evo VIII 2004 B664
    [99, 6], // Subaru Impreza 2008 B649
    [99, 7], // Subaru Impreza 2005 B669
    [99, 8]]; // Subaru Impreza 2004 B652

const worldRallyCars10s = [
    [33, 23], // Ford Fiesta 2014 B607
    [69, 6]]; // Mini John Cooper 2009 C598

const fastAndFurious = [
    [1, 3], // Acura Integra 2001 C596 Mia
    [27, 15], // Dodge Charger 1969 C548 Dom
    [33, 31], // Ford F-150 Lightning 2003 C585 Brian
    [41, 9], // Honda S2000 2003 B630 Johnny
    [62, 6], // Mazda RX-7 1997 B645 Dom
    [70, 7], // Mitsubishi Eclipse 1995 C543 Brian
    [76, 14], // Nissan Silvia 1998 B609 Letty
    [76, 15], // Nissan R33 1997 B635 Leon
    [100, 10]]; // Toyota Supra 1998 B646 Brian

const granTurismoStarters = [
    [41, 11], // Honda Prelude 1994 C521
    [41, 13], // Honda CR-X 1991 C534
    [62, 7], // Mazda MX-5 1994 D445
    [62, 9], // Mazda RX-7 1990 C558
    [76, 21], // Nissan S13 1992 C537
    [100, 13], // Toyota Supra 1992 C558
    [100, 16]]; // Toyota AE86 1985 D480

const lakesideDiner = [
    [23, 19], // Chevrolet Camaro 1969 C585
    [33, 23], // Ford Fiesta 1994 B607
    [70, 5], // Mitsubishi Evo IV 1999 B664
    [100, 10], // Toyota Supra 1998 B646
    [104, 8]]; // Volkswagen Corrado 1995 C533

const hondaCivics = [
    [41, 1], // Honda Civic 2018 A727
    [41, 3], // Honda Civic 2016 B699
    [41, 5], // Honda Civic 2007 C574
    [41, 8], // Honda Civic 2004 C600
    [41, 10], // Honda Civic 1997 C553
    [41, 15]]; // Honda Civic 1974 D368

const volkswagenGolfs = [
    [104, 1], // Volkswagen Golf 2021 B668
    [104, 3], // Volkswagen Golf 2014 B663
    [104, 5], // Volkswagen Golf 2010 B645
    [104, 6], // Volkswagen Golf 2003 B618
    [104, 7], // Volkswagen Golf 1998 C510
    [104, 9], // Volkswagen Golf 1992 D429
    [104, 10]]; // Volkswagen Golf 1983 D428

const policeCars = [
    [11, 8], // Audi RS6 2015 A754
    [16, 5], // BMW M4 2016 S814
    [18, 3], // Bugatti Veyron 2011 H913
    [23, 11], // Chevrolet Impala 1996 C509
    [23, 5], // Chevrolet Camaro 2017 S821
    [33, 2], // Ford Bronco 2021 C590
    [33, 27], // Ford Crown Victoria 2010 D462
    [50, 16], // Jaguar MK II 1959 D448
    [54, 6], // Lamborghini Aventador 2016 S872
    [65, 5], // Mercedes Unimog 2014 D103
    [65, 11], // Mercedes SLS 2011 S804
    [70, 2], // Mitsubishi Evo X 2008 B649
    [104, 3]]; // Volkswagen Golf 2014 B663

const roadSprints = [
    "Dunas Blancas",
    "Descansar Dorado",
    "Reservorio",
    "Copper Canyon",
    "Volcán",
    "Gran Pantano",
    "Sierra Verde",
    "Llanuras",
    "Panorámica",
    "Riviera"];

const roadCircuits = [
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

const dirtTrails = [
    "Cascada",
    "Montaña",
    "Desierto",
    "Baja California",
    "Bajío",
    "Cordillera",
    "Tapalpa",
    "Fuera del Camino",
    "Tulum",
    "Barranca"];

const dirtScrambles = [
    "River",
    "Mangrove",
    "Mulegé Town",
    "San Juan",
    "Horizon Baja",
    "Teotihuacan",
    "Caldera",
    "La Selva",
    "El Pípila",];

const crossCountrySprints = [
    "Las Ranas",
    "Las Dunas",
    "Ribera Rocosa",
    "Costa Este",
    "El Descenso",
    "Oasis",
    "Trópico",
    "Las Granjas",
    "Restos",
    "Foto Final",
    "Copper Canyon",
    "Festival"];

const crossCountryCircuits = [
    "Baja",
    "Costera",
    "Estadio",
    "Urban",
    "Ek' Balam",
    "Herencia",
    "Airfield"];

const streetSprints = [
    "El Lago Blanco",
    "Ruta Norte",
    "Festival Gatecrash",
    "Coast Run",
    "Carretera Chase",
    "Costa Rocosa",
    "Horizon Callejera",
    "Hilltop Descent",
    "Jungle Descent",
    "Las Laderas",
    "Granajas de Tapalpa",
    "Wetland Charge",
    "Las Afueras",
    "Cruce del Valle",
    "Tunnel Run",
    "Bosque del Sur",
    "Guanajuato Sur",
    "Highland Climb",
    "Cañón Run",
    "Castillo del Mar"];

const endurances = [
    "The Goliath",
    "The Colossus",
    "The Gauntlet",
    "The Titan",
    "The Marathon"];

const firstTracks = [
    roadCircuits[7],
    roadCircuits[8],
    dirtTrails[2],
    dirtScrambles[2],
    crossCountrySprints[5],
    crossCountryCircuits[6]];

const allShortTracks = roadSprints.concat(
    roadCircuits,
    dirtTrails,
    dirtScrambles,
    crossCountrySprints,
    crossCountryCircuits,
    streetSprints);

const gameSpeed = [
    1.0,
    1.5,
    2.1,
    2.8,
    3.6,
    4.5,
    5.5,
    6.6,
    7.8,
    9.1];

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

// -----------------------------------------------------------------------
// Class HTML element mappings
// -----------------------------------------------------------------------

// These maps and functions are necessary
// because having class methods on change/keyup/click
// will result in keyword "this" pointing to the select/input/button
// rather than the class object

let carMap = new Map();
let raceMap = new Map();
let eventMap = new Map();

// Car
function getInButtonClick() {
    carMap.get(this.id).getIn();
}
function showUpgradeButtonClick() {
    carMap.get(this.id).showUpgrade();
}
function sellButtonClick() {
    carMap.get(this.id).sell();
}
function piInputKeyup() {
    carMap.get(this.id).setUpgradePI(this.value);

    if (event.key === "Enter") {
        carMap.get(this.id).doUpgrade();
    } else if (event.key === "Escape") {
        carMap.get(this.id).abortUpgrade();
    }
}
function costInputKeyup() {
    carMap.get(this.id).setUpgradeCost(this.value);

    if (event.key === "Enter") {
        carMap.get(this.id).doUpgrade();
    } else if (event.key === "Escape") {
        carMap.get(this.id).abortUpgrade();
    }
}
function doUpgradeButtonClick() {
    carMap.get(this.id).doUpgrade();
}
function abortUpgradeButtonClick() {
    carMap.get(this.id).abortUpgrade();
}

// Race
function positionSelectChange() {
    raceMap.get(this.id).setPosition(this.value);
}
function damageInputKeyup() {
    raceMap.get(this.id).setDamage(this.value);

    if (event.key === "Enter") {
        raceMap.get(this.id).finish();
    }
}
function finishButtonClick() {
    raceMap.get(this.id).finish();
}

// Event
function infoButtonClick() {
    eventMap.get(this.id).showInfo();
}
function enterEventButtonClick() {
    eventMap.get(this.id).enter();
}
function returnEventButtonClick() {
    eventMap.get(this.id).returnToEvents();
}

// -----------------------------------------------------------------------
// Car class
// -----------------------------------------------------------------------

class Car {
    constructor(name,
                make,
                model,
                pi = 0,
                value = 0,
                buttonDisplay = "inline") {

        // Add car to map
        carMap.set(name, this);

        // Car state variables
        this.iCar = state.cars.length;
        this.name = name;
        this.make = make;
        this.model = model;
        this.pi = pi;
        if (pi === 0) {
            this.pi = carList[make][model].pi;
        }
        this.cost = carList[make][model].cost;
        this.value = value;
        if (value === 0) {
            this.value = Math.floor(0.9 * this.cost);
        }

        // Car upgrade variables
        this.upgradePI = toIntPI(0);
        this.upgradeCost = 0;

        // Add and populate new row
        this.row = eGarageTB.insertRow(this.iCar);
        for (let cell = 0; cell < eGarageTH.rows[0].cells.length; cell++) {
            this.row.insertCell();
        }
        this.row.cells[0].innerHTML = this.name + ", "
                                    + carList[this.make][0] + " "
                                    + carList[this.make][this.model].name
                                    + " ("
                                    + carList[this.make][this.model].year
                                    + ")";
        this.row.cells[1].innerHTML = addClassToPI(this.pi);
        this.row.cells[2].innerHTML = formatCredits(this.value);

        // Create and add the options buttons

        this.getInButton = document.createElement("button");
        this.getInButton.id = this.name;
        this.getInButton.innerText = "Get in";
        this.getInButton.onclick = getInButtonClick;
        this.getInButton.style.display = buttonDisplay;
        this.row.cells[3].appendChild(this.getInButton);

        this.showUpgradeButton = document.createElement("button");
        this.showUpgradeButton.id = this.name;
        this.showUpgradeButton.innerText = "Upgrade";
        this.showUpgradeButton.onclick = showUpgradeButtonClick;
        this.showUpgradeButton.style.display = buttonDisplay;
        this.showUpgradeButton.className = "margin";
        this.row.cells[3].appendChild(this.showUpgradeButton);

        this.sellButton = document.createElement("button");
        this.sellButton.id = this.name;
        this.sellButton.innerText = "Sell";
        this.sellButton.onclick = sellButtonClick;
        this.sellButton.style.display = buttonDisplay;
        this.row.cells[3].appendChild(this.sellButton);

        // Create the upgrade fields and buttons

        this.piInput = document.createElement("input");
        this.piInput.id = this.name;
        this.piInput.type = "number";
        this.piInput.style.width = "100%";
        this.piInput.placeholder = "New PI";
        this.piInput.onkeyup = piInputKeyup;

        this.costInput = document.createElement("input");
        this.costInput.id = this.name;
        this.costInput.type = "number";
        this.costInput.style.width = "100%";
        this.costInput.placeholder = "Upgrade cost";
        this.costInput.onkeyup = costInputKeyup;

        this.doUpgradeButton = document.createElement("button");
        this.doUpgradeButton.id = this.name;
        this.doUpgradeButton.innerText = "Upgrade";
        this.doUpgradeButton.onclick = doUpgradeButtonClick;
        this.doUpgradeButton.style.display = "none";
        this.row.cells[3].appendChild(this.doUpgradeButton);

        this.abortUpgradeButton = document.createElement("button");
        this.abortUpgradeButton.id = this.name;
        this.abortUpgradeButton.innerText = "Abort";
        this.abortUpgradeButton.onclick = abortUpgradeButtonClick;
        this.abortUpgradeButton.style.display = "none";
        this.abortUpgradeButton.className = "margin";
        this.row.cells[3].appendChild(this.abortUpgradeButton);
    }

    getModel() {
        return [this.make, this.model];
    }

    getArgs() {
        return {
            n: this.name,
            m: this.getModel(),
            pi: this.pi,
            v: this.value
        }
    }

    toggleOptionsButtons(buttonDisplay) {
        this.getInButton.style.display = buttonDisplay;
        this.showUpgradeButton.style.display = buttonDisplay;
        this.sellButton.style.display = buttonDisplay;
    }

    toggleUpgradeButtons(buttonDisplay) {
        this.doUpgradeButton.style.display = buttonDisplay;
        this.abortUpgradeButton.style.display = buttonDisplay;
    }

    repairCost(damage) {
        // Damage is [0, 200]%
        // At 100% damage, repair costs should be
        // 25% of mean of value and cost
        let mean = (this.value + this.cost) / 2;
        let repair = 0.25 * mean * damage / 100;
        return Math.floor(repair);
    }

    depreciate(damage) {
        // Max depreciation at 10% of value
        let max = 0.1 * this.value;

        // Depreciate with d/(d+n) formula
        // Damage is [0, 200]%
        // When damage is 100%
        // depreciate half of max
        this.value -= Math.floor(max
                               * damage / (damage + 100));

        // Also depreciate 0.2% for mileage
        this.value -= Math.floor(0.002 * this.value);

        // Update table
        this.row.cells[2].innerHTML = formatCredits(this.value);
    }

    getIn() {
        // Only allow getting into car if PI is equal to or lower than DR
        if (iClassFromPI(this.pi) <= state.iDR) {
            state.cCar = this.iCar;
        }

        updateState();
    }

    showUpgrade() {
        // Hide the car state and show upgrade inputs
        this.row.cells[1].innerHTML = "";
        this.row.cells[2].innerHTML = "";
        this.row.cells[1].appendChild(this.piInput);
        this.row.cells[2].appendChild(this.costInput);

        // Hide all buttons
        toggleOptions();
        eToggleOptions.style.display = "none";

        // Show the upgrade buttons
        this.toggleUpgradeButtons("inline");
    }

    sell() {
        // Ask for confirmation before selling
        if (!window.confirm("Sale price is: " + formatCredits(this.value) + ", are you sure you want to sell?")) {
            return;
        }

        // Add back sale price to credits
        state.credits += this.value;

        // Change current car index if necessary
        if (this.iCar === state.cCar) {
            state.cCar = -1;
        } else if (this.iCar < state.cCar) {
            state.cCar--;
        }

        // Update iCar of all other cars
        for (let jCar = (this.iCar + 1); jCar < state.cars.length; jCar++) {
            state.cars[jCar].iCar--;
        }

        // Delete car from table and state
        eGarageTB.deleteRow(this.iCar);
        state.cars.splice(this.iCar, 1);

        updateState();
    }

    setUpgradePI(value) {
        this.upgradePI = toIntPI(value);
    }

    setUpgradeCost(value) {
        this.upgradeCost = toPositiveInt(value);
    }

    exitUpgrade() {
        // Reset the upgrade variables
        this.upgradePI = toIntPI(0);
        this.upgradeCost = 0;

        // Remove and reset the input fields
        this.row.cells[1].removeChild(this.piInput);
        this.row.cells[2].removeChild(this.costInput);
        this.piInput.value = "";
        this.costInput.value = "";

        // Re-add the state information to the table
        this.row.cells[1].innerHTML = addClassToPI(this.pi);
        this.row.cells[2].innerHTML = formatCredits(this.value);

        // Hide the upgrade buttons
        this.toggleUpgradeButtons("none");

        // Show all other buttons and rows again
        eToggleOptions.style.display = "block";
        toggleOptions();
    }

    doUpgrade() {
        // Ask for confirmation if car PI is too high after upgrade
        if (iClassFromPI(this.upgradePI) > state.iDR) {
            if (!window.confirm("Class of car after upgrade (" + addClassToPI(this.upgradePI) + ") will be too high to drive, are you sure you want to upgrade?")) {
                return;
            } else if (state.cCar === this.iCar) {
                state.cCar = -1;
            }
        }

        // Update state variables
        this.pi = this.upgradePI;
        this.value += Math.floor(0.5 * this.upgradeCost);
        state.credits -= this.upgradeCost;

        this.exitUpgrade();

        updateState();
    }

    abortUpgrade() {
        this.exitUpgrade();
    }
}

// -----------------------------------------------------------------------
// Race class
// -----------------------------------------------------------------------

class Race {
    constructor(name, iRace, resultFactor = 1) {
        // Add race to map
        raceMap.set(name, this);

        // Race state variables
        this.name = name;
        this.iRace = iRace;
        this.resultFactor = resultFactor;

        // Add and populate new row
        this.row = eRacesTB.insertRow(this.iRace);
        for (let cell = 0; cell < eRacesTH.rows[0].cells.length; cell++) {
            this.row.insertCell();
        }
        this.row.cells[0].innerText = this.name;

        // Create and add the position selector
        this.positionSelect = document.createElement("select");
        this.positionSelect.id = this.name;
        this.positionSelect.onchange = positionSelectChange;
        for (let pos = 0; pos < positionName.length; pos++) {
            let option = document.createElement("option");
            option.value = pos;
            option.text = positionName[pos];
            this.positionSelect.appendChild(option);
        }
        this.row.cells[1].appendChild(this.positionSelect);

        // Create and add the damage input
        this.damageInput = document.createElement("input");
        this.damageInput.id = this.name;
        this.damageInput.type = "number";
        this.damageInput.style.width = "100%";
        this.damageInput.placeholder = "Damage %";
        this.damageInput.onkeyup = damageInputKeyup;
        this.row.cells[2].appendChild(this.damageInput);

        // Create and add the finish button
        this.finishButton = document.createElement("button");
        this.finishButton.id = this.name;
        this.finishButton.onclick = finishButtonClick;
        this.row.cells[3].appendChild(this.finishButton);

        // Needs to be after this.row is finished
        // since it resets those fields too
        this.reset();
    }

    reset() {
        // Reset position and damage inputs
        this.position = 0;
        this.positionSelect.value = "0";
        this.damage = 0;
        this.damageInput.value = "";

        // Update result variables
        if (state.cCar !== -1) {
            this.setDeltaCredits(state.cars[state.cCar].pi);
            this.setDeltaDR(state.cars[state.cCar].pi);
        } else {
            this.setDeltaCredits(classPI[0]);
            this.setDeltaDR(classPI[0]);
        }
    }

    setDeltaCredits(pi) {
        // Prize depends on class, position and damage
        this.deltaCredits = classPrize[iClassFromPI(pi)]
                          * positionPrize[this.position]
                          * this.resultFactor
                          - state.cars[state.cCar].repairCost(this.damage);

        // Set button text depending on prize
        if (this.deltaCredits > 0) {
            this.finishButton.innerText = "Finish! "
                                        + formatCredits(this.deltaCredits);
        } else if (this.deltaCredits < 0) {
            this.finishButton.innerText = "Finish! "
                                        + formatCredits(this.deltaCredits);
        } else {
            this.finishButton.innerText = "Finish!";
        }
    }

    getBaseDR() {
        // Check for win streak in past 3 races and modify baseDR
        let baseDR = positionDR[this.position];
        if (Math.floor(state.wins / 100) === 1) {
            // Previous race win
            if (this.position === 1
             || this.position === 2
             || this.position === 3) {
                // This race podium
                baseDR--;
            }
        }
        if (this.position === 1) {
            // This race win
            if (Math.floor((state.wins % 100) / 10) === 1) {
                // Second previous race win
                baseDR--;
            }
            if ((state.wins % 10) === 1) {
                // Third previous race win
                baseDR--;
            }
        }
        return baseDR;
    }

    getSubClass(pi) {
        // Should this be a normal function?
        // Does not use any members, might be useful elsewhere

        let iClass = iClassFromPI(pi);

        // subClass will be [1, 10] depending on how far in the class pi is
        let subClass = Math.ceil((((pi - 1) % 100) + 1) / 10);
        if (iClass === 1) {
            // Will be [6, 10] for D class, quicker start
            subClass = Math.ceil(pi / 100) + 5;
        } else if (iClass === 7) {
            // Always min out subClass for X
            subClass = 1;
        }
        return subClass;
    }

    setDeltaDR(pi) {
        let iClass = iClassFromPI(pi);
        if (iClass === 0) {
            // Set to 0 for invalid class
            this.deltaDR = 0;
            return;
        }

        // Calculate the deltaDR, messy but should be cool
        let subClass = this.getSubClass(pi);
        let baseDR = this.getBaseDR();
        let classFactor = subClass * Math.pow(10, iClass - 1);
        let prizeFactor = classPrize[iClass]
                        * (positionPrize[2]
                         + positionPrize[this.position]);
        let repairCost = state.cars[state.cCar].repairCost(this.damage);
        let damageRatio = Math.max(0, Math.min(1, repairCost
                                                / prizeFactor));
        let damageFactor = baseDR - (1 + baseDR / 2) * damageRatio / 2;
        this.deltaDR = Math.ceil(gameSpeed[state.iGS]
                               * damageFactor
                               * classFactor);
    }

    setPosition(value) {
        this.position = toInt(value);

        this.setDeltaCredits(state.cars[state.cCar].pi);
        this.setDeltaDR(state.cars[state.cCar].pi);
    }

    setDamage(value) {
        this.damage = toPositiveInt(value);

        this.setDeltaCredits(state.cars[state.cCar].pi);
        this.setDeltaDR(state.cars[state.cCar].pi);
    }

    finish() {
        // Update DR
        state.dr += this.deltaDR;

        // This check should probably be done in a setter
        // Later, when state is a class?
        if (state.dr < classDR[0]) {
            state.dr = classDR[0];
        }

        // Update win streak history
        // This should probably also be state.updateWins(position);
        state.wins = Math.floor(state.wins / 10);
        if (this.position === 1) {
            state.wins += 100;
        }

        // Update credits
        state.credits += this.deltaCredits;

        // Depreciate value of car
        state.cars[state.cCar].depreciate(this.damage);

        updateState();

        this.reset();
    }
}

// -----------------------------------------------------------------------
// Event class
// -----------------------------------------------------------------------

class Event {
    constructor(name,
                iEvent,
                info,
                raceNames,
                iClass = 0,
                models = 0,
                resultFactor = 1) {
        // Add to event map for the enter button
        // Add to race map for race buttons to go via here
        eventMap.set(name, this);
        raceMap.set(name, this);

        // Event state variables
        this.name = name;
        this.iEvent = iEvent;
        this.infoString = info;
        this.raceNames = JSON.parse(JSON.stringify(raceNames));
        this.iClass = JSON.parse(JSON.stringify(iClass));
        this.models = JSON.parse(JSON.stringify(models));
        this.resultFactor = resultFactor;
        this.cRace = -1;
        this.races = [];
        this.levelUpEvent = false;
        this.playerPoints = 0;
        this.drivatarPoints = [];

        // Add and populate new row in event table
        this.row = eEventsTB.insertRow(this.iEvent);
        for (let cell = 0; cell < eEventsTH.rows[0].cells.length; cell++) {
            this.row.insertCell();
        }
        this.row.cells[0].innerText = this.name;

        // Create and add the info button
        this.infoButton = document.createElement("button");
        this.infoButton.id = this.name;
        this.infoButton.onclick = infoButtonClick;
        this.infoButton.innerText = "Info";
        this.row.cells[1].appendChild(this.infoButton);

        // Create and add the enter event button
        this.enterButton = document.createElement("button");
        this.enterButton.id = this.name;
        this.enterButton.onclick = enterEventButtonClick;
        this.enterButton.innerText = "Enter";
        this.enterButton.className = "margin";
        this.row.cells[1].appendChild(this.enterButton);

        // Create the return from event button
        // It will be added to the races table later
        this.returnButton = document.createElement("button");
        this.returnButton.id = this.name;
        this.returnButton.onclick = returnEventButtonClick;
        this.returnButton.innerText = "Retire";
    }

    showOrHide() {
        // Hide everything if not in a car
        if (state.cCar === -1) {
            this.row.style.display = "none";
            return;
        }

        // Check if current car is included in model list for event
        let cModel = state.cars[state.cCar].getModel();
        let carModelOk = false;
        if (this.models === 0) {
            carModelOk = true;
        } else {
            for (let iModel = 0; iModel < this.models.length; iModel++) {
                if (cModel[0] === this.models[iModel][0]
                 && cModel[1] === this.models[iModel][1]) {
                    carModelOk = true;
                }
            }
        }

        // Check if current car is of the correct class
        let playerDROk = false;
        let carClassOk = false;
        if (this.iClass === 0) {
            playerDROk = true;
            carClassOk = true;
        } else if (this.iClass.length > 0) {
            for (let c = 0; c < this.iClass.length; c++) {
                if (this.iClass[c] <= state.iDR) {
                    playerDROk = true;
                }
                if (this.iClass[c] === iClassFromPI(state.cars[state.cCar].pi)) {
                    carClassOk = true;
                }
            }
        }

        // Check if ready for level up (if level up event)
        let levelUpReady = !this.levelUpEvent;
        if (iClassFromDR(state.dr) > state.iDR) {
            levelUpReady = true;
        }

        // If player is ok, show table row
        if (playerDROk && levelUpReady) {
            this.row.style.display = "table-row";
        } else {
            this.row.style.display = "none";
        }

        // If car is ok, show Enter button
        if (carModelOk && carClassOk) {
            this.enterButton.style.display = "inline";
        } else {
            this.enterButton.style.display = "none";
        }
    }

    showInfo() {
        if (this.infoButton.innerText === "Info") {
            // Add provided info
            let allInfo = this.name + ": ";
            allInfo += this.infoString;

            // Add class
            if (this.iClass !== 0) {
                allInfo += "\n\n";
                if (this.iClass.length > 0) {
                    allInfo += "Class: " + classLetter[this.iClass[0]];
                    for (let c = 1; c < this.iClass.length; c++) {
                        allInfo += ", " + classLetter[this.iClass[c]];
                    }
                } else {
                    allInfo += "Class: " + classLetter[this.iClass];
                }
            }

            // Add eligible models
            if (this.models !== 0 && this.models.length !== 0) {
                allInfo += "\n\nEligible cars:\n";
                for (let iModel = 0; iModel < this.models.length; iModel++) {
                    allInfo += carList[this.models[iModel][0]][0] + " ";
                    allInfo += carList[this.models[iModel][0]][this.models[iModel][1]].name + " (";
                    allInfo += carList[this.models[iModel][0]][this.models[iModel][1]].year + ")\n";
                }
            }

            // Replace name with info
            this.row.cells[0].innerText = allInfo;

            // Repurpose info button to close info
            this.infoButton.innerText = "Hide info";

            // Hide enter button
            this.enterButton.style.display = "none";
        } else {
            // Switch back to name
            this.row.cells[0].innerText = this.name;

            // Return info button back to it's original state
            this.infoButton.innerText = "Info";

            this.showOrHide();
        }
    }

    enter() {
        // Initialize championship points
        this.playerPoints = 0;
        this.drivatarPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        // Add progress to state
        if (state.cEvent === null) {
            // If not null, we're just loading progress
            state.cEvent = {
                ie: this.iEvent,
                p: [],
                dp: JSON.parse(JSON.stringify(this.drivatarPoints))};
            updateState();
        }

        // Hide all other events
        eEventsT.style.display = "none";

        // Show the races table
        eRacesT.style.display = "table";

        // Remove event races
        this.races = [];

        // Create all event races
        for (let iRace = 0; iRace < this.raceNames.length; iRace++) {
            this.races.push(new Race(this.raceNames[iRace],
                                     iRace,
                                     this.resultFactor));
            this.races[iRace].row.style.display = "none";
            this.races[iRace].positionSelect.id = this.name;
            this.races[iRace].damageInput.id = this.name;
            this.races[iRace].finishButton.id = this.name;
        }

        // Create the bonus collector if more than one race
        if (this.races.length > 1) {
            let iBonus = this.races.length;
            this.races.push(new Race("Championship Bonus",
                                     iBonus,
                                     this.resultFactor));
            let bonus = this.races[iBonus];
            bonus.row.style.display = "none";
            bonus.positionSelect.id = this.name;
            bonus.damageInput.id = this.name;
            bonus.finishButton.id = this.name;
            bonus.row.cells[1].removeChild(bonus.positionSelect);
            bonus.row.cells[2].removeChild(bonus.damageInput);
            bonus.setPosition(1);
            bonus.setDamage(0);
        }

        // Add the return from event button to a final row
        this.returnRow = eRacesTB.insertRow(this.races.length);
        for (let cell = 0; cell < eRacesTH.rows[0].cells.length; cell++) {
            this.returnRow.insertCell();
        }
        this.returnRow.cells[3].appendChild(this.returnButton);

        // Show first race
        this.cRace = 0;
        this.races[this.cRace].row.style.display = "table-row";
    }

    returnToEvents() {
        // Clear progress from state
        state.cEvent = null;
        updateState();

        // Hide event races
        this.cRace = -1;
        for (let iRace = 0; iRace < this.races.length; iRace++) {
            this.races[iRace].row.style.display = "none";
        }

        // Remove event races
        this.races = [];

        // Remove return button and row
        this.returnButton.innerText = "Retire";
        this.returnRow.cells[3].removeChild(this.returnButton);
        this.returnRow.style.display = "none";

        // Hide the races table
        eRacesT.style.display = "none";

        // Show all the events again
        eEventsT.style.display = "table";
    }

    setPosition(value) {
        if (this.cRace >= 0
         && this.cRace < this.races.length) {
            this.races[this.cRace].setPosition(value);
        }
    }

    setDamage(value) {
        if (this.cRace >= 0
         && this.cRace < this.races.length) {
            this.races[this.cRace].setDamage(value);
        }
    }

    displayResults(position, repairCost, credits) {
        let thisRace = this.races[this.cRace];

        // Remove interactive elements and display results
        if (this.races.length === 1
         || this.cRace !== this.races.length - 1) {
            // These cells are not populated for bonus collection
            thisRace.row.cells[1].removeChild(thisRace.positionSelect);
            thisRace.row.cells[1].innerText = positionName[position];
            thisRace.row.cells[2].removeChild(thisRace.damageInput);
            thisRace.row.cells[2].innerText = formatCredits(repairCost);
        }
        thisRace.row.cells[3].removeChild(thisRace.finishButton);
        thisRace.row.cells[3].innerText = formatCredits(credits);

        if (this.races.length > 1) {
            // Get current position in championship
            let champPos = 1;
            for (let d = 0; d < this.drivatarPoints.length; d++) {
                if (this.playerPoints < this.drivatarPoints[d]) {
                    champPos++;
                }
            }

            // Set championship bonus to current championship position
            this.races[this.races.length - 1].setPosition(champPos);

            if (this.cRace < this.races.length - 2) {
                // Normal race, update current position
                this.returnRow.cells[0].innerText = "Total standings";
                this.returnRow.cells[1].innerText = positionName[champPos];
            } else if (this.cRace === this.races.length - 2){
                // Bonus collector is next,
                // so set current championship position in that row
                // and clear return row
                this.races[this.races.length - 1].row.cells[1].innerText = positionName[champPos];
                this.returnRow.cells[0].innerText = "";
                this.returnRow.cells[1].innerText = "";
            }
        }
    }

    showNext() {
        // Show next race or return button
        this.cRace++;
        if (this.cRace < this.races.length) {
            this.races[this.cRace].row.style.display = "table-row";
        } else {
            this.returnButton.innerText = "Return";
        }
    }

    addArrays(a, b) {
        // Stolen from stackoverflow idk
        return a.map((e,i) => e + b[i]);
    }

    addDrivatarPoints(playerPosition) {
        // Deep copy position points
        let points = JSON.parse(JSON.stringify(positionPoints));

        // Remove player position and null element
        if (playerPosition === 0) {
            points.splice(points.length - 1, 1);
        } else {
            points.splice(playerPosition, 1);
        }
        points.splice(0, 1);

        // Randomize array in-place using Durstenfeld shuffle algorithm
        for (let i = points.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = points[i];
            points[i] = points[j];
            points[j] = temp;
        }

        // Add points to drivatars
        this.drivatarPoints = this.addArrays(this.drivatarPoints, points);
        state.cEvent.dp = JSON.parse(JSON.stringify(this.drivatarPoints));
    }

    finish() {
        // Sanity check
        if (this.cRace >= 0
         && this.cRace < this.races.length) {
            let thisRace = this.races[this.cRace];

            // Championship race
            if (this.races.length > 1
             && this.cRace < this.races.length - 1) {
                this.playerPoints += positionPoints[thisRace.position];
                this.addDrivatarPoints(thisRace.position);
            }

            let repairCost = state.cars[state.cCar].repairCost(thisRace.damage);
            this.displayResults(thisRace.position,
                                repairCost,
                                thisRace.deltaCredits);

            // Add progress to state
            state.cEvent.p.push([
                thisRace.position,
                repairCost,
                thisRace.deltaCredits]);
            updateState();

            // Save DR, this will be rolled back if just collecting bonus
            let preDR = state.dr;
            let preValue = state.cars[state.cCar].value;

            // Check if podium before finishing
            let podium = thisRace.position < 4;

            thisRace.finish();

            this.showNext();

            // Roll back DR if collecting bonus
            if (this.races.length > 1
             && this.cRace === this.races.length) {
                state.dr = preDR;
                state.cars[state.cCar].value = preValue;
                state.cars[state.cCar].row.cells[2].innerHTML = formatCredits(preValue);

                // Only level up with a podium
                if (this.levelUpEvent && podium) {
                    state.iDR++;
                }

                updateState();
            }
        }
    }

    load(aProgress, drivatarPoints) {
        // This function should only be called when loading state
        // It only reloads the previous results
        this.drivatarPoints = JSON.parse(JSON.stringify(drivatarPoints));
        this.playerPoints += positionPoints[aProgress[0]];

        this.displayResults(aProgress[0],
                            aProgress[1],
                            aProgress[2]);

        this.showNext();
    }
}

// -----------------------------------------------------------------------
// Helper functions
// -----------------------------------------------------------------------

function toInt(string) {
    if (Number.isInteger(string)) {
        return string;
    }
    let integer = parseInt(string);
    if (Number.isNaN(integer)) {
        return 0;
    }
    return integer;
}

function toPositiveInt(string) {
    return Math.max(0, toInt(string));
}

function toIntPI(string) {
    let integer = toInt(string);
    if (integer < classPI[0]) {
        return classPI[0];
    } else if (integer > classPI[7]) {
        return classPI[7];
    }
    return integer;
}

function iClassFromPI(pi) {
    if (pi < classPI[0] || pi > classPI[7]) {
        return 0;
    } else if (pi <= classPI[1]) {
        return 1;
    } else if (pi <= classPI[2]) {
        return 2;
    } else if (pi <= classPI[3]) {
        return 3;
    } else if (pi <= classPI[4]) {
        return 4;
    } else if (pi <= classPI[5]) {
        return 5;
    } else if (pi <= classPI[6]) {
        return 6;
    } else {
        return 7;
    }
}

function addClassToPI(pi) {
    if (pi < classPI[0] || pi > classPI[7]) {
        return classLetter[0];
    }
    return classLetter[iClassFromPI(pi)] + pi;
}

function iClassFromDR(dr) {
    if (dr < classDR[0]) {
        return 0;
    } else if (dr < classDR[1]) {
        return 1;
    } else if (dr < classDR[2]) {
        return 2;
    } else if (dr < classDR[3]) {
        return 3;
    } else if (dr < classDR[4]) {
        return 4;
    } else if (dr < classDR[5]) {
        return 5;
    } else if (dr < classDR[6]) {
        return 6;
    } else {
        return 7;
    }
}

function drToClass(dr) {
    if (dr < classDR[0]) {
        return classLetter[0];
    }
    return classLetter[iClassFromDR(dr)];
}

function drToPercent(dr) {
    if (dr < classDR[0]) {
        return 0 + "%";
    }
    return Math.floor(100 * dr / classDR[state.iDR]) + "%";
}

function drToColor(dr) {
    return classColor[iClassFromDR(dr)];
}

function formatCredits(credits) {
    if (credits >= 0) {
        return "€" + credits.toLocaleString('fr');
    } else {
        credits *= -1;
        return "-€" + credits.toLocaleString('fr');
    }
}

function slowestCar(make) {
    let iMake = toPositiveInt(make);
    if (iMake === 0 || iMake >= carList.length) {
        return;
    }

    let pi = 999;
    for (let iModel = 1; iModel < carList[iMake].length; iModel++) {
        if (pi > carList[iMake][iModel].pi) {
            pi = carList[iMake][iModel].pi;
        }
    }
    return pi;
}

function cheapestCar(make) {
    let iMake = toPositiveInt(make);
    if (iMake === 0 || iMake >= carList.length) {
        return;
    }

    let prize = Infinity;
    for (let iModel = 1; iModel < carList[iMake].length; iModel++) {
        if (prize > carList[iMake][iModel].cost) {
            prize = carList[iMake][iModel].cost;
        }
    }
    return prize;
}

function hasBuyableModel(make) {
    let iMake = toPositiveInt(make);
    if (iMake === 0 || iMake >= carList.length) {
        return;
    }

    let foundModel = false;
    for (let iModel = 1; iModel < carList[iMake].length; iModel++) {
        if (state.iDR >= iClassFromPI(carList[iMake][iModel].pi)
         && state.credits >= carList[iMake][iModel].cost
         && (carList[iMake][iModel].autoshow || !state.hide.autoshow)
         && (!carList[iMake][iModel].carPass || !state.hide.carPass)
         && (!carList[iMake][iModel].hotWheels || !state.hide.hotWheels)
         && (!carList[iMake][iModel].welcome || !state.hide.welcome)
         && (!carList[iMake][iModel].barnFind || !state.hide.barnFind)) {
            foundModel = true;
        }
    }
    return foundModel;
}

// -----------------------------------------------------------------------
// State functions
// -----------------------------------------------------------------------

function getStateString(s = state) {
    // Store cars as constructor argument objects
    let carArgs = [];
    for (let iCar = 0; iCar < s.cars.length; iCar++) {
        carArgs.push(s.cars[iCar].getArgs());
    }

    // Store state as compact as possible
    let compact = {
        n: s.name,
        igs: s.iGS,
        h: {a: 0,
            cp: 0,
            hw: 0,
            w: 0,
            bf: 0},
        dr: s.dr,
        idr: s.iDR,
        w: s.wins,
        m: s.credits,
        ce: s.cEvent,
        cc: s.cCar,
        c: carArgs};

    if (s.hide.autoshow) {
        compact.h.a = 1;
    }
    if (s.hide.carPass) {
        compact.h.cp = 1;
    }
    if (s.hide.hotWheels) {
        compact.h.hw = 1;
    }
    if (s.hide.welcome) {
        compact.h.w = 1;
    }
    if (s.hide.barnFind) {
        compact.h.bf = 1;
    }
    // Always return an array,
    // where array[0] is the version
    // and array[1] is the compact state
    return JSON.stringify([s.version, compact]);
}

function clearNewCarModel() {
    // Clear model selector
    while (eNewCarModel.options.length > 0) {
        eNewCarModel.remove(0);
    }

    // Add "Choose model"
    let modelOption = document.createElement("option");
    modelOption.value = 0;
    modelOption.text = carList[0][1];
    eNewCarModel.appendChild(modelOption);
}

function updateState() {
    // Update player name
    if (state.name === "") {
        eStateName.innerText = "No name!";
    } else {
        eStateName.innerText = state.name;
    }

    // Update car name
    if (state.cars.length > 0) {
        if (state.cCar !== -1) {
            eStateCar.innerText = state.cars[state.cCar].name + " "
                                + addClassToPI(state.cars[state.cCar].pi);
            eEvents.style.display = "block";
        } else {
            eStateCar.innerText = "Not in a car!";
            eEvents.style.display = "none";
        }
    } else {
        eStateCar.innerText = "No cars!";
        eEvents.style.display = "none";
    }

    // Update driver rating progress bar
    eStateCredits.innerText = formatCredits(state.credits);
    if (iClassFromDR(state.dr) > state.iDR) {
        eStateDR.innerHTML = classLetter[state.iDR] + "+";
        eStateDRProgress.style.width = "100%";
    } else {
        eStateDR.innerHTML = classLetter[state.iDR];
        eStateDRProgress.style.width = drToPercent(state.dr);
    }
    eStateDRProgress.style.backgroundColor = classColor[state.iDR];

    // Only show events that should be
    for (let iEvent = 0; iEvent < events.length; iEvent++) {
        events[iEvent].showOrHide();
    }

    // Show garage options if no cars
    if (state.cars.length === 0) {
        toggleOptions(true);
    }

    // Clear make selector
    while (eNewCarMake.options.length > 0) {
        eNewCarMake.remove(0);
    }

    // Add "Choose manufacturer"
    let baseMakeOption = document.createElement("option");
    baseMakeOption.value = 0;
    baseMakeOption.text = carList[0][0];
    eNewCarMake.appendChild(baseMakeOption);

    // Add all buyable makes
    for (let iMake = 1; iMake < carList.length; iMake++) {
        if (hasBuyableModel(iMake)) {
            let makeOption = document.createElement("option");
            makeOption.value = iMake;
            makeOption.text = carList[iMake][0];
            eNewCarMake.appendChild(makeOption);
        }
    }

    // Only "Choose model" shown
    clearNewCarModel();

    // Set game speed slider value
    eGameSpeed.value = state.iGS;

    // Set all checkboxes
    eAutoshow.checked = state.hide.autoshow;
    eCarPass.checked = state.hide.carPass;
    eHotWheels.checked = state.hide.hotWheels;
    eWelcome.checked = state.hide.welcome;
    eBarnFind.checked = state.hide.barnFind;

    // Store state in localStorage
    localStorage.setItem("state", getStateString());
}

function setStateFromString(inputString) {
    let parsed = JSON.parse(inputString);
    let validVersions = ["0.1.0"];

    // Make sure parsed string is an array,
    // where array[0] is the version
    // and array[1] is the actual state
    if (parsed.length !== 2) {
        console.log("Input (" + inputString + ") is not a valid state!")
        return;
    }
    let version = parsed[0];
    if (!validVersions.includes(version)) {
        console.log("Input version " + version + " is not valid!")
        return;
    }

    // inputString and version is valid, set state
    let compact = parsed[1];
    state.version = thisVersion;
    state.name = compact.n;
    state.iGS = compact.igs;
    state.hide = {autoshow: false,
                  carPass: false,
                  hotWheels: false,
                  welcome: false,
                  barnFind: false};
    if (compact.h.a === 1) {
        state.hide.autoshow = true;
    }
    if (compact.h.cp === 1) {
        state.hide.carPass = true;
    }
    if (compact.h.hw === 1) {
        state.hide.hotWheels = true;
    }
    if (compact.h.w === 1) {
        state.hide.welcome = true;
    }
    if (compact.h.bf === 1) {
        state.hide.barnFind = true;
    }
    state.dr = compact.dr;
    state.iDR = compact.idr;
    state.wins = compact.w;
    state.credits = compact.m;
    state.cEvent = compact.ce;
    state.cCar = compact.cc;

    // Create new cars with args from state
    state.cars = [];
    let carArgs = compact.c;
    for (let iCar = 0; iCar < carArgs.length; iCar++) {
        state.cars.push(new Car(
            carArgs[iCar].n,
            carArgs[iCar].m[0],
            carArgs[iCar].m[1],
            carArgs[iCar].pi,
            carArgs[iCar].v,
            "none"));
    }

    // Enter event if in progress
    if (compact.ce !== null) {
        events[compact.ce.ie].enter();

        // Load previous results
        for (let iRace = 0; iRace < compact.ce.p.length; iRace++) {
            events[compact.ce.ie].load(compact.ce.p[iRace],
                                       compact.ce.dp);
        }
    }

    updateState();
}

// -----------------------------------------------------------------------
// HTML element functions
// -----------------------------------------------------------------------

// Start

function startNameInput() {
    newName = eStartName.value;
}

function startClassSelect() {
    newClass = toPositiveInt(eStartClass.value);
}

function startGameButton() {
    // Start with default state
    setStateFromString(getStateString(defaultState));

    // Set the start game inputs
    state.name = newName;
    state.dr = Math.pow(10, newClass + 1);
    state.iDR = newClass;

    // Show the actual game
    eStart.style.display = "none";
    eGame.style.display = "block";

    updateState();
}

// Garage

function toggleOptions(show = false) {
    // Show or hide based on current status
    let newDisplay = "none";
    if (eToggleOptions.innerText === "Show options"
     || show) {
        newDisplay = "inline";
        eNewCarRow.style.display = "table-row";
        eToggleOptions.innerText = "Hide options";
    } else {
        eNewCarRow.style.display = "none";
        eToggleOptions.innerText = "Show options";
    }

    // Change display for all buttons for all cars
    for (let iCar = 0; iCar < state.cars.length; iCar++) {
        state.cars[iCar].toggleOptionsButtons(newDisplay);
    }
}

function addCar() {
    // Check if the input fields are filled out
    if (eNewCarName.value === ""
     || toPositiveInt(eNewCarMake.value) === 0
     || toPositiveInt(eNewCarModel.value) === 0) {
        return;
    }

    // Save input values
    let newName = eNewCarName.value;
    let newMake = toPositiveInt(eNewCarMake.value);
    let newModel = toPositiveInt(eNewCarModel.value);
    let newPI = carList[newMake][newModel].pi;
    let newCost = carList[newMake][newModel].cost;

    // Ask for confirmation if new car PI is too high
    if (iClassFromPI(newPI) > state.iDR) {
        if (!window.confirm("Class of new car (" + addClassToPI(newPI) + ") is too high to drive, are you sure you want to purchase?")) {
            return;
        }
    }

    // Save input to state
    state.cars.push(new Car(newName,
                            newMake,
                            newModel));
    state.credits -= newCost;

    // Set to current car if possible
    if (iClassFromPI(newPI) <= state.iDR) {
        state.cCar = state.cars.length - 1;
    }

    // Clear input fields
    // Car selectors will be reset in updateState
    eNewCarName.value = "";
    eNewCarRow.cells[1].innerHTML = "";
    eNewCarRow.cells[2].innerHTML = "";

    updateState();
}

function newCarInput() {
    // Actually enter input with Enter
    if (event.key === "Enter") {
        addCar();
    }
}

function newCarMakeSelect() {
    clearNewCarModel();

    // Clear display
    eNewCarRow.cells[1].innerHTML = "";
    eNewCarRow.cells[2].innerHTML = "";

    // "Choose manufacturer"
    let make = toPositiveInt(eNewCarMake.value);
    if (make === 0) {
        return;
    }

    // Add all buyable models
    for (let iModel = 1; iModel < carList[make].length; iModel++) {
        if (state.iDR >= iClassFromPI(carList[make][iModel].pi)
         && state.credits >= carList[make][iModel].cost
         && (carList[make][iModel].autoshow || !state.hide.autoshow)
         && (!carList[make][iModel].carPass || !state.hide.carPass)
         && (!carList[make][iModel].hotWheels || !state.hide.hotWheels)
         && (!carList[make][iModel].welcome || !state.hide.welcome)
         && (!carList[make][iModel].barnFind || !state.hide.barnFind)) {
            let option = document.createElement("option");
            option.value = iModel;
            option.text = carList[make][iModel].name + " ("
                        + carList[make][iModel].year + ")";
            eNewCarModel.appendChild(option);
        }
    }
}

function newCarModelSelect() {
    // "Choose manufacturer" or "Choose model"
    let make = toPositiveInt(eNewCarMake.value);
    let model = toPositiveInt(eNewCarModel.value);
    if (make === 0 || model === 0) {
        // Clear display and return
        eNewCarRow.cells[1].innerHTML = "";
        eNewCarRow.cells[2].innerHTML = "";
        return;
    }

    // Show PI and cost
    eNewCarRow.cells[1].innerHTML = addClassToPI(carList[make][model].pi);
    eNewCarRow.cells[2].innerHTML = formatCredits(carList[make][model].cost);
}

// Settings

function changeNameButton() {
    state.name = prompt("Please enter your name: ");
    updateState();
}

function gameSpeedInput() {
    state.iGS = toPositiveInt(eGameSpeed.value);
    updateState();
}

function gameSpeedDefaultButton() {
    state.iGS = toPositiveInt(defaultState.iGS);
    updateState();
}

function autoshowClick() {
    state.hide.autoshow = eAutoshow.checked;
    updateState();
}

function carPassClick() {
    state.hide.carPass = eCarPass.checked;
    updateState();
}

function hotWheelsClick() {
    state.hide.hotWheels = eHotWheels.checked;
    updateState();
}

function welcomeClick() {
    state.hide.welcome = eWelcome.checked;
    updateState();
}

function barnFindClick() {
    state.hide.barnFind = eBarnFind.checked;
    updateState();
}

function resetGameButton() {
    // Set state to default
    localStorage.setItem("state", null);

    // Force refresh to clear HTML
    window.location.reload();
}

function saveGameButton() {
    let gameSave = getStateString();
    navigator.clipboard.writeText(gameSave);
}

function loadGameButton() {
    if (eStartLoad.value === ""
     && eGameLoad.value === "") {
        return;
    }

    // Get the non-empty data
    // Should only be one, but if not, start is prio
    let gameData = "";
    if (eStartLoad.value !== "") {
        gameData = eStartLoad.value;
    } else if (eGameLoad.value !== "") {
        gameData = eGameLoad.value;
    }

    setStateFromString(gameData);

    // Reset input fields
    eStartLoad.value = "";
    eGameLoad.value = "";

    // Force refresh to clear HTML
    window.location.reload();
}

function loadGameInput() {
    // Actually enter input with Enter
    if (event.key === "Enter") {
        loadGameButton();
    }
}


// -----------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------

// Create all events
events = [];
info = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
events.push(new Event("Open Race", events.length,
                      "Single race on random track, any car allowed!",
                      ["Race"]));

events.push(new Event("Class Level Up Championship", events.length, info,
                      ["1: Race", "2: Race", "3: Race"]));

// This will make finishing the championship increase iDR
eventMap.get("Class Level Up Championship").levelUpEvent = true;

events.push(new Event("Vintage Roadsters", events.length, "",
                      ["some road race"],
                      [1, 2, 3], // 131 - 694
                      vintageRoadsters));

events.push(new Event("Vintage Race Cars", events.length, "",
                      ["some road race"],
                      [2, 3, 4], // 514 - 714
                      vintageRaceCars));

events.push(new Event("Vintage Econoboxes", events.length, "",
                      ["some road race"],
                      1, // 100
                      vintageEconoboxes));

events.push(new Event("Vintage Utility", events.length, "",
                      ["some road race"],
                      [1, 2], // 100 - 544
                      vintageUtility));

events.push(new Event("60s Sports Cars", events.length, "",
                      ["some road race"],
                      1, // 482 - 487
                      sportsCars60s));

events.push(new Event("70s Sports Cars", events.length, "",
                      ["some road race"],
                      [1, 2], // 315 - 531
                      sportsCars70s));

events.push(new Event("70s Explorers", events.length, "",
                      ["some road race"],
                      1, // 100 - 431
                      explorers70s));

events.push(new Event("70s Hatchbacks", events.length, "",
                      ["some road race"],
                      1, // 281 - 428
                      hatchbacks70s));

events.push(new Event("80s Wedge Showdown", events.length, "",
                      ["some road race"],
                      [1, 2, 3], // 464 - 629
                      wedges80s));

events.push(new Event("80s Sport Sedans", events.length, "",
                      ["some road race"],
                      [2, 3], // 537 - 583
                      sportSedans80s));

events.push(new Event("80s Sport Liftbacks", events.length, "",
                      ["some road race"],
                      [1, 2, 3], // 480 - 651
                      sportLiftbacks80s));

events.push(new Event("Early 90s Hatchbacks", events.length, "",
                      ["some road race"],
                      [1, 2], // 429 - 511
                      hatchbacksEarly90s));

events.push(new Event("Late 90s Hatchbacks", events.length, "",
                      ["some road race"],
                      2, // 510 - 553
                      hatchbacksLate90s));

events.push(new Event("Group A Rally Cars", events.length, "",
                      ["some road race"],
                      [2, 3], // 514 - 659
                      rallyGroupA));

events.push(new Event("90s Japanese Sports Cars", events.length, "",
                      ["some road race"],
                      [2, 3], // 590 - 691
                      topJapanese90s));

events.push(new Event("90s Supercars", events.length, "",
                      ["some road race"],
                      [4, 5], // 753 - 869
                      supercars90s));

events.push(new Event("90s Race Cars", events.length, "",
                      ["some road race"],
                      [4, 5, 6], // 794 - 976
                      topRaceCars90s));

events.push(new Event("00s World Rally Cars", events.length, "",
                      ["some road race"],
                      [2, 3], // 593 - 669
                      worldRallyCars00s));

events.push(new Event("10s World Rally Cars", events.length, "",
                      ["some road race"],
                      [2, 3], // 598 - 607
                      worldRallyCars10s));

events.push(new Event("The Fast and the Furious", events.length, "",
                      ["some road race"],
                      [2, 3], // 543 - 646
                      fastAndFurious));

events.push(new Event("Gran Turismo Starter Cars", events.length, "",
                      ["some road race"],
                      [1, 2], // 445 - 558
                      granTurismoStarters));

events.push(new Event("Lakeside Diner Horizon", events.length, "",
                      ["some road race"],
                      [2, 3], // 533 - 664
                      lakesideDiner));

events.push(new Event("Civic vs. Golf Showdown", events.length, "",
                      ["some road race"],
                      [1, 2, 3, 4], // 368 - 727
                      hondaCivics.concat(volkswagenGolfs)));

events.push(new Event("Police Car Showdown", events.length, "",
                      ["some road race"],
                      [1, 2, 3, 4, 5, 6], // 103 - 913
                      policeCars));

/* some proof of concept events

events.push(new Event("Basic Endurance",
                      events.length,
                      info,
                      ["Endurance"],
                      4));
events.push(new Event("Basic Championship",
                      events.length,
                      info,
                      ["1: Race", "2: Race", "3: Race"]));
events.push(new Event("Basic One Make",
                      events.length,
                      info,
                      ["One Make 1"],
                      [[2,2]], // Legacy
                      4));
events.push(new Event("Basic C Class",
                      events.length,
                      info,
                      ["Race 1", "Race 2"],
                      2));
*/

// Initialize state
let state = {};

// Set default new game values
let newName = "";
let newClass = 1;

// Go to start or game
if (JSON.parse(localStorage.getItem("state")) === null) {
    eStart.style.display = "block";
} else {
    eGame.style.display = "block";
    setStateFromString(localStorage.getItem("state"));
}
