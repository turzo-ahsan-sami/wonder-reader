// title.js: sets title to comic name

const path = require('path');
const jsonfile = require('jsonfile');

let version;

// Loads title and version number
exports.onLoad = () => {
  let packageFile = 'package.json';
  jsonfile.readFile(packageFile, function (err, obj) {
    if (err) { version = ''; }
    else { version = ` ${obj.version}`; }
    document.title = `Wonder Reader${version}`;
  });
};

// Updates title with comic name
exports.onFileLoad = (fileName) => {
  let file = path.basename(fileName, path.extname(fileName));
  document.title = `Wonder Reader${version}: ${file}`;
};
