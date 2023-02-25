// -----------------------------------------------------------------------
// Helper functions
// -----------------------------------------------------------------------

function toInt(string) {
    if (Number.isInteger(string)) {
        return string;
    }
    let integer = parseInt(string);
    if (Number.isNaN(integer)) {
        return 0;
    }
    return integer;
}

function toPositiveInt(string) {
    return Math.max(0, toInt(string));
}

function toIntPI(string) {
    let integer = toInt(string);
    if (integer < classPI[0]) {
        return classPI[0];
    } else if (integer > classPI[7]) {
        return classPI[7];
    }
    return integer;
}

function piToClass(pi) {
    if (pi < classPI[0] || pi > classPI[7]) {
        return 0;
    } else if (pi <= classPI[1]) {
        return 1;
    } else if (pi <= classPI[2]) {
        return 2;
    } else if (pi <= classPI[3]) {
        return 3;
    } else if (pi <= classPI[4]) {
        return 4;
    } else if (pi <= classPI[5]) {
        return 5;
    } else if (pi <= classPI[6]) {
        return 6;
    } else {
        return 7;
    }
}

function addClassToPI(pi) {
    if (pi < classPI[0] || pi > classPI[7]) {
        return classLetter[0];
    }
    return classLetter[piToClass(pi)] + pi;
}

function xpToClass(xp) {
    if (xp < classXP[0]) {
        return 0;
    } else if (xp < classXP[1]) {
        return 1;
    } else if (xp < classXP[2]) {
        return 2;
    } else if (xp < classXP[3]) {
        return 3;
    } else if (xp < classXP[4]) {
        return 4;
    } else if (xp < classXP[5]) {
        return 5;
    } else if (xp < classXP[6]) {
        return 6;
    } else {
        return 7;
    }
}

function xpToPercent(xp) {
    if (xp < classXP[0]) {
        return 0 + "%";
    }
    return Math.floor(100 * xp / classXP[state.lvl]) + "%";
}

function xpToColor(xp) {
    return classColor[xpToClass(xp)];
}

function formatCredits(credits) {
    if (credits >= 0) {
        return "€" + credits.toLocaleString('fr');
    } else {
        credits *= -1;
        return "-€" + credits.toLocaleString('fr');
    }
}

function hasBuyableModel(make) {
    let iMake = toPositiveInt(make);
    if (iMake === 0 || iMake >= carList.length) {
        return;
    }

    let foundModel = false;
    for (let iModel = 1; iModel < carList[iMake].length; iModel++) {
        if (state.lvl >= piToClass(carList[iMake][iModel].pi)
         && state.credits >= carList[iMake][iModel].cost
         && carList[iMake][iModel].buyable) {
            foundModel = true;
        }
    }
    return foundModel;
}
