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
            // D class should just be like C with subClass 5
            // but classDR[D] is classDR[C] / 10
            subClass = 50;
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

        // PI of the car is a straight factor, more is better
        let subClass = this.getSubClass(pi);
        let classFactor = subClass * classDR[iClass] / 1000;

        // These are only used for damageRatio
        let prizeFactor = classPrize[iClass]
                        * (positionPrize[2]
                         + positionPrize[this.position]);
        let repairCost = state.cars[state.cCar].repairCost(this.damage);

        // damageRatio is in [0, 1]
        let damageRatio = Math.max(0, Math.min(1,
                          repairCost / prizeFactor));

        // baseDR is in [-1, 4] depending on placement
        let baseDR = this.getBaseDR();

        // Damage from the race can remove a fair bit of DR
        // Can only be negative if baseDR is <= 0
        let damageFactor = baseDR - (1 + baseDR / 2) * damageRatio / 2;

        // the magic 4 is just game speed balancing
        // adjust/refine if necessary
        this.deltaDR = Math.ceil(4 * classFactor * damageFactor);
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
                raceName,
                sharecode,
                category,
                type,
                resultFactor = 1,
                pi = 0,
                cars = []) {

        // Add to event map for the enter button
        // Add to race map for race buttons to go via here (finish!)
        eventMap.set(name, this);
        raceMap.set(name, this);

        // Parameters
        this.name = name;
        this.iEvent = iEvent;
        this.infoString = infoString;
        this.raceName = raceName;
        this.sharecode = sharecode;
        this.category = category;
        this.type = type;
        this.resultFactor = resultFactor;
        this.pi = pi;
        this.cars = JSON.parse(JSON.stringify(cars));

        // Other state variables
        this.race = null;
        this.entered = false;
        this.finished = false;

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

        // Check if current car is of the correct class
        let playerClassOk = false;
        let carClassOk = false;
        if (this.pi === 0) {
            playerClassOk = true;
            carClassOk = true;
        } else {
            if (state.iDR >= iClassFromPI(this.pi)) {
                playerClassOk = true;
            }
            if (state.cars[state.cCar].pi >= this.pi) {
                carClassOk = true;
            }
        }

        // Check if one of the next races
        let nextEventOk = (this.type !== "norm");
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
        let levelUpOk = (this.type !== "prog");
        if (iClassFromDR(state.dr) > state.iDR) {
            levelUpOk = true;
        }

        // Check if special event ok (has it been completed?)
        let specOk = (this.type !== "spec")
        if (!specOk && !state.finished.includes(this.iEvent)) {
            specOk = true;
        }

        // Check if showcase ok (has it been completed?)
        let showOk = ((this.type === "show")
                    && !state.finished.includes(this.iEvent));

        if ((garageOk || (state.iDR > iClassFromPI(this.pi)))
         && playerClassOk
         && nextEventOk
         && categoryOk
         && levelUpOk) {

            // Show row, but only enter button if car ok
            this.row.style.display = "table-row";
            if ((carModelOk && carClassOk && specOk)
              || showOk) {
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

            // Add sharecode
            allInfo += "\n\n";
            allInfo += "Event sharecode: " + this.sharecode;

            if (this.type === "spec") {
                // Add PI restriction
                allInfo += "\n";
                allInfo += "Minimum PI: ";
                allInfo += classLetter[iClassFromPI(this.pi)] + this.pi;

                // Add eligible car models
                allInfo += "\n\nEligible cars:\n";
                for (let iModel = 0; iModel < this.cars.length; iModel++) {
                    let makeList = carList[this.cars[iModel][0]];
                    let modelObj = makeList[this.cars[iModel][1]];
                    allInfo += makeList[0] + " ";
                    allInfo += modelObj.name + "\n";
                }
            }

            if (this.type === "show") {

                // Add eligible car models
                allInfo += "\n\nEligible cars:\n";
                for (let iModel = 0; iModel < this.cars.length; iModel++) {
                    let makeList = carList[this.cars[iModel][0]];
                    let modelObj = makeList[this.cars[iModel][1]];
                    allInfo += makeList[0] + " ";
                    allInfo += modelObj.name + " (";
                    allInfo += modelObj.sharecode + ")\n";
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
        this.returnRow.cells[0].innerHTML = "Sharecode: " + this.sharecode;
        this.returnRow.cells[3].appendChild(this.returnButton);

        // Show first race
        this.entered = true;
        this.race.row.style.display = "table-row";
    }

    returnToEvents() {
        // Get the three next tracks
        // Before updating state
        if (this.iEvent >= roadStart) {
            // Normal event
            if (this.iEvent < dirtStart) {
                // Road
                state.next = JSON.parse(JSON.stringify(
                             roadCircuits[this.iEvent - roadStart].next));

                // Stolen from stackoverflow
                state.next = state.next.map(a => a + roadStart);
            } else {
                // Dirt
                state.next = JSON.parse(JSON.stringify(
                             dirtScrambles[this.iEvent - dirtStart].next));

                // Stolen from stackoverflow
                state.next = state.next.map(a => a + dirtStart);
            }
            next3Random();
        } else {
            state.next = [];
        }

        // Mark non-repeatable events as finished
        if (this.type === "show" || this.type === "spec") {
            state.finished.push(this.iEvent);
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
            let podium = (this.race.position > 0
                       && this.race.position < 4);

            this.race.finish();
            this.finished = true;

            this.returnButton.innerText = "Return";

            // Only level up with a podium
            if (this.type === "prog" && podium) {
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
        r: 0,
        d: 0,
        x: s.next,
        f: s.finished,
        m: s.credits,
        ce: s.cEvent,
        cc: s.cCar,
        c: carArgs};

    if (s.road) {
        compact.r = 1;
    }
    if (s.dirt) {
        compact.d = 1;
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

    // Check the boxes
    eRoadRadio.checked = state.road;
    eDirtRadio.checked = state.dirt;

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
    let validVersions = ["0.1.0", "0.2.0"];
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
    state.version = thisVersion;
    state.name = compact.n;
    state.dr = compact.dr;
    state.iDR = compact.idr;
    state.wins = compact.w;
    state.road = (compact.r === 1);
    state.dirt = (compact.d === 1);
    state.next = compact.x;
    state.finished = compact.f;
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
    state.name = startName;
    state.iDR = 2; // C
    state.dr = classDR[state.iDR] / 10;
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
         && state.credits >= carList[make][iModel].cost
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
    eNewCarRow.cells[2].innerHTML = formatCredits(carList[make][model].cost);
}

// -----------------------------------------------------------------------
// Settings
// -----------------------------------------------------------------------

function roadRadio() {
    state.road = true;
    state.dirt = false;
    state.next = [];
    updateState();
}

function dirtRadio() {
    state.dirt = true;
    state.road = false;
    state.next = [];
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

events.push(new Event("Level up: " + endurances[1],
                      events.length,
                      "Finish on the podium to advance " +
                      "to the next class!",
                      endurances[1],
                      "000 000 000",
                      "road", "prog", 2));

events.push(new Event("Level up: " + endurances[2],
                      events.length,
                      "Finish on the podium to advance " +
                      "to the next class!",
                      endurances[2],
                      "000 000 000",
                      "dirt", "prog", 2));

events.push(new Event("Group A Touring",
                      events.length,
                      "Bring your favourite DTM legend " +
                      "to this ultimate showdown!" +
                      endurances[1],
                      "000 000 000",
                      "road", "spec", 1,
                      610, [[3, 2], [9, 4], [19, 2]]));

events.push(new Event("Group A Rally",
                      events.length,
                      "Bring your favourite WRC legend " +
                      "to this ultimate showdown!" +
                      endurances[2],
                      "000 000 000",
                      "dirt", "spec", 1,
                      670, [[21, 1], [26, 1], [27, 4]]));

events.push(new Event("Showcase: 60s Sports Cars",
                      events.length,
                      "It's Toyota vs. Nissan " +
                      "hehe",
                      "Horizon Mexico Circuit",
                      "000 000 000",
                      "both", "show", 1,
                      600, [[22, 4], [27, 7]]));

events.push(new Event("Showcase: Hatchback Folkrace",
                      events.length,
                      "Race-prepped vintage hatchbacks" +
                      "on a dirt arena race?",
                      "Horizon Baja Scramble",
                      "000 000 000",
                      "both", "show", 1,
                      600, [[9, 5], [10, 4], [29, 3]]));

events.push(new Event("Showcase: 80s Supercars",
                      events.length,
                      "",
                      endurances[4],
                      "000 000 000",
                      "both", "show", 1,
                      700, [[8, 3], [14, 2], [24, 3]]));

events.push(new Event("Showcase: 70s Explorers",
                      events.length,
                      "",
                      endurances[3],
                      "000 000 000",
                      "both", "show", 1,
                      700, [[9, 6], [12, 1], [15, 1], [27, 6]]));

events.push(new Event("Showcase: 90s Supercars",
                      events.length,
                      "Take a double lap around the Goliath " +
                      "in your favourite 90s supercar!",
                      endurances[0],
                      "000 000 000",
                      "both", "show", 1,
                      800, [[4, 1], [8, 2], [13, 2], [14, 1], [18, 1]]));

let roadStart = events.length;
for (let t = 0; t < roadCircuits.length; t++) {
    events.push(new Event(roadCircuits[t].name + " Circuit",
                          events.length,
                          "Open road race!",
                          roadCircuits[t].name + " Circuit",
                          roadCircuits[t].sharecode,
                          "road", "norm"));
}

let dirtStart = events.length;
for (let t = 0; t < dirtScrambles.length; t++) {
    events.push(new Event(dirtScrambles[t].name + " Scramble",
                          events.length,
                          "Open dirt race!",
                          dirtScrambles[t].name + " Scramble",
                          dirtScrambles[t].sharecode,
                          "dirt", "norm"));
}

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
