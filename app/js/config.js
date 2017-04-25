const isThere = require('is-there');
const jsonfile = require('jsonfile');
const library = require('./library.js');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');

const config = path.join(os.tmpdir(), 'wonderReader', 'json', 'config.json');
const column = document.querySelector('#column');
// Function variables;
let libPath, onStart, page;

libPath = (filePath) => {
  jsonfile.readFile(config, function(err, obj) {
    if (err) console.err(err);
    obj.library = filePath;
    jsonfile.writeFile(config, obj, function(err) {
      if (err) console.err(err);
    });
  });
};

page = (val) => {
  jsonfile.readFile(config, function(err, obj) {
    if (err) console.err(err);
    obj.page = val;
    jsonfile.writeFile(config, obj, function(err) {
      if (err) console.err(err);
    });
  });
};

onStart = () => {
  if(!isThere(config)) { // Creates default template for a new config file
    let obj = {};
    obj.library = '';
    obj.page = column.dataset.val;
    mkdirp(path.dirname(config)); // creates a folder for config if none exist
    jsonfile.writeFile(config, obj, function(err) {
      if (err) console.err(err);
    });
  } else {
    jsonfile.readFile(config, function(err, obj) {
      if (err) console.err(err);
      column.dataset.val = obj.page || 2;
      library.builder(obj.library);
    });
  }
};

exports.libPath = () => {
  var obj = jsonfile.readFileSync(config);
  return obj.library || undefined;
};

exports.library = (filePath) => {
  libPath(filePath);
};

exports.onStart = () => {
  onStart();
};

exports.page = (val) => {
  page(val);
};
