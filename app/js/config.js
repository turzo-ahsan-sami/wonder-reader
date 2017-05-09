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
let configSave, dbBuild, onStart;

// Builds a database for comics
dbBuild = (filePath) => {
  let Files = dirTree(filePath, ['.cbr', '.cbz']);
  jsonfile.writeFile(comics, Files, {'spaces': 2}, function(err) {
    if (err) console.error(err);
    console.log(`Comic database built and saved for ${filePath}`);
  });
};

configSave = (type, val) => {
  jsonfile.readFile(config, function(err, obj) {
    if (err) console.error(err);
    obj[`${type}`] = val;
    jsonfile.writeFile(config, obj, function(err) {
      if (err) console.error(err);
    });
  });
};

onStart = () => {
  let libStatus= document.getElementById('libStatus');
  let obj = {};
  switch (isThere(config)) {
  case true:
    jsonfile.readFile(config, function(err, obj) {
      if (err) console.error(err);
      column.dataset.val = obj.page || 2;
      switch (Number(column.dataset.val)) {
      case 1:
        column.classList.add('disabled');
        break;
      default:
        column.classList.remove('disabled');
      }
      switch (isThere(obj.library)) {
      case true:
        library.builder(obj.library);
        break;
      default:
        libStatus.innerHTML = '<p>Library not found. Click <span class="code"><i class="fa fa-search"></i></span> to load a directory.</p>';
        console.log('Library not found.');
      }
    });
    break;
  default:
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
  configSave('library', filePath);
};

exports.onStart = () => {
  onStart();
};

exports.pageReturn = () => {
  let obj = jsonfile.readFileSync(config);
  return obj.page || undefined;
};

exports.pageViewSave = (val) => {
  configSave('page', val);
};

exports.zoomReturn = () => { // for future exports
  let obj;
  if (isThere(config)) {
    obj = jsonfile.readFileSync(config);
    if (obj.zoom) {
      return obj.zoom;
    } else {
      return 100;
    }
  } else {
    return 100;
  }
};

exports.zoomSave = (val) => {
  configSave('zoom', val);
};
