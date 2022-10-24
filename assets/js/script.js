// -----------------------------------------------------------------------
// HTML elements
// -----------------------------------------------------------------------

let eStateName = document.getElementById("stateName");
let eStateCar = document.getElementById("stateCar");
let eStateCredits = document.getElementById("stateCredits");
let eStateDR = document.getElementById("stateDR");
let eStateDRProgress = document.getElementById("stateDRProgress");
let eChamp = document.getElementById("championshipDiv");
let eChampTH = document.getElementById("championshipTableHead");
let eChampTB = document.getElementById("championshipTableBody");
let eChampTR = document.getElementById("championshipTableRow");
let eChampRace = document.getElementById("championshipRace");
let eChampPosition = document.getElementById("championshipPosition");
let eChampDamage = document.getElementById("championshipDamage");
let eChampTotal = document.getElementById("championshipTotal");
let eRaces = document.getElementById("racesDiv");
let eChampStart = document.getElementById("championshipStart");
let eBasicRacePosition = document.getElementById("basicRacePosition");
let eBasicRaceDamage = document.getElementById("basicRaceDamage");
let eBasicRaceTotal = document.getElementById("basicRaceTotal");
let eCustomRacePrize = document.getElementById("customRacePrize");
let eCustomRaceDamage = document.getElementById("customRaceDamage");
let eCustomRaceTotal = document.getElementById("customRaceTotal");
let eGarageTH = document.getElementById("garageTableHead");
let eToggleOptions = document.getElementById("toggleOptionsButton");
let eGarageTB = document.getElementById("garageTableBody");
let eNewCarRow = document.getElementById("newCarRow");
let eNewCarName = document.getElementById("newCarName");
let eNewCarPI = document.getElementById("newCarPI");
let eNewCarValue = document.getElementById("newCarValue");

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
    currentCar: -1,
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

const basicPrize = [
    0,
    9000,
    6000,
    4000,
    3000,
    2000,
    1000,
    0, 0, 0, 0, 0, 0];

