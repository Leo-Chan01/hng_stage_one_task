const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors({ origin: true }));

app.get('*', (req, res) => {
    res.status(404).send('Resource not found');
    console.log("At the base of API");
});

module.exports = app;