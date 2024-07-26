const express = require('express');
const {baseUrl} = require('./config');
const {restRouter} = require('./routes');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(`${baseUrl}`, restRouter);

module.exports = {app}
