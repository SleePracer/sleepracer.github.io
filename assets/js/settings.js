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
