const express = require('express');
const router = express.Router();
const taskRoute = require("./todo")

const {create} = require('../controllers/todo')

router.use('/task',taskRoute);

//export this index to use in our index.js
module.exports = router;