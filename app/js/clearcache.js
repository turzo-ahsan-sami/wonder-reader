var rimraf = require('rimraf');
var fs = require('fs');
var path = require('path');

exports.trashIt = () => {
  var r = confirm('This will clear your Wonder Reader cache. Continue?')
  if (r == true) {
    var cache = './app/cache';
    var cacheContents = fs.readdirSync(cache);
    var currentDirArray = path.dirname(decodeURI(document.getElementById('viewImgOne').src.substr(7))).split(path.sep);
    var d = currentDirArray.length;
    var currentDir = currentDirArray[d-1];

    console.log(d)
    console.log(currentDir)
    for(i=0; i < cacheContents.length; i++) {
      (function(i) {
        if(cacheContents[i] == currentDir) {
          console.log(currentDir + " saved!")
        } else if (fs.statSync(path.join(cache,cacheContents[i])).isDirectory()) {
          rimraf.sync(path.join(cache, cacheContents[i]));
          console.log(cacheContents[i] + ' trashed!')
        } else {
          // do nothing
        };
      })(i);
    };
  } else {
    // do nothing
  };
};
