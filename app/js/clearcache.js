var rimraf = require('rimraf');
var fs = require('fs');

exports.trashIt = () => {
  var cache = './app/cache';
  var cacheContents = fs.readdirSync(cache);
  for(i=0; i < cacheContents.length; i++)
  (function(i) {
    if(fs.statSync(path.join(cache,cacheContents[i])).isDirectory()) {
      rimraf.sync(path.join(cache, cacheContents[i]));
      console.log(cacheContents[i] + ' trashed!')
    } else {
      //do nothing
    };
  })(i);
}
