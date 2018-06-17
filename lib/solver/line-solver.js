'use strict';

const utils = require('./utils');

module.exports = class LineSolver {
    constructor(line, colors) {
        this._line = line;
        this._colors = colors;
    }

    solve() {
        const save = utils.matrix([this.line.length + 1, this.colors.length + 1, 2], 0);

        if (!this._tryFill(0, 0, true, save)) {
            throw new Error('Невозможно подобрать комбинацию');
        }

        const guessed = this._countGuessed();
        this._save();
        return this._countGuessed() - guessed;
    }

    _tryFill(pos, colorPos, canPutNext, save) {
        //проверка
        if (pos <= this.line.length && save[pos][colorPos][canPutNext ? 1 : 0] !== 0) {
            return save[pos][colorPos][canPutNext ? 1 : 0] === 1;
        }

        //базовый случай
        if (pos > this.line.length) { //вышли за пределы строки
            return false;
        }
        if (colorPos === this.colors.length) { //блоки закончилась
            if (this._canPutColor(pos, this.line.length - 1, 0)) { //если оставшиеся клетки могут быть пустыми
                this._remember(pos, this.line.length - 1, 0); //запомним их
                save[pos][colorPos][canPutNext ? 1 : 0] = 1;
                return true; //такая расстановка блоков возможна
            } else {
                save[pos][colorPos][canPutNext ? 1 : 0] = 2;
                return false; //расстановка невозможна
            }
        }

        //очередной шаг рекурсии
        let canPut = false;

        //если текущая ячейка может быть пустой
        if (this._canPutColor(pos, pos, 0) && this._tryFill(pos + 1, colorPos, true, save)) {
            canPut = true; //такая расстановка блоков возможна
            this._remember(pos, pos, 0); //текущая ячейка может быть пустой
        }

        //если начиная с текущей ячейки можно поставить блок
        const [colorSize, color] = this.colors[colorPos];
        if (canPutNext
            && this._canPutColor(pos, pos + colorSize - 1, color)
            && this._tryFill(pos + colorSize, colorPos + 1,
                (colorPos + 1 >= this.colors.length || color !== this.colors[colorPos + 1][1]), save)) {
            canPut = true; //такая расстановка блоков возможна
            this._remember(pos, pos + colorSize - 1, color); //может находится блок
        }

        save[pos][colorPos][canPutNext ? 1 : 0] = (canPut ? 1 : 2);
        return canPut;
    }

    _countGuessed() {
        let cnt = 0;
        this.line.forEach((state) => {
            if (state.isFilled || state.isEmpty) {
                cnt++;
            }
        });

        return cnt;
    }

    _save() {
        this.line.forEach((state) => state.save());
    }

    _remember(lo, hi, color) {
        for (let i = lo; i <= hi; i++) {
            this.line[i].addColor(color);
        }
    }

    _canPutColor(lo, hi, color) {
        if (hi >= this.line.length) {
            return false;
        }

        for (let i = lo; i <= hi; i++) {
            const state = this.line[i];
            if (!state.isUnknown && !state.hasColor(color)) {
                return false;
            }
        }

        return true;
    }

    get isGuessed() {
        return this.line.every((state) => !state.isUnknown && !state.isMultiple);
    }

    get line() {
        return this._line;
    }

    get colors() {
        return this._colors;
    }
};
