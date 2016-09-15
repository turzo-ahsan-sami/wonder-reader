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
      // console.log(colors.cyan(array[i].name));
      $('#' + listID).append('<li class="file"><i class="fa fa-file" aria-hidden="true"></i><a href="#" onclick="file.loader(\'' + path.join(directory, encodeURIComponent(array[i].name)) + '\')">' + array[i].name + '</a></li>')
    } else if ( fs.statSync(path.join(directory, array[i].name)).isDirectory()) {
      // console.log(colors.red(array[i].name));
      var newListID = array[i].name.replace(/\s/g, "").replace(/#/g, "");
      $('#' + listID).append('<ul id=' + newListID + '><li class="folder"><i class="fa fa-folder" aria-hidden="true"></i><a href="#" onclick="#">' + array[i].name + '</a></li></ul>')
      libBuilder(path.join(directory, array[i].name), array[i].children, newListID)
    }
  };
};

exports.builder = () => {
  var config = jsonfile.readFileSync(path.join(os.tmpdir(), 'wonderReader', 'json', 'config.json'));
  var directory = config.library
  var jSon = dirTree(config.library, ['.cbz', '.cbr']);
  var listID = 'ulLib'

  libBuilder(directory, jSon.children, listID)
}
