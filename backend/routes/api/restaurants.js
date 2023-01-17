// https://dev.to/franciscomendes10866/setup-mongodb-with-mongoose-and-express-4c58

const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/Restaurant')

const debug = require('debug');
const serverLogger = debug('backend:server');

/* GET restaurants. */
router.get('/map', async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.json({'restaurants': restaurants});
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

module.exports = router;
