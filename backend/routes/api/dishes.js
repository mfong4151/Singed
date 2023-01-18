const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Dish = mongoose.model('Dish');
const { getDish, getDishes, deleteDish } = require('../../controllers/dishController');

// Get all dishes
router.get('/', getDishes)


// Get a single dish 
router.get('/:id', getDish)

// remove a single dish
router.delete('/:id', deleteDish)

module.exports = router;