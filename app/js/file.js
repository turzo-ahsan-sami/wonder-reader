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
var directory = require('./dir-merge.js');
var libWatch = require('./libwatch.js');
var nextcomic = require('./nextcomic.js');
var page = require('./page.js');
var strain = require('./strain.js');

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

  if ([".cbr", ".cbz"].indexOf(path.extname(fileName).toLowerCase()) > -1) {
    var fileComic = path.posix.basename(fileName).replace(/#/g, "");
    if (process.platform == 'win32') {
      fileComic = path.win32.basename(fileName).replace(/#/g, "");
    }
  } else {
    handleError(evt)
  }

  // tempFolder Variable for loaded comic
  var tempFolder = path.join(os.tmpdir(), 'wonderReader', 'cache', fileComic);
  console.log('tempFolder = ' + tempFolder)

  if (directoryExists.sync(tempFolder)) { // Checks for existing Directory
    tempFolder = directory.merge(tempFolder);
    var dirContents = fs.readdirSync(tempFolder);
    if (dirContents.length == 0) {
      if (path.extname(fileName).toLowerCase() == ".cbr") {
        rarExtractor(fileName, tempFolder, dirContents);
      } else if (path.extname(fileName).toLowerCase() == ".cbz") {
        zipExtractor(fileName, tempFolder, dirContents);
      } else {
        handleError(evt);
      }
    } else {
      postExtract(fileName, tempFolder, dirContents);
    };
  } else { // If no Directory exists
    mkdirp.sync(tempFolder);
    var dirContents;

    if (path.extname(fileName).toLowerCase() == ".cbr") {
      rarExtractor(fileName, tempFolder, dirContents);
    } else if (path.extname(fileName).toLowerCase() == ".cbz") {
      zipExtractor(fileName, tempFolder, dirContents)
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

function postExtract(fileName, tempFolder, dirContents) {
  var inner = document.getElementById('innerWindow');
  var viewOne = document.getElementById('viewImgOne');
  var viewTwo = document.getElementById('viewImgTwo');

  dirContents = strain(dirContents)

  viewOne.src = path.join(tempFolder, encodeURIComponent(dirContents[0]));
  viewTwo.src = path.join(tempFolder, encodeURIComponent(dirContents[1]));

  page.onLoad();
  enable("pageLeft");
  enable("pageRight");
  enable("column");
  $('#viewer').addClass('active');
  libWatch.load(fileName);
  nextcomic.load(fileName);

  if(viewOne.clientHeight >= viewTwo.clientHeight) {
    inner.style.height = viewOne.clientHeight + "px";
  } else {
    inner.style.height = viewTwo.clientHeight + "px";
  };
  document.getElementById('viewer').scrollTop = 0;
  document.getElementById('viewer').scrollLeft = 0;
};

exports.dialog = () => {
  openFile();
}

exports.loader = (fileName) => {
  filePiper(fileName);
}

// --------------- //
// File Extractors /
// ---------------//

function rarExtractor(fileName, tempFolder, dirContents) {
  var rar = new unrar(fileName);
  rar.extract(tempFolder, null, function (err) {
    tempFolder = directory.merge(tempFolder);
    dirContents = fs.readdirSync(tempFolder);

    if (dirContents.length == 0) {
      zipExtractor(fileName, tempFolder);
    } else {
      $('#loader').addClass('hidden').removeClass('loader');
      $('#bgLoader').addClass('hidden');

      postExtract(fileName, tempFolder, dirContents);
    }
  });
};

function zipExtractor(fileName, tempFolder, dirContents) {
  extract(fileName, {dir: tempFolder}, function (err) {
    tempFolder = directory.merge(tempFolder);
    dirContents = fs.readdirSync(tempFolder);

    if (dirContents.length == 0) {
      rarExtractor(fileName, tempFolder);
    } else {
      $('#loader').addClass('hidden').removeClass('loader');
      $('#bgLoader').addClass('hidden');

      postExtract(fileName, tempFolder, dirContents);
    };
  });
}
