'use strict';

const request = require('request');
const Promise = require('bluebird');

const Nonogram = require('./nonogram');

module.exports = (url) => {
    return requestPage(url)
        .then((body) => {
            const regexp = /var d=(\[\[.*]])/;
            const result = body.match(regexp);
            const data = JSON.parse(result[1]);
            return Nonogram.fromRawData(data);
        });
};

function requestPage(url) {
    return new Promise((resolve, reject) => {
        request(url, function(err, res, body) {
            if (err) {
                reject(err);
            }
            resolve(body);
        });
    });
}
