'use strict';

const parser = require('./parser');

module.exports = class Nonogram {
    static fromRawData(data) {
        const {colors, top, left} = parser(data);
        return new Nonogram(colors, top, left);
    }

    constructor(colors, top, left) {
        this._colors = colors;
        this._top = top;
        this._left = left;
    }

    get width() {
        return this._top.length;
    }

    get height() {
        return this._left.length;
    }

    get colors() {
        return this._colors;
    }

    get top() {
        return this._top;
    }

    get left() {
        return this._left;
    }
};
