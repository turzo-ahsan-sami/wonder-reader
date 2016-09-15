var colors = require('colors');
var dirTree = require('directory-tree'); // https://www.npmjs.com/package/directory-tree
var fs = require('fs');
var jsonfile = require('jsonfile'); // https://www.npmjs.com/package/jsonfile
var path = require('path');

var config = jsonfile.readFileSync(path.join(os.tmpdir(),'json', 'config.json');
var directory = config.library
var jSon = dirTree(config.library, ['.cbz', '.cbr']);

// jsonfile.writeFileSync(output, jSon, {spaces: 2});

console.log(jSon.children.length)

libBuilder(directory, jSon.children)

function libBuilder(directory, array) {
  for (var i=0; i < array.length; i++) {
    if (fs.statSync(path.join(directory, array[i].name)).isFile()) {
      console.log(' ' + colors.cyan(array[i].name))
    } else if ( fs.statSync(path.join(directory, array[i].name)).isDirectory()) {
      console.log(' ' + colors.red(array[i].name));
      libBuilder(path.join(directory, array[i].name), array[i].children)
    }
  };
}
