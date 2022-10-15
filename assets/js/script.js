// -----------------------------------------------------------------------
// Normal functions
// -----------------------------------------------------------------------

function updateCredits() {
    document.getElementById("outputCredits").innerText = "Credits: €" + credits.toFixed(1) + "k";
    localStorage.setItem("credits", JSON.stringify(credits));
}

function deleteButton() {
    let rowN = event.target.parentElement.parentElement.rowIndex - 1;
    tableG.deleteRow(rowN);
}

// -----------------------------------------------------------------------
// HTML linked functions
// -----------------------------------------------------------------------

function incrementButton() {
    credits++;
    updateCredits();
}

function decrementButton() {
    credits--;
    updateCredits();
}

function inputGarage() {
    if (event.key !== "Enter") {
        return;
    }
    var input1G = idInput1G.value;
    idInput1G.value = "";
    var input2G = idInput2G.value;
    idInput2G.value = "";
    var newRow = tableG.insertRow(nCars++);
    for (var c = 0; c < 3; c++) {
        newRow.insertCell();
    }
    newRow.cells[0].innerHTML = input1G;
    newRow.cells[1].innerHTML = input2G;

    var button = document.createElement("button");
    newRow.cells[2].appendChild(button);
    button.innerText = "delete";
    button.onclick = deleteButton;
}

// -----------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------

// Initialize things
var credits = 1.0;
if (localStorage.getItem("credits") !== null) {
    credits = JSON.parse(localStorage.getItem("credits"));
}
updateCredits();

var inGarage = "";
var nCars = 0;

// Save element ids
var idInput1G = document.getElementById("input1G");
var idInput2G = document.getElementById("input2G");
var tableG = document.getElementById("tableGarage");
