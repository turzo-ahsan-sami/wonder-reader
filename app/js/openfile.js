var fs = require('fs'); // https://nodejs.org/api/fs.html#fs_file_system
// var stream = require('stream'); //https://nodejs.org/api/stream.html#stream_stream
// var es = require('event-stream'); // https://github.com/dominictarr/event-stream
const {dialog} = require('electron').remote; // http://electron.atom.io/docs/api/dialog/
// var unrar = require('node-unrar'); // https://github.com/scopsy/node-unrar
const $ = require('jquery');
var cbr = require('cbrreader'); // https://www.npmjs.com/package/cbr
var mkdirp = require('mkdirp') // https://github.com/substack/node-mkdirp

function filePiper(fileName, err) { // Streams files passed through the program.

  // Folder Creation
  var fileComic = fileName.replace(/^.*[\\\/]/, '').replace(/[\s#]/g, ''); // Function removes path dir, spaces, and '#'. Good to note!
  console.log(fileComic);
  var tempFolder = "app/cache/" + fileComic + "/"; // tempFolder Variable for loaded comic
  console.log(tempFolder);
  mkdirp.sync(tempFolder);
  console.log('CREATE: ' + tempFolder + ' created, line 18');

  var fileStream = fs.createReadStream(fileName); // Streams to not clog down System
  console.log('filePiper line 21 :: ' + fileStream);
  // var rar = new unrar(fileStream);

  cbr(fileName, tempFolder, function(error, out) {
    if (error) {
      alert('ERR! line 26 openfile.js')
    } else {
      console.log('Rar successful: ' + tempFolder + ' @ line 28');
      var dirContents = fs.readdirSync(tempFolder);
      console.log('dirContents: ' + dirContents + ' @ line 30');
      document.getElementById("viewImgOne").src = 'cache/' + fileComic + '/' + dirContents[0]; // Loads array[0] into window
      document.getElementById("viewImgTwo").src = 'cache/' + fileComic + '/' + dirContents[1]; // Loads array[1] into window
    };
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
      var x = 1;
      console.log(fileNames); // Logs file in dev tools console
      if (fileNames === undefined) return; // Breaks on error
      var fileName = fileNames[0]; // Filepath name
      console.log(fileName);
      filePiper(fileName); // Streams and unrars .cbr into tempFolder
      console.log('interior sync log @ line 28');
		}
  )
};
