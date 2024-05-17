const express = require('express');
const mongoose = require('mongoose');
require("./configs/db.js")
const routes = require('./routes');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors())
app.use('/api/v1', routes)


app.set('view engine', 'pug');

app.get('/', function (req, res) {
    res.send("Hello world!");
});

app.listen(3000);