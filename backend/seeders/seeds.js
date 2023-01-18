const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const easySeeds = require('./easySeedsJS2');
const User = require('../models/User');
const Group = require('../models/Group');
const Dish = require('../models/Dish');
const Restaurant = require('../models/Restaurant');
const bcrypt = require('bcryptjs');


// Create users
const users = [];

users.push(
  new User ({
    username: 'demo-user',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('starwars', 10),
    flavorProfile: [10,10,10,10,10],
    genre: [1,2,3,4],
    allergies: [true, false, true],
    diet: [true, true, false],
    groupIds: [1]
  })
)

users.push(
  new User ({
    username: 'username',
    email: 'username@username.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    flavorProfile: [5,5,5,5,5],
    genre: [5,5,5,5],
    allergies: [true, false, true],
    diet: [true, true, false],
    groupIds: [1]
  })
)

// Create groups
const groups = [];
groups.push(
  new Group({
    name: 'test group',
    flavorProfile: [5,5,5,5,5],
    genre: [5,5,5,5],
    allergies: [true, false, true],
    diet: [true, true, false],
    userIds: [users[0]._id, users[1]._id]
  })
)

// Create dishes
const dishRelativePath = 'seed_files/menu_item_seeds.csv'
// local
const dishes = easySeeds.formatSeeds(`./${dishRelativePath}`)
// render
// const restaurants = easySeeds.formatSeeds(process.cwd().concat(`/backend/seeders/${dishRelativePath}`))

// Create restaurants
const restaurantRelativePath = 'seed_files/restaurant_seeds.csv' // local
const restaurants = easySeeds.formatSeeds(`./${restaurantRelativePath}`) 


// render
// const restaurants = easySeeds.formatSeeds(process.cwd().concat(`/backend/seeders/${restaurantRelativePath}`))

// console.log(dishes[0])

// for (const r of restaurants) {
//   restaurantSeeds.push(
//     new Restaurant({
//       name: r[0],
//       address: r[1],
//       rating:r[2],
//       city: r[3],
//       stateCode: r[4],
//       longitude: r[5],
//       latitude: r[6],
//       cuisine_type: r[7],
//       imageUrl: r[8],
//       flavorProfile: r[9],
//       genre: r[10],
//       allergies: r[11],
//       diet: r[12]
//     })
//   )
// }


// const insertSeeds = () => {
//   console.log("Resetting db and seeding users and tweets...");

//   User.collection.drop()
//                  .then(() => Tweet.collection.drop())
//                  .then(() => User.insertMany(users))
//                  .then(() => Tweet.insertMany(tweets))
//                  .then(() => {
//                    console.log("Done!");
//                    mongoose.disconnect();
//                  })
//                  .catch(err => {
//                    console.error(err.stack);
//                    process.exit(1);
//                  });
// }

// Connect to database
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
