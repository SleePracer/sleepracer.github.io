// -----------------------------------------------------------------------
// State functions
// -----------------------------------------------------------------------

function getStateString(s = state) {
    // Store state as compact as possible
    let compact = {
        t: s.date,
        r: s.road ? 1 : 0,
        d: s.dirt ? 1 : 0,
        s: s.show ? 1 : 0,
        n: s.next,
        e: s.progress,
        c: s.driving,
        a: s.actions
    };

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
    modelOption.text = carDataM[0][1];
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

function setRustBucket() {
    let rustRolls = [];
    let uniqueRolls = [];
    for (let iAction = 0; iAction < state.actions.length; iAction++) {
        if (state.actions[iAction][0] === "r") {
            let rust = state.actions[iAction][7];
            rustRolls.push(rust);
            if (rust !== 0 && !uniqueRolls.includes(rust)) {
                uniqueRolls.push(rust);
            }
        }
    }

    for (let iCar = 0; iCar < state.garage.length; iCar++) {
        if (!uniqueRolls.includes(state.garage[iCar].id)) {
            uniqueRolls.push(state.garage[iCar].id);
        }
    }

    if (rustRolls.length < 2) {
        state.rust = 0;
        return;
    }

    if (uniqueRolls.length === (rustBuckets[state.lvl].length - 1)) {
        state.rust = 0;
        return
    }

    let lastRoll = rustRolls[rustRolls.length - 1];
    let duration = 1;
    for (let iRoll = rustRolls.length - 2; iRoll >= 0; iRoll--) {
        if (rustRolls[iRoll] !== lastRoll) {
            break;
        }
        duration++;
    }

    if (lastRoll === 0) {
        let threshold = 0.2 * duration;
        if (Math.random() < threshold) {
            let roll = 1 + Math.floor(Math.random() * (rustBuckets[state.lvl].length - 1));
            while (uniqueRolls.includes(rustBuckets[state.lvl][roll])) {
                roll = 1 + Math.floor(Math.random() * (rustBuckets[state.lvl].length - 1));
            }
            state.rust = rustBuckets[state.lvl][roll];
        }
    } else if (duration >= 3) {
        state.rust = 0;
    }
}

function getAchievements() {
    // Clear the list
    while (eAchievementsList.children.length > 0) {
        eAchievementsList.removeChild(eAchievementsList.children[0]);
    }

    // Calculate some sums and averages
    let sumPosition = 0;
    let sumDamage = 0;
    let nRaces = 0;
    let nWins = 0;
    let nPodiums = 0;
    let nTwelves = 0;
    let nBottoms = 0;
    for (let iAction = 0; iAction < state.actions.length; iAction++) {
        if(state.actions[iAction][0] === "r") {
            sumPosition += state.actions[iAction][5];
            if (state.actions[iAction][5] === 0) {
                sumPosition += 12;
            }
            if (state.actions[iAction][5] === 1
             || state.actions[iAction][5] === 2
             || state.actions[iAction][5] === 3) {
                nPodiums++;
                if (state.actions[iAction][5] === 1) {
                    nWins++;
                }
            }
            if (state.actions[iAction][5] === 10
             || state.actions[iAction][5] === 11
             || state.actions[iAction][5] === 12) {
                nBottoms++;
                if (state.actions[iAction][5] === 12) {
                    nTwelves++;
                }
            }

            sumDamage += state.actions[iAction][6];
            nRaces++;
        }
    }
    let avgPosition = Math.round(10 * sumPosition / nRaces) / 10;
    let avgDamage = Math.round(10 * sumDamage / nRaces) / 10;
    let ratTops = (nPodiums + nWins) / (2 * nRaces);
    let ratBottoms = (nBottoms + nTwelves) / (2 * nRaces);

    // Calculate some standard deviations
    let sumDevPosition = 0;
    let sumDevDamage = 0;
    for (let iAction = 0; iAction < state.actions.length; iAction++) {
        if(state.actions[iAction][0] === "r") {
            sumDevPosition += Math.pow(state.actions[iAction][5] - avgPosition, 2);
            sumDevDamage += Math.pow(state.actions[iAction][6] - avgDamage, 2);
        }
    }
    let devPosition = Math.round(10 * Math.sqrt(sumDevPosition / nRaces)) / 10;
    let devDamage = Math.round(10 * Math.sqrt(sumDevDamage / nRaces)) / 10;

    // Check dirt and road
    let onlyRoad = true;
    let onlyDirt = true;
    for (let iAction = 0; iAction < state.actions.length; iAction++) {
        if(state.actions[iAction][0] === "r") {
            let iEvent = state.actions[iAction][1];
            if (roadSpecials.includes(iEvent)) {
                onlyDirt = false;
            }
            if (dirtSpecials.includes(iEvent)) {
                onlyRoad = false;
            }
            if (iEvent >= iRoadsStart && iEvent < iRoadsEnd) {
                onlyDirt = false;
            }
            if (iEvent >= iDirtsStart && iEvent < iDirtsEnd) {
                onlyRoad = false;
            }
        }
    }

    // Check Special Events
    let allSpecials = true;
    for (iSpecials = iSpecialsStart; iSpecials < iSpecialsEnd; iSpecials++) {
        if (!state.completed.includes(iSpecials)) {
            allSpecials = false;
        }
    }

    // Check Showcases
    let allShowcases = true;
    for (iShowcase = iShowcasesStart; iShowcase < iShowcasesEnd; iShowcase++) {
        if (!state.completed.includes(iShowcase)) {
            allShowcases = false;
        }
    }

    // Check cars
    let carsBought = 0;
    let rePaints = 0;
    let boughtFerrari = false;
    let sumSpecials = 0;
    for (let iAction = 0; iAction < state.actions.length; iAction++) {
        if(state.actions[iAction][0] === "i") {
            sumSpecials += carDataV[state.actions[iAction][3]].special;
        } else if(state.actions[iAction][0] === "c") {
            carsBought++;
            if (state.actions[iAction][2] === cars.f355) {
                boughtFerrari = true;
            }
            sumSpecials += carDataV[state.actions[iAction][2]].special;
        }
        if(state.actions[iAction][0] === "p") {
            rePaints++;
        }
    }

    // Add the achievement bullets

    let participation = document.createElement("li");
    participation.innerHTML = "<b>Participation:</b>";
    participation.innerHTML += " You completed the game! Here's your honorary golden participation star! Well done!";
    eAchievementsList.appendChild(participation);

    let nothingElse = true;

    if (allSpecials && allShowcases) {
        let completionist = document.createElement("li");
        completionist.innerHTML = "<b>Completionist:</b>";
        completionist.innerHTML += " You also completed all of the special events! This requires some serious planning and dedication, very well done!";
        eAchievementsList.appendChild(completionist);
        nothingElse = false;
    } else if (allSpecials) {
        let specials = document.createElement("li");
        specials.innerHTML = "<b>Event Planner:</b>";
        specials.innerHTML += " You also completed all of the special events! Save for the showcases... But even then, a very impressive feat, very well done!";
        eAchievementsList.appendChild(specials);
        nothingElse = false;
    } else if (allShowcases) {
        let showcases = document.createElement("li");
        showcases.innerHTML = "<b>Showcase Sampler:</b>";
        showcases.innerHTML += " You also completed all the showcases! Variety truly is the spice of life!";
        eAchievementsList.appendChild(showcases);
        nothingElse = false;
    } else if (state.completed.length === 0) {
        let grindset = document.createElement("li");
        grindset.innerHTML = "<b>Grindset:</b>";
        grindset.innerHTML += " You also managed to completely avoid any special events! Impressive in its own right, you gotta respect the grind!";
        eAchievementsList.appendChild(grindset);
        nothingElse = false;
    }

    if (carsBought === 0 && rePaints === 0) {
        let rust = document.createElement("li");
        rust.innerHTML = "<b>Rust Lover:</b>";
        rust.innerHTML += " And you did it all in your trusty old rust bucket! Maybe it's time to give it the race livery it deserves, and join Albannt for some A class road!";
        eAchievementsList.appendChild(rust);
        nothingElse = false;
    }

    if (onlyRoad) {
        let road = document.createElement("li");
        road.innerHTML = "<b>Asphalt Lover:</b>";
        road.innerHTML += " You only raced road events! Wouldn't want to get your car dirty, right?";
        eAchievementsList.appendChild(road);
        nothingElse = false;
    } else if (onlyDirt) {
        let dirt = document.createElement("li");
        dirt.innerHTML = "<b>Dirt Lover:</b>";
        dirt.innerHTML += " You only raced dirt events! What's the point if your car doesn't get dirty?";
        eAchievementsList.appendChild(dirt);
        nothingElse = false;
    }

    if (boughtFerrari) {
        let ferrari = document.createElement("li");
        ferrari.innerHTML = "<b>Ferrari Owners Club:</b>";
        ferrari.innerHTML += " The most expensive car on the roster, and it's all yours! Aah, the taste of success!";
        eAchievementsList.appendChild(ferrari);
        nothingElse = false;
    }

    if (avgDamage < 5) {
        let clean = document.createElement("li");
        clean.innerHTML = "<b>Squeaky Clean:</b>";
        clean.innerHTML += " With an average of " + avgDamage + "% damage in races, you made sure to avoid contact and took good care of your cars!";
        eAchievementsList.appendChild(clean);
        nothingElse = false;
    }

    if (avgDamage > 15) {
        let wild = document.createElement("li");
        wild.innerHTML = "<b>Wild and Crazy:</b>";
        wild.innerHTML += " With an average of " + avgDamage + "% damage in races, you completely disregarded the safety of yourself and your fellow drivers! Please take more care in future playthroughs!";
        eAchievementsList.appendChild(wild);
        nothingElse = false;
    }

    if (ratTops > 0.8) {
        let sandbag = document.createElement("li");
        sandbag.innerHTML = "<b>Sandbagger:</b>";
        sandbag.innerHTML += " You have won a staggering " + nWins + " races! Which means you're either Mars Verstappen or your opponents were too easy... Consider increasing the difficulty for your next playthrough!";
        eAchievementsList.appendChild(sandbag);
        nothingElse = false;
    } else if (ratBottoms > 0.1 && ratTops > 0.5) {
        let posdev = document.createElement("li");
        posdev.innerHTML = "<b>All or Nothing:</b>";
        posdev.innerHTML += " You have simultaneously gotten " + nPodiums + " podiums and a fair few bottom placements, it's either win or crash and burn for you! Those darn checkpoints...";
        eAchievementsList.appendChild(posdev);
        nothingElse = false;
    } if (ratTops < 0.2) {
        let masochist = document.createElement("li");
        masochist.innerHTML = "<b>Masochist:</b>";
        masochist.innerHTML += " You have consistently avoided the podium in races, when the difficulty was all yours to adjust. Impressive! Consider lowering the difficulty for your next playthrough!";
        eAchievementsList.appendChild(masochist);
        nothingElse = false;
    }

    if (nothingElse) {
        let unremark = document.createElement("li");
        unremark.innerHTML = "<b>Remarkably Unremarkable:</b>";
        unremark.innerHTML += " You have managed to completely avoid all the other achievements in this playthrough. Impressive in its own right!";
        eAchievementsList.appendChild(unremark);
    }
}

function updateState() {
    // Update player name
    if (state.name === "") {
        eStateName.innerText = "No name!";
    } else {
        eStateName.innerText = state.name;
    }

    // Update car name
    if (state.garage.length > 0) {
        if (state.driving !== -1) {
            eStateCar.innerText = state.garage[state.driving].name + " "
                                + addClassToPI(state.garage[state.driving].pi);
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

    // Show achievements if at game end
    if (state.lvl > 4) {
        eAchievements.style.display = "block";
        getAchievements();
    } else {
        eAchievements.style.display = "none";
    }

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
            state.next = state.next.map(a => a + iRoadsStart);
            eEvents.style.display = "block";
        } else if (state.dirt) {
            state.next = Array.from(Array(dirtScrambles.length).keys());
            state.next = state.next.map(a => a + iDirtsStart);
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
    if (state.garage.length === 0) {
        garageOptions(true);
    }

    // Clear make selector
    while (eNewCarMake.options.length > 0) {
        eNewCarMake.remove(0);
    }

    // Add "Choose manufacturer"
    let baseMakeOption = document.createElement("option");
    baseMakeOption.value = 0;
    baseMakeOption.text = carDataM[0][0];
    eNewCarMake.appendChild(baseMakeOption);

    // Add all buyable makes
    for (let iMake = 1; iMake < carDataM.length; iMake++) {
        if (hasBuyableModel(iMake)) {
            let makeOption = document.createElement("option");
            makeOption.value = iMake;
            makeOption.text = carDataM[iMake][0];
            eNewCarMake.appendChild(makeOption);
        }
    }

    // Only "Choose model" shown
    // Models will be added when manufacturer is chosen
    clearNewCarModel();

    if (state.rust === 0) {
        eNewRustRow.style.display = "none";
    } else {
        eNewRustRow.style.display = "table-row";
        eNewRustCar.innerHTML = "<span style=color:brown>Rusty</span> "
                              + carDataM[carDataV[state.rust].make][0] + " "
                              + carDataV[state.rust].name + " ("
                              + carDataV[state.rust].year + ")";

        eNewRustSale.innerHTML = "<span style=color:red>Rust bucket for sale!</span>";
    }

    // Store state in localStorage
    localStorage.setItem("state", getStateString());
}

function setStateFromString(inputString) {
    let parsed = JSON.parse(inputString);
    let validVersions = ["1.0.0"];
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
        eAchievements.style.display = "none";
        eEvents.style.display = "none";
        eGarage.style.display = "none";
        eGameSettings.style.display = "none";
        return;
    }

    // inputString and version is valid, set state
    let compact = parsed[1];

    // Start with default state
    state = JSON.parse(JSON.stringify(defaultState));

    // Do all the actions
    for (let iAction = 0; iAction < compact.a.length; iAction++) {
        let thisAction = compact.a[iAction];
        switch(thisAction[0]) {
          case "i":
            startGameButton(thisAction);
            break;
          case "c":
            addCar(thisAction);
            break;
          case "b":
            addRust(thisAction);
            break;
          case "u":
            state.garage[thisAction[1]].doUpgrade(thisAction);
            break;
          case "p":
            state.garage[thisAction[1]].doPaint(true);
            break;
          case "s":
            state.garage[thisAction[1]].sell(thisAction);
            break;
          case "r":
            state.garage[thisAction[2]].getIn(true);
            events[thisAction[1]].enter(true);
            events[thisAction[1]].finish(thisAction);
            events[thisAction[1]].returnToEvents(true);
            break;
          case "h":
            if (thisAction[1] === 1) {
                headToHead.won(true);
            } else {
                headToHead.lost(true);
            }
            break;
          default:
        }
    }

    // Set state variables
    state.version = thisVersion;
    state.date = compact.t;
    state.road = (compact.r === 1);
    state.dirt = (compact.d === 1);
    state.show = (compact.s === 1);
    state.next = compact.n;
    state.progress = compact.e;
    state.actions = compact.a;

    // Ignore driving if nonsensical
    if (compact.c >= 0 && compact.c < state.garage.length) {
        state.driving = compact.c;
    }

    // Enter event if in progress
    if (compact.e !== null) {
        events[compact.e.ie].load();
    }

// TODO: this shouldnt be needed but it is, fix it:
garageOptions();
garageOptions();

    updateState();

    // Force refresh to clear HTML
//    window.location.reload();
    // TODO: This is a forever loop, why?
}
