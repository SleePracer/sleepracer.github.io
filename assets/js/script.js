// -----------------------------------------------------------------------
// Class HTML element mappings
// -----------------------------------------------------------------------

// These maps and functions are necessary
// because having class methods on change/keyup/click
// will result in keyword "this" pointing to the select/input/button
// rather than the class object

let carMap = new Map();
let raceMap = new Map();
let eventMap = new Map();

// Car
function getInButtonClick() {
    carMap.get(this.id).getIn();
}
function showUpgradeButtonClick() {
    carMap.get(this.id).showUpgrade();
}
function sellButtonClick() {
    carMap.get(this.id).sell();
}
function piInputKeyup() {
    carMap.get(this.id).setUpgradePI(this.value);

    if (event.key === "Enter") {
        carMap.get(this.id).doUpgrade();
    } else if (event.key === "Escape") {
        carMap.get(this.id).abortUpgrade();
    }
}
function costInputKeyup() {
    carMap.get(this.id).setUpgradeCost(this.value);

    if (event.key === "Enter") {
        carMap.get(this.id).doUpgrade();
    } else if (event.key === "Escape") {
        carMap.get(this.id).abortUpgrade();
    }
}
function doUpgradeButtonClick() {
    carMap.get(this.id).doUpgrade();
}
function abortUpgradeButtonClick() {
    carMap.get(this.id).abortUpgrade();
}

// Race
function positionSelectChange() {
    raceMap.get(this.id).setPosition(this.value);
}
function damageInputKeyup() {
    raceMap.get(this.id).setDamage(this.value);

    if (event.key === "Enter") {
        raceMap.get(this.id).finish();
    }
}
function finishButtonClick() {
    raceMap.get(this.id).finish();
}

// Event
function infoButtonClick() {
    eventMap.get(this.id).showInfo();
}
function enterEventButtonClick() {
    eventMap.get(this.id).enter();
}
function returnEventButtonClick() {
    eventMap.get(this.id).returnToEvents();
}

// -----------------------------------------------------------------------
// Car class
// -----------------------------------------------------------------------

