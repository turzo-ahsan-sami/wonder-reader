var fs = require('fs'); // https://nodejs.org/api/fs.html#fs_file_system
const {dialog} = require('electron').remote; // http://electron.atom.io/docs/api/dialog/
var unrar = require('node-unrar'); // https://github.com/scopsy/node-unrar
const $ = require('jquery');
var mkdirp = require('mkdirp'); // https://github.com/substack/node-mkdirp
var path = require('path'); // https://nodejs.org/api/path.html
var extract = require('extract-zip'); // https://www.npmjs.com/package/extract-zip
var libWatch = require('./js/libwatch.js'); // libWatch.load(fileName) loads into #library.ul
var clearcache = require('./js/clearcache'); // Trash that old shit!
var page = require('./js/pageturn.js'); // Page turning functionality
var nextcomic = require('./js/nextcomic.js'); // Loads Functions onto previous and next buttons
var center = require('./js/centerfold.js'); // Checks to see if comic has any two page spreads

var validChar = '/^([!#$&-;=?-[]_a-z~]|%[0-9a-fA-F]{2})+$/g';
var imgTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']; // Allowable File Types

function filePiper(fileName, err) { // Streams files passed through the program.

  // Folder Creation
  if ([".cbr", ".cbz"].indexOf(path.extname(fileName).toLowerCase()) > -1) {
    var fileComic = path.posix.basename(fileName).replace(/#/g, ""); // Function removes path dir, spaces, and '#'. Good to note!
    if (process.platform == 'win32') {
      fileComic = path.win32.basename(fileName).replace(validChar, "");
    }
  } else {
    // insert Error function here
  }
  // console.log(fileComic);
  var tempFolder = path.join("app", "cache", fileComic); // tempFolder Variable for loaded comic
  // console.log(tempFolder);
  mkdirp.sync(tempFolder);

    // .CBR file type function
  if (path.extname(fileName).toLowerCase() == ".cbr") {
    var rar = new unrar(fileName);
    rar.extract(tempFolder, null, function (err) {
      var dirContents = fs.readdirSync(tempFolder);
      console.log(dirContents)
      var dirContents = dirContents.filter(function(x, i) {return imgTypes.indexOf(path.extname(dirContents[i]).toLowerCase()) > -1}); // Cleans out the crap :: see imgTypes[...] @ line 12
      console.log(dirContents)
      $('#loader').addClass('hidden').removeClass('loader');
      document.getElementById("viewImgOne").src = path.join('cache', fileComic, encodeURIComponent(dirContents[0])); // Loads array[0] into window
      document.getElementById("viewImgTwo").src = path.join('cache', fileComic, encodeURIComponent(dirContents[1])); // Loads array[1] into window
      postExtract(fileName)
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
    alert("I don't think that is a comic you picked.");
  };
  $('#loader').addClass('loader').removeClass('hidden');

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
      // console.log(fileNames); // Logs file in dev tools console
      if (fileNames === undefined) return; // Breaks on error
      var fileName = fileNames[0]; // Filepath name
      // console.log(fileName);
      filePiper(fileName); // Streams and unrars .cbr into tempFolder
      // console.log('interior sync log @ line 28');
		}
  )
};

function enable(id) {
  document.getElementById(id).disabled = false;
};
function disable(id) {
  document.getElementById(id).disabled = true;
};

function postExtract(fileName) {
  enable("pageLeft");
  enable("pageRight");
  libWatch.load(fileName); // libwatch.js
  nextcomic.load(fileName);
  center.fold("viewImgOne");
}

$(document).keydown(function(event) {
  if (document.activeElement.id == 'zoomText' || document.activeElement.id == 'zoomSlider') {
    // Do nothing when focused on zoom input
  } else {
    if (event.which == 37) { // left key
      page.pageLeft();
    } else if (event.which == 39) { // right key
      page.pageRight();
    };
  };
});
