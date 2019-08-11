var fs = require('fs');
var sharp = require('sharp');

const files = fs.readdirSync(`${__dirname}/images`);
const pathTo = `${__dirname}/images/`;
const pathToOutput = `${__dirname}/output/`;
const MAX_IMAGE_SIZE = 450;

files.forEach(file => {
  const image = pathTo + file;
  const outputImage = pathToOutput + file;
  const sharpImage = sharp(image);

  sharpImage
    .jpeg()
      .metadata()
      .then(metadata => {
        // Resize image if it's too big
        if (metadata.width > MAX_IMAGE_SIZE || metadata.height > MAX_IMAGE_SIZE) {
          const max = Math.max(metadata.width, metadata.height);
          if (max === metadata.height) {
            sharpImage.resize({ height: MAX_IMAGE_SIZE });
          } else {
            sharpImage.resize({ width: MAX_IMAGE_SIZE });
          }
        }
        sharpImage
          .toFile(outputImage)
          .then(function (newFileInfo) {
            console.log("Success: ", file);
          })
          .catch(function (err) {
            console.log(`Error occured with $[file} `, err);
          });
      })
      .catch(err => console.log(`Error with metadata: ${err}`));
});