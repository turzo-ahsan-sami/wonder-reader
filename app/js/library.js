// library.js : to populate the library with an interactive list of available selections

var $ = require('jquery');
var colors = require('colors');
var dirTree = require('directory-tree'); // https://www.npmjs.com/package/directory-tree
var fs = require('fs');
var jsonfile = require('jsonfile'); // https://www.npmjs.com/package/jsonfile
var os = require('os');
var path = require('path');

// jsonfile.writeFileSync(output, jSon, {spaces: 2});

function libBuilder(directory, array, listID) {
  for (var i=0; i < array.length; i++) {
    if (fs.statSync(path.join(directory, array[i].name)).isFile()) {

      newDirectory = dirEncode(directory);

      $('#' + listID).append('<li class="file"><a href="#" onclick="file.loader(\'' + path.join(newDirectory, encodeURIComponent(array[i].name)) + '\')"><i class="fa fa-file" aria-hidden="true"></i>' + array[i].name + '</a></li>')
    } else if ( fs.statSync(path.join(directory, array[i].name)).isDirectory()) {

      var newListID = array[i].name.replace(/\s|#|\(|\)|\'|,|&/g, "");
      $('#' + listID).append('<ul id=' + newListID + '><li class="folder"><a href="#" onclick="#"><i class="fa fa-folder" aria-hidden="true"></i>' + array[i].name + '</a></li>');
      libBuilder(path.join(directory, array[i].name), array[i].children, newListID);
      $('#' + listID).append('</ul>');
    }
  };
};

function dirEncode(oldPath) {
  var newPath = '';
  var tempPath = oldPath.split(path.sep);

  for (j=0; j < tempPath.length; j++) {
    newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
  };

  if (process.platform != "win32") {
    newPath = '/' + newPath;
  };

  return newPath;
};

exports.builder = () => {
  var config = jsonfile.readFileSync(path.join(os.tmpdir(), 'wonderReader', 'json', 'config.json'));
  var directory = config.library
  var jSon = dirTree(directory, ['.cbz', '.cbr']);
  var listID = 'ulLib';

  libBuilder(directory, jSon.children, listID)
}
