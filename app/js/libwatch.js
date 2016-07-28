var path = require('path');
var fs = require('fs');
var $ = require('jquery');
// var exports = module.exports = {};

exports.load = (fileName) => {
  var filePath = path.dirname(fileName);
  var dirContents = fs.readdirSync(filePath);
  let libList = [];
  for (i = 0; i < dirContents.length; i++) {
    (function(i) {
      if (fs.statSync(filePath + '/' + dirContents[i]).isFile()) { // Check if file
        $("#dirLib").append('<li><i class="fa fa-file" aria-hidden="true"></i> ' + dirContents[i] + '</li>');
      } else if (fs.statSync(filePath + '/' + dirContents[i]).isDirectory()) { // Check if folder
        $("#dirLib").append('<li><i class="fa fa-folder" aria-hidden="true"></i> ' + dirContents[i] + '</li>')
      } // If neither file nor folder, do nothing.
    })(i);
  };
  // console.log(dirContents);
  console.log(libList);
};
