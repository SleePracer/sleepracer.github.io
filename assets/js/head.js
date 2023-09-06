// -----------------------------------------------------------------------
// HeadToHead class
// -----------------------------------------------------------------------

class HeadToHead {
    constructor(name, wager) {

        // Add to event map for the buttons
        eventMap.set(name + " E", this);

        // Parameters
        this.name = name;
        this.wager = wager;

        // Add and populate new row in event table
        let nCells = eEventsTH.rows[0].cells.length;
        let iRow = eEventsTB.rows.length;
        this.row = eEventsTB.insertRow(iRow);
        for (let cell = 0; cell < nCells; cell++) {
            this.row.insertCell();
        }
        this.row.cells[0].innerText = this.name;

        // Create and add the won button
        this.wonButton = document.createElement("button");
        this.wonButton.id = this.name + " E";
        this.wonButton.onclick = wonButtonClick;
        this.wonButton.innerText = "Won";
        this.row.cells[1].appendChild(this.wonButton);

        // Create and add the lost button
        this.lostButton = document.createElement("button");
        this.lostButton.id = this.name + " E";
        this.lostButton.onclick = lostButtonClick;
        this.lostButton.innerText = "Lost";
        this.lostButton.className = "margin";
        this.row.cells[1].appendChild(this.lostButton);
    }

    won(loading = false) {
        state.money += this.wager;
        if (!loading) {
            state.actions.push(["h", 1]);
            updateState();
        }
    }

    lost(loading = false) {
        state.money -= this.wager;
        if (!loading) {
            state.actions.push(["h", 0]);
            updateState();
        }
    }

}
