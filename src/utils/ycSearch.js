"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var jsonFilePath = path.join(__dirname, '..', '..', 'yc_essential_data.json');
var outputFilePath = path.join(__dirname, '..', '..', 'output.json');
try {
    var data = fs.readFileSync(jsonFilePath, 'utf-8');
    var jsonData = JSON.parse(data);
    var result = jsonData.map(function (item) { return ({
        name: item.name,
        long_description: item.long_description,
        website: item.website,
        industry: item.industry,
        stage: item.stage,
    }); });
    fs.writeFileSync(outputFilePath, JSON.stringify(result, null, 2), 'utf-8');
    console.log("Data saved to ".concat(outputFilePath));
}
catch (error) {
    console.error('Error reading or parsing JSON file:', error);
}
