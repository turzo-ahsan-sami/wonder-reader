var fs = require('fs'); // https://nodejs.org/api/fs.html#fs_file_system
// var stream = require('stream'); //https://nodejs.org/api/stream.html#stream_stream
// var es = require('event-stream'); // https://github.com/dominictarr/event-stream
const {dialog} = require('electron').remote; // http://electron.atom.io/docs/api/dialog/
var unrar = require('node-unrar'); // https://github.com/scopsy/node-unrar
const $ = require('jquery');
// var cbr = require('cbr'); // https://www.npmjs.com/package/cbr
var mkdirp = require('mkdirp') // https://github.com/substack/node-mkdirp
var path = require('path') // https://nodejs.org/api/path.html
var libWatch = require('./js/libwatch.js'); // libWatch.load(fileName) should insert information into lib's <ul>

function filePiper(fileName, err) { // Streams files passed through the program.

  // Folder Creation
  var fileComic = path.posix.basename(fileName, '.cbr'); // Function removes path dir, spaces, and '#'. Good to note!
  if (process.platform == 'win32') {
    fileComic = path.win32.basename(fileName, '.cbr');
  }
  console.log(fileComic);
  var tempFolder = "app/cache/" + fileComic + "/"; // tempFolder Variable for loaded comic
  console.log(tempFolder);
  mkdirp.sync(tempFolder);
  console.log('CREATE: ' + tempFolder + ' created, line 18');

  var rar = new unrar(fileName);

  rar.extract(tempFolder, null, function (err) {
    console.log('Line 29 Success!');
    var dirContents = fs.readdirSync(tempFolder);
    document.getElementById("viewImgOne").src = 'cache/' + fileComic + '/' + dirContents[0]; // Loads array[0] into window
    document.getElementById("viewImgTwo").src = 'cache/' + fileComic + '/' + dirContents[1]; // Loads array[1] into window
    libWatch.load(fileName);
  });

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
