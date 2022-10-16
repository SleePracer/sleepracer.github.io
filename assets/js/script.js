// -----------------------------------------------------------------------
// HTML elements
// -----------------------------------------------------------------------

var eStateName = document.getElementById("stateName");
var eStateCar = document.getElementById("stateCar");
var eStateCredits = document.getElementById("stateCredits");
var eStateDriverRating = document.getElementById("stateDriverRating");
var eStateDriverRatingProgress = document.getElementById("stateDriverRatingProgress");
var eBasicRacePosition = document.getElementById("basicRacePosition");
var eBasicRaceDamage = document.getElementById("basicRaceDamage");
var eBasicRaceTotal = document.getElementById("basicRaceTotal");
var eGarageTH = document.getElementById("garageTableHead");
var eGarageTB = document.getElementById("garageTableBody");
var eGarageName = document.getElementById("garageName");
var eGarageValue = document.getElementById("garageValue");

// -----------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------

const defaultState = {
    name: "",
    driverRating: 10,
    credits: 25000,
    cars: []
}

const basicRacePrize = [0, 9000, 6000, 4000, 3000, 2000, 1000, 0, 0, 0, 0, 0, 0];

// -----------------------------------------------------------------------
// Helper functions
// -----------------------------------------------------------------------

function updateState() {
    // Update state outputs
    eStateName.innerText = state.name;
    if (state.cars.length > 0) {
        eStateCar.innerText = state.cars[0][0];
    } else {
        eStateCar.innerText = "No cars!";
    }
    eStateCredits.innerText = "€" + state.credits.toLocaleString('fr');
    eStateDriverRating.innerHTML = "Driver Rating:";
    eStateDriverRatingProgress.style.width = state.driverRating + "%";

    // Update localStorage one variable at a time
    // This should enable adding more elements without breaking saves
    localStorage.setItem("sName", JSON.stringify(state.name));
    localStorage.setItem("sDriverRating", JSON.stringify(state.driverRating));
    localStorage.setItem("sCredits", JSON.stringify(state.credits));
    localStorage.setItem("sCars", JSON.stringify(state.cars));
}

function garageTableNewRow(iCar) {
    // Add and populate new row
    var newRow = eGarageTB.insertRow(iCar);
    for (var c = 0; c < eGarageTH.rows[0].cells.length; c++) {
        newRow.insertCell();
    }
    newRow.cells[0].innerHTML = state.cars[iCar][0];
    newRow.cells[1].innerHTML = state.cars[iCar][1].toLocaleString('fr');

    // Make a delete button
    var button = document.createElement("button");
    button.innerText = "delete";
    button.onclick = deleteButton;
    newRow.cells[2].appendChild(button);
}

function checkName() {
    // Prompt for new name if none exists
    if (state.name !== "") {
        return;
    }
    state.name = prompt("Please enter your name: ");
}

function getStateFromLocalStorage() {
    // Get the state variables one at a time
    // This should enable adding more elements without breaking saves
    if (localStorage.getItem("sName") !== null) {
        state.name = JSON.parse(localStorage.getItem("sName"));
    }
    if (localStorage.getItem("sDriverRating") !== null) {
        state.driverRating = JSON.parse(localStorage.getItem("sDriverRating"));
    }
    if (localStorage.getItem("sCredits") !== null) {
        state.credits = JSON.parse(localStorage.getItem("sCredits"));
    }
    if (localStorage.getItem("sCars") !== null) {
        state.cars = JSON.parse(localStorage.getItem("sCars"));
    }

    // Set garage from state
    for (var iCar = 0; iCar < state.cars.length; iCar++) {
        garageTableNewRow(iCar);
    }

    // Make sure name is set
    checkName();

    updateState();
}

// -----------------------------------------------------------------------
// HTML element functions
// -----------------------------------------------------------------------

function basicRaceInput() {
    // Get values
    var position = parseInt(eBasicRacePosition.value);
    var damage = parseInt(eBasicRaceDamage.value);

    // Set total based on position and damage
    // Position can only be OK values since it's a select
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

    // Update credits
    state.credits += total;
    updateState();
}

function deleteButton() {
    // Index of car should be equal to index of row - 1
    let iCar = event.target.parentElement.parentElement.rowIndex - 1;

    // Delete car from table and state
    eGarageTB.deleteRow(iCar);
    state.cars.splice(iCar, 1);

    updateState();
}

function garageInput() {
    // Actually enter input with Enter
    if (event.key !== "Enter") {
        return;
    }

    // Save to state and reset input
    state.cars.push([eGarageName.value, parseInt(eGarageValue.value)]);
    eGarageName.value = "";
    eGarageValue.value = "";

    // Update table and state
    garageTableNewRow(state.cars.length - 1);
    updateState();
}

function resetButton() {
    // Set state to default
    state = JSON.parse(JSON.stringify(defaultState));
    checkName();
    updateState();

    // Force refresh to clear the Garage table
    window.location.reload();
}

// -----------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------

// Initialize state - first to default, then localStorage
// This means new variables not yet in localStorage will get default value
var state = JSON.parse(JSON.stringify(defaultState));
getStateFromLocalStorage();
