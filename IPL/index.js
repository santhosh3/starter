const csv = require('csvtojson')
const fs = require('fs').promises;

async function convertCSVToJSON(inputFilePath, outPutFilePath) {
    let jsonFile = await csv().fromFile(inputFilePath);
    await fs.writeFile(outPutFilePath, JSON.stringify(jsonFile, null, 4));
}

const csvFilePathForMatches = './properties/matches.csv'; 
const jsonFilePathForMatches = './jsonDB/matches.json';

const csvFilePathFordeliveries = './properties/deliveries.csv'; 
const jsonFilePathFordeliveries = './jsonDB/deliveries.json';

function ConvertToJSON() {
    return Promise.all(
        [
         convertCSVToJSON(csvFilePathForMatches, jsonFilePathForMatches),
         convertCSVToJSON(csvFilePathFordeliveries, jsonFilePathFordeliveries)
        ]
    )
}

ConvertToJSON() 

