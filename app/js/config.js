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
const columnIcon = document.getElementById('columnIcon');

const template = {library: '', page: 2, zoom: 100};

// Function variables;
let configSave, dbBuild, defaults, onStart;

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
    if (err) {
      console.error(err);
      return;
    }
    obj[type] = val;
    jsonfile.writeFile(config, obj, function(err) {
      if (err) console.error(err);
    });
  });
};

onStart = () => {
  let libStatus= document.getElementById('libStatus');
  let obj;
  switch (isThere(config)) {
  case true:
    jsonfile.readFile(config, function(err, obj) {
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
        libStatus.innerHTML = '<p>Library not found. Click <span class="code"><i class="fa fa-search"></i></span> to load a directory.</p>';
        console.log('Library not found.');
      }
    });
    break;
  default:
    obj = template;
    libStatus.innerHTML = '<p>The library is empty. Click <span class="code"><i class="fa fa-search"></i></span> to load a directory.</p>';
    mkdirp(path.dirname(config), function(err) {
      if (err) console.error(err);
      jsonfile.writeFile(config, obj, function(err) {
        if (err) console.error(err);
      });
    });
  }
};

defaults = (prop) => {
  let def = template;
  let obj;
  if (isThere(config)) {
    obj = jsonfile.readFileSync(config);
    if (obj[prop]) {
      return obj[prop];
    } else {
      return def[prop];
    }
  } else {
    return def[prop];
  }
};

exports.dbBuild = (filePath) => {
  dbBuild(filePath);
};

exports.library = () => {
  return defaults('library') || '';
};

exports.libSave = (filePath) => {
  configSave('library', filePath);
};

exports.onStart = () => {
  onStart();
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
