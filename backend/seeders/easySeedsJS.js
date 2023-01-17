const csv = require('csv-parser');
const fs = require('fs');
const process = require('process');


const singleSeeder = (table, className, tableString) => {

        className.destroyAll();
        ApplicationRecord.connection.resetPkSequence(tableString);
        console.log(`Creating ${tableString}...`);   
        
        table.forEach((tableRow) => className.create(tableRow));
            
        console.log(`DONE WITH ${tableString.toUpperCase()}, ${tableString.toUpperCase()} SEEDING SUCCESSFUL`);
        
    } 


    const createEasySeedData= (classNames) => {

      const tables = tablesFromCsvs();
  
      for (let i = 0; i < tables.length; i++) {
  
          const className = classNames[i];
          singleSeeder(tables[i], className, tableStrings[i]);
      }
    }

const attachImages = classImageNames => {
    const seedFolder = '../seed_image_files';
    process.chdir(seedFolder);

    fs.readdirSync("*").forEach((seedFile, i) => {
      const [headers, data] = EasySeeds.unpackCsvs(seedFile);
      const classImageName = classImageNames[i];
      console.log(`Attaching to ${classImageName}...`);

      data.forEach((row, i) => {
          const [objectId, url, filename] = row;
          const classInstance = classImageName.findBy({id: objectId});
          console.log(classInstance, url, filename);
          classInstance.image.attach({io: URI.open(url), filename: filename});
          console.log(`attached to ${filename}`);
      });
    });
  }

  
const  destroyTable = (className, tableString) => {
    console.log(`Destroying the ${tableString} table`);
    className.destroyAll();
    ApplicationRecord.connection.resetPkSequence(tableString);
  }


const destroyTables = (classNames, tableStrings) => {
    for (let i = classNames.length - 1; i >= 0; i--) {
      destroyTable(classNames[i], tableStrings[i]);
    }
  }



const typeConversion = (datum, dataType = 'string') => {
        if (['text', 'string', 's'].includes(dataType)) {
          return datum.toString();
        
        } else if (['int', 'integer', 'i'].includes(dataType)) {
          return parseInt(datum);
        
        } else if (['float', 'f'].includes(dataType)) {
        
          return parseFloat(datum);
  
        } else if (["bool", "boolean"].includes(dataType)) {
          return (datum.toLowerCase() === "true");
  
        } else if (["date"].includes(dataType)) {
          return new Date(datum).toString();
  
        } else {
          return datum;
        }
      }
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

      
const  tablesFromCsvs = () => {
          
          const allSeedData = [];
          const seedFolder = './seed_files';
          
          process.chdir(seedFolder)
          fs.readdir(process.cwd(), (err, files)=> {
            files.forEach((file) => {
              const seedRes = [];
              const data = extractFiles(file);
              allSeedData.push(data)
              console.log(data)
            })

              // data.forEach((row, j) => {
              
              // });
              
              
          });
          // return [allSeedData, tableStrings];
  
      }
  
  const cleanHeaders = (header) => {
          if (header.includes(":")) {
            const [first, second] = header.split(":");
            const headerAndType = [first.toLowerCase(), second];
          } else {
            const headerAndType = [header.toLowerCase(), 'string'];
          }
          return headerAndType;
      }

module.exports ={
  unpackCsvs: unpackCsvs,
  tablesFromCsvs: tablesFromCsvs,
  singleCollection: singleCollection
}