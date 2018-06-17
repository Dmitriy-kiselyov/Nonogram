'use strict';

module.exports.matrix = (sizes, fill) => {
    return matrixRec(sizes, 0, fill);
};

function matrixRec(sizes, index, fill) {
    if (index === sizes.length) {
        return fill;
    }

    const arr = new Array(sizes[index]);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = matrixRec(sizes, index + 1, fill);
    }
    return arr;
}

module.exports.column = (matrix, index) => {
    const column = [];
    matrix.forEach((line) => column.push(line[index]));

    return column;
};
