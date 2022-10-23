// -----------------------------------------------------------------------
// HTML elements
// -----------------------------------------------------------------------

let eStateName = document.getElementById("stateName");
let eStateCar = document.getElementById("stateCar");
let eStateCredits = document.getElementById("stateCredits");
let eStateDR = document.getElementById("stateDR");
let eStateDRProgress = document.getElementById("stateDRProgress");
let eBasicRacePosition = document.getElementById("basicRacePosition");
let eBasicRaceDamage = document.getElementById("basicRaceDamage");
let eBasicRaceTotal = document.getElementById("basicRaceTotal");
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

const defaultState = {
    name: "",
    dr: 10,
    credits: 25000,
    currentCar: -1,
    cars: []
}

const basicRacePrize = [
    0,
    9000,
    6000,
    4000,
    3000,
    2000,
    1000,
    0, 0, 0, 0, 0, 0];

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

function addClassToPI(PI) {
    if (PI >= 100 && PI <= 500) {
        return "D" + PI;
    } else if (PI > 500 && PI <= 600) {
        return "C" + PI;
    } else if (PI > 600 && PI <= 700) {
        return "B" + PI;
    } else if (PI > 700 && PI <= 800) {
        return "A" + PI;
    } else if (PI > 800 && PI <= 900) {
        return "S" + PI;
    } else if (PI > 900 && PI < 1000) {
        return "X" + PI;
    } else {
        return "Invalid PI!";
    }
}

function intToCredits(int) {
    if (int >= 0) {
        return "€" + int.toLocaleString('fr');
    } else {
        int *= -1;
        return "-€" + int.toLocaleString('fr');
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

    eStateCredits.innerText = intToCredits(state.credits);
    eStateDR.innerHTML = "Driver Rating: ";
    eStateDRProgress.style.width = state.dr + "%";

    // Update localStorage one variable at a time
    // This should enable adding more elements without breaking saves
    localStorage.setItem("sName", JSON.stringify(state.name));
    localStorage.setItem("sDR", JSON.stringify(state.dr));
    localStorage.setItem("sCredits", JSON.stringify(state.credits));
    localStorage.setItem("sCurrentCar", JSON.stringify(state.currentCar));
    localStorage.setItem("sCars", JSON.stringify(state.cars));
}

function garageTableAddNewCar(iCar, buttonDisplay) {
    // Add and populate new row
    let newCarRow = eGarageTB.insertRow(iCar);
    for (let c = 0; c < eGarageTH.rows[0].cells.length; c++) {
        newCarRow.insertCell();
    }
    newCarRow.cells[0].innerHTML = state.cars[iCar].name;
    newCarRow.cells[1].innerHTML = addClassToPI(state.cars[iCar].pi);
    newCarRow.cells[2].innerHTML = intToCredits(state.cars[iCar].value);

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

// Basic race

function basicRaceInput() {
    // Get values from input
    let position = parseInt(eBasicRacePosition.value);
    let damage = parseInt(eBasicRaceDamage.value);

    // Set total based on position and damage
    // position can only be OK values since it's a select
    total = basicRacePrize[position];
    if (parseInt(damage) > 0) {
        total -= damage;
    }
    eBasicRaceTotal.innerText = total;

    // Actually enter the data with enter
    if (event.key !== "Enter") {
        return;
    }

    // Clear the fields
    eBasicRacePosition.value = "0";
    eBasicRaceDamage.value = "";
    eBasicRaceTotal.innerText = "";

    // Add total to credits
    state.credits += total;
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

    // Update state variables
    let iCar = thisRow.rowIndex - 1;
    state.cars[iCar].pi = parseInt(piInput.value);
    state.cars[iCar].value += parseInt(costInput.value);
    state.credits -= parseInt(costInput.value);

    // Remove the input fields
    thisRow.cells[1].removeChild(piInput);
    thisRow.cells[2].removeChild(costInput);

    // Re-add the state information
    thisRow.cells[1].innerHTML = addClassToPI(state.cars[iCar].pi);
    thisRow.cells[2].innerHTML = intToCredits(state.cars[iCar].value);

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
    state.currentCar = iCar;

    updateState();
}

function sellCar() {
    // Index of car should be equal to index of row - 1
    let iCar = event.target.parentElement.parentElement.rowIndex - 1;

    // Set sale price to half of value
    let price = Math.floor(state.cars[iCar].value / 2);

    // Ask for confirmation!
    if (!window.confirm("Sale price is half of car value: " + intToCredits(price) + ", are you sure?")) {
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

    // Save input to state
    state.cars.push(new Car(eNewCarName.value,
                            parseInt(eNewCarPI.value),
                            parseInt(eNewCarValue.value)));
    state.credits -= parseInt(eNewCarValue.value);
    state.currentCar = state.cars.length - 1;

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

