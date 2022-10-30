// -----------------------------------------------------------------------
// HTML elements
// -----------------------------------------------------------------------

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
let eNewCarPI = document.getElementById("newCarPI");
let eNewCarCost = document.getElementById("newCarCost");

// -----------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------

// At 1, player will reach DR X after ~ 300 races.
const gameSpeed = 5;

const defaultState = {
    name: "",
    dr: 100,
    wins: 0,
    credits: 25000,
    cCar: -1,
    cars: []
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
    constructor(name, pi, value, buttonDisplay) {
        // Add car to map
        carMap.set(name, this);

        // Car state variables
        this.iCar = state.cars.length;
        this.name = name;
        this.pi = pi;
        this.value = value;

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

    getArgs() {
        return {
            name: this.name,
            pi: this.pi,
            value: this.value
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

    getIn() {
        // Only allow getting into car if PI is equal to or lower than DR
        if (iClassFromPI(this.pi) <= iClassFromDR(state.dr)) {
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
        // Set sale price to half of value
        let price = Math.floor(this.value / 2);

        // Ask for confirmation before selling
        if (!window.confirm("Sale price is half of car value: " + formatCredits(price) + ", are you sure you want to sell?")) {
            return;
        }

        // Add back sale price to credits
        state.credits += price;

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
        if (iClassFromPI(this.upgradePI) > iClassFromDR(state.dr)) {
            if (!window.confirm("Class of car after upgrade (" + addClassToPI(this.upgradePI) + ") will be too high to drive, are you sure you want to upgrade?")) {
                return;
            } else if (state.cCar === this.iCar) {
                state.cCar = -1;
            }
        }

        // Update state variables
        this.pi = this.upgradePI;
        this.value += this.upgradeCost;
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
    constructor(name, iRace) {
        // Add race to map
        raceMap.set(name, this);

        // Race state variables
        this.name = name;
        this.iRace = iRace;

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
        this.damageInput.placeholder = "Repair cost";
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
                          - this.damage;

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
                        * (positionPrize[2] + positionPrize[this.position]);
        let damageRatio = Math.max(0, Math.min(1, this.damage / prizeFactor));
        let damageFactor = baseDR - (1 + baseDR / 2) * damageRatio / 2;
        this.deltaDR = Math.ceil(gameSpeed * damageFactor * classFactor);
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

        updateState();

        this.reset();
    }
}

// -----------------------------------------------------------------------
// Event class
// -----------------------------------------------------------------------

class Event {
    constructor(name, iRace, raceNames) {
        // Add to event map for the enter button
        // Add to race map for race buttons to go via here
        eventMap.set(name, this);
        raceMap.set(name, this);

        // Event state variables
        this.name = name;
        this.iRace = iRace;
        this.raceNames = raceNames;
        this.cRace = -1;
        this.races = [];

        // Add and populate new row in event table
        this.row = eEventsTB.insertRow(iRace);
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

        // Create the return from event button
        // It will be added to the races table later
        this.returnButton = document.createElement("button");
        this.returnButton.id = this.name;
        this.returnButton.onclick = returnEventButtonClick;
        this.returnButton.innerText = "Retire";
    }

    enter() {
        // Hide all other events
        eEventsT.style.display = "none";

        // Show the races table
        eRacesT.style.display = "table";

        // Create all event races
        for (let iRace = 0; iRace < this.raceNames.length; iRace++) {
            this.races.push(new Race(this.raceNames[iRace], iRace));
            this.races[iRace].row.style.display = "none";
            this.races[iRace].positionSelect.id = this.name;
            this.races[iRace].damageInput.id = this.name;
            this.races[iRace].finishButton.id = this.name;
        }

        // Create the bonus collector if more than one race
        if (this.races.length > 1) {
            let iBonus = this.races.length;
            this.races[iBonus] = new Race("Championship Bonus", iBonus);
            this.races[iBonus].row.style.display = "none";
            this.races[iBonus].positionSelect.id = this.name;
            this.races[iBonus].damageInput.id = this.name;
            this.races[iBonus].finishButton.id = this.name;
            this.races[iBonus].row.cells[1].removeChild(this.races[iBonus].positionSelect);
            this.races[iBonus].row.cells[2].removeChild(this.races[iBonus].damageInput);
            this.races[iBonus].setPosition(1);
            this.races[iBonus].setDamage(0);
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

    finish() {
        if (this.cRace >= 0
         && this.cRace < this.races.length) {
            let thisRace = this.races[this.cRace];

            // Remove interactive elements and display results
            if (this.races.length === 1
             || this.cRace !== this.races.length - 1) {
                // These cells are not populated for bonus collection
                thisRace.row.cells[1].removeChild(thisRace.positionSelect);
                thisRace.row.cells[1].innerText = positionName[thisRace.position];
                thisRace.row.cells[2].removeChild(thisRace.damageInput);
                thisRace.row.cells[2].innerText = formatCredits(thisRace.damage);
            }
            thisRace.row.cells[3].removeChild(thisRace.finishButton);
            thisRace.row.cells[3].innerText = formatCredits(thisRace.deltaCredits);

            thisRace.finish()

            // Show next race or bonus if no more races
            this.cRace++;
            if (this.cRace < this.races.length) {
                this.races[this.cRace].row.style.display = "table-row";
            } else {
                this.returnButton.innerText = "Return";
            }
        }
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
    return Math.floor(100 * dr / classDR[iClassFromDR(dr)]) + "%";
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

// -----------------------------------------------------------------------
// State functions
// -----------------------------------------------------------------------

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
    eStateDR.innerHTML = drToClass(state.dr);
    eStateDRProgress.style.width = drToPercent(state.dr);
    eStateDRProgress.style.backgroundColor = drToColor(state.dr);

    // Update localStorage one variable at a time
    // This should enable adding more elements without breaking saves
    localStorage.setItem("sName", JSON.stringify(state.name));
    localStorage.setItem("sDR", JSON.stringify(state.dr));
    localStorage.setItem("sWins", JSON.stringify(state.wins));
    localStorage.setItem("sCredits", JSON.stringify(state.credits));
    localStorage.setItem("sCCar", JSON.stringify(state.cCar));

    // Store cars as constructor argument objects
    let carArgs = [];
    for (let iCar = 0; iCar < state.cars.length; iCar++) {
        carArgs.push(state.cars[iCar].getArgs());
    }
    localStorage.setItem("sCars", JSON.stringify(carArgs));
}

function getStateFromLocalStorage() {
    // Assume !!! that state is currently default

    // Get the state variables one at a time
    // This should enable adding more elements without breaking saves
    if (localStorage.getItem("sName") !== null) {
        state.name = JSON.parse(localStorage.getItem("sName"));
    }
    if (localStorage.getItem("sDR") !== null) {
        state.dr = JSON.parse(localStorage.getItem("sDR"));
    }
    if (localStorage.getItem("sWins") !== null) {
        state.wins = JSON.parse(localStorage.getItem("sWins"));
    }
    if (localStorage.getItem("sCredits") !== null) {
        state.credits = JSON.parse(localStorage.getItem("sCredits"));
    }
    if (localStorage.getItem("sCCar") !== null) {
        state.cCar = JSON.parse(localStorage.getItem("sCCar"));
    }

    // Cars stored as constructor argument objects
    if (localStorage.getItem("sCars") !== null) {
        let carArgs = JSON.parse(localStorage.getItem("sCars"));
        // Populate garage table with cars from state
        for (let iCar = 0; iCar < carArgs.length; iCar++) {
            state.cars.push(new Car(
                carArgs[iCar].name,
                carArgs[iCar].pi,
                carArgs[iCar].value,
                "none"));
        }
    }

    updateState();
}

// -----------------------------------------------------------------------
// HTML element functions
// -----------------------------------------------------------------------

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
     || eNewCarPI.value === ""
     || eNewCarCost.value === "") {
        return;
    }

    // Save input values
    let newName = eNewCarName.value;
    let newPI = toIntPI(eNewCarPI.value);
    let newCost = toPositiveInt(eNewCarCost.value);

    // Ask for confirmation if new car PI is too high
    if (iClassFromPI(newPI) > iClassFromDR(state.dr)) {
        if (!window.confirm("Class of new car (" + addClassToPI(newPI) + ") is too high to drive, are you sure you want to purchase?")) {
            return;
        }
    }

    // Save input to state
    state.cars.push(new Car(newName,
                            newPI,
                            newCost,
                            "inline"));
    state.credits -= newCost;

    // Set to current car if possible
    if (iClassFromPI(newPI) <= iClassFromDR(state.dr)) {
        state.cCar = state.cars.length - 1;
    }

    // Clear input fields
    eNewCarName.value = "";
    eNewCarPI.value = "";
    eNewCarCost.value = "";

    updateState();
}

function newCarInput() {
    // Actually enter input with Enter
    if (event.key === "Enter") {
        addCar();
    }
}

// Settings

function changeNameButton() {
    state.name = prompt("Please enter your name: ");
    updateState();
}

function resetButton() {
    // Set state to default
    state = JSON.parse(JSON.stringify(defaultState));
    updateState();

    // Force refresh to clear the Garage table
    window.location.reload();
}

// -----------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------

// Initialize state - first to default, then localStorage
// This means new variables not yet in localStorage will get default value
let state = JSON.parse(JSON.stringify(defaultState));
getStateFromLocalStorage();

events = [];
events.push(new Event("Basic Race", 0, ["Race"]));
events.push(new Event("Basic Championship", 1, ["1: Race", "2: Race", "3: Race"]));
