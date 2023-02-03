// and or combined: https://stackoverflow.com/questions/13272824/combine-two-or-queries-with-and-in-mongoose
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Dish = mongoose.model('Dish');
// const { getDish, getDishes, deleteDish } = require('../../controllers/dishController');

// Get all dishes
router.get('/', async (req, res) => {
  const userConstraintQuery = req.query;
  console.log(req.query);
  const allergiesConstraints = [];
  const dietConstraints = [];
  const allergiesIndexDict = {'fish': 0, 'nuts': 1, 'shellfish': 2}
  const dietIndexDict = {'gluten': 0, 'milk': 1, 'vegan': 2}

  for (let key in userConstraintQuery) {
    if (['fish', 'nuts', 'shellfish'].includes(key) && userConstraintQuery[key]=='true') {
      allergiesConstraints.push({[`allergies.${allergiesIndexDict[key]}`]: false});
    }
    if (['gluten', 'milk', 'vegan'].includes(key) && userConstraintQuery[key]=='true') {
      dietConstraints.push({[`diet.${dietIndexDict[key]}`]: true});
    }
  }

  console.log(allergiesConstraints);
  console.log(dietConstraints);
  let dishes;
  if (dietConstraints.length == 0 && allergiesConstraints.length ==0) {
    dishes = await Dish.aggregate([
      { $sort: {createdAt: -1}},
      { $sample: { size: 12} }
    ]);
  } else if (dietConstraints.length == 0) {
    // dishes = await Dish.find({$and: [...allergiesConstraints]}).sort({createdAt: -1}).limit(12)
    dishes = await Dish.aggregate([
      { $match: {$and:[...allergiesConstraints]}},
      { $sort: {createdAt: -1}},
      { $sample: { size: 12} }
    ]);
  } else if (allergiesConstraints.length == 0) {
    // dishes = await Dish.find({$and: [...dietConstraints] }).sort({createdAt: -1}).limit(12).aggregate([{ $sample: { size: 12} }]);
    dishes = await Dish.aggregate([
      { $match: {$and:[...dietConstraints]}},
      { $sort: {createdAt: -1}},
      { $sample: { size: 12} }
    ]);
  } else {
    // dishes = await Dish.find({
    //   $and: [
    //       { $and: [...allergiesConstraints] },
    //       { $and: [...dietConstraints] }
    //   ]
    // }).limit(12)
    dishes = await Dish.aggregate([
      { $match: {$and: [
        { $and: [...allergiesConstraints] },
        { $and: [...dietConstraints] }
      ]}},
      { $sort: {createdAt: -1}},
      { $sample: { size: 12} }
    ]);
  }
  console.log(dishes)
  res.status(200).json({dishes})

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

  res.status(200).json({dish})
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

  res.status(200).json({dish})
})

module.exports = router;
