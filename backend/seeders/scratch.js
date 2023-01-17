const easySeeds = require('./easySeedsJS');
const csv = require('csv-parser');
const fs = require('fs');
const process = require('process');

let result;

const unpackCsvs = seedFile => {
       
    const results = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(seedFile)
      .on('error', error =>{
        reject(error);
      })
      .pipe(csv({}))
      .on('data', (data)=> { results.push(data)})
      .on('end', ()=> {
            resolve(results)
        })
      return results 
  })}
  
  
async function singleCollection(file){
    const seedFolder = './seed_files';
    process.chdir(seedFolder)
  
    const data = await unpackCsvs(file)
    return data
  }
singleCollection('menu_items_seeds.csv').then((value) => {
    console.log(value)
})


const tweets = [];

for (let i = 0; i < NUM_SEED_TWEETS; i++) {
  tweets.push(
    new Tweet ({
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



