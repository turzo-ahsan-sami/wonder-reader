var path = require('path');
var fs = require('fs');
var $ = require('jquery');

exports.load = (fileName) => {
  var filePath = path.dirname(fileName);
  var dirContents = fs.readdirSync(filePath);

  $('.libFile').remove();
  $('.libDir').remove();
  for (i = 0; i < dirContents.length; i++) {
    if (fs.statSync(path.join(filePath, dirContents[i])).isFile() && ['.cbr', '.cbz'].indexOf(path.extname(dirContents[i]).toLowerCase()) > -1) {
      // Check if file and if .cbr or .cbz
      $("#dirLib").append('<li class="libFile"><a href="#" onclick="filePiper(\'' + path.join(filePath, dirContents[i]) + '\')"><i class="fa fa-file" aria-hidden="true"></i> ' + dirContents[i].slice(0,-4) + '</a></li>');
    } else if (fs.statSync(path.join(filePath, dirContents[i])).isDirectory()) {
      // Check if folder
      $("#dirLib").append('<li class="libDir"><a href="#" onclick=""><i class="fa fa-folder" aria-hidden="true"></i> ' + dirContents[i] + '</a></li>')
    }
      // If neither file nor folder, do nothing.
  };
};