const basicDR = [
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
// Classes
// -----------------------------------------------------------------------

class Car {
    constructor(name, pi, value) {
        this.name = name;
        this.pi = pi;
        this.value = value;
    }
}

// -----------------------------------------------------------------------
// Helper functions
// -----------------------------------------------------------------------

function toInt(string) {
    if (Number.isInteger(string)) {
        return string;
    }
    let int = parseInt(string);
    if (Number.isNaN(int)) {
        return 0;
    }
    return int;
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

function updateState() {

    // Update state table data

    if (state.name === "") {
        eStateName.innerText = "No name!";
    } else {
        eStateName.innerText = state.name;
    }

    if (state.cars.length > 0) {
        if (state.currentCar !== -1) {
            eStateCar.innerText = state.cars[state.currentCar].name + " "
                                + addClassToPI(state.cars[state.currentCar].pi);
        } else {
            eStateCar.innerText = "Not in a car!";
        }
    } else {
        eStateCar.innerText = "No cars!";
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
    localStorage.setItem("sCurrentCar", JSON.stringify(state.currentCar));
    localStorage.setItem("sCars", JSON.stringify(state.cars));
}

function getDeltaDR(position) {
    let currentPI = state.cars[state.currentCar].pi;
    let iClass = iClassFromPI(currentPI);
    if (iClass === 0) {
        // Return 0 for invalid class
        return 0;
    }

    // subClass will be [1, 10] depending on how far in the class pi is
    let subClass = Math.ceil((((currentPI - 1) % 100) + 1) / 10);
    if (iClass === 1) {
        // Always max out subClass for D
        subClass = 10;
    } else if (iClass === 7) {
        // Always min out subClass for X
        subClass = 1;
    }

    // Check for win streak in past 3 races and modify baseDR
    let baseDR = basicDR[position];
    if (Math.floor(state.wins / 100) === 1) {
        // Previous race win
        if (position === 1 || position === 2 || position === 3) {
            // This race podium
            baseDR--;
        }
    }
    if (position === 1) {
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

    // Update win streak history
    state.wins = Math.floor(state.wins / 10);
    if (position === 1) {
        state.wins += 100;
    }

    return gameSpeed * baseDR * subClass * Math.pow(10, iClass - 1);
}

function garageTableAddNewCar(iCar, buttonDisplay) {
    // Add and populate new row
    let newCarRow = eGarageTB.insertRow(iCar);
    for (let c = 0; c < eGarageTH.rows[0].cells.length; c++) {
        newCarRow.insertCell();
    }
    newCarRow.cells[0].innerHTML = state.cars[iCar].name;
    newCarRow.cells[1].innerHTML = addClassToPI(state.cars[iCar].pi);
    newCarRow.cells[2].innerHTML = formatCredits(state.cars[iCar].value);

    // Make all the buttons and add to the last cell

    let getInButton = document.createElement("button");
    getInButton.innerText = "Get in";
    getInButton.onclick = getInCar;
    getInButton.style.display = buttonDisplay;
    newCarRow.cells[3].appendChild(getInButton);

    let upgradeButton = document.createElement("button");
    upgradeButton.innerText = "Upgrade";
    upgradeButton.onclick = showUpgrade;
    upgradeButton.style.display = buttonDisplay;
    upgradeButton.className = "margin";
    newCarRow.cells[3].appendChild(upgradeButton);

    let sellButton = document.createElement("button");
    sellButton.innerText = "Sell";
    sellButton.onclick = sellCar;
    sellButton.style.display = buttonDisplay;
    newCarRow.cells[3].appendChild(sellButton);
}

function getStateFromLocalStorage() {
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
    if (localStorage.getItem("sCurrentCar") !== null) {
        state.currentCar = JSON.parse(localStorage.getItem("sCurrentCar"));
    }
    if (localStorage.getItem("sCars") !== null) {
        state.cars = JSON.parse(localStorage.getItem("sCars"));
    }

    // Populate garage table with cars from state
    for (let iCar = 0; iCar < state.cars.length; iCar++) {
        garageTableAddNewCar(iCar, "none");
    }

    updateState();
}

// -----------------------------------------------------------------------
// HTML element functions
// -----------------------------------------------------------------------

// Championship

function championshipAddBonus() {
    // Get this somehow
    let position = 1;

    // Update DR
    state.dr += getDeltaDR(position);
    if (state.dr < classDR[0]) {
        state.dr = classDR[0];
    }

    // Reset championship table
    eChampRace.innerText = "Race name";
    eChampTR.style.display = "table-row";
    for (let iRow = 0; iRow < 4; iRow++) {
        eChampTB.deleteRow(0);
    }

    // Hide championship and show races again
    eChamp.style.display = "none";
    eRaces.style.display = "block";

    // Add bonus to credits
    state.credits += basicPrize[position];
    updateState();
}

function championshipGetTotal() {
    // Get values from input
    let position = toInt(eChampPosition.value);
    let damage = toInt(eChampDamage.value);

    // Set total based on position and damage
    // position can only be OK values since it's a select
    let total = basicPrize[position];
    if (damage > 0) {
        total -= damage;
    }

    return total;
}

function championshipAddTotal() {
    let position = toInt(eChampPosition.value);
    let damage = toInt(eChampDamage.value);
    let total = championshipGetTotal();

    // Update DR
    state.dr += getDeltaDR(position);
    if (state.dr < classDR[0]) {
        state.dr = classDR[0];
    }

    // Document championship results
    if (eChampRace.innerText === "1: Race") {
        // Make a new row with race results
        let raceRow = eChampTB.insertRow(0);
        for (let c = 0; c < eChampTH.rows[0].cells.length; c++) {
            raceRow.insertCell();
        }
        raceRow.cells[0].innerText = eChampRace.innerText;
        raceRow.cells[1].innerText = positionName[position];
        raceRow.cells[2].innerText = formatCredits(damage);
        raceRow.cells[3].innerText = formatCredits(total);

        // Change input row to next race
        eChampRace.innerText = "2: Race";
    } else if (eChampRace.innerText === "2: Race") {
        let raceRow = eChampTB.insertRow(1);
        for (let c = 0; c < eChampTH.rows[0].cells.length; c++) {
            raceRow.insertCell();
        }
        raceRow.cells[0].innerText = eChampRace.innerText;
        raceRow.cells[1].innerText = positionName[position];
        raceRow.cells[2].innerText = formatCredits(damage);
        raceRow.cells[3].innerText = formatCredits(total);

        eChampRace.innerText = "3: Race";
    } else if (eChampRace.innerText === "3: Race") {
        let raceRow = eChampTB.insertRow(2);
        for (let c = 0; c < eChampTH.rows[0].cells.length; c++) {
            raceRow.insertCell();
        }
        raceRow.cells[0].innerText = eChampRace.innerText;
        raceRow.cells[1].innerText = positionName[position];
        raceRow.cells[2].innerText = formatCredits(damage);
        raceRow.cells[3].innerText = formatCredits(total);

        // Add championship results row with bonus button
        let bonusRow = eChampTB.insertRow(3);
        for (let c = 0; c < eChampTH.rows[0].cells.length; c++) {
            bonusRow.insertCell();
        }
        bonusRow.cells[0].innerText = "Championship";
        bonusRow.cells[1].innerText = positionName[1];
        bonusRow.cells[2].innerText = "";

        let getBonusButton = document.createElement("button");
        getBonusButton.innerText = "Bonus: " + formatCredits(basicPrize[1]);
        getBonusButton.onclick = championshipAddBonus;
        bonusRow.cells[3].appendChild(getBonusButton);

        // Hide race input row
        eChampTR.style.display = "none";
    }

    // Clear the fields
    eChampPosition.value = "0";
    eChampDamage.value = "";
    eChampTotal.innerText = "Add";

    // Add total to credits
    state.credits += total;
    updateState();
}

function championshipInput() {
    let total = championshipGetTotal();

    // Update button text
    if (total > 0 || total < 0) {
        eChampTotal.innerText = "Add: " + formatCredits(total);
    } else {
        eChampTotal.innerText = "Add";
    }

    // Actually enter the data with enter
    if (event.key === "Enter") {
        championshipAddTotal();
    }
}

// Races

function championshipStart() {
    eChamp.style.display = "block";
    eRaces.style.display = "none";
    eChampRace.innerText = "1: Race";
}

function basicRaceGetTotal() {
    // Get values from input
    let position = toInt(eBasicRacePosition.value);
    let damage = toInt(eBasicRaceDamage.value);

    // Set total based on position and damage
    // position can only be OK values since it's a select
    let total = basicPrize[position];
    if (damage > 0) {
        total -= damage;
    }

    return total;
}

function basicRaceAddTotal() {
    let position = toInt(eBasicRacePosition.value);
    let total = basicRaceGetTotal();

    // Update DR
    state.dr += getDeltaDR(position);
    if (state.dr < classDR[0]) {
        state.dr = classDR[0];
    }

    // Clear the fields
    eBasicRacePosition.value = "0";
    eBasicRaceDamage.value = "";
    eBasicRaceTotal.innerText = "Add";

    // Add total to credits
    state.credits += total;
    updateState();
}

function basicRaceInput() {
    let total = basicRaceGetTotal();

    // Update button text
    if (total > 0 || total < 0) {
        eBasicRaceTotal.innerText = "Add: " + formatCredits(total);
    } else {
        eBasicRaceTotal.innerText = "Add";
    }

    // Actually enter the data with enter
    if (event.key === "Enter") {
        basicRaceAddTotal();
    }
}

function customRaceGetTotal() {
    // Get values from input
    let prize = toInt(eCustomRacePrize.value);
    let damage = toInt(eCustomRaceDamage.value);

    // Set total based on prize and damage
    let total = prize;
    if (damage > 0) {
        total -= damage;
    }

    return total;
}

function customRaceAddTotal() {
    let total = customRaceGetTotal();

    // Clear the fields
    eCustomRacePrize.value = "";
    eCustomRaceDamage.value = "";
    eCustomRaceTotal.innerText = "Add";

    // Add total to credits
    state.credits += total;
    updateState();
}

function customRaceInput() {
    let total = customRaceGetTotal();

    // Update button text
    if (total > 0 || total < 0) {
        eCustomRaceTotal.innerText = "Add: " + formatCredits(total);
    } else {
        eCustomRaceTotal.innerText = "Add";
    }

    // Actually enter the data with enter
    if (event.key === "Enter") {
        customRaceAddTotal();
    }
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
    for (let iRow = 0; iRow < state.cars.length; iRow++) {
        let row = eGarageTB.children[iRow];

        // The buttons are always in the last cell
        let lastCell = row.children[row.children.length - 1];
        for (let iButton = 0; iButton < lastCell.children.length; iButton++) {
            lastCell.children[iButton].style.display = newDisplay;
        }
    }
}

function showUpgrade() {
    // Handy handle to the row that was clicked
    let thisRow = event.target.parentElement.parentElement;

    // Remove state information
    thisRow.cells[1].innerHTML = "";
    thisRow.cells[2].innerHTML = "";

    // Make a new PI input field
    let piInput = document.createElement("input");
    piInput.type = "number";
    piInput.style.width = "100%";
    piInput.placeholder = "New PI";
    piInput.onkeyup = upgradeInput;
    thisRow.cells[1].appendChild(piInput);

    // Make an upgrade cost input field
    let costInput = document.createElement("input");
    costInput.type = "number";
    costInput.style.width = "100%";
    costInput.placeholder = "Upgrade cost";
    costInput.onkeyup = upgradeInput;
    thisRow.cells[2].appendChild(costInput);

    // Hide all the other buttons and the new car row
    toggleOptions();
    eToggleOptions.style.display = "none";

    // Keep the upgrade button, modify it to act as enter
    event.target.style.display = "inline";
    event.target.innerText = "Enter upgrade";
    event.target.onclick = upgradeCar;
}

function upgradeCar() {
    // Find the input fields and check if they're filled out
    let thisRow = event.target.parentElement.parentElement;
    let piInput = thisRow.cells[1].children[0];
    let costInput = thisRow.cells[2].children[0];
    if (piInput.value === ""
     || costInput.value === "") {
        return;
    }

    // Ask for confirmation if car PI is too high after upgrade
    let iCar = thisRow.rowIndex - 1;
    let newPI = toInt(piInput.value);
    if (iClassFromPI(newPI) > iClassFromDR(state.dr)) {
        if (!window.confirm("Class of car after upgrade (" + addClassToPI(newPI) + ") will be too high to drive, are you sure you want to upgrade?")) {
            return;
        } else if (state.currentCar === iCar) {
            state.currentCar = -1;
        }
    }

    // Update state variables
    state.cars[iCar].pi = newPI;
    state.cars[iCar].value += toInt(costInput.value);
    state.credits -= toInt(costInput.value);

    // Remove the input fields
    thisRow.cells[1].removeChild(piInput);
    thisRow.cells[2].removeChild(costInput);

    // Re-add the state information
    thisRow.cells[1].innerHTML = addClassToPI(state.cars[iCar].pi);
    thisRow.cells[2].innerHTML = formatCredits(state.cars[iCar].value);

    // Show all other buttons and rows again
    eToggleOptions.style.display = "block";
    toggleOptions();

    // Reset upgrade button
    let lastCell = thisRow.children[thisRow.children.length - 1];
    for (let iButton = 0; iButton < lastCell.children.length; iButton++) {
        let button = lastCell.children[iButton];
        if (button.innerText === "Enter upgrade") {
            button.innerText = "Upgrade";
            button.onclick = showUpgrade;
        }
    }

    updateState();
}

function upgradeInput() {
    // Actually enter input with Enter
    if (event.key === "Enter") {
        upgradeCar();
    }
}

function getInCar() {
    // Index of car should be equal to index of row - 1
    let iCar = event.target.parentElement.parentElement.rowIndex - 1;

    // Only allow getting into car if PI is equal to or lower than DR
    if (iClassFromPI(state.cars[iCar].pi) <= iClassFromDR(state.dr)) {
        state.currentCar = iCar;
    }

    updateState();
}

function sellCar() {
    // Index of car should be equal to index of row - 1
    let iCar = event.target.parentElement.parentElement.rowIndex - 1;

    // Set sale price to half of value
    let price = Math.floor(state.cars[iCar].value / 2);

    // Ask for confirmation before selling
    if (!window.confirm("Sale price is half of car value: " + formatCredits(price) + ", are you sure you want to sell?")) {
        return;
    }

    // Add back sale price to credits
    state.credits += price;

    // Change current car index if necessary
    if (iCar === state.currentCar) {
        state.currentCar = -1;
    } else if (iCar < state.currentCar) {
        state.currentCar--;
    }

    // Delete car from table and state
    eGarageTB.deleteRow(iCar);
    state.cars.splice(iCar, 1);

    updateState();
}

function addCar() {
    // Check if the input fields are filled out
    if (eNewCarName.value === ""
     || eNewCarPI.value === ""
     || eNewCarValue.value === "") {
        return;
    }

    // Ask for confirmation if new car PI is too high
    let newPI = toInt(eNewCarPI.value);
    if (iClassFromPI(newPI) > iClassFromDR(state.dr)) {
        if (!window.confirm("Class of new car (" + addClassToPI(newPI) + ") is too high to drive, are you sure you want to purchase?")) {
            return;
        }
    }

    // Save input to state
    state.cars.push(new Car(eNewCarName.value,
                            newPI,
                            toInt(eNewCarValue.value)));
    state.credits -= toInt(eNewCarValue.value);

    // Set to current car if possible
    if (iClassFromPI(newPI) <= iClassFromDR(state.dr)) {
        state.currentCar = state.cars.length - 1;
    }

    // Clear input fields
    eNewCarName.value = "";
    eNewCarPI.value = "";
    eNewCarValue.value = "";

    // Add the new car to the table
    garageTableAddNewCar(state.cars.length - 1, "inline");

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
