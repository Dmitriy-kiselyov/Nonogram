'use strict';

const extractor = require('./lib/extractor');

const url = 'http://www.nonograms.ru/nonograms2/i/18930';
extractor(url)
    .then((nonogram) => {
        console.log(nonogram.toString());
    });
