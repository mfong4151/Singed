// https://dev.to/franciscomendes10866/setup-mongodb-with-mongoose-and-express-4c58

const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/Restaurant')

const debug = require('debug');
const serverLogger = debug('backend:server');

/* GET restaurants. */
router.get('/map', async (req, res, next) => {
  try {
    let lat = req.query.lat
    let lng = req.query.lng
    console.log(lat, lng);
    if (!lat || !lng) {
      const restaurants = await Restaurant.find();
      res.json({'restaurants': restaurants});
    } else {
      console.log('lng', lng-0.0004, lng-(-0.0004));
      console.log('lat', lat-0.0004, lat-(-0.0004));
      console.log(-122.413709 > lng-0.04, -122.413709 < lng-(-0.04))
      const restaurants = await Restaurant.find({
        longitude: {
          $gt: lng-0.04,
          $lt: lng-(-0.04) // string convertion
        },
        latitude: {
          $gt: lat-0.04,
          $lt: lat-(-0.04) // string convertion
        },
      }).exec();

      // const restaurants = await Restaurant
      // .where('longitude').gt(lng-0.0004)
      // .where('latitude').gt(lat-0.0004)
      // .limit(10).exec();

      // const restaurants = await Restaurant.find();
      console.log(restaurants);
      res.json({'restaurants': restaurants});
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});



module.exports = router;
