'use strict';

module.exports = class State {
    constructor(color) {
        this._colors = null;
        this._newColors = null;

        if (color >= 0) {
            this._newColors = new Set([color]);
        }
    }

    get isFilled() {
        return this.colors !== null && this.colors.size === 1 && this._color !== 0;
    }

    get isEmpty() {
        return this.colors !== null && this.colors.size === 1 && this._color === 0;
    }

    get isUnknown() {
        return this.colors === null;
    }

    get isMultiple() {
        return this.colors !== null && this.colors.size > 1;
    }

    get color() {
        return (this.isFilled || this.isEmpty) ? this._color : -1;
    }

    get _color() {
        return this.colors.values().next().value;
    }

    get colors() {
        return this._colors;
    }

    addColor(color) {
        if (this.isUnknown || this.isMultiple) {
            if (this._newColors === null) {
                this._newColors = new Set();
            }
            this._newColors.add(color);
        }
    }

    hasColor(color) {
        return this.colors !== null && this.colors.has(color);
    }

    save() {
        if (this.isUnknown || this.isMultiple) {
            this._colors = this._newColors;
            this._newColors = null;
        }
    }

    toString() {
        if (this.isEmpty) {
            return '.';
        }
        if (this.isFilled) {
            return String.fromCharCode(this.color + 'a'.charCodeAt(0) - 1);
        }
        return '?';
    }
};
