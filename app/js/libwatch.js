var path = require('path');
var fs = require('fs');
var $ = require('jquery');

exports.load = (fileName) => {
  var filePath = path.dirname(fileName);
  var dirContents = fs.readdirSync(filePath);

  $('.libFile').remove();
  $('.libDir').remove();
  for (i = 0; i < dirContents.length; i++) {
    if (fs.statSync(path.join(filePath, dirContents[i])).isFile()) { // Check if file
      $("#dirLib").append('<li class="libFile"><i class="fa fa-file" aria-hidden="true"></i> ' + dirContents[i] + '</li>');
    } else if (fs.statSync(path.join(filePath, dirContents[i])).isDirectory()) { // Check if folder
      $("#dirLib").append('<li class="libDir"><i class="fa fa-folder" aria-hidden="true"></i> ' + dirContents[i] + '</li>')
    } // If neither file nor folder, do nothing.
  };
};
