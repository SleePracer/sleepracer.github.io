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

function dateInt() {
    let time = new Date();
    let y = time.getFullYear() - 2000;
    let m = time.getMonth() + 1;
    let d = time.getDate();

    let date = y.toString();
    if (m <= 9) {
        date += '0' + m.toString();
    } else {
        date += m.toString();
    }
    if (d <= 9) {
        date += '0' + d.toString();
    } else {
        date += d.toString();
    }

    return toInt(date);
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

function moneyToString(money) {
    if (money >= 0) {
        return "€" + money.toLocaleString('fr');
    } else {
        money *= -1;
        return "-€" + money.toLocaleString('fr');
    }
}

function hasBuyableModel(make) {
    let iMake = toPositiveInt(make);
    if (iMake === 0 || iMake >= carDataM.length) {
        return;
    }

    let foundModel = false;
    for (let iModel = 1; iModel < carDataM[iMake].length; iModel++) {
        if (state.lvl >= piToClass(carDataM[iMake][iModel].pi)) {
            foundModel = true;
        }
    }
    return foundModel;
}

function getRustBucketClass(id) {
    let ID = toPositiveInt(id);
    if (rustBucketsD.includes(ID)) {
        return 1;
    } else if (rustBucketsC.includes(ID)) {
        return 2;
    } else if (rustBucketsB.includes(ID)) {
        return 3;
    } else if (rustBucketsA.includes(ID)) {
        return 4;
    } else {
        return 0;
    }
}
