const express = require('express');
const router = express.Router();

const {create,getAllTask, deleteTask} = require('../controllers/todo')

router.get('/', getAllTask);
router.post('/create', create);
router.delete('/:id', deleteTask);

//export this index to use in our index.js
module.exports = router;