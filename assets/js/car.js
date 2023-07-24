// -----------------------------------------------------------------------
// Car class
// -----------------------------------------------------------------------

class Car {
    constructor(name,
                make,
                model,
                special = "no",
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
        this.pi = 0;
        this.value = 0;
        if (special === "rust") {
            this.pi = carList[make][model].rollcage;
            this.value = rustCarValue;
        } else if (special === "load") {
            this.pi = pi;
            this.value = value;
        } else {
            this.pi = carList[make][model].pi;
            this.value = Math.floor(0.9 * carList[make][model].cost);
        }

        // Car upgrade variables
        this.upgradePI = toIntPI(0);
        this.upgradeCost = 0;

        // Add and populate new row
        this.row = eGarageTB.insertRow(this.iCar);
        for (let cell = 0; cell < eGarageTH.rows[0].cells.length; cell++) {
            this.row.insertCell();
        }
        this.row.cells[0].innerHTML = this.name + ", "
                                    + carList[this.make][0] + " "
                                    + carList[this.make][this.model].name
                                    + " ("
                                    + carList[this.make][this.model].year
                                    + ")";
        this.row.cells[1].innerHTML = addClassToPI(this.pi);
        this.row.cells[2].innerHTML = moneyToString(this.value);

        // Create and add the options buttons

        this.showUpgradeButton = document.createElement("button");
        this.showUpgradeButton.id = this.name;
        this.showUpgradeButton.innerText = "Upgrade";
        this.showUpgradeButton.onclick = showUpgradeButtonClick;
        this.showUpgradeButton.style.display = buttonDisplay;
        this.row.cells[3].appendChild(this.showUpgradeButton);

        this.paintButton = document.createElement("button");
        this.paintButton.id = this.name;
        this.paintButton.innerText = "Paint";
        this.paintButton.onclick = paintButtonClick;
        this.paintButton.style.display = buttonDisplay;
        this.paintButton.className = "margin";
        this.row.cells[3].appendChild(this.paintButton);

        this.sellButton = document.createElement("button");
        this.sellButton.id = this.name;
        this.sellButton.innerText = "Sell";
        this.sellButton.onclick = sellButtonClick;
        this.sellButton.style.display = buttonDisplay;
        this.row.cells[3].appendChild(this.sellButton);

        this.getInButton = document.createElement("button");
        this.getInButton.id = this.name;
        this.getInButton.innerText = "Get in";
        this.getInButton.onclick = getInButtonClick;
        this.getInButton.style.display = buttonDisplay;
        this.getInButton.className = "marginTop";
        this.row.cells[3].appendChild(this.getInButton);

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

    garageOptionsButtons(buttonDisplay) {
        this.showUpgradeButton.style.display = buttonDisplay;
        this.paintButton.style.display = buttonDisplay;
        this.sellButton.style.display = buttonDisplay;
        this.getInButton.style.display = buttonDisplay;
    }

    toggleUpgradeButtons(buttonDisplay) {
        this.doUpgradeButton.style.display = buttonDisplay;
        this.abortUpgradeButton.style.display = buttonDisplay;
    }

    repairCost(damage) {
        // Damage is [0, 100]%
        // At 50% damage, repair costs should be
        // 25% of mean of value and cost
        let mean = (this.value + carList[this.make][this.model].cost) / 2;
        let repair = mean * damage / 200;
        return Math.floor(repair);
    }

    depreciate(damage) {
        // Max depreciation at 10% of value
        let max = 0.1 * this.value;

        // Depreciate with d/(d+n) formula
        // Damage is [0, 100]%
        // When damage is 50%
        // depreciate half of max
        this.value -= Math.floor(max
                               * damage / (damage + 50));

        // Also depreciate 0.5% for mileage
        this.value -= Math.floor(0.005 * this.value);

        // Update table
        this.row.cells[2].innerHTML = moneyToString(this.value);
    }

    showUpgrade() {
        // Hide the car state and show upgrade inputs
        this.row.cells[1].innerHTML = "";
        this.row.cells[2].innerHTML = "";
        this.row.cells[1].appendChild(this.piInput);
        this.row.cells[2].appendChild(this.costInput);

        // Hide all buttons
        garageOptions();
        eGarageOptions.style.display = "none";

        // Show the upgrade buttons
        this.toggleUpgradeButtons("inline");
    }

    paint() {
        // Return if player can't afford painting their car
        if (state.money < 5000) {
            window.confirm("You can't afford to paint this car! You only have " + moneyToString(state.money) + " available. Earn more money by racing!");
            return;
        }

        // Update state variables
        this.value += 2500;
        state.money -= 5000;

        state.actions.push(["p",
                            this.iCar]);

        this.row.cells[2].innerHTML = moneyToString(this.value);
        updateState();
    }

    sell(force = false) {
        if (!force) {
            // Ask for confirmation before selling
            if (!window.confirm("Sale price is: " +
                                moneyToString(this.value) +
                                ", are you sure you want to sell?")) {
                return;
            }
        }

        // Add back sale price to money
        state.money += this.value;

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

        state.actions.push(["s",
                            this.iCar,
                            this.value]);

        updateState();
    }

    getIn() {
        // Only allow getting into car if class <= lvl
        if (piToClass(this.pi) <= state.lvl) {
            if (state.cCar !== -1) {
                // Show "Get in" on the car we're switching from
                state.cars[state.cCar].getInButton.style.display = "inline";
            }
            // Change car
            state.cCar = this.iCar;
            // Hide "Get in" on the car we're switching to
            state.cars[state.cCar].getInButton.style.display = "none";
        }

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
        this.row.cells[2].innerHTML = moneyToString(this.value);

        // Hide the upgrade buttons
        this.toggleUpgradeButtons("none");

        // Show all other buttons and rows again
        eGarageOptions.style.display = "block";
        garageOptions();
    }

    doUpgrade() {
        // Return if entering higher cost than money available
        if (this.upgradeCost > state.money) {
            window.confirm("You can't afford this " + moneyToString(this.upgradeCost) + " upgrade! You only have " + moneyToString(state.money) + " available. Earn more money by racing!");
            return;
        }

        // Ask for confirmation if car PI is too high after upgrade
        if (piToClass(this.upgradePI) > state.lvl) {
            if (!window.confirm("Class of car after upgrade (" + addClassToPI(this.upgradePI) + ") will be too high to drive, as you are currently limited to " + classLetter[state.lvl] + " class racing. Are you sure you want to upgrade?")) {
                return;
            } else if (state.cCar === this.iCar) {
                state.cCar = -1;
            }
        }

        // Update state variables
        this.pi = this.upgradePI;
        this.value += Math.floor(0.5 * this.upgradeCost);
        state.money -= this.upgradeCost;

        state.actions.push(["u",
                            this.iCar,
                            this.upgradePI,
                            this.upgradeCost]);

        this.exitUpgrade();

        updateState();
    }

    abortUpgrade() {
        this.exitUpgrade();
    }
}
