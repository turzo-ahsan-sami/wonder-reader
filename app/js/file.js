// file.js: loads files into the program,
// extracting and sourcing images to where they need to go

const $ = require('jquery');
const cbr = require('cbr');
const {dialog} = require('electron').remote;
const fs = require('fs');
const isThere = require('is-there'); // https://www.npmjs.com/package/is-there
const mkdirp = require('mkdirp'); // https://github.com/substack/node-mkdirp
const os = require('os'); // https://nodejs.org/api/os.html
const path = require('path');
const unzip = require('unzip');

// Wonder-Reader Specific Modules //
const clean = require('./clean.js');
const dirFunction = require('./directory.js');
const miniLib = require('./libMini.js');
const nextcomic = require('./nextcomic.js');
const page = require('./page.js');
const strain = require('./strain.js');
const title = require('./title.js');

let dirContents;

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
      let fileName = fileNames[0]; // Filepath name
      fileLoad(fileName); // Extracts files to their proper locations
		}
  );
};

function fileLoad(fileName, err) { // checks and extracts files and then loads them
  if (err) {
    handleError(err);
  };

  if ([".cbr", ".cbz"].indexOf(path.extname(fileName).toLowerCase()) > -1) {
    let fileComic = path.posix.basename(fileName).replace(/#|!/g, "");
    if (process.platform == 'win32') {
      fileComic = path.win32.basename(fileName).replace(/#|!/g, "");
    }
  } else {
    handleError(evt);
  };

  // tempFolder Variable for loaded comic
  let tempFolder = path.join(os.tmpdir(), 'wonderReader', 'cache', fileComic);
  let looper = 0;
  console.log(`tempFolder = ${tempFolder}`);

  if (isThere(tempFolder)) { // Checks for existing Directory
    tempFolder = dirFunction.merge(tempFolder);
    dirContents = fs.readdirSync(tempFolder);
    if (dirContents.length == 0) {
      if (path.extname(fileName).toLowerCase() == ".cbr") {
        rarExtractor(fileName, tempFolder, looper);
      } else if (path.extname(fileName).toLowerCase() == ".cbz") {
        zipExtractor(fileName, tempFolder, looper);
      } else {
        handleError(evt);
      }
    } else {
      postExtract(fileName, tempFolder, dirContents);
    };
  } else { // If no Directory exists
    mkdirp.sync(tempFolder, {'mode': '0777'});

    if (path.extname(fileName).toLowerCase() == ".cbr") {
      rarExtractor(fileName, tempFolder, looper);
    } else if (path.extname(fileName).toLowerCase() == ".cbz") {
      zipExtractor(fileName, tempFolder, looper);
    } else {
      handleError(evt);
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
  let inner = document.getElementById('innerWindow');
  let viewOne = document.getElementById('viewImgOne');
  let viewTwo = document.getElementById('viewImgTwo');

  dirContents = strain(dirContents);

  viewOne.src = path.join(tempFolder, encodeURIComponent(dirContents[0]));
  viewTwo.src = path.join(tempFolder, encodeURIComponent(dirContents[1]));

  page.load(fileName);
  enable("pageLeft");
  enable("pageRight");
  enable("column");
  $('#viewer').addClass('active');
  title.onFileLoad(fileName);
  miniLib.load(fileName);
  nextcomic.load(fileName);
  $('#mainLib').slideUp(800);

  document.getElementById('viewer').scrollTop = 0;
  document.getElementById('viewer').scrollLeft = 0;
};

exports.dialog = () => {
  openFile();
};

exports.loader = (fileName) => {
  fileName = decodeURIComponent(fileName);
  if (isThere(fileName)) {
    fileLoad(fileName);
  } else {
    alert(`Missing or broken file: Could not open ${fileName}`);
  };
};

//-/-----------------\
//-| File Extractors |
//-\-----------------/

function rarExtractor(fileName, tempFolder, looper) {
  cbr(fileName, tempFolder, function (error) {
    if (error) {
      console.log(error);
    };

    tempFolder = dirFunction.merge(tempFolder);
    dirContents = fs.readdirSync(tempFolder);

    if (dirContents.length == 0 && looper <= 3) {
      looper++;
      console.log(`Loop = ${looper}`);
      zipExtractor(fileName, tempFolder, looper);
    } else if (looper > 3) {
      alert('Possible broken file?');
      return;
    } else {
      $('#loader').addClass('hidden').removeClass('loader');
      $('#bgLoader').addClass('hidden');
      postExtract(fileName, tempFolder, dirContents);
    };
  });
};

function zipExtractor(fileName, tempFolder, looper) {
  console.log('Unzip extraction started.');
  fs.createReadStream(fileName).pipe(
    unzip.Extract({
      path: tempFolder
    }).on('close', function() {
      console.log('Extraction complete!');
      tempFolder = dirFunction.merge(tempFolder);
      dirContents = fs.readdirSync(tempFolder);

      if (dirContents.length == 0 && looper <= 3) {
        looper++;
        console.log(`Loop = ${looper}`);
        rarExtractor(fileName, tempFolder, looper);
      } else if (looper > 3) {
        alert('Possible broken file?');
        return;
      } else {
        $('#loader').addClass('hidden').removeClass('loader');
        $('#bgLoader').addClass('hidden');
        postExtract(fileName, tempFolder, dirContents);
      };
    })
  );
};
