// https://dev.to/franciscomendes10866/setup-mongodb-with-mongoose-and-express-4c58

const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/Restaurant')

const debug = require('debug');
const serverLogger = debug('backend:server');

/* GET restaurants. */
router.get('/map', async (req, res, next) => {
  try {
    let lat = req.query.lat;
    let lng = req.query.lng;
    let preference = req.query.preference;

    console.log("preference", typeof preference)
    console.log("preference", preference)
    console.log("preference", preference.split(',').map(n => parseFloat(n)))

    let preferenceArr = preference.split(',').map(n => parseFloat(n))
    // console.log(lat, lng);
    if (!lat || !lng || !preferenceArr) {
      const restaurants = await Restaurant.find();
      res.json({restaurants});
    } else {
      // console.log('lng', lng-0.0004, lng-(-0.0004));
      // console.log('lat', lat-0.0004, lat-(-0.0004));
      // console.log(-122.413709 > lng-0.04, -122.413709 < lng-(-0.04))
      console.log("in restaurants");
      const restaurants = await Restaurant.aggregate([
        {
          '$addFields': {
            'preference': preferenceArr
          }
        }, {
          '$project': {
            'name': '$name',
            'address': '$address',
            'rating': '$rating',
            'city': '$city',
            'stateCode': '$stateCode',
            'longitude': '$longitude',
            'latitude': '$latitude',
            'cuisine_type': '$cuisine_type',
            'imageUrl': '$imageUrl',
            'flavorProfile': '$flavorProfile',
            'genre': '$genre',
            'allergies': '$allergies',
            'diet': '$diet',
            'groupIds': '$groupIds',
            '__v': '$__v',
            'createdAt': '$createdAt',
            'updatedAt': 'updatedAt',
            'preference': '$preference',
            'dotProduct': {
              '$reduce': {
                'input': {
                  '$range': [
                    0, {
                      '$size': '$preference'
                    }
                  ]
                },
                'initialValue': 0,
                'in': {
                  '$add': [
                    '$$value', {
                      '$multiply': [
                        {
                          '$arrayElemAt': [
                            '$preference', '$$this'
                          ]
                        }, {
                          '$arrayElemAt': [
                            '$flavorProfile', '$$this'
                          ]
                        }
                      ]
                    }
                  ]
                }
              }
            }
          }
        }
      ]).sort({dotProduct: -1}).exec();

      // Restaurant.aggregate([
      //   {
      //     $addFields: {
      //       totalHomework: {$sum: "$genre"}
      //     }
      //   }
      // ])

      // const restaurants = await Restaurant.aggregate([
      //   {
      //     $addFields: {
      //       totalHomework: {$sum: "$genre"}
      //     }
      //   }
      // ]).sort({dotProduct: -1}).exec();

      // .find({
      //   longitude: {
      //     $gt: lng-0.04,
      //     $lt: lng-(-0.04) // string convertion
      //   },
      //   latitude: {
      //     $gt: lat-0.04,
      //     $lt: lat-(-0.04) // string convertion
      //   },
      // }).sort({dotProduct: -1}).exec();

      // const restaurants = await Restaurant
      // .where('longitude').gt(lng-0.0004)
      // .where('latitude').gt(lat-0.0004)
      // .limit(10).exec();

      // const restaurants = await Restaurant.find();
      console.log("restaurants", restaurants);
      res.json({restaurants});
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});



module.exports = router;
