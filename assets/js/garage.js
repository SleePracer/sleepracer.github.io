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
            eNewRustPI.innerHTML = addClassToPI(carList[rustBuckets[state.rust][0]][rustBuckets[state.rust][1]].rollcage);
            eNewRustValue.innerHTML = moneyToString(10000);
            eNewRustValue.style.color = "inherit";
            if (10000 > state.money) {
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
    for (let iCar = 0; iCar < state.cars.length; iCar++) {
        state.cars[iCar].garageOptionsButtons(newDisplay);
    }
    if (state.driving !== -1) {
        state.cars[state.driving].getInButton.style.display = "none";
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

function addCar(action = []) {
    let newName = eNewCarName.value;
    let newMake = toPositiveInt(eNewCarMake.value);
    let newModel = toPositiveInt(eNewCarModel.value);

    if (action.length !== 0) {
        newName = action[1];
        newMake = action[2];
        newModel = action[3];
        eNewCarDiscountBoxB.checked = action[4] === 1;
        eNewCarDiscountBoxA.checked = action[5] === 1;
    }

    // Check if the input fields are filled out
    if (newName === ""
     || newMake === 0
     || newModel === 0) {
        return;
    }

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
        state.actions.push(["c",
                            newName,
                            newMake,
                            newModel,
                            usedB,
                            usedA]);
    }

    // Try setting to current car
    state.cars[state.cars.length - 1].getIn(action.length !== 0);

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

function addRust(action = []) {
    let newName = eNewRustName.value;
    let newMake = rustBuckets[state.rust][0];
    let newModel = rustBuckets[state.rust][1];

    if (action.length !== 0) {
        newName = action[1];
        newMake = action[2];
        newModel = action[3];
    }

    // Check if the input fields are filled out
    if (newName === "") {
        return;
    }

    let newPI = carList[newMake][newModel].rollcage;
    let newCost = 10000;

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
                            newModel,
                            "rust"));
    state.money -= newCost;

    if (action.length === 0) {
        state.actions.push(["b",
                            newName,
                            newMake,
                            newModel]);
    }

    state.rust = 0;

    // Try setting to current car
    state.cars[state.cars.length - 1].getIn(action.length !== 0);

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
