var fs = require('fs'); // https://nodejs.org/api/fs.html#fs_file_system
var stream = require('stream'); //https://nodejs.org/api/stream.html#stream_stream
var es = require('event-stream'); // https://github.com/dominictarr/event-stream
const {dialog} = require('electron').remote; // http://electron.atom.io/docs/api/dialog/
var unrar = require('node-unrar'); // https://github.com/scopsy/node-unrar

function filePiper(fileName, err) { // Streams files passed through the program.

  // Folder Creation
  var tempFolder = fs.mkdtempSync('/tmp/wonderReader-');
  console.log('CREATE: ' + tempFolder + ' created');

  var fileStream = fs.createReadStream(fileName);
  console.log('filePiper line 15 :: ' + fileStream);
  var rar = new unrar(fileStream);

  rar.extract(tempFolder, null, function (err) {
    console.log('Rar successful: ' + tempFolder + ' @ line 21');
    var dirContents = fs.readdirSync(tempFolder);
    console.log('dirContents: ' + dirContents + ' @ line 23');
  });
};

function openFile() {

  dialog.showOpenDialog(
    { filters: [{
      name: 'cbr',
      extensions: ['cbr']
      }]
    },

    // Open File function
    function(fileNames) {
      console.log(fileNames); //logs file in dev tools console
      if (fileNames === undefined) return;
      var fileName = fileNames[0];
      console.log(fileName);

      filePiper(fileName);
      console.log('interior sync log @ line 45')

		}
  )
};
