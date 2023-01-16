const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
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
    groupName: 'test group',
    flavorProfile: [5,5,5,5,5],
    genre: [5,5,5,5],
    allergies: [true, false, true],
    diet: [true, true, false],
    userIds: [users[0]._id, users[1]._id]
  })
)

// Create dishes
const dishes = [];
dishes.push(
  new Dish({
    
  })
)

// Create restaurants
const restaurant = [];

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
                 .then(() => Dish.insertMany(dishes))
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
