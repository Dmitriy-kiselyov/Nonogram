'use strict';

const extractor = require('./lib/extractor');
const Solver = require('./lib/solver');

const url = 'http://www.nonograms.ru/nonograms2/i/18930';
extractor(url)
    .then((nonogram) => {
        const solver = new Solver(nonogram);
        solver.solve();

        console.log(nonogram.toString());
    });
