const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const easySeeds = require('./easySeedsJS2');
const User = require('../models/User');
const Group = require('../models/Group');
const Dish = require('../models/Dish');
const Restaurant = require('../models/Restaurant');


//Need to open each file respectively

const restaurants = easySeeds.formatSeeds('./seed_files/restaurant_seeds.csv')
const restaurantSeeds = [];


for (const r of restaurants) {
  restaurantSeeds.push(
    new Restaurant({
      name: r[0],
      address: r[1],
      rating:r[2],
      city: r[3],
      stateCode: r[4],
      longitude: r[5],
      latitude: r[6],
      cuisine_type: r[7],
      imageUrl: r[8],
      flavorProfile: r[9],
      genre: r[10],
      allergies: r[11],
      diet: r[12]
    })
  )
}


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });


const insertSeeds = () => {
    console.log("Resetting db and seeding users...");
    // console.log("Resetting db and seeding users and tweets...");
  
    Restaurant.collection.drop()
                  
                   .then(() => Restaurant.insertMany(restaurants))
                   .then(() => {
                     console.log("Done!");
                     mongoose.disconnect();
                   })
                   .catch(err => {
                     console.error(err.stack);
                     process.exit(1);
                   });
  }
  

