// title.js: sets title to comic name

const path = require('path');
const jsonfile = require('jsonfile');

let version;

exports.onLoad = () => {
  let packageFile = 'package.json';
  jsonfile.readFile(packageFile, function(err, obj) {
    if (err) {
      document.title = 'Wonder Reader';
      version = '';
    } else {
      version = obj.version;
      document.title = `Wonder Reader ${version}`;
    };
  });
};

exports.onFileLoad = (fileName) => {
  let file = path.basename(fileName, path.extname(fileName));
  document.title = `Wonder Reader ${version}: ${file}`;
};
