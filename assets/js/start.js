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
                            + carList[startCarMake][0] + " "
                            + carList[startCarMake][startCarModel].name
                            + ", add the livery "
                            + sharecode
                            + " and install a roll cage!";
}

function mustangBaseRadio() {
    startCarMake = 10;
    startCarModel = 3;

    setBaseInfo("180 091 208");
}

function mustangBaseImg() {
    eStartMustang.checked = true;
    mustangBaseRadio();
}

function eclipseBaseRadio() {
    startCarMake = 21;
    startCarModel = 3;

    setBaseInfo("125 302 643");
}

function eclipseBaseImg() {
    eStartEclipse.checked = true;
    eclipseBaseRadio();
}

function corradoBaseRadio() {
    startCarMake = 28;
    startCarModel = 1;

    setBaseInfo("167 278 252");
}

function corradoBaseImg() {
    eStartCorrado.checked = true;
    corradoBaseRadio();
}

function setAltInfo() {
    eStartCarInfoDiv.style.display = "block";
    eStartCarInfo.innerHTML = "Buy a "
                            + carList[startCarMake][0] + " "
                            + carList[startCarMake][startCarModel].name
                            + ", add a rust bucket livery of your choice "
                            + "and install a roll cage!";
}

function chargerAltRadio() {
    startCarMake = 8;
    startCarModel = 2;

    setAltInfo();
}

function mustangAltRadio() {
    startCarMake = 10;
    startCarModel = 3;

    setAltInfo();
}

function civicAltRadio() {
    startCarMake = 11;
    startCarModel = 2;

    setAltInfo();
}

function soarerAltRadio() {
    startCarMake = 15;
    startCarModel = 2;

    setAltInfo();
}

function miataAltRadio() {
    startCarMake = 17;
    startCarModel = 2;

    setAltInfo();
}

function savannaAltRadio() {
    startCarMake = 17;
    startCarModel = 3;

    setAltInfo();
}

function eclipseAltRadio() {
    startCarMake = 21;
    startCarModel = 3;

    setAltInfo();
}

function nissanAltRadio() {
    startCarMake = 22;
    startCarModel = 3;

    setAltInfo();
}

function firebirdAltRadio() {
    startCarMake = 23;
    startCarModel = 1;

    setAltInfo();
}

function truenoAltRadio() {
    startCarMake = 27;
    startCarModel = 6;

    setAltInfo();
}

function corradoAltRadio() {
    startCarMake = 28;
    startCarModel = 1;

    setAltInfo();
}

function golfAltRadio() {
    startCarMake = 28;
    startCarModel = 2;

    setAltInfo();
}

function volvoAltRadio() {
    startCarMake = 29;
    startCarModel = 1;

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

function startGameButton() {
    // Check if the input fields are filled out
    if (startPlayerName === ""
     || startCarName === ""
     || startCarMake === 0
     || startCarModel === 0) {
        return;
    }

    // Start with default state
    setStateFromString(getStateString(defaultState));

    // Set the start game inputs
    state.date = dateInt();
    state.name = startPlayerName;
    state.lvl = 2; // C
    state.xp = classXP[state.lvl] / 10;
    state.cars.push(new Car(startCarName,
                            startCarMake,
                            startCarModel,
                            "rust"));
    state.cCar = 0;

    state.actions.push(["i",
                        startPlayerName,
                        startCarName,
                        startCarMake,
                        startCarModel]);

    // Since defaultState has no cars in garage,
    // options will always be shown, so hide them
    // Do this after pushing the first car! Or it's options will show!
    garageOptions();

    // Show the actual game
    eStart.style.display = "none";
    eGame.style.display = "block";

    updateState();
}
