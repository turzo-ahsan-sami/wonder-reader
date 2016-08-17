var fs = require('fs'); // https://nodejs.org/api/fs.html#fs_file_system
const {dialog} = require('electron').remote; // http://electron.atom.io/docs/api/dialog/
var unrar = require('node-unrar'); // https://github.com/scopsy/node-unrar
const $ = require('jquery'); // https://www.npmjs.com/package/jquery
var mkdirp = require('mkdirp'); // https://github.com/substack/node-mkdirp
var path = require('path'); // https://nodejs.org/api/path.html
var extract = require('extract-zip'); // https://www.npmjs.com/package/extract-zip
var directoryExists = require('directory-exists'); // https://www.npmjs.com/package/directory-exists
var libWatch = require('./js/libwatch.js'); // libWatch.load(fileName) loads into #library.ul
var clean = require('./js/clean.js'); // Trash that old shit!
var nextcomic = require('./js/nextcomic.js'); // Loads Functions onto previous and next buttons
var page = require('./js/page.js')
// var validChar = '/^([!#$&-;=?-[]_a-z~]|%[0-9a-fA-F]{2})+$/g';

var imgTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']; // Allowable File Types

function filePiper(fileName, err) { // checks and extracts files and then loads them
  if (err) {
    handleError(err);
  };
  // Folder Creation
  if ([".cbr", ".cbz"].indexOf(path.extname(fileName).toLowerCase()) > -1) {
    var fileComic = path.posix.basename(fileName).replace(/#/g, ""); // Function removes path dir, spaces, and '#'. Good to note!
    if (process.platform == 'win32') {
      fileComic = path.win32.basename(fileName).replace(validChar, "");
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
  dialog.showOpenDialog( // Limits openFile to .cbr files
    { filters: [{
      name: 'Comic Files (.cbr, .cbz)',
      extensions: ['cbr', 'cbz']
      }]
    },

    // Open File function
    function(fileNames) {
      if (fileNames === undefined) return; // Breaks on error
      var fileName = fileNames[0]; // Filepath name
      filePiper(fileName); // Streams and unrars .cbr into tempFolder
		}
  );
};

function enable(id) {
  document.getElementById(id).disabled = false;
};
function disable(id) {
  document.getElementById(id).disabled = true;
};

function postExtract(fileName) {
  page.onLoad();
  enable("pageLeft");
  enable("pageRight");
  enable("column");
  libWatch.load(fileName); // libwatch.js
  nextcomic.load(fileName);
};

$(document).keydown(function(event) {
  if (document.activeElement.id == 'zoomText' || document.activeElement.id == 'zoomSlider') {
    // Do nothing when focused on zoom input
  } else {
    if (event.which == 37) { // left key
      page.Left();
    } else if (event.which == 39) { // right key
      page.Right();
    };
  };
});

function handleError(evt) {
  if (evt.message) { // Chrome sometimes provides this
    alert("Error: "+evt.message +"  at linenumber: "+evt.lineno+" of file: "+evt.filename);
  } else {
    alert("Error: "+evt.type+" from element: "+(evt.srcElement || evt.target));
  }
};
window.addEventListener("error", handleError, true);

document.getElementById('dirLib').style.height = window.innerHeight - 56 +'px';
window.onresize = function() {
  document.getElementById('dirLib').style.height = window.innerHeight - 56 +'px';
}
