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
    ["ATS",
        {name: "GT",
         pi: 877,
         cost: 850000,
         year: 2018,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Audi",
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
        {name: "RS 6 Avant",
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
        {name: "S1",
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
        {name: "RS 4 Avant",
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
    ["Austin-Healey",
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
    ["BMW",
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
        {name: "M4 GTS",
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
        {name: "M6 Coupe",
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
        {name: "M5",
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
        {name: "M3",
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
        {name: "M1",
         pi: 629,
         cost: 585000,
         year: 1981,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "2002 Turbo",
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
    ["Bugatti",
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
        {name: "Veyron Super Sport",
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
    ["Cadillac",
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
    ["Chevrolet",
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
        {name: "Camaro ZL1",
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
        {name: "Corvette Z06",
         pi: 722,
         cost: 35000,
         year: 2002,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Impala Super Sport",
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
        {name: "El Camino Super Sport 454",
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
        {name: "Camaro Super Sport Coupe",
         pi: 585,
         cost: 110000,
         year: 1969,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Nova Super Sport 396",
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
        {name: "Corvette",
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
        {name: "Corvette",
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
    ["Delorean",
        {name: "DMC-12",
         pi: 464,
         cost: 15000,
         year: 1982,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Dodge",
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
        {name: "Viper GTS ACR",
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
        {name: "Charger R/T",
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
    ["Exomotive",
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
    ["Ferrari",
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
        {name: "GTC4Lusso",
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
        {name: "458 Italia",
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
        {name: "F40 Competizione",
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
        {name: "250 California",
         pi: 564,
         cost: 18500000,
         year: 1957,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Ford",
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
        {name: "Mustang RTR Spec 5",
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
        {name: "#11 Rockstar F-150 Trophy Truck",
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
        {name: "Fiesta ST",
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
        {name: "Crown Victoria Police Interceptor",
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
        {name: "Focus RS",
         pi: 593,
         cost: 30000,
         year: 2003,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "F-150 SVT Lightning",
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
        {name: "Racing Puma",
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
        {name: "Escort RS Cosworth",
         pi: 565,
         cost: 66000,
         year: 1992,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Sierra Cosworth RS500",
         pi: 604,
         cost: 66000,
         year: 1987,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Mustang SVO",
         pi: 525,
         cost: 15000,
         year: 1986,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Escort RS Turbo",
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
        {name: "Fiesta XR2",
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
        {name: "Bronco",
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
        {name: "Escort RS1600",
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
        {name: "GT70",
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
        {name: "Transit",
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
        {name: "Anglia 105E",
         pi: 100,
         cost: 20000,
         year: 1959,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "F-100",
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
        {name: "De Luxe Five-Window Coupe",
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
    ["GMC",
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
    ["HDT",
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
    ["Holden",
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
    ["Honda",
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
        {name: "Civic Type R",
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
        {name: "S2000",
         pi: 630,
         cost: 25000,
         year: 2003,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Civic Type R",
         pi: 553,
         cost: 25000,
         year: 1997,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Prelude SI",
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
        {name: "CR-X SIR",
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
        {name: "Civic RS",
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
    ["International",
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
    ["Jaguar",
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
        {name: "XJ220S TWR",
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
        {name: "XJ13",
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
        {name: "MK II 3.8",
         pi: 448,
         cost: 80000,
         year: 1959,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "D-Type",
         pi: 630,
         cost: 22000000,
         year: 1956,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Jeep",
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
        {name: "CJ5 Renegade",
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
    ["Lamborghini",
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
        {name: "Aventador Superveloce",
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
        {name: "Aventador J",
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
        {name: "LM 002",
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
    ["Land Rover",
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
        {name: "Series III",
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
    ["Lotus",
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
        {name: "Elise GT1",
         pi: 794,
         cost: 1800000,
         year: 1997,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Elan Sprint",
         pi: 443,
         cost: 57000,
         year: 1971,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Lynk & Co",
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
    ["Mazda",
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
        {name: "RX-7 Spirit R Type-A",
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
        {name: "MX-5 Miata",
         pi: 445,
         cost: 25000,
         year: 1994,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "323 GT-R",
         pi: 589,
         cost: 25000,
         year: 1992,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Savanna RX-7",
         pi: 558,
         cost: 25000,
         year: 1990,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["McLaren",
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
        {name: "570S Coupé",
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
        {name: "F1",
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
    ["Mercedes-Benz",
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
        {name: "Unimog U5023",
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
        {name: "SLK 55 AMG",
         pi: 740,
         cost: 78000,
         year: 2012,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "SLS AMG",
         pi: 804,
         cost: 200000,
         year: 804,
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
        {name: "AMG CLK GTR",
         pi: 829,
         cost: 2000000,
         year: 1998,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "190E 2.5-16 Evolution II",
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
        {name: "300 SL Coupé",
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
    ["Mini",
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
        {name: "Cooper S",
         pi: 281,
         cost: 30000,
         year: 1965,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Mitsubishi",
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
        {name: "Lancer Evolution VI GSR",
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
        {name: "Eclipse GSX",
         pi: 543,
         cost: 25000,
         year: 1995,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Starion ESI-R",
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
    ["Morris",
        {name: "Minor 1000 FE",
         pi: 800,
         cost: 500000,
         year: 1953,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Minor 1000",
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
    ["Nissan",
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
        {name: "Fairlady Z",
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
        {name: "R390 (GT1)",
         pi: 859,
         cost: 1250000,
         year: 1998,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Silvia K's Aero",
         pi: 609,
         cost: 25000,
         year: 1998,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Skyline GT-R V-Spec",
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
        {name: "240SX SE",
         pi: 445,
         cost: 25000,
         year: 1993,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Silvia Club K's",
         pi: 537,
         cost: 25000,
         year: 1992,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Pulsar GTI-R",
         pi: 594,
         cost: 20000,
         year: 1990,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Skyline GTS-R (HR31)",
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
        {name: "Fairlady Z 432",
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
    ["Pagani",
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
    ["Peugeot",
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
    ["Porsche",
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
        {name: "718 Cayman GTS",
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
        {name: "911 GT3 RS 4.0",
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
         year: 840,
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
        {name: "944 Turbo",
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
        {name: "914/6",
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
        {name: "550A Spyder",
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
    ["Ram",
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
    ["Renault",
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
        {name: "Clio Williams",
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
        {name: "4L Export",
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
    ["Schuppan",
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
    ["Subaru",
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
        {name: "Legacy RS",
         pi: 514,
         cost: 250000,
         year: 1990,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Toyota",
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
        {name: "Supra RZ",
         pi: 646,
         cost: 38000,
         year: 1998,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Celica GT-Four ST205",
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
        {name: "Supra 2.0 GT",
         pi: 558,
         cost: 20000,
         year: 1992,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Celica GT-Four RC ST185",
         pi: 544,
         cost: 25000,
         year: 1992,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "MR2 SC",
         pi: 502,
         cost: 20000,
         year: 1989,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Sprinter Trueno GT Apex",
         pi: 480,
         cost: 20000,
         year: 1985,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "FJ40",
         pi: 269,
         cost: 55000,
         year: 1979,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Celica GT",
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
    ["TVR",
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
    ["Volkswagen",
        {name: "Golf R",
         pi: 668,
         cost: 65000,
         year: 2021,
         autoshow: true,
         carPass: true, // CHECK ME : wikia says 2019?
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
        {name: "Golf R",
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
        {name: "Corrado VR6",
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
        {name: "Golf GTI",
         pi: 428,
         cost: 20000,
         year: 1983,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Pickup LX",
         pi: 100,
         cost: 20000,
         year: 1982,
         autoshow: true,
         carPass: true,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Scirocco S",
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
        {name: "Beetle",
         pi: 100,
         cost: 20000,
         year: 1963,
         autoshow: false,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false},
        {name: "Type 2 De Luxe",
         pi: 100,
         cost: 40000,
         year: 1963,
         autoshow: true,
         carPass: false,
         hotWheels: false,
         welcome: false,
         barnFind: false}],
    ["Volvo",
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
    ["Willys",
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
    ["Zenvo",
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

        // Create and add the enter event button
        this.enterButton = document.createElement("button");
        this.enterButton.id = this.name;
        this.enterButton.onclick = enterEventButtonClick;
        this.enterButton.innerText = "Enter";
        this.row.cells[1].appendChild(this.enterButton);

        // Create and add the info button
        this.infoButton = document.createElement("button");
        this.infoButton.id = this.name;
        this.infoButton.onclick = infoButtonClick;
        this.infoButton.innerText = "Info";
        this.infoButton.className = "margin";
        this.row.cells[1].appendChild(this.infoButton);

        // Create the return from event button
        // It will be added to the races table later
        this.returnButton = document.createElement("button");
        this.returnButton.id = this.name;
        this.returnButton.onclick = returnEventButtonClick;
        this.returnButton.innerText = "Retire";
    }

    showOrHide() {
        // Check if current car is included in model list for event
        if (state.cCar === -1) {
            this.row.style.display = "none";
            return;
        }
        let cModel = state.cars[state.cCar].getModel();
        let carAllowed = false;
        if (this.models === 0) {
            carAllowed = true;
        } else {
            for (let iModel = 0; iModel < this.models.length; iModel++) {
                if (cModel[0] === this.models[iModel][0]
                 && cModel[1] === this.models[iModel][1]) {
                    carAllowed = true;
                }
            }
        }

        // Check if ready for level up (if level up event)
        let levelUpReady = !this.levelUpEvent;
        if (iClassFromDR(state.dr) > state.iDR) {
            levelUpReady = true;
        }

        // If everything ok, show event!
        if (carAllowed && levelUpReady) {
            this.row.style.display = "table-row";
        } else {
            this.row.style.display = "none";
        }
    }

    showInfo() {
        if (this.infoButton.innerText === "Info") {
            // Replace name with info
            this.row.cells[0].innerText = this.name + ": "
                                        + this.infoString;

            // Repurpose info button to close info
            this.infoButton.innerText = "Hide info";
            this.infoButton.className = "";

            // Hide enter button
            this.enterButton.style.display = "none";
        } else {
            // Switch back to name
            this.row.cells[0].innerText = this.name;

            // Return info button back to it's original state
            this.infoButton.innerText = "Info";
            this.infoButton.className = "margin";

            // Show enter button again
            this.enterButton.style.display = "inline";
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

    // Update state table data

    if (state.name === "") {
        eStateName.innerText = "No name!";
    } else {
        eStateName.innerText = state.name;
    }

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

    eStateCredits.innerText = formatCredits(state.credits);
    if (iClassFromDR(state.dr) > state.iDR) {
        eStateDR.innerHTML = classLetter[state.iDR] + "+";
        eStateDRProgress.style.width = "100%";
    } else {
        eStateDR.innerHTML = classLetter[state.iDR];
        eStateDRProgress.style.width = drToPercent(state.dr);
    }
    eStateDRProgress.style.backgroundColor = classColor[state.iDR];

    for (let iEvent = 0; iEvent < events.length; iEvent++) {
        events[iEvent].showOrHide();
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

    clearNewCarModel();

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

function toggleOptions() {
    // Show or hide based on current status
    let newDisplay = "none";
    if (eToggleOptions.innerText === "Show options") {
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
info = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet nisi magna. Sed magna nibh, fermentum in semper sit amet, commodo quis dolor. Sed tempus dolor leo, at pharetra massa interdum non. Pellentesque eu urna eget diam lobortis egestas. Nam malesuada maximus odio, et tempus est egestas id. Pellentesque sit amet risus id eros fringilla rutrum. Nullam volutpat mi et laoreet pulvinar. In vel ante felis. Nam auctor vestibulum tempor. Ut eu elit egestas, sollicitudin metus et, pulvinar nibh. Phasellus purus ante, commodo a neque vitae, auctor viverra neque. Pellentesque sit amet tortor enim. Vestibulum et eleifend felis. Vivamus vel quam ultricies, lacinia lacus et, faucibus dui.";
events.push(new Event("Basic Race",
                      events.length,
                      info,
                      ["Race"]));
events.push(new Event("Class Level Up Championship",
                      events.length,
                      info,
                      ["1: Race", "2: Race", "3: Race"]));

// This will make finishing the championship increase iDR
eventMap.get("Class Level Up Championship").levelUpEvent = true;

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
