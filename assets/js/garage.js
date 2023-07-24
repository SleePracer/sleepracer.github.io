// -----------------------------------------------------------------------
// Garage
// -----------------------------------------------------------------------

function garageOptions(show = false) {
    // Show or hide based on current status
    let newDisplay = "none";
    if (eGarageOptions.innerText === "Show options"
     || show) {
        newDisplay = "inline";
        eNewCarRow.style.display = "table-row";
        eGarageOptions.innerText = "Hide options";
    } else {
        eNewCarRow.style.display = "none";
        eGarageOptions.innerText = "Show options";
    }

    // Change display for all buttons for all cars
    for (let iCar = 0; iCar < state.cars.length; iCar++) {
        state.cars[iCar].garageOptionsButtons(newDisplay);
    }
    if (state.cCar !== -1) {
        state.cars[state.cCar].getInButton.style.display = "none";
    }
}

function calculateCost(make, model) {
    let cost = carList[make][model].cost;
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
    state.cars.push(new Car(newName,
                            newMake,
                            newModel));
    state.money -= newCost;

    // Use the discounts
    usedA = 0;
    usedB = 0;
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

    state.actions.push(["c",
                        newName,
                        newMake,
                        newModel,
                        newCost]);

    // Try setting to current car
    state.cars[state.cars.length - 1].getIn();

    // Clear input fields
    // Car selectors will be reset in updateState
    eNewCarName.value = "";
    eNewCarRow.cells[1].innerHTML = "";
    eNewCarPrice.innerHTML = "";
    eNewCarDiscountB.style.display = "none";
    eNewCarDiscountA.style.display = "none";

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
    eNewCarPrice.innerHTML = "";
    eNewCarDiscountB.style.display = "none";
    eNewCarDiscountA.style.display = "none";

    // "Choose manufacturer"
    let make = toPositiveInt(eNewCarMake.value);
    if (make === 0) {
        return;
    }

    // Add all car models of current class or lower
    for (let iModel = 1; iModel < carList[make].length; iModel++) {
        if (state.lvl >= piToClass(carList[make][iModel].pi)
         && carList[make][iModel].buyable) {
            let option = document.createElement("option");
            option.value = iModel;
            option.text = carList[make][iModel].name + " ("
                        + carList[make][iModel].year + ")";
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
    eNewCarRow.cells[1].innerHTML = addClassToPI(carList[make][model].pi);
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
