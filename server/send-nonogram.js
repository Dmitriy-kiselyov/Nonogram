'use strict';

const extractor = require('../lib/extractor');
const Solver = require('../lib/solver');

module.exports = (url, res) => {
    url = makeUrl(url);

    return extractor(url)
        .then((nonogram) => {
            const solver = new Solver(nonogram);
            solver.solve();

            res.send({status: 'ok', result: nonogramToObject(nonogram)});
        }).catch(() => {
            res.send({status: 'error', message: 'Неверный адрес кроссворда'});
        });
};

function nonogramToObject(nonogram) {
    return {
        width: nonogram.width,
        height: nonogram.height,
        colors: nonogram.colors,
        field: nonogram.field.map((line) => {
            return line.reduce((out, state) => out += state.toString(), '');
        })
    };
}

function makeUrl(url) {
    if (Number(url) > 0) {
        return `http://www.nonograms.ru/nonograms2/i/${url}`;
    }
    return url;
}
