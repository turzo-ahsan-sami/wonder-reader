/* file.js
/  loads files into the program,
/  extracting and sourcing images
/  to where they need to go. */

const $ = require('jquery');
const {dialog} = require('electron').remote;
var directoryExists = require('directory-exists'); // https://www.npmjs.com/package/directory-exists
var extract = require('extract-zip'); // https://www.npmjs.com/package/extract-zip
var fs = require('fs');
var mkdirp = require('mkdirp'); // https://github.com/substack/node-mkdirp
var os = require('os'); // https://nodejs.org/api/os.html
var path = require('path');
var unrar = require('node-unrar'); // https://github.com/scopsy/node-unrar
// User Modules //
var libWatch = require('./libwatch.js'); // libWatch.load(fileName) loads into #library.ul
var nextcomic = require('./nextcomic.js'); // Loads Functions onto previous and next buttons
var page = require('./page.js');
var strain = require('./strain.js');
// var validChar = '/^([!#$&-;=?-[]_a-z~]|%[0-9a-fA-F]{2})+$/g';

var imgTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']; // Allowable File Types

function openFile() {
  dialog.showOpenDialog(
    { filters: [{
      name: 'Comic Files',
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

  // tempFolder Variable for loaded comic
  var tempFolder = path.join(os.homedir(), 'Documents', '.wonderReader', 'cache', fileComic);

  if (directoryExists.sync(tempFolder)) { // Checks for existing Directory
    console.log(tempFolder + " previously created.")
    var dirContents = fs.readdirSync(tempFolder);
    var filtered = [];
    for(i=0; i < dirContents.length; i++) {
      if(imgTypes.indexOf(path.extname(dirContents[i]).toLowerCase()) > -1 || fs.statSync(path.join(tempFolder,dirContents[i])).isDirectory()) {
        filtered.push(dirContents[i]);
      } else {
        console.log(dirContents[i] + " rejected!")
      }
    };
    dirContents = filtered;
    if (fs.statSync(path.join(tempFolder, dirContents[0])).isDirectory()) { // If there is an interior directory
      console.log(dirContents[0] + " is a directory. Moving into new directory.")
      fileComic = path.join(fileComic, encodeURIComponent(dirContents[0]));
      dirContents = fs.readdirSync(path.join(tempFolder, dirContents[0]));
      console.log(path.join(tempFolder, dirContents[0]));
    } else { // if no interior directory exists
      console.log(dirContents[0]);
    };
    postExtract(fileName, fileComic, dirContents);

  } else { // If no Directory exists
    mkdirp.sync(tempFolder);

    // -----------------------
    // .CBR file type function
    // -----------------------
    if (path.extname(fileName).toLowerCase() == ".cbr") {
      var rar = new unrar(fileName);
      rar.extract(tempFolder, null, function (err) {
        var dirContents = fs.readdirSync(tempFolder);

        $('#loader').addClass('hidden').removeClass('loader');
        $('#bgLoader').addClass('hidden');

        postExtract(fileName, fileComic, dirContents);
      });

    // -----------------------
    // .CBZ file type function
    // -----------------------
    } else if (path.extname(fileName).toLowerCase() == ".cbz") {
      extract(fileName, {dir: tempFolder}, function(err) {
        var dirContents = fs.readdirSync(tempFolder);

        // To clean out other files and check for folders
        var filtered = [];
        for(i=0; i < dirContents.length; i++) {
          if(imgTypes.indexOf(path.extname(dirContents[i]).toLowerCase()) > -1 || fs.statSync(path.join(tempFolder,dirContents[i])).isDirectory()) {
            filtered.push(dirContents[i]);
          } else {
            console.log(dirContents[i] + " rejected!")
          }
        };
        dirContents = filtered;
        // Checks for interior folders
        if (fs.statSync(path.join(tempFolder, dirContents[0])).isDirectory()) {
          fileComic = path.join(fileComic, encodeURIComponent(dirContents[0]));
          dirContents = fs.readdirSync(path.join(tempFolder, dirContents[0]));
        }

        $('#loader').addClass('hidden').removeClass('loader');
        $('#bgLoader').addClass('hidden');

        postExtract(fileName, fileComic, dirContents)
      });
    // Neither .CBR nor .CBZ
    } else {
      handleError(evt)
    };
    // Async class adding then hidden on final load
    $('#loader').addClass('loader').removeClass('hidden');
    $('#bgLoader').removeClass('hidden');
  }; // End Directory checker
};

function enable(id) {
  document.getElementById(id).disabled = false;
};
function disable(id) {
  document.getElementById(id).disabled = true;
};

function postExtract(fileName, fileComic, dirContents) {
  var inner = document.getElementById('innerWindow');
  var viewOne = document.getElementById('viewImgOne');
  var viewTwo = document.getElementById('viewImgTwo');

  dirContents = strain(dirContents)

  viewOne.src = path.join(os.homedir(), 'Documents', '.wonderReader', 'cache', fileComic, encodeURIComponent(dirContents[0]));
  viewTwo.src = path.join(os.homedir(), 'Documents', '.wonderReader', 'cache', fileComic, encodeURIComponent(dirContents[1]));

  page.onLoad();
  enable("pageLeft");
  enable("pageRight");
  enable("column");
  libWatch.load(fileName); // libwatch.js
  nextcomic.load(fileName);

  if(viewOne.clientHeight >= viewTwo.clientHeight) {
    inner.style.height = viewOne.clientHeight + "px";
  } else {
    inner.style.height = viewTwo.clientHeight + "px";
  };
  console.log('postExtract initial inner.style.height set at: ' + inner.style.height)
};

exports.dialog = () => {
  openFile();
}

exports.loader = (fileName) => {
  filePiper(fileName);
}
