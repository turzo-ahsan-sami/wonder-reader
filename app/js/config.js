const dirTree = require('directory-tree');
const isThere = require('is-there');
const jsonfile = require('jsonfile');
const library = require('./library.js');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');

const comics = path.join(os.tmpdir(), 'wonderReader', 'json', 'comics.json');
const configFile = path.join(os.tmpdir(), 'wonderReader', 'json', 'config.json');
const column = document.getElementById('column');
const columnIcon = document.getElementById('columnIcon');

const template = {library: '', page: 2, zoom: 100};
const libNotFound = '<p>Library not found. Click <span class="code"><i class="fa fa-search"></i></span> to load a directory.</p>';
const libIsEmpty = '<p>The library is empty. Click <span class="code"><i class="fa fa-search"></i></span> to load a directory.</p>';

// Function variables;
let configSave, databaseBuild, defaults, onStart;

// Builds a database for comics
databaseBuild = (filePath) => {
  let Files = dirTree(filePath, ['.cbr', '.cbz']);
  jsonfile.writeFile(comics, Files, {'spaces': 2}, function(err) {
    if (err) console.error(err);
    console.log(`Comic database built and saved for ${filePath}`);
  });
};

configSave = (type, val) => {
  jsonfile.readFile(configFile, function(err, obj) {
    if (err) {
      console.error(err);
      return;
    }
    obj[type] = val;
    jsonfile.writeFile(configFile, obj, function(err) {
      if (err) console.error(err);
    });
  });
};

onStart = () => {
  let libStatus= document.getElementById('libStatus');
  let obj;
  switch (isThere(configFile)) {
  case true:
    jsonfile.readFile(configFile, function(err, obj) {
      if (err) console.error(err);
      column.dataset.val = obj.page || 2;
      switch (Number(column.dataset.val)) {
      case 1:
        columnIcon.classList.remove('fa-minus-square-o');
        columnIcon.classList.add('fa-square-o');
        break;
      default:
        columnIcon.classList.remove('fa-square-o');
        columnIcon.classList.add('fa-minus-square-o');
      }
      switch (isThere(obj.library)) {
      case true:
        library.builder(obj.library);
        break;
      default:
        libStatus.innerHTML = libNotFound;
        console.log('Library not found.');
      }
    });
    break;
  default:
    obj = template;
    libStatus.innerHTML = libIsEmpty;
    mkdirp(path.dirname(configFile), function(err) {
      if (err) console.error(err);
      jsonfile.writeFile(configFile, obj, function(err) {
        if (err) console.error(err);
      });
    });
  }
};

defaults = (prop) => {
  let obj;
  if (isThere(configFile)) {
    obj = jsonfile.readFileSync(configFile);
    if (obj[prop]) {
      return obj[prop];
    } else {
      return template[prop];
    }
  } else {
    return template[prop];
  }
};

exports.databaseBuild = (filePath) => {
  databaseBuild(filePath);
};

exports.displaySave = (val) => {
  configSave('display', val);
};

exports.displayReturn = () => {
  return defaults('display') || {
    'brightness': 'brightness(1.0)',
    'contrast': 'contrast(1.0)',
    'grayscale': 'grayscale(0.0)'
  };
};

exports.library = () => {
  return defaults('library') || '';
};

exports.libSave = (filePath) => {
  configSave('library', filePath);
};

exports.onStart = () => {
  onStart();
  // start up options are passed through `options.js`
};

exports.pageReturn = () => {
  return defaults('page') || 2;
};

exports.pageViewSave = (val) => {
  configSave('page', val);
};

exports.zoomReturn = () => {
  return defaults('zoom') || 100;
};

exports.zoomSave = (val) => {
  configSave('zoom', val);
};
