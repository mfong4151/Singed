const mongoose = require('mongoose');
const Dish = mongoose.model('Dish');

const getDishes = async (req, res) => {
    const dishes = await Dish.find({})

    res.status(200).json(dishes)
}

const getDish = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such dish found'})
    }

    const dish = await Dish.findById(id)

    if(!dish){
        return res.status(404).json({error: 'No such dish found'})
    }

    res.status(200).json(dish)
}

const deleteDish = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such dish found'})
    }

    const dish = await Dish.findByIdAndDelete({_id: id})

    if(!dish){
        return res.status(404).json({error: 'No such dish found'})
    }

    res.status(200).json(dish)
}

module.exports = {
    getDishes,
    getDish,
    deleteDish
}