class Car {
    constructor(name,
                make,
                model,
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
        this.pi = pi;
        if (pi === 0) {
            this.pi = carList[make][model].pi;
        }
        this.cost = carList[make][model].cost;
        this.value = value;
        if (value === 0) {
            this.value = Math.floor(0.9 * this.cost);
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

        this.getInButton = document.createElement("button");
        this.getInButton.id = this.name;
        this.getInButton.innerText = "Get in";
        this.getInButton.onclick = getInButtonClick;
        this.getInButton.style.display = buttonDisplay;
        this.row.cells[3].appendChild(this.getInButton);

        this.showUpgradeButton = document.createElement("button");
        this.showUpgradeButton.id = this.name;
        this.showUpgradeButton.innerText = "Upgrade";
        this.showUpgradeButton.onclick = showUpgradeButtonClick;
        this.showUpgradeButton.style.display = buttonDisplay;
        this.showUpgradeButton.className = "margin";
        this.row.cells[3].appendChild(this.showUpgradeButton);

        this.sellButton = document.createElement("button");
        this.sellButton.id = this.name;
        this.sellButton.innerText = "Sell";
        this.sellButton.onclick = sellButtonClick;
        this.sellButton.style.display = buttonDisplay;
        this.row.cells[3].appendChild(this.sellButton);

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
        this.getInButton.style.display = buttonDisplay;
        this.showUpgradeButton.style.display = buttonDisplay;
        this.sellButton.style.display = buttonDisplay;
    }

    toggleUpgradeButtons(buttonDisplay) {
        this.doUpgradeButton.style.display = buttonDisplay;
        this.abortUpgradeButton.style.display = buttonDisplay;
    }

    repairCost(damage) {
        // Damage is [0, 100]%
        // At 50% damage, repair costs should be
        // 25% of mean of value and cost
        let mean = (this.value + this.cost) / 2;
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

    getIn() {
        // Only allow getting into car if class <= lvl
        if (piToClass(this.pi) <= state.lvl) {
            state.cCar = this.iCar;
        }

        updateState();
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

    sell() {
        // Ask for confirmation before selling
        if (!window.confirm("Sale price is: " + moneyToString(this.value) + ", are you sure you want to sell?")) {
            return;
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

        this.exitUpgrade();

        updateState();
    }

    abortUpgrade() {
        this.exitUpgrade();
    }
}

// -----------------------------------------------------------------------
// Race class
// -----------------------------------------------------------------------

class Race {
    constructor(name, prizeType, loanCar) {

        // Add race to map
        raceMap.set(name + " R", this);

        // Race state variables
        this.name = name;
        this.prizeType = prizeType;
        this.loanCar = loanCar;

        // Add and populate new row
        this.row = eRacesTB.insertRow(0);
        for (let cell = 0; cell < eRacesTH.rows[0].cells.length; cell++) {
            this.row.insertCell();
        }
        this.row.cells[0].innerText = this.name;

        // Create and add the position selector
        this.positionSelect = document.createElement("select");
        this.positionSelect.id = this.name + " R";
        this.positionSelect.onchange = positionSelectChange;
        for (let pos = 0; pos < positionName.length; pos++) {
            let option = document.createElement("option");
            option.value = pos;
            option.text = positionName[pos];
            this.positionSelect.appendChild(option);
        }
        this.row.cells[1].appendChild(this.positionSelect);

        // Create and add the damage input
        this.damageInput = document.createElement("input");
        this.damageInput.id = this.name + " R";
        this.damageInput.type = "number";
        this.damageInput.style.width = "100%";
        this.damageInput.placeholder = "Damage %";
        this.damageInput.onkeyup = damageInputKeyup;
        this.row.cells[2].appendChild(this.damageInput);

        // Create and add the finish button
        this.finishButton = document.createElement("button");
        this.finishButton.id = this.name + " R";
        this.finishButton.onclick = finishButtonClick;
        this.row.cells[3].appendChild(this.finishButton);

        // Reset position and damage inputs
        this.position = 0;
        this.positionSelect.value = "0";
        this.damage = 0;
        this.damageInput.value = "";

        // Update result variables
        if (this.loanCar !== "none") {
            this.setDeltaMoney(loanCars.get(this.loanCar).pi);
            this.setDeltaXP(loanCars.get(this.loanCar).pi);
        } else if (state.cCar !== -1) {
            this.setDeltaMoney(state.cars[state.cCar].pi);
            this.setDeltaXP(state.cars[state.cCar].pi);
        } else {
            this.setDeltaMoney(classPI[0]);
            this.setDeltaXP(classPI[0]);
        }
    }

    getPrize(position, pi) {
        let factor = 1;
        if (this.prizeType === "double") {
            factor = 2;
        }

        if (this.prizeType === "normal" || this.prizeType === "double") {
            if (piToClass(pi) === 1 || piToClass(pi) === 2) {
                return factor * positionPrize.normal.C[position]
            } else if (piToClass(pi) === 3) {
                return factor * positionPrize.normal.B[position]
            } else if (piToClass(pi) === 4) {
                return factor * positionPrize.normal.A[position]
            }
        } else if (this.prizeType === "podium") {
            return positionPrize.podium[position]
        } else if (this.prizeType === "all") {
            if (piToClass(pi) === 1 || piToClass(pi) === 2) {
                return positionPrize.all.C[position]
            } else if (piToClass(pi) === 4 || piToClass(pi) === 5) {
                return positionPrize.all.A[position]
            }
        }

        // Something's wrong
        return 0;
    }

    setDeltaMoney(pi) {
        let repairCost = 0;
        if (this.loanCar !== "none") {
            repairCost = Math.floor(this.damage * loanCars.get(this.loanCar).rep);
        } else {
            repairCost = state.cars[state.cCar].repairCost(this.damage);
        }

        this.deltaMoney = this.getPrize(this.position, pi) - repairCost;

        // Set button text depending on prize
        if (this.deltaMoney > 0) {
            this.finishButton.innerText = "Finish! "
                                        + moneyToString(this.deltaMoney);
        } else if (this.deltaMoney < 0) {
            this.finishButton.innerText = "Finish! "
                                        + moneyToString(this.deltaMoney);
        } else {
            this.finishButton.innerText = "Finish!";
        }
    }

    getBaseXP() {
        // Check for win streak in past 3 races and modify baseXP
        let baseXP = positionXP[this.position];
        if (Math.floor(state.wins / 100) === 1) {
            // Previous race win
            if (this.position === 1
             || this.position === 2
             || this.position === 3) {
                // This race podium
                baseXP--;
            }
        }
/*
        if (this.position === 1) {
            // This race win
            if (Math.floor((state.wins % 100) / 10) === 1) {
                // Second previous race win
                baseXP--;
            }
            if ((state.wins % 10) === 1) {
                // Third previous race win
                baseXP--;
            }
        }
*/
        return baseXP;
    }

    getSubClass(pi) {
        // Should this be a normal function?
        // Does not use any members, might be useful elsewhere

        let iClass = piToClass(pi);

        // subClass will be [6, 10] depending on how far in the class pi is
        let subClass = Math.ceil((((pi - 1) % 100) + 1) / 20) + 5;
        if (iClass === 1) {
            // D class should just be like C with subClass 5
            // but classXP[D] is classXP[C] / 10
            subClass = 50;
        } else if (iClass === 7) {
            // Always min out subClass for X
            subClass = 1;
        }
        return subClass;
    }

    setDeltaXP(pi) {
        let iClass = piToClass(pi);
        if (iClass === 0) {
            // Set to 0 for invalid class
            this.deltaXP = 0;
            return;
        }
        if (this.loanCar !== "none") {
            iClass = state.lvl;
        }

        // Calculate the deltaXP, messy but should be cool

        // PI of the car is a straight factor, more is better
        let subClass = this.getSubClass(pi);
        if (this.loanCar !== "none") {
            subClass = this.getSubClass(classPI[iClass]);
        }
        let classFactor = subClass * classXP[iClass] / 1000;

        // These are only used for damageRatio
        let prizeFactor = this.getPrize(2, pi)
                        + this.getPrize(this.position, pi);
        let repairCost = state.cars[state.cCar].repairCost(this.damage);
        if (this.loanCar !== "none") {
            repairCost = Math.floor(this.damage
                                  * loanCars.get(this.loanCar).rep);
        }

        // damageRatio is in [0, 1]
        let damageRatio = Math.max(0, Math.min(1,
                          repairCost / prizeFactor));

        // baseXP is in [-1, 4] depending on placement
        let baseXP = this.getBaseXP();

        // Damage from the race can remove a fair bit of XP
        // Can only be negative if baseXP is <= 0
        let damageFactor = baseXP - (1 + baseXP / 2) * damageRatio / 2;

        // the magic 4 is just game speed balancing
        // adjust/refine if necessary
        this.deltaXP = Math.ceil(classGameSpeed[iClass]
                               * classFactor
                               * damageFactor);
    }

    setPosition(value) {
        this.position = toInt(value);

        if (this.loanCar !== "none") {
            this.setDeltaMoney(loanCars.get(this.loanCar).pi);
            this.setDeltaXP(loanCars.get(this.loanCar).pi);
        } else if (state.cCar !== -1) {
            this.setDeltaMoney(state.cars[state.cCar].pi);
            this.setDeltaXP(state.cars[state.cCar].pi);
        } else {
            this.setDeltaMoney(classPI[0]);
            this.setDeltaXP(classPI[0]);
        }
    }

    setDamage(value) {
        this.damage = Math.min(100, toPositiveInt(10 * value) / 10);

        if (this.loanCar !== "none") {
            this.setDeltaMoney(loanCars.get(this.loanCar).pi);
            this.setDeltaXP(loanCars.get(this.loanCar).pi);
        } else if (state.cCar !== -1) {
            this.setDeltaMoney(state.cars[state.cCar].pi);
            this.setDeltaXP(state.cars[state.cCar].pi);
        } else {
            this.setDeltaMoney(classPI[0]);
            this.setDeltaXP(classPI[0]);
        }
    }

    finish() {
        // Update XP
        state.xp += this.deltaXP;

        // This check should probably be done in a setter
        // Later, when state is a class?
        if (state.xp < classXP[0]) {
            state.xp = classXP[0];
        }

        // Update win streak history
        // This should probably also be state.updateWins(position);
        state.wins = Math.floor(state.wins / 10);
        if (this.position === 1) {
            state.wins += 100;
        }

        // Update money
        state.money += this.deltaMoney;

        // Remove interactive elements and display results
        // Before depreciate of car, or will be wrong on reload
        this.row.cells[1].removeChild(this.positionSelect);
        this.row.cells[1].innerText = positionName[this.position];
        this.row.cells[2].removeChild(this.damageInput);
        if (this.loanCar !== "none") {
            this.row.cells[2].innerText = moneyToString(Math.floor(this.damage * loanCars.get(this.loanCar).rep));
        } else {
            this.row.cells[2].innerText = moneyToString(state.cars[state.cCar].repairCost(this.damage));
        }
        this.row.cells[3].removeChild(this.finishButton);
        this.row.cells[3].innerText = moneyToString(this.deltaMoney);
        this.row.cells[3].style.color = "inherit";
        if (this.deltaMoney < 0) {
            this.row.cells[3].style.color = "red";
        }

        // Depreciate value of car
        if (this.loanCar === "none") {
            state.cars[state.cCar].depreciate(this.damage);
        }

        updateState();
    }
}

// -----------------------------------------------------------------------
// Event class
// -----------------------------------------------------------------------

class Event {
    constructor(name,
                iEvent,
                infoString,
                raceName,
                sharecode,
                category,
                eventType = "norm",
                prizeType = "normal",
                pi = 0,
                cars = [],
                loanCar = "none") {

        // Add to event map for the enter button
        // Add to race map for race buttons to go via here (finish!)
        eventMap.set(name + " E", this);
        raceMap.set(name + " E", this);

        // Parameters
        this.name = name;
        this.iEvent = iEvent;
        this.infoString = infoString;
        this.raceName = raceName;
        this.sharecode = sharecode;
        this.category = category;
        this.eventType = eventType;
        this.prizeType = prizeType;
        this.pi = pi;
        this.cars = JSON.parse(JSON.stringify(cars));
        this.loanCar = loanCar;

        // Other state variables
        this.race = null;
        this.entered = false;
        this.finished = false;

        // Add and populate new row in event table
        let nCells = eEventsTH.rows[0].cells.length;
        if (this.eventType !== "norm") {
            let iRow = eSpecsTB.rows.length;
            this.row = eSpecsTB.insertRow(iRow);
            for (let cell = 0; cell < nCells; cell++) {
                this.row.insertCell();
            }
        } else {
            let iRow = eEventsTB.rows.length;
            this.row = eEventsTB.insertRow(iRow);
            for (let cell = 0; cell < nCells; cell++) {
                this.row.insertCell();
            }
        }
        this.row.cells[0].innerText = this.name;

        // Create and add the info button
        this.infoButton = document.createElement("button");
        this.infoButton.id = this.name + " E";
        this.infoButton.onclick = infoButtonClick;
        this.infoButton.innerText = "Info";
        this.row.cells[1].appendChild(this.infoButton);

        // Create and add the enter event button
        this.enterButton = document.createElement("button");
        this.enterButton.id = this.name + " E";
        this.enterButton.onclick = enterEventButtonClick;
        this.enterButton.innerText = "Enter";
        this.enterButton.className = "margin";
        this.row.cells[1].appendChild(this.enterButton);

        // Create the return from event button
        // It will be added to the races table later
        this.returnButton = document.createElement("button");
        this.returnButton.id = this.name + " E";
        this.returnButton.onclick = returnEventButtonClick;
        this.returnButton.innerText = "Return";

        if (this.eventType === "show" || this.eventType === "spec") {
            let iRow = eCompletedTB.rows.length;
            this.completedRow = eCompletedTB.insertRow(iRow);
            for (let cell = 0; cell < nCells; cell++) {
                this.completedRow.insertCell();
            }
            this.completedRow.cells[0].innerText = this.name;
            this.completedRow.style.display = "none";
        }
    }

    showOrHide() {
        // Hide everything if not in a car
        if (state.cCar === -1) {
            this.row.style.display = "none";
            this.enterButton.style.display = "none";
            return;
        }

        // Check if any car in garage is included in model list for event
        // Also check if current car is included in model list for event
        let garageOk = false;
        let carModelOk = false;
        if (this.cars.length === 0) {
            garageOk = true;
            carModelOk = true;
        } else {
            for (let iCar = 0; iCar < state.cars.length; iCar++) {
                let iCarModel = state.cars[iCar].getModel();
                for (let iModel = 0; iModel < this.cars.length; iModel++) {
                    if (iCarModel[0] === this.cars[iModel][0]
                     && iCarModel[1] === this.cars[iModel][1]) {
                        garageOk = true;
                        if (iCar === state.cCar) {
                            carModelOk = true;
                        }
                    }
                }
            }
        }

        // For special events, let garage be ok when outleveled
        if (this.eventType === "spec" && state.lvl > piToClass(this.pi)) {
            garageOk = true;
        }

        // For showcase events, garage is always true
        if (this.eventType === "show") {
            garageOk = true;
        }

        // Check if current car is of the correct class
        let playerClassOk = false;
        let carClassOk = false;
        if (this.pi === 0) {
            playerClassOk = true;
            carClassOk = true;
        } else {
            if (state.lvl >= piToClass(this.pi)) {
                playerClassOk = true;
            }
            if (state.cars[state.cCar].pi >= this.pi) {
                carClassOk = true;
            }
        }

        if (this.loanCar === "vintageHatch") {
            playerClassOk = state.xp > 5000;
        } else if (this.loanCar === "vintageSport") {
            playerClassOk = state.lvl > 2;
        } else if (this.loanCar === "vintageExplorer") {
            playerClassOk = state.xp > 50000;
        } else if (this.loanCar === "80Super") {
            playerClassOk = state.lvl > 3;
        } else if (this.loanCar === "90Super") {
            playerClassOk = state.xp > 500000;
        }

        // Check if one of the next races
        let nextEventOk = (this.eventType !== "norm");
        if (state.next.includes(this.iEvent)) {
            nextEventOk = true;
        }

        // Check that the category is correct
        let categoryOk = (this.category === "both");
        if ((this.category === "road") && state.road) {
            categoryOk = true;
        } else if ((this.category === "dirt") && state.dirt) {
            categoryOk = true;
        }

        // Check if ready for level up (if level up event)
        let levelUpOk = (this.eventType !== "prog");
        if (xpToClass(state.xp) > state.lvl) {
            levelUpOk = true;
        }

        // Check if special event ok (has it been completed?)
        let specOk = (this.eventType !== "spec")
        if (!specOk && !state.completed.includes(this.iEvent)) {
            specOk = true;
        }

        // Check if showcase ok (has it been completed?)
        let showOk = ((this.eventType === "show")
                    && !state.completed.includes(this.iEvent));

        if (garageOk
         && playerClassOk
         && nextEventOk
         && categoryOk
         && levelUpOk) {
            if (state.completed.includes(this.iEvent)) {
                if (state.show) {
                    eCompletedT.style.display = "block";
                }
                this.completedRow.style.display = "table-row";
                this.row.style.display = "none";

                if (state.completed.includes(this.iEvent)) {
                    this.completedRow.cells[1].appendChild(this.infoButton);
                }
            } else {

                if (this.eventType !== "norm") {
                    eSpecsT.style.display = "block";
                }

                // Show row, but only enter button if car ok
                this.row.style.display = "table-row";
                if (this.eventType === "show" || this.eventType === "spec") {
                    this.completedRow.style.display = "none";
                }
                if ((carModelOk && carClassOk && specOk)
                  || showOk) {
                    this.enterButton.style.display = "inline";
                } else {
                    this.enterButton.style.display = "none";
                }
            }
        } else {
            this.row.style.display = "none";
            this.enterButton.style.display = "none";
        }

    }

    showInfo() {
        if (this.infoButton.innerText === "Info") {
            // Add provided info
            let allInfo = this.name + ": ";
            allInfo += this.infoString;

            // Add sharecode
            allInfo += "\n\n";
            if (this.eventType === "show") {
                allInfo += "Event track: " + this.raceName + "\n";
            }
            allInfo += "Event sharecode: " + this.sharecode;

            if (this.eventType === "spec") {
                // Add PI restriction
                allInfo += "\n";
                allInfo += "Minimum PI: ";
                allInfo += classLetter[piToClass(this.pi)] + this.pi;

                // Add eligible car models
                allInfo += "\n\nEligible cars:\n";
                for (let iModel = 0; iModel < this.cars.length; iModel++) {
                    let makeList = carList[this.cars[iModel][0]];
                    let modelObj = makeList[this.cars[iModel][1]];
                    allInfo += makeList[0] + " ";
                    allInfo += modelObj.name + "\n";
                }
            }

            if (this.eventType === "show") {

                // Add eligible car models
                allInfo += "\n\nBorrow one of:\n";
                for (let iModel = 0; iModel < this.cars.length; iModel++) {
                    let makeList = carList[this.cars[iModel][0]];
                    let modelObj = makeList[this.cars[iModel][1]];
                    allInfo += makeList[0] + " ";
                    allInfo += modelObj.name + " (";
                    allInfo += modelObj.sharecode + ")\n";
                }
            }

            // Replace name with info
            if (state.completed.includes(this.iEvent)) {
                this.completedRow.cells[0].innerText = allInfo;
            } else {
                this.row.cells[0].innerText = allInfo;
            }

            // Repurpose info button to close info
            this.infoButton.innerText = "Hide info";

            // Hide enter button
            this.enterButton.style.display = "none";
        } else {
            // Switch back to name
            if (state.completed.includes(this.iEvent)) {
                this.completedRow.cells[0].innerText = this.name;
            } else {
                this.row.cells[0].innerText = this.name;
            }

            // Return info button back to it's original state
            this.infoButton.innerText = "Info";

            this.showOrHide();
        }
    }

    enter() {
        // Add progress to state
        if (state.cEvent === null) {
            // If not null, we're just loading progress
            state.cEvent = {
                ie: this.iEvent,
                p: []};
            updateState();
        }

        // Hide the event table
        eEventTables.style.display = "none";

        // Show the races table
        eRacesT.style.display = "table";

        // Create the event race
        this.race = new Race(this.raceName, this.prizeType, this.loanCar);

        // Makes buttons go through this class
        this.race.positionSelect.id = this.name + " E";
        this.race.damageInput.id = this.name + " E";
        this.race.finishButton.id = this.name + " E";

        // Add the return from event button to a final row
        this.returnRow = eRacesTB.insertRow(1);
        for (let cell = 0; cell < eRacesTH.rows[0].cells.length; cell++) {
            this.returnRow.insertCell();
        }
        this.returnRow.cells[0].innerHTML = "Sharecode: " + this.sharecode;
        this.returnRow.cells[3].appendChild(this.returnButton);

        // Show first race
        this.entered = true;
        this.race.row.style.display = "table-row";
    }

    returnToEvents() {

        // Do some things only if finished
        if (this.finished) {

            // Get the three next tracks
            // Before updating state
            if (this.iEvent >= roadStart
             && this.iEvent < dirtStart) {

                // Road
                state.next = JSON.parse(JSON.stringify(
                             roadCircuits[this.iEvent - roadStart].next));

                // Stolen from stackoverflow
                state.next = state.next.map(a => a + roadStart);
                next3Random();
            } else if (this.iEvent >= dirtStart) {

                // Dirt
                state.next = JSON.parse(JSON.stringify(
                             dirtScrambles[this.iEvent - dirtStart].next));

                // Stolen from stackoverflow
                state.next = state.next.map(a => a + dirtStart);
                next3Random();
            } else {
                state.next = [];
            }

            // Mark non-repeatable events as finished
            if (this.eventType === "show" || this.eventType === "spec") {
                state.completed.push(this.iEvent);
                this.completedRow.cells[1].appendChild(this.infoButton);
            }

        }

        // Clear progress from state
        state.cEvent = null;
        updateState();

        // Hide event races
        this.entered = false;
        this.finished = false;
        this.race.row.style.display = "none";

        // Remove event races
        this.race = null;

        // Remove return button and row
        this.returnRow.cells[3].removeChild(this.returnButton);
        this.returnRow.style.display = "none";

        // Hide the races table
        eRacesT.style.display = "none";

        // Show all the events again
        eEventTables.style.display = "block";
    }

    setPosition(value) {
        // Needed?
        if (this.entered && !this.finished) {
            this.race.setPosition(value);
        }
    }

    setDamage(value) {
        // Needed?
        if (this.entered && !this.finished) {
            this.race.setDamage(value);
        }
    }

    finish() {
        // Sanity check
        if (this.entered && !this.finished) {
            let repairCost = state.cars[state.cCar].repairCost(this.race.damage);
            if (this.loanCar !== "none") {
                repairCost = Math.floor(this.race.damage
                                      * loanCars.get(this.loanCar).rep);
            }

            // Add progress to state
            state.cEvent.p.push([
                this.race.position,
                repairCost,
                this.race.deltaMoney]);
            updateState();

            // Check if podium before finishing
            let podium = (this.race.position > 0
                       && this.race.position < 4);

            this.race.finish();
            this.finished = true;

            // Only level up with a podium
            if (this.eventType === "prog" && podium) {
                state.lvl++;
                updateState();
            }

        }
    }

    load(aProgress) {
        // This function should only be called when loading state
        // It only reloads the previous results
        // the event should have been entered before..?
        // rethink this in task 65

        // Remove interactive elements and display results
        // This is done in race.finish but we don't call that on load!
        this.race.row.cells[1].removeChild(this.race.positionSelect);
                                                     // position
        this.race.row.cells[1].innerText = positionName[aProgress[0]];
        this.race.row.cells[2].removeChild(this.race.damageInput);
                                                      // repairCost
        this.race.row.cells[2].innerText = moneyToString(aProgress[1]);
        this.race.row.cells[3].removeChild(this.race.finishButton);
                                                      // deltaMoney
        this.race.row.cells[3].innerText = moneyToString(aProgress[2]);

        // Show next race or return button
//        this.entered = true; // probably not needed? since we enter() before load()ing
        this.finished = true;
    }

}

// -----------------------------------------------------------------------
// State functions
// -----------------------------------------------------------------------

function getStateString(s = state) {
    // Store cars as constructor argument objects
    let carArgs = [];
    for (let iCar = 0; iCar < s.cars.length; iCar++) {
        carArgs.push(s.cars[iCar].getArgs());
    }

    // Store state as compact as possible
    let compact = {
        n: s.name,
        t: s.date,
        xp: s.xp,
        l: s.lvl,
        w: s.wins,
        r: 0,
        d: 0,
        x: s.next,
        s: 0,
        f: s.completed,
        m: s.money,
        ce: s.cEvent,
        cc: s.cCar,
        c: carArgs};

    if (s.road) {
        compact.r = 1;
    }
    if (s.dirt) {
        compact.d = 1;
    }
    if (s.show) {
        compact.s = 1;
    }

    // Always return an array,
    // where array[0] is the version
    // and array[1] is the compact state
    return JSON.stringify([s.version, compact]);
}

function clearNewCarModel() {
    // Clear model selector
    while (eNewCarModel.options.length > 0) {
        eNewCarModel.remove(0);
    }

    // Add "Choose model"
    let modelOption = document.createElement("option");
    modelOption.value = 0;
    modelOption.text = carList[0][1];
    eNewCarModel.appendChild(modelOption);
}

function next3Random() {
    // Randomize array in-place using Durstenfeld shuffle algorithm
    for (let i = state.next.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = state.next[i];
        state.next[i] = state.next[j];
        state.next[j] = temp;
    }
    state.next = state.next.slice(0, 3);
}

function updateState() {
    // Update player name
    if (state.name === "") {
        eStateName.innerText = "No name!";
    } else {
        eStateName.innerText = state.name;
    }

    // Update car name
    if (state.cars.length > 0) {
        if (state.cCar !== -1) {
            eStateCar.innerText = state.cars[state.cCar].name + " "
                                + addClassToPI(state.cars[state.cCar].pi);
            eEvents.style.display = "block";
        } else {
            eStateCar.innerText = "Not in a car!";
            eEvents.style.display = "none";
        }
    } else {
        eStateCar.innerText = "No cars!";
        eEvents.style.display = "none";
    }

    // Update money
    eStateMoney.innerText = moneyToString(state.money);
    eStateMoney.style.color = "inherit";
    if (state.money < 0) {
        eStateMoney.style.color = "red";
    }

    // Update driver rating progress bar
    if (state.lvl > 4) {
        eStateLvl.innerHTML = "Game completed!";
        eStateXPBar.style.display = "none";
    } else if (xpToClass(state.xp) > state.lvl) {
        eStateLvl.innerHTML = "Class: " + classLetter[state.lvl] + "+";
        eStateXPProgress.style.width = "100%";
    } else {
        eStateLvl.innerHTML = "Class: " + classLetter[state.lvl];
        eStateXPProgress.style.width = xpToPercent(state.xp);
    }
    eStateXPProgress.style.backgroundColor = classColor[state.lvl];

    // Show new news
    if (news > state.date) {
        eNews.style.display = "block";
    } else {
        eNews.style.display = "none";
    }

    // Check the boxes
    eRoadRadio.checked = state.road;
    eDirtRadio.checked = state.dirt;
    eShowCompleted.checked = state.show;

    // At the start of the game, or when switching between road/dirt
    if (state.next.length === 0) {
        if (state.road) {
            state.next = Array.from(Array(roadCircuits.length).keys());
            state.next = state.next.map(a => a + roadStart);
            eEvents.style.display = "block";
        } else if (state.dirt) {
            state.next = Array.from(Array(dirtScrambles.length).keys());
            state.next = state.next.map(a => a + dirtStart);
            eEvents.style.display = "block";
        } else {
            eEvents.style.display = "none";
        }
        next3Random();
    }

    // Only show events that should be shown
    eSpecsT.style.display = "none";
    eCompletedT.style.display = "none";
    for (let iEvent = 0; iEvent < events.length; iEvent++) {
        events[iEvent].showOrHide();
    }

    // Show garage options if no cars
    if (state.cars.length === 0) {
        garageOptions(true);
    }

    // Clear make selector
    while (eNewCarMake.options.length > 0) {
        eNewCarMake.remove(0);
    }

    // Add "Choose manufacturer"
    let baseMakeOption = document.createElement("option");
    baseMakeOption.value = 0;
    baseMakeOption.text = carList[0][0];
    eNewCarMake.appendChild(baseMakeOption);

    // Add all buyable makes
    for (let iMake = 1; iMake < carList.length; iMake++) {
        if (hasBuyableModel(iMake)) {
            let makeOption = document.createElement("option");
            makeOption.value = iMake;
            makeOption.text = carList[iMake][0];
            eNewCarMake.appendChild(makeOption);
        }
    }

    // Only "Choose model" shown
    // Models will be added when manufacturer is chosen
    clearNewCarModel();

    // Store state in localStorage
    localStorage.setItem("state", getStateString());
}

function setStateFromString(inputString) {
    let parsed = JSON.parse(inputString);
    let validVersions = ["0.2.0", "0.2.1"];
    eGameLoadError.innerHTML = ""

    // Make sure parsed string is an array,
    // where array[0] is the version
    // and array[1] is the actual state
    if (parsed.length !== 2) {
        let errorString = "Input is not a valid state!";
        console.log(inputString);
        console.log(errorString);
        eGameLoadError.innerHTML = errorString;
        return;
    }
    let version = parsed[0];
    if (!validVersions.includes(version)) {
        let errorString = "Game version " + version + " is not valid!";
        console.log(errorString);
        eGameLoadError.innerHTML = errorString;
        return;
    }

    // inputString and version is valid, set state
    let compact = parsed[1];

    // 0.2.0 -> 0.2.1
    if (!Object.hasOwn(compact, 't')) {
        compact.t = 0;
    }

    state.version = thisVersion;
    state.name = compact.n;
    state.date = compact.t;
    state.xp = compact.xp;
    state.lvl = compact.l;
    state.wins = compact.w;
    state.road = (compact.r === 1);
    state.dirt = (compact.d === 1);
    state.next = compact.x;
    state.show = (compact.s === 1);
    state.completed = compact.f;
    state.money = compact.m;
    state.cEvent = compact.ce;
    state.cCar = compact.cc;

    // Create new cars with args from state
    state.cars = [];
    let carArgs = compact.c;
    for (let iCar = 0; iCar < carArgs.length; iCar++) {
        state.cars.push(new Car(
            carArgs[iCar].n,
            carArgs[iCar].m[0],
            carArgs[iCar].m[1],
            carArgs[iCar].pi,
            carArgs[iCar].v,
            "none"));
    }

    // Make sure we can't enter too high car class
    if (state.cCar !== -1) {
        if (piToClass(state.cars[state.cCar].pi) > state.lvl) {
            state.cCar = -1;
        }
    }

    // Enter event if in progress
    if (compact.ce !== null) {
        events[compact.ce.ie].enter();

        // Load previous results
        for (let iRace = 0; iRace < compact.ce.p.length; iRace++) {
            events[compact.ce.ie].load(compact.ce.p[iRace]);
        }
    }

    updateState();
}

// -----------------------------------------------------------------------
// Start
// -----------------------------------------------------------------------

function startNameButton() {
    // Check if the input fields are filled out
    if (startName === "") {
        return;
    }

    // Show next field
    eStartCarDiv.style.display = "block";
}

function startNameInput() {
    startName = eStartName.value;

    // Actually enter input with Enter
    if (event.key === "Enter") {
        startNameButton();
    }
}

function mustangRadio() {
    // Set values
    startCarMake = 9;
    startCarModel = 3;
    startCarPI = 545;

    // Show info
    eStartCarInfoDiv.style.display = "block";
    eStartCarInfo.innerHTML = "Buy a "
                            + carList[startCarMake][0] + " "
                            + carList[startCarMake][startCarModel].name
                            + ", add the livery "
                            + "180 091 208"
                            + ", and install a roll cage!";
}

function eclipseRadio() {
    // Set values
    startCarMake = 21;
    startCarModel = 3;
    startCarPI = 545;

    // Show info
    eStartCarInfoDiv.style.display = "block";
    eStartCarInfo.innerHTML = "Buy a "
                            + carList[startCarMake][0] + " "
                            + carList[startCarMake][startCarModel].name
                            + ", add the livery "
                            + "125 302 643"
                            + ", and install a roll cage!";
}

function corradoRadio() {
    // Set values
    startCarMake = 29;
    startCarModel = 1;
    startCarPI = 537;

    // Show info
    eStartCarInfoDiv.style.display = "block";
    eStartCarInfo.innerHTML = "Buy a "
                            + carList[startCarMake][0] + " "
                            + carList[startCarMake][startCarModel].name
                            + ", add the livery "
                            + "167 278 252"
                            + ", and install a roll cage!";
}

function startCarInfoButton() {
    // Hide this field
    eStartCarInfoDiv.style.display = "none";

    // Show next field
    eStartCarNameDiv.style.display = "block";
}

function startCarNameButton() {
    // Check if the input fields are filled out
    if (startCarName === "") {
        return;
    }

    // Show next field
    eStartGameDiv.style.display = "block";
}

function startCarNameInput() {
    startCarName = eStartCarName.value;

    // Actually enter input with Enter
    if (event.key === "Enter") {
        startCarNameButton();
    }
}

function startGameButton() {
    // Check if the input fields are filled out
    if (startName === ""
     || startCarName === ""
     || startCarMake === 0
     || startCarModel === 0) {
        return;
    }

    // Start with default state
    setStateFromString(getStateString(defaultState));

    // Set the start game inputs
    state.date = dateInt();
    state.name = startName;
    state.lvl = 2; // C
    state.xp = classXP[state.lvl] / 10;
    state.cars.push(new Car(startCarName,
                            startCarMake,
                            startCarModel,
                            startCarPI,
                            startCarValue));
    state.cCar = 0;

    // Since defaultState has no cars in garage,
    // options will always be shown, so hide them
    // Do this after pushing the first car! Or it's options will show!
    garageOptions();

    // Show the actual game
    eStart.style.display = "none";
    eGame.style.display = "block";

    updateState();
}

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
    let newCost = carList[newMake][newModel].cost;

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

    // Set to current car if possible
    if (piToClass(newPI) <= state.lvl) {
        state.cCar = state.cars.length - 1;
    }

    // Clear input fields
    // Car selectors will be reset in updateState
    eNewCarName.value = "";
    eNewCarRow.cells[1].innerHTML = "";
    eNewCarRow.cells[2].innerHTML = "";

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
    eNewCarRow.cells[2].innerHTML = "";

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
        eNewCarRow.cells[2].innerHTML = "";
        return;
    }

    // Show PI and cost
    eNewCarRow.cells[1].innerHTML = addClassToPI(carList[make][model].pi);
    eNewCarRow.cells[2].innerHTML = moneyToString(carList[make][model].cost);

    eNewCarRow.cells[2].style.color = "inherit";
    if (carList[make][model].cost > state.money) {
        eNewCarRow.cells[2].style.color = "red";
    }
}

// -----------------------------------------------------------------------
// Settings
// -----------------------------------------------------------------------

function newsOk() {
    state.date = dateInt();
    updateState();
}

function roadRadio() {
    if (state.road) {
        return;
    }

    state.road = true;
    state.dirt = false;
    state.next = [];
    updateState();
}

function dirtRadio() {
    if (state.dirt) {
        return;
    }

    state.dirt = true;
    state.road = false;
    state.next = [];
    updateState();
}

function showCompleted() {
    state.show = eShowCompleted.checked;
    updateState();
}

function saveGameButton() {
    let gameSave = getStateString();
    navigator.clipboard.writeText(gameSave);
}

function loadGameButton() {
    if (eStartLoad.value === ""
     && eGameLoad.value === "") {
        return;
    }

    // Get the non-empty data
    // Should only be one, but if not, start is prio
    let gameData = "";
    if (eStartLoad.value !== "") {
        gameData = eStartLoad.value;
    } else if (eGameLoad.value !== "") {
        gameData = eGameLoad.value;
    }

    setStateFromString(gameData);
    if (eGameLoadError.innerHTML !== "") {
        return;
    }

    // Reset input fields
    eStartLoad.value = "";
    eGameLoad.value = "";

    // Force refresh to clear HTML
    window.location.reload();
}

function loadGameInput() {
    // Actually enter input with Enter
    if (event.key === "Enter") {
        loadGameButton();
    }
}

function resetGameButton() {
    // Set state to default
    localStorage.setItem("state", null);

    // Force refresh to clear HTML
    window.location.reload();
}

// -----------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------

// Create all events
events = [];

events.push(new Event("Class advancement: " + endurances[1],
                      events.length,
                      "Finish on the podium to advance " +
                      "to the next class!",
                      endurances[1],
                      "100 751 232",
                      "road", "prog", "double"));

events.push(new Event("Class advancement: " + endurances[2],
                      events.length,
                      "Finish on the podium to advance " +
                      "to the next class!",
                      endurances[2],
                      "835 192 621",
                      "dirt", "prog", "double"));

events.push(new Event("Group A Touring: " + endurances[1],
                      events.length,
                      "Bring your DTM legend " +
                      "to this ultimate road racing showdown!",
                      endurances[1],
                      "135 179 684",
                      "both", "spec", "double",
                      610, [[3, 2], [9, 4], [19, 2]]));

events.push(new Event("Group A Rally: " + endurances[2],
                      events.length,
                      "Bring your WRC legend " +
                      "to this ultimate rally showdown!",
                      endurances[2],
                      "821 715 025",
                      "both", "spec", "double",
                      670, [[21, 1], [26, 1], [27, 4]]));

events.push(new Event("Showcase: Vintage Hatchbacks",
                      events.length,
                      "A folkrace event on the Horizon Baja Scramble! " +
                      "The Horizon Festival will lend you one of these " +
                      "old beat up, race prepped cars for the event. " +
                      "Prize money will only be given out for podium " +
                      "placements, so don't hesitate to get dirty!",
                      "Horizon Baja Scramble 7L",
                      "893 632 614",
                      "both", "show", "podium",
                      0, [[9, 5], [10, 4], [29, 3]],
                      "vintageHatch"));

events.push(new Event("Showcase: Fairlady vs. 2000GT",
                      events.length,
                      "A showcase race on the Horizon Mexico Circuit! " +
                      "The Horizon Festival will lend you one of these " +
                      "pristine stock cars for the event, " +
                      "try not to damage it too much! " +
                      "Prize money will be given out to all placements " +
                      "for this event.",
                      "Horizon Mexico Circuit 7L",
                      "180 247 097",
                      "both", "show", "all",
                      0, [[22, 4], [27, 7]],
                      "vintageSport"));

events.push(new Event("Showcase: Vintage Explorers",
                      events.length,
                      "Explore the Mexican countryside in your choice " +
                      "of old 4x4 offroaders, " +
                      "courtesy of the Horizon Festival!",
                      endurances[3],
                      "308 395 047",
                      "both", "show", "normal",
                      0, [[9, 6], [12, 1], [15, 1], [27, 6]],
                      "vintageExplorer"));

events.push(new Event("Showcase: 80s Supercars",
                      events.length,
                      "A top secret invitation to test drive these " +
                      "80s dream supercars! " +
                      "Take them out in the middle of the night to " +
                      "avoid any attention. " +
                      "Also, try to avoid damaging these " +
                      "expensive poster cars!",
                      endurances[4],
                      "894 091 504",
                      "both", "show", "double",
                      0, [[8, 3], [14, 2], [24, 3]],
                      "80Super"));

events.push(new Event("Showcase: 90s Supercars",
                      events.length,
                      "Take a lap around the Goliath " +
                      "in your favourite 90s supercar, " +
                      "courtesy of the Horizon Festival! " +
                      "Prize money will be given out to all placements " +
                      "for this event, so be extra careful " +
                      "with these priceless supercars.",
                      endurances[0],
                      "509 774 586",
                      "both", "show", "all",
                      0, [[4, 1], [8, 2], [13, 2], [14, 1], [18, 1]],
                      "90Super"));

let roadStart = events.length;
for (let t = 0; t < roadCircuits.length; t++) {
    events.push(new Event(roadCircuits[t].name + " Circuit",
                          events.length,
                          "Finish in the top half to get prize money!",
                          roadCircuits[t].name + " Circuit",
                          roadCircuits[t].sharecode,
                          "road"));
}

let dirtStart = events.length;
for (let t = 0; t < dirtScrambles.length; t++) {
    events.push(new Event(dirtScrambles[t].name + " Scramble",
                          events.length,
                          "Finish in the top half to get prize money!",
                          dirtScrambles[t].name + " Scramble",
                          dirtScrambles[t].sharecode,
                          "dirt"));
}

// Loan cars... this is a bit dirty but ok for now
let loanCars = new Map();
loanCars.set("vintageHatch", {pi: 490, rep: 10000 / 200});
loanCars.set("vintageSport", {pi: 480, rep: 50000 / 200});
loanCars.set("vintageExplorer", {pi: 450, rep: 20000 / 200});
loanCars.set("80Super", {pi: 780, rep: 120000 / 200});
loanCars.set("90Super", {pi: 810, rep: 200000 / 200});

// Initialize page
// yymmdd of latest news post
let news = 230324;

// Initialize state
let state = {};

// Initialize start game variables
let startName = "";
let startCarName = "";
let startCarMake = 0;
let startCarModel = 0;
let startCarPI = 0;
let startCarValue = 5000;

// Go to start or game
if (JSON.parse(localStorage.getItem("state")) === null) {
    eStart.style.display = "block";
} else {
    eGame.style.display = "block";
    setStateFromString(localStorage.getItem("state"));
}
