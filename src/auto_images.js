var fs = require('fs');
var prettier = require('prettier');

var all_images = [];
var new_object = {};

const files = fs.readdirSync(`${__dirname}/images`);
const jpgs = files.filter(file => file.includes('.jpg'));
jpgs.forEach(file => {
  let file_without_extension = file.replace('.jpg', '');
  let file2 = file_without_extension;
  if (file.includes('._')) {
    file2 = file_without_extension.replace('._', '_');
  } else if (file.includes('&')) {
    file2 = file_without_extension.replace('&', 'and');
  } else {
    file2 = file_without_extension;
  }
  all_images.push(
    `import ${file2} from './images/${file}';`
  );

  new_object[file_without_extension] = file2;
});

const all_imports = all_images.join('\n');
const the_hash = Object.entries(new_object).reduce((total, [prop, val]) => {
  total += `'${prop}': ${val}, `;
  return total;
}, '');

const result = `
  ${all_imports}

export const hash = {${the_hash}};
`;

fs.writeFileSync(`${__dirname}/images.js`, prettier.format(result, { parser: 'babel' }));


