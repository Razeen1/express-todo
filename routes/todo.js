const express = require('express');
const router = express.Router();

const {create,all, remove, patch} = require('../controllers/todo')

router.get('/', all);
router.post('/create', create);
router.patch('/:id', patch);
router.delete('/:id', remove);

//export this index to use in our index.js
module.exports = router;