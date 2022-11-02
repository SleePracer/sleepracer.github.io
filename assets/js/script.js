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
let eGameLoad = document.getElementById("gameLoad");

// -----------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------

const carList = [
    ["Choose manufacturer", "Choose model"],
    ["Mitsubishi",
        ["Lancer", 670, 35000],
        ["Starion", 550, 20000],
        ["Eclipse", 490, 24000]],
    ["Subaru",
        ["Impreza", 660, 34000],
        ["Legacy", 410, 23000]],
    ["Toyota",
        ["Celica", 690, 33000]]];

const thisVersion = "0.1.0";

const defaultState = {
    version: thisVersion,
    name: "",
    iGS: 5,
    dr: 100,
    iDR: 1,
    wins: 0,
    credits: 25000,
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
            this.pi = carList[make][model][1];
        }
        this.cost = carList[make][model][2];
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
        this.row.cells[0].innerHTML = this.name;
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
        if (pi > carList[iMake][iModel][1]) {
            pi = carList[iMake][iModel][1];
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
        if (prize > carList[iMake][iModel][2]) {
            prize = carList[iMake][iModel][2];
        }
    }
    return prize;
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
        dr: s.dr,
        idr: s.iDR,
        w: s.wins,
        m: s.credits,
        ce: s.cEvent,
        cc: s.cCar,
        c: carArgs};

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
        if (state.iDR >= iClassFromPI(slowestCar(iMake))
         && state.credits > cheapestCar(iMake)) {
            let makeOption = document.createElement("option");
            makeOption.value = iMake;
            makeOption.text = carList[iMake][0];
            eNewCarMake.appendChild(makeOption);
        }
    }

    clearNewCarModel();

    eGameSpeed.value = state.iGS;

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
    let newPI = carList[newMake][newModel][1];
    let newCost = carList[newMake][newModel][2];

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
        if (state.iDR >= iClassFromPI(carList[make][iModel][1])
         && state.credits > carList[make][iModel][2]) {
            let option = document.createElement("option");
            option.value = iModel;
            option.text = carList[make][iModel][0];
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
    eNewCarRow.cells[1].innerHTML = addClassToPI(carList[make][model][1]);
    eNewCarRow.cells[2].innerHTML = formatCredits(carList[make][model][2]);
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
