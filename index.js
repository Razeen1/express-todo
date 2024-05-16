const express = require('express');
const mongoose = require('mongoose');
require("./configs/db.js")
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use('/api/v1', routes)

const personSchema = mongoose.Schema({
    name: { type: String, trim: true, required: false },
    age: { type: String, trim: true, required: false },
    nationality: { type: String, trim: true, required: false },
});
const Person = mongoose.model("person", personSchema);

app.set('view engine', 'pug');

app.get('/', function (req, res) {
    res.send("Hello world!");
});

app.get('/person', function (req, res) {
    res.render('person');
});

app.post('/person',async function (req, res) {
    let personInfo = req.body; //Get the parsed information
    console.log(personInfo)
    if (!personInfo) {
        res.status(402).send('Send Data');
    } else {
        if (!personInfo.name || !personInfo.age || !personInfo.nationality) {
            res.render('show_message', {
                message: "Sorry, you provided wrong info", type: "error"
            });
        } else {
            const newPerson = new Person({
                name: personInfo.name,
                age: personInfo.age,
                nationality: personInfo.nationality
            });
            await newPerson.save();
            res.status(200).send('Okay');
        }
    }
});
app.listen(3000);