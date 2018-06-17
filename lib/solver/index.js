'use strict';

const LineSolver = require('./line-solver');
const utils = require('./utils');

module.exports = class NonogramSolver {
    constructor(nonogram) {
        this._nonogram = nonogram;
        this._createLines();
    }

    _createLines() {
        const field = this.nonogram.field;
        const top = this.nonogram.top;
        const left = this.nonogram.left;

        this._lines = [];
        for (let i = 0; i < this.nonogram.height; i++) {
            this._lines.push(new LineSolver(field[i], left[i]));
        }
        for (let i = 0; i < this.nonogram.width; i++) {
            this._lines.push(new LineSolver(utils.column(field, i), top[i]));
        }
    }

    solve() {
        let guessed = 1;

        while (!this.isSolved && guessed !== 0) {
            guessed = 0;

            this._lines.forEach((line) => guessed += line.solve());
        }

        return this.isSolved;
    }

    get nonogram() {
        return this._nonogram;
    }

    get isSolved() {
        return this.nonogram.isSolved;
    }
};
