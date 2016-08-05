var sizeOf = require('image-size'),
    path = require('path'),
    fs = require('fs');

exports.fold = (id) => {
  var filePath = decodeURI(document.getElementById(id).src.substr(7)), // removes file:// from PATH
      fileDir = path.dirname(filePath), // Directory
      dirContents = fs.readdirSync(fileDir), // Directory
      fileName = path.basename(filePath),
      spread = [];

      console.log(fileDir);
      console.log(dirContents.length);

      console.log(sizeOf(path.join(fileDir, dirContents[0])).width);
      console.log(sizeOf(path.join(fileDir, dirContents[0])).height);

      for(var i = 0; i < dirContents.length; i++) {
        (function(i) {
          var dimensions = sizeOf(path.join(fileDir, dirContents[i]));
          var width = dimensions.width;
          var height = dimensions.height;

          if ( width >= height ) {
            spread.push(i);
            console.log(i);
          } else {
            // Do Nothing!
          };
        })(i);
      };

      console.log(spread);
      return spread;
}
