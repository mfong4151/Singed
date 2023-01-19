const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Dish = mongoose.model('Dish');
// const { getDish, getDishes, deleteDish } = require('../../controllers/dishController');

// Get all dishes
router.get('/', async (req, res) => {
    const dishes = await Dish.find({})

    res.status(200).json(dishes)
})


// Get a single dish 
router.get('/:id', async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such dish found'})
    }

    const dish = await Dish.findById(id)

    if(!dish){
        return res.status(404).json({error: 'No such dish found'})
    }

    res.status(200).json(dish)
})

// remove a single dish
router.delete('/:id', async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such dish found'})
    }

    const dish = await Dish.findByIdAndDelete({_id: id})

    if(!dish){
        return res.status(404).json({error: 'No such dish found'})
    }

    res.status(200).json(dish)
})

module.exports = router;