// -----------------------------------------------------------------------
// Car class
// -----------------------------------------------------------------------

class Car {
    constructor(
        name,
        id,
        rust = false
    ) {

        // Add car to map
        carMap.set(name, this);

        // Car state variables
        this.iCar = state.garage.length;
        this.name = name;
        this.id = id;
        this.make = carDataV[id].make;
        this.model = carDataV[id].model;
        this.pi = 0;
        this.value = 0;
        this.rust = rust;
        if (rust) {
            this.pi = carDataV[id].cage;
            this.value = rustBucketValue[getRustBucketClass(id)];
        } else {
            this.pi = carDataV[id].pi;
            this.value = Math.floor(0.9 * carDataV[id].cost);
        }

        // Car upgrade variables
        this.upgradePI = toIntPI(0);
        this.upgradeCost = 0;

        // Add and populate new row
        this.row = eGarageTB.insertRow(this.iCar);
        for (let cell = 0; cell < eGarageTH.rows[0].cells.length; cell++) {
            this.row.insertCell();
        }
        this.row.cells[0].innerHTML = this.name + ", ";
        if (this.rust) {
            this.row.cells[0].innerHTML += "<span style=color:brown>Rusty</span> ";
        }
        this.row.cells[0].innerHTML += carDataM[this.make][0] + " "
                                     + carDataM[this.make][this.model].name
                                     + " ("
                                     + carDataM[this.make][this.model].year
                                     + ")";
        this.row.cells[1].innerHTML = addClassToPI(this.pi);
        this.row.cells[2].innerHTML = moneyToString(this.value);

        // Create and add the options buttons

        this.showUpgradeButton = document.createElement("button");
        this.showUpgradeButton.id = this.name;
        this.showUpgradeButton.innerText = "Upgrade";
        this.showUpgradeButton.onclick = showUpgradeButtonClick;
        this.showUpgradeButton.style.display = "inline";
        this.row.cells[3].appendChild(this.showUpgradeButton);

        this.showPaintButton = document.createElement("button");
        this.showPaintButton.id = this.name;
        this.showPaintButton.innerText = "Paint";
        this.showPaintButton.onclick = showPaintButtonClick;
        this.showPaintButton.style.display = "inline";
        this.showPaintButton.className = "margin";
        this.row.cells[3].appendChild(this.showPaintButton);

        this.sellButton = document.createElement("button");
        this.sellButton.id = this.name;
        this.sellButton.innerText = "Sell";
        this.sellButton.onclick = sellButtonClick;
        this.sellButton.style.display = "inline";
        this.row.cells[3].appendChild(this.sellButton);

        this.getInButton = document.createElement("button");
        this.getInButton.id = this.name;
        this.getInButton.innerText = "Get in";
        this.getInButton.onclick = getInButtonClick;
        this.getInButton.style.display = "inline";
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

        // Create the paint buttons

        this.doPaintButton = document.createElement("button");
        this.doPaintButton.id = this.name;
        this.doPaintButton.innerText = "Paint";
        this.doPaintButton.onclick = doPaintButtonClick;
        this.doPaintButton.style.display = "none";
        this.row.cells[3].appendChild(this.doPaintButton);

        this.abortPaintButton = document.createElement("button");
        this.abortPaintButton.id = this.name;
        this.abortPaintButton.innerText = "Abort";
        this.abortPaintButton.onclick = abortPaintButtonClick;
        this.abortPaintButton.style.display = "none";
        this.abortPaintButton.className = "margin";
        this.row.cells[3].appendChild(this.abortPaintButton);
    }

    garageOptionsButtons(buttonDisplay) {
        this.showUpgradeButton.style.display = buttonDisplay;
        this.showPaintButton.style.display = buttonDisplay;
        this.sellButton.style.display = buttonDisplay;
        this.getInButton.style.display = buttonDisplay;
    }

    toggleUpgradeButtons(buttonDisplay) {
        this.doUpgradeButton.style.display = buttonDisplay;
        this.abortUpgradeButton.style.display = buttonDisplay;
    }

    togglePaintButtons(buttonDisplay) {
        this.doPaintButton.style.display = buttonDisplay;
        this.abortPaintButton.style.display = buttonDisplay;
    }

