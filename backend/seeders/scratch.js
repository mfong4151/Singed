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
  
(async()=> {
    result =await singleCollection('menu_items_seeds.csv')
    for(const i of result){
        console.log(i)
    }
})();


