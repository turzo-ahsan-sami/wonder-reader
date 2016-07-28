

var fs = require('fs');
// var $ = require('jquery');
var dir = './';

var libWatcher = function(dir) {
  var dirContents = fs.readdirSync(dir);
  let libList = [];
  for (i = 0; i < dirContents.length; i++) {
    (function(i) {
      if (fs.statSync(dirContents[i]).isFile()) { // Check if file
        libList.push('<li><i class="fa fa-file" aria-hidden="true"></i> ' + dirContents[i] + '</li>')
      } else if (fs.statSync(dirContents[i]).isDirectory()) { // Check if folder
        libList.push('<li><i class="fa fa-folder" aria-hidden="true"></i> ' + dirContents[i] + '</li>')
      } // If neither file nor folder, do nothing.
    })(i);
  };
  // console.log(dirContents);
  console.log(libList);
};
console.log(dir);
libWatcher(dir);
