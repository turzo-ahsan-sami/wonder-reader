// title.js: sets title to comic name

const path = require('path');
const jsonfile = require('jsonfile');

let version;

// Loads title and version number
exports.onStart = () => {
  jsonfile.readFile('package.json', function (err, obj) {
    if (err) { version = ''; }
    else { version = ` ${obj.version}`; }
    document.title = `Wonder Reader${version}`;
  });
};

// Updates title with comic name
exports.onLoad = (fileName) => {
  let file = path.basename(fileName, path.extname(fileName));
  document.title = `Wonder Reader${version}: ${file}`;
};
