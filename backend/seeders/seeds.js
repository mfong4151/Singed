const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const easySeeds = require('./easySeedsJS2');
const User = require('../models/User');
const Group = require('../models/Group');
const Dish = require('../models/Dish');
const Restaurant = require('../models/Restaurant');
const bcrypt = require('bcryptjs');
console.log(db);

// Create users
const users = [];

users.push(
  new User ({
    username: 'asian_salty_noshellfish_onlyvegan',
    email: 'asian_salty_noshellfish_onlyvegan@gmail.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    flavorProfile: [0,1,0,0,0],
    genre: [1,0,0,0],
    allergies: [false, false, true],
    diet: [false, false, true],
    groupIds: [1]
  })
)

users.push(
  new User ({
    username: 'american_sweet_nofish_nan',
    email: 'american_sweet_nofish_nan@gmail.com',
    hashedPassword: bcrypt.hashSync('password', 10),
    flavorProfile: [0,0,0,0,1],
    genre: [0,1,0,0],
    allergies: [true, false, false],
    diet: [false, false, false],
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

// Create restaurants
const restaurantRelativePath = 'seed_files/restaurant_seeds.csv'
// const restaurantsRaw = easySeeds.formatSeeds(`./${restaurantRelativePath}`) // local
const restaurantsRaw = easySeeds.formatSeeds(process.cwd().concat(`/seeders/${restaurantRelativePath}`)) // render
restaurantsImageUrls = [
  'https://source.unsplash.com/HvhinFxq4_s',
  'https://source.unsplash.com/zmsR0qeKQyo',
  'https://source.unsplash.com/1CQ4x9ewEnk',
  'https://source.unsplash.com/DIyJHmsppmA'
]
const restaurants = []
for (let i = 0; i < restaurantsRaw.length; i++) {
  restaurants.push(
    new Restaurant({
      name: restaurantsRaw[i][0],
      address: restaurantsRaw[i][1],
      rating: restaurantsRaw[i][2],
      city: restaurantsRaw[i][3],
      stateCode: restaurantsRaw[i][4],
      longitude: restaurantsRaw[i][5],
      latitude: restaurantsRaw[i][6],
      cuisine_type: restaurantsRaw[i][7],
      imageUrl: restaurantsImageUrls[Math.floor(Math.random()*restaurantsImageUrls.length)],
      flavorProfile: [5,5,5,5,5],
      genre: [5,5,5,5],
      allergies: [true, false, true],
      diet: [true, true, false]
    })
  )
}

// Create dishes
const dishRelativePath = 'seed_files/menu_item_seeds.csv'
// const dishesRaw = easySeeds.formatSeeds(`./${dishRelativePath}`) // local
const dishesRaw = easySeeds.formatSeeds(process.cwd().concat(`/seeders/${dishRelativePath}`)) // render
dishesImageUrls = [
  'https://source.unsplash.com/gySMaocSdqs',
  'https://source.unsplash.com/XoByiBymX20',
  'https://source.unsplash.com/RWAToPPP9RY',
  'https://source.unsplash.com/NEab1U1FfKM'
]
const dishes = []
for (let i = 0; i < dishesRaw.length; i++) {
  dishes.push(
    new Dish({
      name: dishesRaw[i][0],
      description: dishesRaw[i][1],
      price: dishesRaw[i][2],
      header: dishesRaw[i][3],
      imageUrl: dishesImageUrls[Math.floor(Math.random()*dishesImageUrls.length)],
      flavorProfile: dishesRaw[i][5],
      genre: dishesRaw[i][6],
      allergies: dishesRaw[i][7],
      diet: dishesRaw[i][8],
      restaurantId: restaurants[parseInt(dishesRaw[i][4])-1]._id
    })
  )
}

const insertSeeds = () => {
  console.log("Resetting db and seeding users...");
  // console.log("Resetting db and seeding users and tweets...");

  User.collection.drop()
                 .then(() => Group.collection.drop())
                 .then(() => Dish.collection.drop())
                 .then(() => Restaurant.collection.drop())
                 // insert
                 .then(() => User.insertMany(users))
                 .then(() => Group.insertMany(groups))
                 .then(() => Restaurant.insertMany(restaurants))
                 .then(() => Dish.insertMany(dishes))
                 .then(() => {
                   console.log("Done!");
                   mongoose.disconnect();
                 })
                 .catch(err => {
                   console.error(err.stack);
                   process.exit(1);
                 });
}

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
