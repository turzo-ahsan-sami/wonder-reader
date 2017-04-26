const dirTree = require('directory-tree');
const isThere = require('is-there');
const jsonfile = require('jsonfile');
const library = require('./library.js');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');

const comics = path.join(os.tmpdir(), 'wonderReader', 'json', 'comics.json');
const config = path.join(os.tmpdir(), 'wonderReader', 'json', 'config.json');
const column = document.getElementById('column');
// Function variables;
let dbBuild, libSave, onStart, page;

// Builds a database for comics
dbBuild = (filePath) => {
  let Files = dirTree(filePath, ['.cbr', '.cbz']);
  jsonfile.writeFile(comics, Files, {'spaces': 2}, function(err) {
    if (err) console.error(err);
    console.log(`Comic database built and saved for ${filePath}`);
  });
};

libSave = (filePath) => {
  jsonfile.readFile(config, function(err, obj) {
    if (err) console.error(err);
    obj.library = filePath;
    jsonfile.writeFile(config, obj, function(err) {
      if (err) console.error(err);
      console.log(`${filePath} saved.`);
    });
  });
};

page = (val) => {
  jsonfile.readFile(config, function(err, obj) {
    if (err) console.error(err);
    obj.page = val;
    jsonfile.writeFile(config, obj, function(err) {
      if (err) console.error(err);
    });
  });
};

onStart = () => {
  let libStatus= document.getElementById('libStatus');
  if(!isThere(config)) { // Creates default template for a new config file
    let obj = {};
    obj.library = '';
    obj.page = column.dataset.val;
    libStatus.innerHTML = '<p>The library is empty. Click <span class="code"><i class="fa fa-search"></i></span> to load a directory.</p>';

    // creates a folder for config if none exist
    mkdirp(path.dirname(config), function(err) {
      if (err) console.error(err);
      jsonfile.writeFile(config, obj, function(err) {
        if (err) console.error(err);
      });
    });

  } else { // Loads library
    jsonfile.readFile(config, function(err, obj) {
      if (err) console.error(err);
      column.dataset.val = obj.page || 2;
      console.log(obj.library);
      if(isThere(obj.library)) {
        library.builder(obj.library);
      } else {
        libStatus.innerHTML = '<p>Library not found. Click <span class="code"><i class="fa fa-search"></i></span> to load a directory.</p>';
        console.log('Library not found.');
      }
    });
  }
};

exports.dbBuild = (filePath) => {
  dbBuild(filePath);
};

exports.library = () => {
  var obj = jsonfile.readFileSync(config);
  return obj.library || undefined;
};

exports.libSave = (filePath) => {
  libSave(filePath);
};

exports.onStart = () => {
  onStart();
};

exports.page = (val) => {
  page(val);
};
