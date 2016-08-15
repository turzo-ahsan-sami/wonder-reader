var rimraf = require('rimraf');
var fs = require('fs');
var path = require('path');
var getSize = require('get-folder-size');

exports.trash = () => {
  var cache = './app/cache';
  getSize(cache, function(err,size) {
    var cacheSize = size / 1024 / 1024
    var r = confirm('This will clear your Wonder Reader cache (Currently ' + cacheSize.toFixed(2) + ' Mb). \n\nContinue?')
    if (r == true) {
      var cacheContents = fs.readdirSync(cache);
      var currentDirArray = path.dirname(decodeURI(document.getElementById('viewImgOne').src.substr(7))).split(path.sep);
      var currentDir = currentDirArray[currentDirArray.indexOf('cache')+1];

      console.log(currentDir)
      for(i=0; i < cacheContents.length; i++) {
        (function(i) {
          if(cacheContents[i] == currentDir) {
            console.log(currentDir + " saved!") // Does not delete current loaded directory
          } else if (fs.statSync(path.join(cache,cacheContents[i])).isDirectory()) {
            rimraf.sync(path.join(cache, cacheContents[i])); // Deletes older directories
            console.log(cacheContents[i] + ' trashed!')
          } else {
            // do nothing
          };
        })(i);
      };
    } else {
      // do nothing
    };
  });
};
