const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Group = require('../models/Group');
const Dish = require('../models/Dish');
const Restaurant = require('../models/Restaurant');
const bcrypt = require('bcryptjs');

//Original seeds file

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

// Create restaurants
const restaurants = [];
restaurants.push(
  new Restaurant({
    name: 'test restaurant',
    address: 'test address',
    rating: 4.9,
    city: 'San Francisco',
    stateCode: 'CA',
    longitude: 37.792937,
    latitude:-122.413709,
    cuisine_type: 'asian',
    imageUrl: 'https://www.waiter.com/blog/wp-content/uploads/2015/09/Sushi-Roll-2-1024x683.jpg',
    flavorProfile: [5,5,5,5,5],
    genre: [5,5,5,5],
    allergies: [true, false, true],
    diet: [true, true, false]
  })
)

restaurants.push(
  new Restaurant({
    name: 'test restaurant 2',
    address: 'test address 2',
    rating: 4.8,
    city: 'San Francisco',
    stateCode: 'CA',
    longitude: 37.777436,
    latitude: -122.460707,
    cuisine_type: 'american',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Barbecue.jpg',
    flavorProfile: [4,4,4,4,4],
    genre: [6,6,6,6],
    allergies: [true, false, true],
    diet: [true, true, false],
    userIds: [users[0]._id, users[1]._id]
  })
)

names = [
  'Edamame',
  'Fried Chicken',
  'French Fries',
  'Minced Pork',
  'Edamame',
  'Fried Chicken',
  'French Fries',
  'Minced Pork',
  'Edamame',
  'Fried Chicken',
  'French Fries',
  'Minced Pork',
]

imageUrls = [
  'https://www.thespruceeats.com/thmb/d68tbuL0Qk-Aa8_7nwF5Kd-LMfo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/boiled-edamame-2030953-hero-01-287898b35fa74d6b83f22e7cc7094658.jpg',
  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/11/2/0/DV1510H_fried-chicken-recipe-10_s4x3.jpg.rend.hgtvcom.406.406.suffix/1568222255998.jpeg',
  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/11/2/0/DV1510H_fried-chicken-recipe-10_s4x3.jpg.rend.hgtvcom.406.406.suffix/1568222255998.jpeg',
  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/11/2/0/DV1510H_fried-chicken-recipe-10_s4x3.jpg.rend.hgtvcom.406.406.suffix/1568222255998.jpeg',
  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/11/2/0/DV1510H_fried-chicken-recipe-10_s4x3.jpg.rend.hgtvcom.406.406.suffix/1568222255998.jpeg',
  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/11/2/0/DV1510H_fried-chicken-recipe-10_s4x3.jpg.rend.hgtvcom.406.406.suffix/1568222255998.jpeg',
  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/11/2/0/DV1510H_fried-chicken-recipe-10_s4x3.jpg.rend.hgtvcom.406.406.suffix/1568222255998.jpeg',
  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/11/2/0/DV1510H_fried-chicken-recipe-10_s4x3.jpg.rend.hgtvcom.406.406.suffix/1568222255998.jpeg',
  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/11/2/0/DV1510H_fried-chicken-recipe-10_s4x3.jpg.rend.hgtvcom.406.406.suffix/1568222255998.jpeg',
  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/11/2/0/DV1510H_fried-chicken-recipe-10_s4x3.jpg.rend.hgtvcom.406.406.suffix/1568222255998.jpeg',
  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/11/2/0/DV1510H_fried-chicken-recipe-10_s4x3.jpg.rend.hgtvcom.406.406.suffix/1568222255998.jpeg',
  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/11/2/0/DV1510H_fried-chicken-recipe-10_s4x3.jpg.rend.hgtvcom.406.406.suffix/1568222255998.jpeg',

]

// Create dishes
const dishes = [];
for (let i = 0; i < 12; i++) {
  dishes.push(
    new Dish({
      name: names[i],
      description: 'organic',
      price: 8.99,
      header: 'Appetizers',
      imageUrl: imageUrls[i],
      flavorProfile: [4,4,4,4,4],
      genre: [6,6,6,6],
      allergies: [true, false, true],
      diet: [true, true, false],
      restaurantId: restaurants[0]._id
    })
  )
}



// for (let i = 1; i < NUM_SEED_USERS; i++) {
//   const firstName = faker.name.firstName();
//   const lastName = faker.name.lastName();
//   users.push(
//     new User ({
//       username: faker.internet.userName(firstName, lastName),
//       email: faker.internet.email(firstName, lastName),
//       hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
//     })
//   )
// }

// Create tweets
// const tweets = [];

// for (let i = 0; i < NUM_SEED_TWEETS; i++) {
//   tweets.push(
//     new Tweet ({
//       text: faker.hacker.phrase(),
//       author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id
//     })
//   )
// }

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
