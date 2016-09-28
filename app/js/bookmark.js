var fs = require('fs');
var jsonfile = require('jsonfile');
var os = require('os');
var path = require('path');

// An idea of how to appr
/*{
  fileName0: indexVal0,
  fileName1: indexVal1,
  fileName2: indexVal2,
  fileName3: indexVal3
}*/

var bookmarkFile = path.join(os.tmpdir(), 'wonderReader', 'json', 'bookmark.json');

exports.onLoad = (filePath) => {
  var json = jsonfile.readFileSync(bookmarkFile);


}
