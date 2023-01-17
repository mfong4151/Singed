const easySeeds = require('./easySeedsJS2');

const process = require('process');

//Need to open each file respectively

const restauraunts = easySeeds.formatSeeds('./seed_files/restaurant_seeds.csv')
console.log(restauraunts)




const restaurants = [];


for (let i = 0; i < restauraunts.length; i++) {
  restaurants.push(
    new Restaurant ({
      text: faker.hacker.phrase(),
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id
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
    console.log("Resetting db and seeding users and tweets...");
  
    User.collection.drop()
                   .then(() => Tweet.collection.drop())
                   .then(() => User.insertMany(users))
                   .then(() => Tweet.insertMany(tweets))
                   .then(() => {
                     console.log("Done!");
                     mongoose.disconnect();
                   })
                   .catch(err => {
                     console.error(err.stack);
                     process.exit(1);
                   });
  }



