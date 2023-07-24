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
        db: 0,
        da: 0,
        w: s.wins,
        r: 0,
        d: 0,
        x: s.next,
        s: 0,
        f: s.completed,
        m: s.money,
        ce: s.cEvent,
        cc: s.cCar,
        c: carArgs,
        a: s.actions
        };

    if (s.discountB) {
        compact.db = 1;
    }
    if (s.discountA) {
        compact.da = 1;
    }
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
    let validVersions = ["0.2.0", "0.2.1", "0.2.2", "0.2.3", "0.2.4",
                         "0.2.5", "0.2.6", "0.3.0", "0.3.1"];
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

    // 0.2.2 -> 0.2.3
    if (!Object.hasOwn(compact, 'db')) {
        compact.db = 0;
        if (compact.l >= 3) {
            compact.db = 1;
        }
    }
    if (!Object.hasOwn(compact, 'da')) {
        compact.da = 0;
        if (compact.l >= 4) {
            compact.da = 1;
        }
    }

    // earlier -> 0.2.5
    if (version === "0.2.0" || version === "0.2.1"
     || version === "0.2.2" || version === "0.2.3"
     || version === "0.2.4") {
        for (let i = 0; i < compact.x.length; i++) {
            compact.x[i] = compact.x[i] + 4;
        }
        for (let i = 0; i < compact.f.length; i++) {
            compact.f[i] = compact.f[i] + 4;
        }
    }

    // earlier -> 0.2.6
    if (version === "0.2.0" || version === "0.2.1"
     || version === "0.2.2" || version === "0.2.3"
     || version === "0.2.4" || version === "0.2.5") {
        for (let i = 0; i < compact.x.length; i++) {
            compact.x[i]++;
        }
        for (let i = 0; i < compact.f.length; i++) {
            compact.f[i]++;
        }
    }

    // earlier -> 0.3.0
    if (version === "0.2.0" || version === "0.2.1"
     || version === "0.2.2" || version === "0.2.3"
     || version === "0.2.4" || version === "0.2.5"
     || version === "0.2.6") {
        for (let iCars = 0; iCars < compact.c.length; iCars++) {
            if (compact.c[iCars].m[0] >= 6) {
                // Cadillac
                compact.c[iCars].m[0]++;
            }
            if (compact.c[iCars].m[0] >= 17) {
                // Lexus
                compact.c[iCars].m[0]++;
            }
            if (compact.c[iCars].m[0] === 18
             && compact.c[iCars].m[1] === 1) {
                // Lotus Exige
                compact.c[iCars].m[1]++;
            }
            if (compact.c[iCars].m[0] === 29
             && compact.c[iCars].m[1] >= 3) {
                // Toyota Celica
                compact.c[iCars].m[1]++;
            }
        }
    }

    // earlier -> 0.3.1
    if (version === "0.2.0" || version === "0.2.1"
     || version === "0.2.2" || version === "0.2.3"
     || version === "0.2.4" || version === "0.2.5"
     || version === "0.2.6" || version === "0.3.0") {
        for (let i = 0; i < compact.x.length; i++) {
            compact.x[i] = compact.x[i] + 10;
        }
        for (let i = 0; i < compact.f.length; i++) {
            if (compact.f[i] >= 8) {
                compact.f[i]++;
            }
            if (compact.f[i] >= 10) {
                compact.f[i] = compact.f[i] + 9;
            }
        }
    }

    state.version = thisVersion;
    state.name = compact.n;
    state.date = compact.t;
    state.xp = compact.xp;
    state.lvl = compact.l;
    state.discountB = (compact.db === 1);
    state.discountA = (compact.da === 1);
    state.wins = compact.w;
    state.road = (compact.r === 1);
    state.dirt = (compact.d === 1);
    state.next = compact.x;
    state.show = (compact.s === 1);
    state.completed = compact.f;
    state.money = compact.m;
    state.cEvent = compact.ce;
    state.cCar = compact.cc;
    state.actions = compact.a;

    // Create new cars with args from state
    state.cars = [];
    let carArgs = compact.c;
    for (let iCar = 0; iCar < carArgs.length; iCar++) {
        state.cars.push(new Car(
            carArgs[iCar].n,
            carArgs[iCar].m[0],
            carArgs[iCar].m[1],
            "load",
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

    let removedCars = [[2, 2], [7, 1], [12, 1], [18, 2], [30, 1]];
    for (let iRemoved = 0; iRemoved < removedCars.length; iRemoved++) {
        for (let iGarage = 0; iGarage < state.cars.length; iGarage++) {
            if (removedCars[iRemoved][0] === state.cars[iGarage].make
             && removedCars[iRemoved][1] === state.cars[iGarage].model) {
                window.confirm("Your car " + state.cars[iGarage].name +
                               " is not included in the 0.3.x roster!" +
                               " In order to keep playing in 0.3.x," +
                               " it will automatically be sold for " +
                               moneyToString(state.cars[iGarage].value) +
                               ".");
                state.cars[iGarage].sell(true);
            }
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

    // Use fakeState to test out things
    fakeState = JSON.parse(JSON.stringify(defaultState));
    for (let iAction = 0; iAction < compact.a.length; iAction++) {
        thisAction = compact.a[iAction];
        switch(compact.a[iAction][0]) {
          case "i":
            let iPlayerName = thisAction[1];
            let iName = thisAction[2];
            let iMake = thisAction[3];
            let iModel = thisAction[4];

            fakeState.lvl = 2;
            fakeState.xp = classXP[fakeState.lvl] / 10;
            fakeState.name = iPlayerName;
            fakeState.cars.push({iCar: fakeState.cars.length,
                                 name: iName,
                                 make: iMake,
                                 model: iModel,
                                 pi: carList[iMake][iModel].rollcage,
                                 value: rustCarValue});
            break;
          case "c":
            let cName = thisAction[1];
            let cMake = thisAction[2];
            let cModel = thisAction[3];
            let cCost = thisAction[4];

            fakeState.money -= cCost;
            fakeState.cars.push({iCar: fakeState.cars.length,
                                 name: cName,
                                 make: cMake,
                                 model: cModel,
                                 pi: carList[cMake][cModel].pi,
                                 value: Math.floor(0.9 * carList[cMake][cModel].cost)});
            break;
          case "u":
            let uCar = thisAction[1];
            let uPI = thisAction[2];
            let uCost = thisAction[3];

            fakeState.cars[uCar].pi = uPI;
            fakeState.cars[uCar].value += Math.floor(0.5 * uCost);
            fakeState.money -= uCost;
            break;
          case "p":
            let pCar = thisAction[1];

            fakeState.cars[pCar].value += 2500;
            fakeState.money -= 5000;
            break;
          case "s":
            let sCar = thisAction[1];
            let sValue = thisAction[2];

            fakeState.money += sValue;
            for (let jCar = (sCar + 1); jCar < fakeState.cars.length; jCar++) {
                fakeState.cars[jCar].iCar--;
            }
            fakeState.cars.splice(sCar, 1);
            break;
          case "r":
            let rEvent = thisAction[1];
            let rCar = thisAction[2];
            let rXP = thisAction[3];
            let rPrize = thisAction[4];
            let rPosition = thisAction[5];
            let rDamage = thisAction[6];

            fakeState.xp += rXP;
            if (fakeState.xp < classXP[0]) {
                fakeState.xp = classXP[0];
            }

            fakeState.wins = Math.floor(fakeState.wins / 10);
            if (rPosition === 1) {
                fakeState.wins += 100;
            }

            fakeState.money += rPrize;

            // depreciate
            if (rEvent < 19 || rEvent > 23) {
                let max = 0.1 * fakeState.cars[rCar].value;
                fakeState.cars[rCar].value -= Math.floor(max
                                       * rDamage / (rDamage + 50));
                fakeState.cars[rCar].value -= Math.floor(0.005 * fakeState.cars[rCar].value);
            }

            if (rEvent < 6 && rPosition !== 0) {
                fakeState.lvl++;
            }

            break;
          case "h":
            let hWin = thisAction[1];
            fakeState.money += hWin * 200;
            break;
          default:
        }
    }

    let allOK = true;
    if (state.name !== fakeState.name) {
        console.log("Name mismatch!");
        console.log("State: " + state.name);
        console.log("Fake: " + fakeState.name);
        allOK = false;
    } else if (state.xp !== fakeState.xp) {
        console.log("XP mismatch!");
        console.log("State: " + state.xp);
        console.log("Fake: " + fakeState.xp);
        allOK = false;
    } else if (state.lvl !== fakeState.lvl) {
        console.log("Level mismatch!");
        console.log("State: " + state.lvl);
        console.log("Fake: " + fakeState.lvl);
        allOK = false;
    } else if (state.wins !== fakeState.wins) {
        console.log("Wins mismatch!");
        console.log("State: " + state.wins);
        console.log("Fake: " + fakeState.wins);
        allOK = false;
    } else if (state.money !== fakeState.money) {
        console.log("Money mismatch!");
        console.log("State: " + state.money);
        console.log("Fake: " + fakeState.money);
        allOK = false;
    } else if (state.cars.length !== fakeState.cars.length) {
        console.log("Cars mismatch!");
        console.log("State: " + state.cars.length);
        console.log("Fake: " + fakeState.cars.length);
        allOK = false;
    }
    for (let iCar = 0; iCar < state.cars.length; iCar++) {
        if (state.cars[iCar].name !== fakeState.cars[iCar].name) {
            console.log("Cars name mismatch!");
            console.log("State: " + state.cars[iCar].name);
            console.log("Fake: " + fakeState.cars[iCar].name);
            allOK = false;
        } else if (state.cars[iCar].make !== fakeState.cars[iCar].make) {
            console.log("Cars make mismatch!");
            console.log("State: " + state.cars[iCar].make);
            console.log("Fake: " + fakeState.cars[iCar].make);
            allOK = false;
        } else if (state.cars[iCar].model !== fakeState.cars[iCar].model) {
            console.log("Cars model mismatch!");
            console.log("State: " + state.cars[iCar].model);
            console.log("Fake: " + fakeState.cars[iCar].model);
            allOK = false;
        } else if (state.cars[iCar].pi !== fakeState.cars[iCar].pi) {
            console.log("Cars pi mismatch!");
            console.log("State: " + state.cars[iCar].pi);
            console.log("Fake: " + fakeState.cars[iCar].pi);
            allOK = false;
        } else if (state.cars[iCar].value !== fakeState.cars[iCar].value) {
            console.log("Cars value mismatch!");
            console.log("State: " + state.cars[iCar].value);
            console.log("Fake: " + fakeState.cars[iCar].value);
            allOK = false;
        }
    }
    if (allOK) {
        console.log("Everything seems to be in order!");
    }

    updateState();
}


