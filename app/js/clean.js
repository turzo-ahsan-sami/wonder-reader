// clean.js clears out old cache files. Might be worth doing at app.close

const fs = require('fs');
const getSize = require('get-folder-size');
const os = require('os');
const path = require('path');
const rimraf = require('rimraf');

exports.trash = () => {
  var tempDir = path.join(os.tmpdir(), 'wonderReader', 'cache');
  getSize(tempDir, function(err,size) {
    var cacheSize = size / 1024 / 1024
    var r = confirm(`This will clear your Wonder Reader cache (Currently ${cacheSize.toFixed(2)} Mb. \n\nContinue?`)
    if (r == true) {
      clearCache(tempDir);
    };
  });
};

exports.autoTrash = () => {
  var tempDir = path.join(os.tmpdir(), 'wonderReader', 'cache');
  clearCache(tempDir);
}

function clearCache(tempDir) {
  console.log(tempDir);
  var cacheContents = fs.readdirSync(tempDir);
  var currentDirArray = path.dirname(decodeURI(document.getElementById('viewImgOne').src.substr(7))).split(path.sep);
  var currentDir = currentDirArray[currentDirArray.indexOf('cache')+1];

  for(let i=0; i < cacheContents.length; i++) {
    if (cacheContents[i] != currentDir && fs.statSync( path.join(tempDir,cacheContents[i])).isDirectory() ) {
      rimraf.sync(path.join(tempDir, cacheContents[i])); // Deletes older directories
    };
  };
};
