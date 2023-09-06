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
        } else if (state.driving !== -1) {
            this.setDeltaMoney(state.cars[state.driving].pi);
            this.setDeltaXP(state.cars[state.driving].pi);
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
            } else if (piToClass(pi) === 3) {
                return positionPrize.all.B[position]
            } else if (piToClass(pi) === 4 || piToClass(pi) === 5) {
                return positionPrize.all.A[position]
            }
        }

        // Something's wrong
        return 0;
    }

    setDeltaMoney(pi) {
        let repairCost = state.cars[state.driving].repairCost(this.damage);
        if (this.loanCar !== "none") {
            repairCost = Math.floor(this.damage * loanCars.get(this.loanCar).rep);
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
        let baseXP = positionXP[this.position];

        // Check for win streak in past 3 races and modify baseXP
        // Add two dummy non-wins
        // This lets us do the same calculations for the first races
        let wins = [false, false];
        for (let iAction = 0; iAction < state.actions.length; iAction++) {
            if (state.actions[iAction][0] === "r") {
                wins.push(state.actions[iAction][5] === 1);
            }
        }

        // Check for previous race win
        if (wins[wins.length - 1]) {

            // Check for podium in this race
            if (this.position === 1
             || this.position === 2
             || this.position === 3) {
                baseXP--;
            }
        }

        // Check for second previous race win
        if (wins[wins.length - 2]) {

            // Check for winning this race
            if (this.position === 1) {
                baseXP--;
            }
        }

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
        let repairCost = state.cars[state.driving].repairCost(this.damage);
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
        } else if (state.driving !== -1) {
            this.setDeltaMoney(state.cars[state.driving].pi);
            this.setDeltaXP(state.cars[state.driving].pi);
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
        } else if (state.driving !== -1) {
            this.setDeltaMoney(state.cars[state.driving].pi);
            this.setDeltaXP(state.cars[state.driving].pi);
        } else {
            this.setDeltaMoney(classPI[0]);
            this.setDeltaXP(classPI[0]);
        }
    }

    finalize() {
        // Remove interactive elements and display results
        // Before depreciate of car, or will be wrong on reload
        this.row.cells[1].removeChild(this.positionSelect);
        this.row.cells[1].innerText = positionName[this.position];
        this.row.cells[2].removeChild(this.damageInput);
        if (this.loanCar !== "none") {
            this.row.cells[2].innerText = moneyToString(Math.floor(this.damage * loanCars.get(this.loanCar).rep));
        } else {
            this.row.cells[2].innerText = moneyToString(state.cars[state.driving].repairCost(this.damage));
        }
        this.row.cells[3].removeChild(this.finishButton);
        this.row.cells[3].innerText = moneyToString(this.deltaMoney);
        this.row.cells[3].style.color = "inherit";
        if (this.deltaMoney < 0) {
            this.row.cells[3].style.color = "red";
        }
    }

    finish(action) {
        let driving = state.driving;
        let dxp = this.deltaXP;
        let dmoney = this.deltaMoney;
        let damage = this.damage;
        if (action.length !== 0) {
            driving = action[2];
            dxp = action[3];
            dmoney = action[4];
            damage = action[6];
        }

        // Update XP
        state.xp += dxp;

        // This check should probably be done in a setter
        // Later, when state is a class?
        if (state.xp < classXP[0]) {
            state.xp = classXP[0];
        }

        // Update money
        state.money += dmoney;

        if (action.length === 0) {
            this.finalize();
        }

        // Depreciate value of car
        if (this.loanCar === "none") {
            state.cars[driving].depreciate(damage);
        }

        if (action.length === 0) {
            updateState();
        }
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
        this.repeatable = true;
        if (this.eventType === "show" || this.eventType === "spec"
         || this.eventType === "endu") {
            this.repeatable = false;
        }

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

        if (!this.repeatable) {
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
        if (state.driving === -1) {
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
                        if (iCar === state.driving) {
                            carModelOk = true;
                        }
                    }
                }
            }
        }

        // For special events, let garage be ok
        if (this.eventType === "spec" && state.lvl >= piToClass(this.pi)) {
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
            if (state.cars[state.driving].pi >= this.pi) {
                carClassOk = true;
            }
        }

        if (this.eventType === "endu") {
            playerClassOk = state.xp > 5000;
        }

        if (this.loanCar === "vintageHatch") {
            playerClassOk = state.xp > 3000;
        } else if (this.loanCar === "vintageExplorer") {
            playerClassOk = state.xp > 7000;
        } else if (this.loanCar === "vintageSport") {
            playerClassOk = state.xp > 30000;
        } else if (this.loanCar === "80Super") {
            playerClassOk = state.xp > 70000;
        } else if (this.loanCar === "90Super") {
            playerClassOk = state.xp > 300000;
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
        let progRowOk = (this.eventType !== "prog");
        let progEnterOk = (this.eventType !== "prog");
        if (piToClass(this.pi) === state.lvl) {
            progRowOk = true;
            if (xpToClass(state.xp) > state.lvl) {
                progEnterOk = true;
            }
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
         && progRowOk) {
            if (state.completed.includes(this.iEvent)) {
                if (state.show) {
                    eCompletedT.style.display = "block";
                }
                this.completedRow.style.display = "table-row";
                this.row.style.display = "none";
                this.completedRow.cells[1].appendChild(this.infoButton);
            } else {

                if (this.eventType !== "norm") {
                    eSpecsT.style.display = "block";
                }

                // Show row, but only enter button if car ok
                this.row.style.display = "table-row";
                if (!this.repeatable) {
                    this.completedRow.style.display = "none";
                }
                if ((carModelOk && carClassOk && specOk && progEnterOk)
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

    getInfo(eligible = true) {
        let allInfo = this.infoString;

        allInfo += "\n\n";
        if (this.eventType === "show") {
            allInfo += "Event track: " + this.raceName + "\n";
        }

        if (this.eventType === "prog"
         && xpToClass(state.xp) <= state.lvl) {
            allInfo += "Progress to the top of your class to unlock!";
        } else if (this.eventType === "prog"
         && state.driving !== -1
         && state.cars[state.driving].pi < this.pi) {
            allInfo += "Build your car to the top of your class to unlock!";
        } else if (state.driving !== -1) {
            allInfo += "Event sharecode: " + this.sharecode;
        }

        if (this.eventType === "spec") {
            // Add PI restriction
            allInfo += "\n";
            allInfo += "Minimum PI: ";
            allInfo += classLetter[piToClass(this.pi)] + this.pi;

            if (eligible) {
                // Add eligible car models
                allInfo += "\n\nEligible cars:\n";
                for (let iModel = 0; iModel < this.cars.length; iModel++) {
                    let makeList = carList[this.cars[iModel][0]];
                    let modelObj = makeList[this.cars[iModel][1]];
                    allInfo += makeList[0] + " ";
                    allInfo += modelObj.name + " (";
                    allInfo += modelObj.year + ")\n";
                }
            }
        }

        if (this.eventType === "show") {

            // Add eligible car models
            allInfo += "\n\nBorrow one of:\n";
            for (let iModel = 0; iModel < this.cars.length; iModel++) {
                let makeList = carList[this.cars[iModel][0]];
                let modelObj = makeList[this.cars[iModel][1]];
                allInfo += makeList[0] + " ";
                allInfo += modelObj.name + " ";
                allInfo += modelObj.year + " (";
                allInfo += modelObj.sharecode + ")\n";
            }
        }
        return allInfo;
    }

    showInfo() {
        if (this.infoButton.innerText === "Info") {
            // Keep event name
            let allInfo = this.name + "\n\n";
            allInfo += this.getInfo();

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

    enter(loading = false) {
        // Add progress to state
        if (state.progress === null && !loading) {
            // If not null, we're just loading progress
            state.progress = {
                ie: this.iEvent,
                p: 0,
                d: 0,
                f: 0};
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

        // Add the return from event button to another row
        this.returnRow = eRacesTB.insertRow(1);
        this.returnRow.insertCell();
        this.returnRow.cells[0].colSpan = 3;
        this.returnRow.cells[0].innerText = this.getInfo(false);
        this.returnRow.insertCell();
        this.returnRow.cells[1].appendChild(this.returnButton);

        // Show first race
        this.entered = true;
        this.race.row.style.display = "table-row";
    }

    returnToEvents(loading = false) {

        // Do some things only if finished
        if (this.finished) {

            // Get the three next tracks
            // Before updating state
            if (this.iEvent >= iRoadsStart
             && this.iEvent < iRoadsEnd) {

                // Road
                state.next = JSON.parse(JSON.stringify(
                             roadCircuits[this.iEvent - iRoadsStart].next));

                // Stolen from stackoverflow
                state.next = state.next.map(a => a + iRoadsStart);
                next3Random();
            } else if (this.iEvent >= iDirtsStart) {

                // Dirt
                state.next = JSON.parse(JSON.stringify(
                             dirtScrambles[this.iEvent - iDirtsStart].next));

                // Stolen from stackoverflow
                state.next = state.next.map(a => a + iDirtsStart);
                next3Random();
            } else {
                state.next = [];
            }

            // Mark non-repeatable events as finished
            if (!this.repeatable) {
                state.completed.push(this.iEvent);
                this.completedRow.cells[1].appendChild(this.infoButton);
            }
        }

        // Clear progress from state
        if (!loading) {
            state.progress = null;
            updateState();
        }

        // Hide event races
        this.entered = false;
        this.finished = false;
        this.race.row.style.display = "none";

        // Remove event races
        this.race = null;

        // Remove return button and row
        this.returnRow.cells[1].removeChild(this.returnButton);
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
        state.progress.p = value;
        updateState();
    }

    setDamage(value) {
        // Needed?
        if (this.entered && !this.finished) {
            this.race.setDamage(value);
        }
        state.progress.d = value;
        updateState();
    }

    finish(action = []) {
        // Sanity check
        if (!this.entered || this.finished) {
            return;
        }

        if (action.length === 0) {
            // Add progress to state
            state.progress.f = 1;
            updateState();
        }

        let pos = this.race.position;
        if (action.length !== 0) {
            pos = action[5];
        }

        // Check for podium and DNF before finishing
        let podium = ((pos >= 1)
                   && (pos <= 3));
        let dnf = pos === 0;

        if (action.length === 0) {
            setRustBucket();
            state.actions.push(["r",
                                this.iEvent,
                                state.driving,
                                this.race.deltaXP,
                                this.race.deltaMoney,
                                this.race.position,
                                this.race.damage,
                                state.rust]);
        } else {
            state.rust = action[7];
        }

        this.race.finish(action);
        this.finished = true;

        // Only level up if not DNF
        if (this.eventType === "prog" && !dnf) {
            state.lvl++;
            if (podium && state.lvl === 3) {
                state.discountB = true;
            }
            if (podium && state.lvl === 4) {
                state.discountA = true;
            }
            if (action.length === 0) {
                updateState();
            }
        }
    }

    load() {
        this.enter();

        this.setPosition(state.progress.p);
        this.race.positionSelect.value = this.race.position.toString();

        this.setDamage(state.progress.d);
        if (this.race.damage !== 0) {
            this.race.damageInput.value = this.race.damage.toString();
        }

        if (state.progress.f === 1) {
            this.race.finalize();
            this.finished = true;
        }
    }

}
