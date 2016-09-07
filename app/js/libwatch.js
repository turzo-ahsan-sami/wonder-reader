// libWatch.load(fileName) loads into #library.ul

var $ = require('jquery');
var fs = require('fs');
var path = require('path');

exports.load = (fileName) => {
  var baseName = path.basename(fileName);
  var filePath = path.dirname(fileName);
  var dirContents = fs.readdirSync(filePath);

  $('.libFile').remove();
  $('.libDir').remove();
  for (i = 0; i < dirContents.length; i++) {
    if (fs.statSync(path.join(filePath, dirContents[i])).isFile() && ['.cbr', '.cbz'].indexOf(path.extname(dirContents[i]).toLowerCase()) > -1) {

      if (dirContents[i] == baseName) {
        $("#dirLib").append('<li class="libFile current"><span><i class="fa fa-file" aria-hidden="true"></i> ' + dirContents[i].slice(0,-4) + '</span></li>');
      } else {
        $("#dirLib").append('<li class="libFile"><a href="#" onclick="file.loader(\'' + path.join(filePath, dirContents[i]) + '\')"><i class="fa fa-file" aria-hidden="true"></i> ' + dirContents[i].slice(0,-4) + '</a></li>');
      };
    } else if (fs.statSync(path.join(filePath, dirContents[i])).isDirectory()) {
      // Check if folder
      $("#dirLib").append('<li class="libDir"><a href="#" onclick=""><i class="fa fa-folder" aria-hidden="true"></i> ' + dirContents[i] + '</a></li>')
    };
  };
};
