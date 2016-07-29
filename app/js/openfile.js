var fs = require('fs'); // https://nodejs.org/api/fs.html#fs_file_system
const {dialog} = require('electron').remote; // http://electron.atom.io/docs/api/dialog/
var unrar = require('node-unrar'); // https://github.com/scopsy/node-unrar
const $ = require('jquery');
var mkdirp = require('mkdirp'); // https://github.com/substack/node-mkdirp
var path = require('path'); // https://nodejs.org/api/path.html
var extract = require('extract-zip'); // https://www.npmjs.com/package/extract-zip
var libWatch = require('./js/libwatch.js'); // libWatch.load(fileName) should insert information into lib's <ul>
var clearcache = require('./js/clearcache'); // Trash that old shit!

function filePiper(fileName, err) { // Streams files passed through the program.

  // Folder Creation
  var fileComic = path.posix.basename(fileName, '.cbr'); // Function removes path dir, spaces, and '#'. Good to note!
  if (process.platform == 'win32') {
    fileComic = path.win32.basename(fileName, '.cbr');
  }
  console.log(fileComic);
  var tempFolder = path.join("app/cache/", fileComic); // tempFolder Variable for loaded comic
  console.log(tempFolder);
  mkdirp.sync(tempFolder);
  console.log('CREATE: ' + tempFolder + ' created, line 18');

  var rar = new unrar(fileName);
  rar.extract(tempFolder, null, function (err) {
    console.log('Line 29 Success!');
    var dirContents = fs.readdirSync(tempFolder);
    $('#loader').addClass('hidden').removeClass('loader');
    document.getElementById("viewImgOne").src = path.join('cache/', fileComic, dirContents[0]); // Loads array[0] into window
    document.getElementById("viewImgTwo").src = path.join('cache/', fileComic, dirContents[1]); // Loads array[1] into window
    libWatch.load(fileName); // libwatch.js
  });
  $('#loader').addClass('loader').removeClass('hidden');
};

function openFile() {
  dialog.showOpenDialog( // Limits openFile to .cbr files
    { filters: [{
      name: 'cbr',
      extensions: ['cbr']
      }]
    },

    // Open File function
    function(fileNames) {
      console.log(fileNames); // Logs file in dev tools console
      if (fileNames === undefined) return; // Breaks on error
      var fileName = fileNames[0]; // Filepath name
      console.log(fileName);
      filePiper(fileName); // Streams and unrars .cbr into tempFolder
      console.log('interior sync log @ line 28');
		}
  )
};

function trash() {
  clearcache.trashIt(); // clearcache.js
}
