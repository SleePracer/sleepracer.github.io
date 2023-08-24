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

function newEvents() {
    let nEvents = roadCircuits.length;
    let eventStart = iRoadsStart;
    if (state.dirt === true) {
        nEvents = dirtScrambles.length;
        eventStart = iDirtsStart;
    }

    // Get the current events that we don't want again
    let current = JSON.parse(JSON.stringify(state.next));

    // Make a next with all tracks
    state.next = Array.from(Array(nEvents).keys());
    state.next = state.next.map(a => a + eventStart);

    // Remove the current events
    for (let i = 0; i < current.length; i++) {
        for (let j = 0; j < state.next.length; j++) {
            if (current[i] === state.next[j]) {
                state.next.splice(j, 1);
                break;
            }
        }
    }

    next3Random();
    updateState();
}

function showCompleted() {
    state.show = eShowCompleted.checked;
    updateState();
}

function saveGameButton() {
    navigator.clipboard.writeText(getStateString());
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
