const csv = require('csv-parser');
const fs = require('fs');



const unpackCsvs = seedFile => {
       
    const file = fs.readFileSync(seedFile,'utf-8')

    //clean the data
    const rows = file.trim('\n').split('\n');
    const headers = rows.shift().split(',')
    for(const[idx, i] of rows.entries()) rows[idx] = i.split(",")

    return {headers, rows}
  }


const cleanHeaders = (header) => {
    for(const[idx, col] of header.entries()){
        if(col.includes(":"))  header[idx] =  col.split(":")[1]
        else header[idx] = "string"
    }

    return header
}

const typeConversion = (dataType = 'string',datum ) => {
    if (['text', 'string', 's'].includes(dataType)) {
      return datum.toString();
    
    } else if (['number', 'n'].includes(dataType)) {
      return Number(datum);
    
    } else if (["bool", "boolean"].includes(dataType)) {
      return (datum.toLowerCase() === "true");

    } else if (["date"].includes(dataType)) {
      return new Date(datum).toString();

    } else {
      return datum;
    }
  }

const convertEachRow = (types, row) =>{

    for(let i = 0; i < row.length; i++){
        row[i] = typeConversion(types[i], row[i])
    }
    return row
}

const formatSeeds = (seedFile) =>{
    const {headers, rows} = unpackCsvs(seedFile);
    const types = cleanHeaders(headers)
    for(const[idx, row] of rows.entries()){
        rows[idx] = convertEachRow(types, row)
    }
    
    return rows
}


module.exports ={
    unpackCsvs: unpackCsvs,
    formatSeeds: formatSeeds,
    // singleCollection: singleCollection
}