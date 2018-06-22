'use strict';

const express = require('express');
const path = require('path');

const sendNonogram = require('./send-nonogram');

const app = express();

app.use(express.static('../static'));

app.post('/solve', async (req, res) => {
    const url = req.query.url;

    if (url) {
        await sendNonogram(url, res);
    } else {
        res.status(404).send('Page not found');
    }
});

app.use((req, res) => {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.sendFile(path.resolve(`${__dirname}/../static/404.html`));
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({error: 'Not found'});
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

app.listen(8080);
