// -----------------------------------------------------------------------
// Start
// -----------------------------------------------------------------------

function startNameButton() {
    // Check if the input fields are filled out
    if (startPlayerName === "") {
        return;
    }

    // Show next field
    eStartCarDiv.style.display = "block";
}

function startNameInput() {
    startPlayerName = eStartName.value;

    // Actually enter input with Enter
    if (event.key === "Enter") {
        startNameButton();
    }
}

function setBaseInfo(sharecode) {
    eStartCarInfoDiv.style.display = "block";
    eStartCarInfo.innerHTML = "Buy a "
                            + carDataM[carDataV[startCarID].make][0] + " "
                            + carDataV[startCarID].name
                            + ", add the livery "
                            + sharecode
                            + " and install a roll cage!";
}

function mustangBaseRadio() {
    startCarID = cars.cobra;
    setBaseInfo("180 091 208");
}

function mustangBaseImg() {
    eStartMustang.checked = true;
    mustangBaseRadio();
}

function eclipseBaseRadio() {
    startCarID = cars.eclipse;
    setBaseInfo("125 302 643");
}

function eclipseBaseImg() {
    eStartEclipse.checked = true;
    eclipseBaseRadio();
}

function corradoBaseRadio() {
    startCarID = cars.corrado;
    setBaseInfo("167 278 252");
}

function corradoBaseImg() {
    eStartCorrado.checked = true;
    corradoBaseRadio();
}

function setAltInfo() {
    eStartCarInfoDiv.style.display = "block";
    eStartCarInfo.innerHTML = "Buy a "
                            + carDataM[carDataV[startCarID].make][0] + " "
                            + carDataV[startCarID].name
                            + ", add a rust bucket livery of your choice "
                            + "and install a roll cage!";
}

function chargerAltRadio() {
    startCarID = cars.charger;
    setAltInfo();
}

function mustangAltRadio() {
    startCarID = cars.cobra;
    setAltInfo();
}

function civicAltRadio() {
    startCarID = cars.ek9;
    setAltInfo();
}

function soarerAltRadio() {
    startCarID = cars.sc300;
    setAltInfo();
}

function miataAltRadio() {
    startCarID = cars.miata;
    setAltInfo();
}

function savannaAltRadio() {
    startCarID = cars.fc;
    setAltInfo();
}

function eclipseAltRadio() {
    startCarID = cars.eclipse;
    setAltInfo();
}

function nissanAltRadio() {
    startCarID = cars.sx240;
    setAltInfo();
}

function firebirdAltRadio() {
    startCarID = cars.firebird;
    setAltInfo();
}

function truenoAltRadio() {
    startCarID = cars.ae86;
    setAltInfo();
}

function corradoAltRadio() {
    startCarID = cars.corrado;
    setAltInfo();
}

function golfAltRadio() {
    startCarID = cars.golf;
    setAltInfo();
}

function volvoAltRadio() {
    startCarID = cars.v242;
    setAltInfo();
}

function starterChangeButton() {
    if (eStartCarsBase.style.display === "flex") {
        eStartCarsAlt.style.display = "block";
        eStartCarsBase.style.display = "none";
        eStartCarsChange.innerText = "Actually, give me one of the three first ones";
    } else {
        eStartCarsAlt.style.display = "none";
        eStartCarsBase.style.display = "flex";
        eStartCarsChange.innerText = "Changed my mind again, give me the full list";
    }
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

function startGameButton(action = []) {
    let playerName = startPlayerName;
    let carName = startCarName;
    let carID = startCarID;

    if (action.length !== 0) {
        playerName = action[1];
        carName = action[2];
        carID = action[3];
    }

    let carMake = carDataV[carID].make;
    let carModel = carDataV[carID].model;

    // Check if the input fields are filled out
    if (playerName === ""
     || carName === ""
     || carMake === 0
     || carModel === 0) {
        return;
    }

    if (action.length === 0) {
        // Start with default state
        state = JSON.parse(JSON.stringify(defaultState));
    }

    // Set the start game inputs
    if (action.length === 0) {
        state.date = dateInt();
    }
    state.name = playerName;
    state.lvl = 2; // C
    state.xp = classXP[state.lvl] / 10;
    state.garage.push(new Car(
        carName,
        carID,
        true
    ));
    state.driving = 0;

    if (action.length === 0) {
        state.actions.push([
            "i",
            playerName,
            carName,
            carID
        ]);

        // Since defaultState has no cars in garage,
        // options will always be shown, so hide them
        // Do this after pushing the first car! Or it's options will show!
        garageOptions();

        // Show the actual game
        eStart.style.display = "none";
        eGame.style.display = "block";

        updateState();
    }
}
