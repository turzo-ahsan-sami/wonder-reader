// clean.js clears out old cache files. Might be worth doing at app.close

const fs = require('fs');
const getSize = require('get-folder-size');
const os = require('os');
const path = require('path');
const rimraf = require('rimraf');

exports.trash = () => {
  let tempDir = path.join(os.tmpdir(), 'wonderReader', 'cache');
  getSize(tempDir, function(err,size) {
    let cacheSize = size / 1024 / 1024;
    let r = confirm(`This will clear your Wonder Reader cache (Currently ${cacheSize.toFixed(2)} Mb. \n\nContinue?`)
    if (r == true) {
      clearCache(tempDir);
    };
  });
};

exports.autoTrash = () => {
  let tempDir = path.join(os.tmpdir(), 'wonderReader', 'cache');
  clearCache(tempDir);
}

function clearCache(tempDir) {
  console.log(tempDir);
  let cacheContents = fs.readdirSync(tempDir);
  let currentDirArray = path.dirname(decodeURI(document.getElementById('viewImgOne').src.substr(7))).split(path.sep);
  let currentDir = currentDirArray[currentDirArray.indexOf('cache')+1]; // Finds /path/to/wonderReader/cache, and pulls the next folder in

  for(let i=0; i < cacheContents.length; i++) {
    if (cacheContents[i] != currentDir && fs.statSync( path.join(tempDir,cacheContents[i])).isDirectory() ) {
      rimraf.sync(path.join(tempDir, cacheContents[i])); // Deletes older directories
    };
  };
};
