var coverGen = require('ebook-cover-generator'); // https://www.npmjs.com/package/ebook-cover-generator
var fs = require('fs');
var path = require('path');
const {dialog} = require('electron').remote;
var jsonfile = require('jsonfile'); // https://www.npmjs.com/package/jsonfile
var dirTree = require('./directory-tree.js') // https://github.com/mihneadb/node-directory-tree

var configFile = './json/config.json';

var obj = jsonfile.readFileSync(configFile);

if (obj.library == "#") {
  newLibrary(configFile);
  var obj = jsonfile.readFileSync(configFile);
  loadLibrary(obj);
} else {
  loadLibrary(obj);
}

// --- Functions --- //

function newLibrary(configFile) {
  dialog.showOpenDialog( // Limited to directories
    { properties: ['openDirectory'] },
    function(filenames) {
      var newLib = {libary: filenames};
      jsonfile.writeFileSync(configFile, newLib)
    }
  );
};

function loadLibrary(obj) {
  var directory = obj.library;
  var fileTypes = ['cbr', 'cbz'];
  var tree = dirTree(obj.library, fileTypes)
}
