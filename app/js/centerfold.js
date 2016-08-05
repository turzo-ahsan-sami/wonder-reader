var sizeOf = require('image-size'),
    path = require('path'),
    fs = require('fs');

exports.fold = (id) => {
  var filePath = decodeURI(document.getElementById(id).src.substr(7)), // removes file:// from PATH
      fileDir = path.dirname(filePath), // Directory
      dirContents = fs.readdirSync(fileDir), // Directory
      fileName = path.basename(filePath),
      spread = []

      console.log(fileDir);

      for(i=0; i < dirContents.length; i++) {
        (function(i) {
          var dimensions = sizeOf(path.join(fileDir, dirContents[i])),
              w = dimensions.width,
              h = dimensions.height;

          if ( w > h ) {
            spread.push(i)
          } else {
            // Do nothing
          };
        });
      };

      console.log(spread);
      return spread;
}
