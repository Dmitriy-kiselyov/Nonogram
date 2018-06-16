'use strict';

const parser = require('./parser');
const State = require('./state');

module.exports = class Nonogram {
    static fromRawData(data) {
        const {colors, top, left} = parser(data);
        return new Nonogram(colors, top, left);
    }

    constructor(colors, top, left) {
        this._colors = colors;
        this._top = top;
        this._left = left;

        this._field = new Array(this.height);
        for (let i = 0; i < this.height; i++) {
            this._field[i] = Array.from(Array(this.width), () => new State(-1));
        }
    }

    get isGuessed() {
        for (let line of this.field) {
            for (let state of line) {
                if (!state.isFilled || state.isEmpty) {
                    return false;
                }
            }
        }
        return true;
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

    get field() {
        return this._field;
    }

    toString() {
        let out = `${this.width} x ${this.height}\n`;
        out += this.colors.join(' ') + '\n';

        this.field.forEach((line) => {
            line.forEach((state) => out += state.toString());
            out += '\n';
        });

        return out;
    }
};
