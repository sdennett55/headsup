var fs = require('fs');
var sharp = require('sharp');

const files = fs.readdirSync(`${__dirname}/images`);
const pathTo = `${__dirname}/images/`;
const pathToOutput = `${__dirname}/images/output/`;

files.forEach(file => {
  sharp(pathTo + file)
    .toFile(pathToOutput + file).then(function (newFileInfo) {
      console.log("Success");
    })
    .catch(function (err) {
      console.log("Error occured", err);
    });
});