    repairCost(damage) {
        // Damage is [0, 100]%
        // At 50% damage, repair costs should be
        // 25% of mean of value and cost
        let mean = (this.value + carDataM[this.make][this.model].cost) / 2;
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

    showPaint() {
        // Hide the car state and show upgrade inputs
        this.row.cells[1].innerHTML = addClassToPI(this.pi);
        this.row.cells[2].innerHTML = "Cost: " + moneyToString(paintCost);
        if (this.rust) {
            this.row.cells[2].innerHTML += "<span style=color:brown>\nRemoves rust!</span> ";
        }

        // Hide all buttons
        garageOptions();
        eGarageOptions.style.display = "none";

        // Show the upgrade buttons
        this.togglePaintButtons("inline");
    }

    sell(action = []) {
        if (action.length === 0) {
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
        if (this.iCar === state.driving) {
            state.driving = -1;
        } else if (this.iCar < state.driving) {
            state.driving--;
        }

        // Update iCar of all other cars
        for (let jCar = (this.iCar + 1); jCar < state.garage.length; jCar++) {
            state.garage[jCar].iCar--;
        }

        // Delete car from table and state
        eGarageTB.deleteRow(this.iCar);
        state.garage.splice(this.iCar, 1);

        if (action.length === 0) {
            state.actions.push(["s",
                                this.iCar,
                                this.value]);

            updateState();
        }
    }

    getIn(loading = false) {
        // Only allow getting into car if class <= lvl
        if (piToClass(this.pi) <= state.lvl) {
            if (state.driving !== -1) {
                // Show "Get in" on the car we're switching from
                state.garage[state.driving].getInButton.style.display = "inline";
            }
            // Change car
            state.driving = this.iCar;
            // Hide "Get in" on the car we're switching to
            state.garage[state.driving].getInButton.style.display = "none";
        }

        if (!loading) {
            updateState();
        }
    }

    setUpgradePI(value) {
        this.upgradePI = toIntPI(value);
    }

    setUpgradeCost(value) {
        this.upgradeCost = toPositiveInt(value);
    }

    exitUpgrade(loading = false) {
        if (!loading) {
            // Reset the upgrade variables
            this.upgradePI = toIntPI(0);
            this.upgradeCost = 0;

            // Remove and reset the input fields
            this.row.cells[1].removeChild(this.piInput);
            this.row.cells[2].removeChild(this.costInput);
            this.piInput.value = "";
            this.costInput.value = "";

            // Hide the upgrade buttons
            this.toggleUpgradeButtons("none");

            // Show all other buttons and rows again
            eGarageOptions.style.display = "block";
            garageOptions();
        }

        // Re-add the state information to the table
        this.row.cells[1].innerHTML = addClassToPI(this.pi);
        this.row.cells[2].innerHTML = moneyToString(this.value);
    }

    exitPaint(loading = false) {
        // Re-add the state information to the table
        this.row.cells[1].innerHTML = addClassToPI(this.pi);
        this.row.cells[2].innerHTML = moneyToString(this.value);

        if (!loading) {
            // Hide the upgrade buttons
            this.togglePaintButtons("none");

            // Show all other buttons and rows again
            eGarageOptions.style.display = "block";
            garageOptions();
        }
    }

    doUpgrade(action = []) {
        let upi = this.upgradePI;
        let ucost = this.upgradeCost;
        if (action.length !== 0) {
            upi = action[2];
            ucost = action[3];
        }

        // Return if entering higher cost than money available
        if (ucost > state.money) {
            window.confirm("You can't afford this " + moneyToString(ucost) + " upgrade! You only have " + moneyToString(state.money) + " available. Earn more money by racing!");
            return;
        }

        // Ask for confirmation if car PI is too high after upgrade
        if (piToClass(upi) > state.lvl) {
            if (!window.confirm("Class of car after upgrade (" + addClassToPI(upi) + ") will be too high to drive, as you are currently limited to " + classLetter[state.lvl] + " class racing. Are you sure you want to upgrade?")) {
                return;
            } else if (state.driving === this.iCar) {
                state.driving = -1;
            }
        }

        // Update state variables
        this.pi = upi;
        this.value += Math.floor(0.5 * ucost);
        state.money -= ucost;

        if (action.length === 0) {
            state.actions.push(["u",
                                this.iCar,
                                this.upgradePI,
                                this.upgradeCost]);
        }

        this.exitUpgrade(action.length !== 0);

        if (action.length === 0) {
            updateState();
        }
    }

    doPaint(loading = false) {
        // Return if player can't afford painting their car
        if (state.money < paintCost) {
            window.confirm("You can't afford to paint this car! You only have " + moneyToString(state.money) + " available. Earn more money by racing!");
            return;
        }

        // Update state variables
        this.value += paintCost / 2;
        state.money -= paintCost;

        // Remove rust
        if (this.rust) {
            this.value += Math.floor(0.2 * carDataM[this.make][this.model].cost);
            this.rust = false;
        }

        // Update name to remove rust
        this.row.cells[0].innerHTML = this.name + ", "
                                    + carDataM[this.make][0] + " "
                                    + carDataM[this.make][this.model].name
                                    + " ("
                                    + carDataM[this.make][this.model].year
                                    + ")";

        if (!loading) {
            state.actions.push(["p",
                                this.iCar]);
        }

        this.exitPaint(loading);

        if (!loading) {
            updateState();
        }
    }

    abortUpgrade() {
        this.exitUpgrade();
    }

    abortPaint() {
        this.exitPaint();
    }
}
