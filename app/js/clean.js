// clean.js clears out old cache files. Might be worth doing at app.close

const decode = require('./decode.js');
const fs = require('fs');
const getSize = require('get-folder-size');
const os = require('os');
const path = require('path');
const rimraf = require('rimraf');

const cacheDirectory = path.join(os.tmpdir(), 'wonderReader', 'cache');
const viewOne = document.getElementById('viewImgOne');

// Function variable
let clearCache;

// Cleans out the crap
exports.trash = () => {
  getSize(cacheDirectory, function (err, size) {
    if (err) console.error(err);
    let cacheSize = size / 1024 / 1024;
    let r = confirm(`This will clear your Wonder Reader cache (Currently ${cacheSize.toFixed(2)} Mb). \n\nContinue?`);
    if (r === true) {
      clearCache(cacheDirectory);
    }
  });
};

// For when I ever plan to introduce an autoCleaning feature
exports.autoTrash = () => {
  clearCache(cacheDirectory);
};

// The crap cleaner function itself
clearCache = (directory) => {
  let cacheContents, pathSep, currentDirectory;

  cacheContents = fs.readdirSync(directory);
  pathSep = decode(viewOne).split(path.sep);

  // Finds /path/to/wonderReader/cache, and calls the next folder in
  currentDirectory = pathSep[pathSep.indexOf('cache') + 1];

  for (let i = 0; i < cacheContents.length; i++) {
    let item = path.join(directory, cacheContents[i]);
    if (cacheContents[i] !== currentDirectory && fs.statSync(item).isDirectory()) {
      rimraf.sync(item); // Deletes older directories for cached comics
    }
  }
};
