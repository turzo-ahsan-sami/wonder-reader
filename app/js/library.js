var fs = require('fs'); // https://nodejs.org/api/fs.html#fs_file_system
var stream = require('stream'); //https://nodejs.org/api/stream.html#stream_stream
var es = require('event-stream'); // https://github.com/dominictarr/event-stream
const {dialog} = require('electron').remote; // http://electron.atom.io/docs/api/dialog/
var unrar = require('node-unrar'); // https://github.com/scopsy/node-unrar
const $ = require('jquery');

$(document).ready(function() {   // Library Modifications and Stylings
  // Class Names and Font Awesome
  $(".file").before("<i class=\"fa fa-file-o\"></i> ");
  $(".dir").before("<i class=\"fa fa-folder-o\"></i> ");
  $(".dir-open").before("<i class=\"fa fa-folder-open-o\"></i> ");
});

// KeyCode Variables
var leftKey = 37;
var rightKey = 39;


function filePiper(fileName, err) { // Streams files passed through the program.

  // Folder Creation
  var tempFolder = fs.mkdtempSync('/tmp/wonderReader-'); // tempFolder Variable for loaded comic
  console.log('CREATE: ' + tempFolder + ' created, line 24');

  var fileStream = fs.createReadStream(fileName); // Streams to not clog down System
  console.log('filePiper line 15 :: ' + fileStream);
  var rar = new unrar(fileStream);

  rar.extract(tempFolder, null, function (err) { // Extracts .cbr into tempFolder
    console.log('Rar successful: ' + tempFolder + ' @ line 31');
    var dirContents = fs.readdirSync(tempFolder);
    console.log('dirContents: ' + dirContents + ' @ line 33');

    document.getElementById("viewImgOne").src = tempFolder + '/' + dirContents[0]; // Loads array[0] into window
    document.getElementById("viewImgTwo").src = tempFolder + '/' + dirContents[1]; // Loads array[1] into window
    function pageLeft() {
      if (/*event.keyCode = leftKey && */(x - 2) > 0) {
        x = x - 2;
        console.log('x = ' + x + ': line 40');
      } else if ((x - 2) < 0 ) {
        x = 0;
        console.log('x = ' + x + ': line 43');
      };
      document.getElementById("viewImgOne").src = tempFolder + '/' + dirContents[x];    // Loads array[x] into window
      document.getElementById("viewImgTwo").src = tempFolder + '/' + dirContents[x+1];  // Loads array[x + 1] into window
    };
    function pageRight() {
      if (/*event.keyCode = rightKey && */(x + 2) < dirContents.length) {
        x = x + 2;
        console.log('x = ' + x + ': line 51');
      } else if ((x + 2) <= dirContents.length){
        x = array.length
        console.log('x = ' + x + ': line 54');
      };
      document.getElementById("viewImgOne").src = tempFolder + '/' + dirContents[x];   // Loads array[x] into window
      document.getElementById("viewImgTwo").src = tempFolder + '/' + dirContents[x+1]; // Loads array[x + 1] into window
    }
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
      console.log('interior sync log @ line 45')

		}
  )
};
