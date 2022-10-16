// -----------------------------------------------------------------------
// HTML elements
// -----------------------------------------------------------------------

var eNameOutput = document.getElementById("nameOutput");
var eCreditsOutput = document.getElementById("creditsOutput");
var eNCarsOutput = document.getElementById("nCarsOutput");
var eGarageTH = document.getElementById("garageTableHead");
var eGarageTB = document.getElementById("garageTableBody");
var eGarageIn1 = document.getElementById("garageInput1");
var eGarageIn2 = document.getElementById("garageInput2");

// -----------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------

const defaultState = {
    name: "",
    driverRating: 10,
    credits: 25000,
    cars: []
}

// -----------------------------------------------------------------------
// Helper functions
// -----------------------------------------------------------------------

function updateState() {
    // Update state outputs
    eNameOutput.innerText = "Name: " + state.name;
    eCreditsOutput.innerText = "Credits: €" + state.credits.toLocaleString('fr');
    eNCarsOutput.innerText = "Cars in garage: " + state.cars.length;

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
    newRow.cells[1].innerHTML = state.cars[iCar][1];

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

function incrementButton() {
    state.credits++;
    updateState();
}

function decrementButton() {
    state.credits--;
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
    state.cars.push([eGarageIn1.value, eGarageIn2.value]);
    eGarageIn1.value = "";
    eGarageIn2.value = "";

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

