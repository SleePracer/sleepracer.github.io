// -----------------------------------------------------------------------
// Garage
// -----------------------------------------------------------------------

function garageOptions(show = false) {
    // Show or hide based on current status
    let newDisplay = "none";
    if (eGarageOptions.innerText === "Show options"
     || show) {
        newDisplay = "inline";
        eGarageOptions.innerText = "Hide options";

        eNewCarRow.style.display = "table-row";

        if (state.rust !== 0) {
            eNewRustName.style.display = "block";
            eNewRustBuy.style.display = "block";
            eNewRustPI.innerHTML = addClassToPI(carDataV[state.rust].cage);
            eNewRustValue.innerHTML = moneyToString(rustBucketValue[getRustBucketClass(state.rust)]);
            eNewRustValue.style.color = "inherit";
            if (rustBucketValue[getRustBucketClass(state.rust)] > state.money) {
                eNewRustValue.style.color = "red";
            }
            eNewRustSale.innerHTML = "";
        }
    } else {
        eGarageOptions.innerText = "Show options";

        eNewCarRow.style.display = "none";

        eNewRustName.style.display = "none";
        eNewRustBuy.style.display = "none";
        eNewRustPI.innerHTML = "";
        eNewRustValue.innerHTML = "";
        eNewRustSale.innerHTML = "<span style=color:red>Rust bucket for sale!</span>";
    }

    // Change display for all buttons for all cars
    for (let iCar = 0; iCar < state.garage.length; iCar++) {
        state.garage[iCar].garageOptionsButtons(newDisplay);
    }
    if (state.driving !== -1) {
        state.garage[state.driving].getInButton.style.display = "none";
    }
}


function calculateCost(make, model) {
    let cost = carDataM[make][model].cost;
    if (eNewCarDiscountBoxB.checked) {
        cost -= 20000;
    }
    if (eNewCarDiscountBoxA.checked) {
        cost -= 40000;
    }
    if (cost < 0) {
        cost = 0;
    }
    return cost;
}

function addCar(action = []) {
    let newName = eNewCarName.value;
    let newMake = toPositiveInt(eNewCarMake.value);
    let newModel = toPositiveInt(eNewCarModel.value);
    let newID = carDataM[newMake][newModel].id;

    if (action.length !== 0) {
        newName = action[1];
        newID = action[2];
        newMake = carDataV[newID].make;
        newModel = carDataV[newID].model;
        eNewCarDiscountBoxB.checked = action[3] === 1;
        eNewCarDiscountBoxA.checked = action[4] === 1;
    }

    // Check if the input fields are filled out
    if (newName === ""
     || newMake === 0
     || newModel === 0) {
        return;
    }

    let newPI = carDataM[newMake][newModel].pi;
    let newCost = calculateCost(newMake, newModel);

    // Check if the player can afford the car
    if (newCost > state.money) {
        return;
    }

    // Ask for confirmation if new car PI is too high
    if (piToClass(newPI) > state.lvl) {
        if (!window.confirm("Class of new car (" + addClassToPI(newPI) + ") is too high to drive, are you sure you want to purchase?")) {
            return;
        }
    }

    // Save input to state
    state.garage.push(new Car(
        newName,
        newID
    ));
    state.money -= newCost;

    // Use the discounts
    usedB = 0;
    usedA = 0;
    if (eNewCarDiscountBoxB.checked) {
        usedB = 1;
        state.discountB = false;
        eNewCarDiscountBoxB.checked = false;
    }
    if (eNewCarDiscountBoxA.checked) {
        usedA = 1;
        state.discountA = false;
        eNewCarDiscountBoxA.checked = false;
    }

    if (action.length === 0) {
        state.actions.push([
            "c",
            newName,
            newID,
            usedB,
            usedA
        ]);
    }

    // Try setting to current car
    state.garage[state.garage.length - 1].getIn(action.length !== 0);

    // Clear input fields
    // Car selectors will be reset in updateState
    eNewCarName.value = "";
    eNewCarRow.cells[1].innerHTML = "";
    eNewCarPrice.innerHTML = "";
    eNewCarDiscountB.style.display = "none";
    eNewCarDiscountA.style.display = "none";

    if (action.length === 0) {
        updateState();
    }
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
    eNewCarPrice.innerHTML = "";
    eNewCarDiscountB.style.display = "none";
    eNewCarDiscountA.style.display = "none";

    // "Choose manufacturer"
    let make = toPositiveInt(eNewCarMake.value);
    if (make === 0) {
        return;
    }

    // Add all car models of current class or lower
    for (let iModel = 1; iModel < carDataM[make].length; iModel++) {
        if (state.lvl >= piToClass(carDataM[make][iModel].pi)) {
            let option = document.createElement("option");
            option.value = iModel;
            option.text = carDataM[make][iModel].name + " ("
                        + carDataM[make][iModel].year + ")";
            eNewCarModel.appendChild(option);
        }
    }

    // If only one model, set it as chosen
    if (eNewCarModel.options.length === 2) {
        eNewCarModel.value = eNewCarModel.options[1].value;
        newCarModelSelect();
    }
}

function newCarModelSelect() {
    // "Choose manufacturer" or "Choose model"
    let make = toPositiveInt(eNewCarMake.value);
    let model = toPositiveInt(eNewCarModel.value);
    if (make === 0 || model === 0) {
        // Clear display and return
        eNewCarRow.cells[1].innerHTML = "";
        eNewCarPrice.innerHTML = "";
        eNewCarDiscountB.style.display = "none";
        eNewCarDiscountA.style.display = "none";
        return;
    }

    // Calculate cost with discounts
    let cost = calculateCost(make, model);

    // Show PI and cost
    eNewCarRow.cells[1].innerHTML = addClassToPI(carDataM[make][model].pi);
    eNewCarPrice.innerHTML = moneyToString(cost);

    // Show discounts
    if (state.discountB) {
        eNewCarDiscountB.style.display = "block";
    }
    if (state.discountA) {
        eNewCarDiscountA.style.display = "block";
    }

    eNewCarPrice.style.color = "inherit";
    if (cost > state.money) {
        eNewCarPrice.style.color = "red";
    }
}

function addRust(action = []) {
    let newName = eNewRustName.value;
    let newID = state.rust;

    if (action.length !== 0) {
        newName = action[1];
        newID = action[2];
    }

    let newMake = carDataV[newID].make;
    let newModel = carDataV[newID].model;

    // Check if the input fields are filled out
    if (newName === "") {
        return;
    }

    let newPI = carDataM[newMake][newModel].cage;
    let newCost = rustBucketValue[getRustBucketClass(newID)];

    // Check if the player can afford the car
    if (newCost > state.money) {
        return;
    }

    // Ask for confirmation if new car PI is too high
    if (piToClass(newPI) > state.lvl) {
        if (!window.confirm("Class of new car (" + addClassToPI(newPI) + ") is too high to drive, are you sure you want to purchase?")) {
            return;
        }
    }

    // Save input to state
    state.garage.push(new Car(
        newName,
        newID,
        true
    ));
    state.money -= newCost;

    if (action.length === 0) {
        state.actions.push([
            "b",
            newName,
            newID
        ]);
    }

    state.rust = 0;

    // Try setting to current car
    state.garage[state.garage.length - 1].getIn(action.length !== 0);

    // Clear input fields
    eNewRustName.value = "";

    if (action.length === 0) {
        updateState();
    }
}

function newRustInput() {
    // Actually enter input with Enter
    if (event.key === "Enter") {
        addRust();
    }
}
