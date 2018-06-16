'use strict';

const extractor = require('./lib/extractor');

const url = 'http://www.nonograms.ru/nonograms2/i/18930';
extractor(url)
    .then((nonogram) => {
        console.log('Width:', nonogram.width);
        console.log('Height:', nonogram.height);
        console.log('Colors:', nonogram.colors);
        console.log('Top:', nonogram.top);
        console.log('Left:', nonogram.left);
    });
