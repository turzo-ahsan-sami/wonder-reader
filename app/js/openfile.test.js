var fs = require('fs'); // https://nodejs.org/api/fs.html#fs_file_system
const {dialog} = require('electron').remote; // http://electron.atom.io/docs/api/dialog/
var unrar = require('node-unrar'); // https://github.com/scopsy/node-unrar
var mkdirp = require('mkdirp'); // https://github.com/substack/node-mkdirp
var path = require('path'); // https://nodejs.org/api/path.html
var extract = require('extract-zip'); // https://www.npmjs.com/package/extract-zip
var directoryExists = require('directory-exists'); // https://www.npmjs.com/package/directory-exists

var imgTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']; // Allowable File Types

function filePiper(fileName, err) { // checks and extracts files and then loads them
  if (err) {
    handleError(err);
  };
  // Folder Creation
  if ([".cbr", ".cbz"].indexOf(path.extname(fileName).toLowerCase()) > -1) {
    var fileComic = path.posix.basename(fileName).replace(/#/g, ""); // Function removes path dir, spaces, and '#'. Good to note!
    if (process.platform == 'win32') {
      fileComic = path.win32.basename(fileName).replace(/#/g, "");
    }
  } else {
    handleError(evt)
  }
  var tempFolder = path.join("app", "cache", fileComic); // tempFolder Variable for loaded comic

  if (directoryExists.sync(tempFolder)) { // Checks for existing Directory
    console.log(tempFolder + " previously created.")
    var dirContents = fs.readdirSync(tempFolder);
    if (fs.statSync(path.join(tempFolder, dirContents[0])).isDirectory()) {
      console.log(dirContents[0] + " is a directory. Moving into new directory.")
      var fileComic = path.join(fileComic, dirContents[0]);
      var dirContents = fs.readdirSync(tempFolder);
    } else {
      var dirContents = dirContents.filter(function(x, i) {return imgTypes.indexOf(path.extname(dirContents[i]).toLowerCase()) > -1});
      console.log(dirContents);
      document.getElementById("viewImgOne").src = path.join('cache', fileComic, encodeURIComponent(dirContents[0]));
      document.getElementById("viewImgTwo").src = path.join('cache', fileComic, encodeURIComponent(dirContents[1]));
    };
    postExtract(fileName);

  } else { // If no Directory exists
    mkdirp.sync(tempFolder);

      // .CBR file type function
    if (path.extname(fileName).toLowerCase() == ".cbr") {
      var rar = new unrar(fileName);
      rar.extract(tempFolder, null, function (err) {
        var dirContents = fs.readdirSync(tempFolder);
        var dirContents = dirContents.filter(function(x, i) {return imgTypes.indexOf(path.extname(dirContents[i]).toLowerCase()) > -1}); // Cleans out the crap :: see imgTypes[...] @ line 12
        console.log(dirContents)
        $('#loader').addClass('hidden').removeClass('loader');
        document.getElementById("viewImgOne").src = path.join('cache', fileComic, encodeURIComponent(dirContents[0])); // Loads array[0] into window
        document.getElementById("viewImgTwo").src = path.join('cache', fileComic, encodeURIComponent(dirContents[1])); // Loads array[1] into window
        postExtract(fileName);
      });

      // .CBZ file type function
    } else if (path.extname(fileName).toLowerCase() == ".cbz") {
      extract(fileName, {dir: tempFolder}, function(err) {
        var dirContents = fs.readdirSync(tempFolder);
        if (fs.statSync(path.join(tempFolder, dirContents[0])).isDirectory()) {
          var zipDir = dirContents[0];
          var dirContents = fs.readdirSync(path.join(tempFolder, zipDir));
          console.log('zipDir created as ' + zipDir)
        } else {
          var zipDir = ''; // Creates empty string
          console.log('openfile.js @ line 53 :: Empty zipDir string created')
        }
        var dirContents = dirContents.filter(function(x, i) {return imgTypes.indexOf(path.extname(dirContents[i]).toLowerCase()) > -1});
        // Cleans out the non-image files :: see imgTypes[...] @ line 12
        $('#loader').addClass('hidden').removeClass('loader');
        document.getElementById("viewImgOne").src = path.join('cache', fileComic, encodeURIComponent(zipDir), encodeURIComponent(dirContents[0])); // Loads array[0] into window
        document.getElementById("viewImgTwo").src = path.join('cache', fileComic, encodeURIComponent(zipDir), encodeURIComponent(dirContents[1])); // Loads array[1] into window
        postExtract(fileName)
      });

      // Neither .CBR nor .CBZ
    } else {
      handleError(evt)
    };
    $('#loader').addClass('loader').removeClass('hidden');
  }; // End Directory checker
};

function openFile() {
  dialog.showOpenDialog(
    { filters: [{
      name: 'Comic Files (.cbr, .cbz)',
      extensions: ['cbr', 'cbz']
      }]
    },

    // Open File function
    function(fileNames) {
      if (fileNames === undefined) return; // Breaks on error
      var fileName = fileNames[0]; // Filepath name
      filePiper(fileName); // Extracts files to their proper locations
		}
  );
};

exports.Dialog = () => { // See page.spread()
  openFile();
};
exports.Open = (fileName) => { // See page.spread()
  filePiper(filename);
}
