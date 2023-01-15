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
        this.row.cells[2].innerHTML = formatCredits(this.value);

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
        let repair = 0.25 * mean * damage / 100;
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
                               * damage / (damage + 100));

        // Also depreciate 0.2% for mileage
        this.value -= Math.floor(0.002 * this.value);

        // Update table
        this.row.cells[2].innerHTML = formatCredits(this.value);
    }

    getIn() {
        // Only allow getting into car if PI is equal to or lower than DR
        if (iClassFromPI(this.pi) <= state.iDR) {
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
        if (!window.confirm("Sale price is: " + formatCredits(this.value) + ", are you sure you want to sell?")) {
            return;
        }

        // Add back sale price to credits
        state.credits += this.value;

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
        this.row.cells[2].innerHTML = formatCredits(this.value);

        // Hide the upgrade buttons
        this.toggleUpgradeButtons("none");

        // Show all other buttons and rows again
        eGarageOptions.style.display = "block";
        garageOptions();
    }

    doUpgrade() {
        // Ask for confirmation if car PI is too high after upgrade
        if (iClassFromPI(this.upgradePI) > state.iDR) {
            if (!window.confirm("Class of car after upgrade (" + addClassToPI(this.upgradePI) + ") will be too high to drive, are you sure you want to upgrade?")) {
                return;
            } else if (state.cCar === this.iCar) {
                state.cCar = -1;
            }
        }

        // Update state variables
        this.pi = this.upgradePI;
        this.value += Math.floor(0.5 * this.upgradeCost);
        state.credits -= this.upgradeCost;

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
    constructor(name, iRace, resultFactor = 1) {
        // Add race to map
        raceMap.set(name, this);

        // Race state variables
        this.name = name;
        this.iRace = iRace;
        this.resultFactor = resultFactor;

        // Add and populate new row
        this.row = eRacesTB.insertRow(this.iRace);
        for (let cell = 0; cell < eRacesTH.rows[0].cells.length; cell++) {
            this.row.insertCell();
        }
        this.row.cells[0].innerText = this.name;

        // Create and add the position selector
        this.positionSelect = document.createElement("select");
        this.positionSelect.id = this.name;
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
        this.damageInput.id = this.name;
        this.damageInput.type = "number";
        this.damageInput.style.width = "100%";
        this.damageInput.placeholder = "Damage %";
        this.damageInput.onkeyup = damageInputKeyup;
        this.row.cells[2].appendChild(this.damageInput);

        // Create and add the finish button
        this.finishButton = document.createElement("button");
        this.finishButton.id = this.name;
        this.finishButton.onclick = finishButtonClick;
        this.row.cells[3].appendChild(this.finishButton);

        // Reset position and damage inputs
        this.position = 0;
        this.positionSelect.value = "0";
        this.damage = 0;
        this.damageInput.value = "";

        // Update result variables
        if (state.cCar !== -1) {
            this.setDeltaCredits(state.cars[state.cCar].pi);
            this.setDeltaDR(state.cars[state.cCar].pi);
        } else {
            this.setDeltaCredits(classPI[0]);
            this.setDeltaDR(classPI[0]);
        }
    }

    setDeltaCredits(pi) {
        // Prize depends on class, position and damage
        this.deltaCredits = classPrize[iClassFromPI(pi)]
                          * positionPrize[this.position]
                          * this.resultFactor
                          - state.cars[state.cCar].repairCost(this.damage);

        // Set button text depending on prize
        if (this.deltaCredits > 0) {
            this.finishButton.innerText = "Finish! "
                                        + formatCredits(this.deltaCredits);
        } else if (this.deltaCredits < 0) {
            this.finishButton.innerText = "Finish! "
                                        + formatCredits(this.deltaCredits);
        } else {
            this.finishButton.innerText = "Finish!";
        }
    }

    getBaseDR() {
        // Check for win streak in past 3 races and modify baseDR
        let baseDR = positionDR[this.position];
        if (Math.floor(state.wins / 100) === 1) {
            // Previous race win
            if (this.position === 1
             || this.position === 2
             || this.position === 3) {
                // This race podium
                baseDR--;
            }
        }
        if (this.position === 1) {
            // This race win
            if (Math.floor((state.wins % 100) / 10) === 1) {
                // Second previous race win
                baseDR--;
            }
            if ((state.wins % 10) === 1) {
                // Third previous race win
                baseDR--;
            }
        }
        return baseDR;
    }

    getSubClass(pi) {
        // Should this be a normal function?
        // Does not use any members, might be useful elsewhere

        let iClass = iClassFromPI(pi);

        // subClass will be [6, 10] depending on how far in the class pi is
        let subClass = Math.ceil((((pi - 1) % 100) + 1) / 20) + 5;
        if (iClass === 1) {
            // D class needs special treatment
            subClass = Math.ceil(pi / 100) + 5;
        } else if (iClass === 7) {
            // Always min out subClass for X
            subClass = 1;
        }
        return subClass;
    }

    setDeltaDR(pi) {
        let iClass = iClassFromPI(pi);
        if (iClass === 0) {
            // Set to 0 for invalid class
            this.deltaDR = 0;
            return;
        }

        // Calculate the deltaDR, messy but should be cool

        // PI of the car
        let subClass = this.getSubClass(pi);
        let classFactor = subClass * Math.pow(10, iClass - 1);

        // Damage from the race
        let baseDR = this.getBaseDR();
        let prizeFactor = classPrize[iClass]
                        * (positionPrize[2]
                         + positionPrize[this.position]);
        let repairCost = state.cars[state.cCar].repairCost(this.damage);
        let damageRatio = Math.max(0, Math.min(1, repairCost
                                                / prizeFactor));
        let damageFactor = baseDR - (1 + baseDR / 2) * damageRatio / 2;

        // the magic 5 is just game speed balancing
        // adjust/refine if necessary
        this.deltaDR = Math.ceil(5 * classFactor * damageFactor);
    }

    setPosition(value) {
        this.position = toInt(value);

        this.setDeltaCredits(state.cars[state.cCar].pi);
        this.setDeltaDR(state.cars[state.cCar].pi);
    }

    setDamage(value) {
        this.damage = toPositiveInt(value);

        this.setDeltaCredits(state.cars[state.cCar].pi);
        this.setDeltaDR(state.cars[state.cCar].pi);
    }

    finish() {
        // Update DR
        state.dr += this.deltaDR;

        // This check should probably be done in a setter
        // Later, when state is a class?
        if (state.dr < classDR[0]) {
            state.dr = classDR[0];
        }

        // Update win streak history
        // This should probably also be state.updateWins(position);
        state.wins = Math.floor(state.wins / 10);
        if (this.position === 1) {
            state.wins += 100;
        }

        // Update credits
        state.credits += this.deltaCredits;

        // Remove interactive elements and display results
        // Before depreciate of car, or will be wrong on reload
        this.row.cells[1].removeChild(this.positionSelect);
        this.row.cells[1].innerText = positionName[this.position];
        this.row.cells[2].removeChild(this.damageInput);
        this.row.cells[2].innerText = formatCredits(state.cars[state.cCar].repairCost(this.damage));
        this.row.cells[3].removeChild(this.finishButton);
        this.row.cells[3].innerText = formatCredits(this.deltaCredits);

        // Depreciate value of car
        state.cars[state.cCar].depreciate(this.damage);

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
                raceName = "Random track",
                resultFactor = 1,
                iClass = 0,
                cars = 0) {
        // Add to event map for the enter button
        // Add to race map for race buttons to go via here (finish!)
        eventMap.set(name, this);
        raceMap.set(name, this);

        // Event state variables
        this.name = name;
        this.iEvent = iEvent;
        this.infoString = infoString;
        this.raceName = raceName;
        this.resultFactor = resultFactor;
        this.iClass = JSON.parse(JSON.stringify(iClass));
        if (!(this.iClass instanceof Array)) {
            this.iClass = [this.iClass];
        }
        this.cars = JSON.parse(JSON.stringify(cars));
        this.race = null;
        this.entered = false;
        this.finished = false;

        // Magic bools
        this.levelUpEvent = false;

        // Add and populate new row in event table
        this.row = eEventsTB.insertRow(this.iEvent);
        for (let cell = 0; cell < eEventsTH.rows[0].cells.length; cell++) {
            this.row.insertCell();
        }
        this.row.cells[0].innerText = this.name;

        // Create and add the info button
        this.infoButton = document.createElement("button");
        this.infoButton.id = this.name;
        this.infoButton.onclick = infoButtonClick;
        this.infoButton.innerText = "Info";
        this.row.cells[1].appendChild(this.infoButton);

        // Create and add the enter event button
        this.enterButton = document.createElement("button");
        this.enterButton.id = this.name;
        this.enterButton.onclick = enterEventButtonClick;
        this.enterButton.innerText = "Enter";
        this.enterButton.className = "margin";
        this.row.cells[1].appendChild(this.enterButton);

        // Create the return from event button
        // It will be added to the races table later
        this.returnButton = document.createElement("button");
        this.returnButton.id = this.name;
        this.returnButton.onclick = returnEventButtonClick;
        this.returnButton.innerText = "Retire";
    }

    showOrHide() {
        // Hide everything if not in a car
        if (state.cCar === -1) {
            this.row.style.display = "none";
            return;
        }

        // Check if any car in garage is included in model list for event
        // Also check if current car is included in model list for event
        let cCar = state.cars[state.cCar];
        let garageOk = false;
        let carModelOk = false;
        if (this.cars === 0) {
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

        // Check if current car is of the correct class
        let playerOk = false;
        let carClassOk = false;
        if (this.iClass[0] === 0) {
            playerOk = true;
            carClassOk = true;
        } else {
            for (let c = 0; c < this.iClass.length; c++) {
                if (this.iClass[c] <= state.iDR) {
                    playerOk = true;
                }
                if (this.iClass[c] === iClassFromPI(cCar.pi)) {
                    carClassOk = true;
                }
            }
        }

        // Check if ready for level up (if level up event)
        let levelUpOk = !this.levelUpEvent;
        if (iClassFromDR(state.dr) > state.iDR) {
            levelUpOk = true;
        }

        if (playerOk
         && garageOk
         && levelUpOk) {
            // Show row, but only enter button if car ok
            this.row.style.display = "table-row";
            if (carModelOk && carClassOk) {
                this.enterButton.style.display = "inline";
            } else {
                this.enterButton.style.display = "none";
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

            // Add class
            if (this.iClass[0] !== 0) {
                allInfo += "\n\n";
                allInfo += "Class: " + classLetter[this.iClass[0]];
                for (let c = 1; c < this.iClass.length; c++) {
                    allInfo += ", " + classLetter[this.iClass[c]];
                }
            }

            // Add eligible car models
            if (this.cars !== 0 && this.cars.length !== 0) {
                allInfo += "\n\nEligible cars:\n";
                for (let iModel = 0; iModel < this.cars.length; iModel++) {
                    allInfo += carList[this.cars[iModel][0]][0] + " ";
                    allInfo += carList[this.cars[iModel][0]][this.cars[iModel][1]].name + " (";
                    allInfo += carList[this.cars[iModel][0]][this.cars[iModel][1]].year + ")\n";
                }
            }

            // Replace name with info
            this.row.cells[0].innerText = allInfo;

            // Repurpose info button to close info
            this.infoButton.innerText = "Hide info";

            // Hide enter button
            this.enterButton.style.display = "none";
        } else {
            // Switch back to name
            this.row.cells[0].innerText = this.name;

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
        eEventsT.style.display = "none";

        // Show the races table
        eRacesT.style.display = "table";

        // Create the event race
        this.race = new Race(this.raceName,
                             0,
                             this.resultFactor);

        // Makes buttons go through this class
        this.race.positionSelect.id = this.name;
        this.race.damageInput.id = this.name;
        this.race.finishButton.id = this.name;

        // Add the return from event button to a final row
        this.returnRow = eRacesTB.insertRow(1);
        for (let cell = 0; cell < eRacesTH.rows[0].cells.length; cell++) {
            this.returnRow.insertCell();
        }
        this.returnRow.cells[3].appendChild(this.returnButton);

        // Show first race
        this.entered = true;
        this.race.row.style.display = "table-row";
    }

    returnToEvents() {
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
        this.returnButton.innerText = "Retire";
        this.returnRow.cells[3].removeChild(this.returnButton);
        this.returnRow.style.display = "none";

        // Hide the races table
        eRacesT.style.display = "none";

        // Show all the events again
        eEventsT.style.display = "table";
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

            // Add progress to state
            state.cEvent.p.push([
                this.race.position,
                repairCost,
                this.race.deltaCredits]);
            updateState();

            // Check if podium before finishing
            let podium = this.race.position < 4;

            this.race.finish();
            this.finished = true;

            this.returnButton.innerText = "Return";

            // Only level up with a podium
            if (this.levelUpEvent && podium) {
                state.iDR++;
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
        this.race.row.cells[2].innerText = formatCredits(aProgress[1]);
        this.race.row.cells[3].removeChild(this.race.finishButton);
                                                      // deltaCredits
        this.race.row.cells[3].innerText = formatCredits(aProgress[2]);

        // Show next race or return button
        this.entered = true;
        this.finished = true;
        this.returnButton.innerText = "Return";
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
        dr: s.dr,
        idr: s.iDR,
        w: s.wins,
        m: s.credits,
        ce: s.cEvent,
        cc: s.cCar,
        c: carArgs};

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

    // Update driver rating progress bar
    eStateCredits.innerText = formatCredits(state.credits);
    if (iClassFromDR(state.dr) > state.iDR) {
        eStateDR.innerHTML = "DR: " + classLetter[state.iDR] + "+";
        eStateDRProgress.style.width = "100%";
    } else {
        eStateDR.innerHTML = "DR: " + classLetter[state.iDR];
        eStateDRProgress.style.width = drToPercent(state.dr);
    }
    eStateDRProgress.style.backgroundColor = classColor[state.iDR];

    // Only show events that should be
    for (let iEvent = 0; iEvent < events.length; iEvent++) {
        events[iEvent].showOrHide();
    }

    // Update track list
    shortTracks = [];
    shortTracks = shortTracks.concat(roadCircuits);
    shortTracks = shortTracks.concat(dirtScrambles);

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
    clearNewCarModel();

    // Store state in localStorage
    localStorage.setItem("state", getStateString());
}

function setStateFromString(inputString) {
    let parsed = JSON.parse(inputString);
    let validVersions = ["0.1.0", "0.2.0"];

    // Make sure parsed string is an array,
    // where array[0] is the version
    // and array[1] is the actual state
    if (parsed.length !== 2) {
        console.log("Input (" + inputString + ") is not a valid state!")
        return;
    }
    let version = parsed[0];
    if (!validVersions.includes(version)) {
        console.log("Input version " + version + " is not valid!")
        return;
    }

    // inputString and version is valid, set state
    let compact = parsed[1];
    state.version = thisVersion;
    state.name = compact.n;
    state.dr = compact.dr;
    state.iDR = compact.idr;
    state.wins = compact.w;
    state.credits = compact.m;
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

function startNameInput() {
    newName = eStartName.value;
}

function startCarInput() {
    startCarName = eStartCarName.value;
}

function startCarMakeSelect() {
    startCarMake = toPositiveInt(eStartCarMake.value);

    // Clear model selector
    while (eStartCarModel.options.length > 0) {
        eStartCarModel.remove(0);
    }

    // Add "Choose model"
    let modelOption = document.createElement("option");
    modelOption.value = 0;
    modelOption.text = carList[0][1];
    eStartCarModel.appendChild(modelOption);

    // Set "Choose model"
    eStartCarModel.value = 0;
    startCarModelSelect();

    // "Choose manufacturer"
    if (startCarMake === 0) {
        return;
    }

    // Add all buyable car models
    for (let iModel = 1; iModel < carList[startCarMake].length; iModel++) {
        if (carList[startCarMake][iModel].cost <= defaultState.credits) {
            let option = document.createElement("option");
            option.value = iModel;
            option.text = carList[startCarMake][iModel].name + " ("
                        + carList[startCarMake][iModel].year + ", "
                        + addClassToPI(carList[startCarMake][iModel].pi) + ", "
                        + formatCredits(carList[startCarMake][iModel].cost) + ")";
            eStartCarModel.appendChild(option);
        }
    }

    // If only one model, set it as chosen
    if (eStartCarModel.options.length === 2) {
        eStartCarModel.value = eStartCarModel.options[1].value;
        startCarModelSelect();
    }
}

function startCarModelSelect() {
    startCarModel = toPositiveInt(eStartCarModel.value);
}

function startGameButton() {
    // Check if the input fields are filled out
    if (newName === ""
     || startCarName === ""
     || startCarMake === 0
     || startCarModel === 0) {
        return;
    }

    // Start with default state
    setStateFromString(getStateString(defaultState));

    // Since defaultState has no cars in garage,
    // options will always be shown, so hide them
    garageOptions();

    // Set the start game inputs
    state.name = newName;
    state.credits -= carList[startCarMake][startCarModel].cost;
    let newClass = iClassFromPI(carList[startCarMake][startCarModel].pi);
    state.dr = Math.pow(10, newClass + 1);
    state.iDR = newClass;
    state.cars.push(new Car(startCarName,
                            startCarMake,
                            startCarModel));
    state.cCar = 0;

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

    // Ask for confirmation if new car PI is too high
    if (iClassFromPI(newPI) > state.iDR) {
        if (!window.confirm("Class of new car (" + addClassToPI(newPI) + ") is too high to drive, are you sure you want to purchase?")) {
            return;
        }
    }

    // Save input to state
    state.cars.push(new Car(newName,
                            newMake,
                            newModel));
    state.credits -= newCost;

    // Set to current car if possible
    if (iClassFromPI(newPI) <= state.iDR) {
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

    // Add all buyable car models
    for (let iModel = 1; iModel < carList[make].length; iModel++) {
        if (state.iDR >= iClassFromPI(carList[make][iModel].pi)
         && state.credits >= carList[make][iModel].cost) {
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
    eNewCarRow.cells[2].innerHTML = formatCredits(carList[make][model].cost);
}

// -----------------------------------------------------------------------
// Settings
// -----------------------------------------------------------------------

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
/*events.push(new Event("Class Advancement Championship",
                      events.length,
                      "\n\nChampionship on five of the base tracks. "
                    + "Choose any list of cars. "
                    + "Get a podium position on the total points "
                    + "to advance to the next class!",
                      firstChamp,
                      [1, 1, 1, 1, 1, 2]));*/

events.push(new Event("Road Class Advancement",
                      events.length,
                      "\n\nNOT championship on five sequential road tracks. "
                    + "Choose any list of cars. "
                    + "Get a podium position on the total points "
                    + "to advance to the next class!",
                      endurances[1],
                      2));

events.push(new Event("Dirt Class Advancement",
                      events.length,
                      "\n\nNOT championship on five sequential dirt tracks. "
                    + "Choose any list of cars. "
                    + "Get a podium position on the total points "
                    + "to advance to the next class!",
                      endurances[2],
                      2));

// This will make finishing the championships increase iDR
//eventMap.get("Class Advancement Championship").levelUpEvent = true;
eventMap.get("Road Class Advancement").levelUpEvent = true;
eventMap.get("Dirt Class Advancement").levelUpEvent = true;

events.push(new Event("Open Race", events.length,
                      "Single race on random track! Any car allowed!",
                      "A race"));

/*let info = "Single race on random track!";

events.push(new Event("Vintage Roadsters", events.length, info,
                      "random", 1,
                      [1, 2, 3], // 131 - 694
                      vintageRoadsters));

events.push(new Event("Vintage Race Cars", events.length, info,
                      "random", 1,
                      [2, 3, 4], // 514 - 714
                      vintageRaceCars));

events.push(new Event("Vintage Econoboxes", events.length, info,
                      "random", 1,
                      1, // 100
                      vintageEconoboxes));

events.push(new Event("Vintage Utility", events.length, info,
                      "random", 1,
                      [1, 2], // 100 - 544
                      vintageUtility));

events.push(new Event("60s Sports Cars", events.length, info,
                      "random", 1,
                      1, // 482 - 487
                      sportsCars60s));

events.push(new Event("70s Sports Cars", events.length, info,
                      "random", 1,
                      [1, 2], // 315 - 531
                      sportsCars70s));

events.push(new Event("70s Explorers", events.length, info,
                      "random", 1,
                      1, // 100 - 431
                      explorers70s));

events.push(new Event("70s Hatchbacks", events.length, info,
                      "random", 1,
                      1, // 281 - 428
                      hatchbacks70s));

events.push(new Event("80s Wedge Showdown", events.length, info,
                      "random", 1,
                      [1, 2, 3], // 464 - 629
                      wedges80s));

events.push(new Event("80s Sport Sedans", events.length, info,
                      "random", 1,
                      [2, 3], // 537 - 583
                      sportSedans80s));

events.push(new Event("80s Sport Liftbacks", events.length, info,
                      "random", 1,
                      [1, 2, 3], // 480 - 651
                      sportLiftbacks80s));

events.push(new Event("Early 90s Hatchbacks", events.length, info,
                      "random", 1,
                      [1, 2], // 429 - 511
                      hatchbacksEarly90s));

events.push(new Event("Late 90s Hatchbacks", events.length, info,
                      "random", 1,
                      2, // 510 - 553
                      hatchbacksLate90s));

events.push(new Event("Group A Rally Cars", events.length, info,
                      "random", 1,
                      [2, 3], // 514 - 659
                      rallyGroupA));

events.push(new Event("90s Japanese Sports Cars", events.length, info,
                      "random", 1,
                      [2, 3], // 590 - 691
                      topJapanese90s));

events.push(new Event("90s Supercars", events.length, info,
                      "random", 1,
                      [4, 5], // 753 - 869
                      supercars90s));

events.push(new Event("90s Race Cars", events.length, info,
                      "random", 1,
                      [4, 5, 6], // 794 - 976
                      topRaceCars90s));

events.push(new Event("00s World Rally Cars", events.length, info,
                      "random", 1,
                      [2, 3], // 593 - 669
                      worldRallyCars00s));

events.push(new Event("10s World Rally Cars", events.length, info,
                      "random", 1,
                      [2, 3], // 598 - 607
                      worldRallyCars10s));

events.push(new Event("The Fast and the Furious", events.length, info,
                      "random", 1,
                      [2, 3], // 543 - 646
                      fastAndFurious));

events.push(new Event("Gran Turismo Starter Cars", events.length, info,
                      "random", 1,
                      [1, 2], // 445 - 558
                      granTurismoStarters));

events.push(new Event("Lakeside Diner Horizon", events.length, info,
                      "random", 1,
                      [2, 3], // 533 - 664
                      lakesideDiner));

events.push(new Event("Civic vs. Golf Showdown", events.length, info,
                      "random", 1,
                      [1, 2, 3, 4], // 368 - 727
                      hondaCivics.concat(volkswagenGolfs)));

events.push(new Event("Police Car Showdown", events.length, info,
                      "random", 1,
                      [1, 2, 3, 4, 5, 6], // 103 - 913
                      policeCars));*/

// Initialize state
let state = {};
let shortTracks = [];

// Set default new game values
let newName = "";
let startCarName = "";
let startCarMake = 0;
let startCarModel = 0;

// Add "Choose manufacturer" and "Choose model" to starting car selector
let startBaseMakeOption = document.createElement("option");
startBaseMakeOption.value = 0;
startBaseMakeOption.text = carList[0][0];
eStartCarMake.appendChild(startBaseMakeOption);
let startBaseModelOption = document.createElement("option");
startBaseModelOption.value = 0;
startBaseModelOption.text = carList[0][1];
eStartCarModel.appendChild(startBaseModelOption);

// Add all initially buyable makes to starting car selector
for (let iMake = 1; iMake < carList.length; iMake++) {
    let buyable = false;
    for (let iModel = 1; iModel < carList[iMake].length; iModel++) {
        if (carList[iMake][iModel].cost <= defaultState.credits) {
            buyable = true;
        }
    }
    if (buyable) {
        let makeOption = document.createElement("option");
        makeOption.value = iMake;
        makeOption.text = carList[iMake][0];
        eStartCarMake.appendChild(makeOption);
    }
}

// Go to start or game
if (JSON.parse(localStorage.getItem("state")) === null) {
    eStart.style.display = "block";
} else {
    eGame.style.display = "block";
    setStateFromString(localStorage.getItem("state"));
}
