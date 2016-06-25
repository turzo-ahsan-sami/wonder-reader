var fs = require('fs'); // https://nodejs.org/api/fs.html#fs_file_system
var stream = require('stream'); //https://nodejs.org/api/stream.html#stream_stream
var es = require('event-stream'); // https://github.com/dominictarr/event-stream
const {dialog} = require('electron').remote; // http://electron.atom.io/docs/api/dialog/
// var cbr = require('cbr');
// var lineNr = 1;

function filePiper(fileName, err) { // Streams files passed through the program.

  // Folder Creation
  var tempFolder = fs.mkdtempSync('/tmp/won-');
  console.log('CREATE: ' + tempFolder + ' created');

  console.log('filePiper line 15 :: ' + fs.createReadStream(fileName));
  var fileStream = fs.createReadStream(fileName);
  console.log('filePiper line 17 :: ' +  fileStream);

  // catch(err) {
  //   console.log('filePiper failure.');
  // };
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
		}
  )
};

    //   var s = fs.createReadStream('fileName')
    //     .pipe(es.split())
    //     .pipe(es.mapSync(function(line) {
    //         // s.pause(); // Pauses readStream
    //         // lineNr += 1; // Increments lineNr +1
    //         // logMemoryUsage(lineNr); // Process line here and call s.resume() when ready
    //         // s.resume(); // Resumes readStream
    //       })
    //       // .on('error', function() {
    //       // 	console.log('Error while reading file');
    //       // })
    //       // .on('end', function() {
    //       // 	console.log('Read file successful')
    //       // })
    //     );
    //
    //
    //     fs.readFile(fileName, 'utf-8', function(err, data) {
    //       if (err) throw err;
    //       console.log('Line 103 good!')
    //       // s(fileName);
    //       console.log(s(fileName));
    //       console.log('IZ GUD!')
    //
    //       console.log(fileName); // example: "/home/user/(comic).cbr"
    //       console.log(data);
    //     });
    // }
