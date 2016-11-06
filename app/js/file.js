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
const Unrar = require('node-unrar');
const unzip = require('unzip2');

// Wonder-Reader Specific Modules //
const clean = require('./clean.js');
const dirFunction = require('./directory.js');
const miniLib = require('./libMini.js');
const nextcomic = require('./nextcomic.js');
const page = require('./page.js');
const strain = require('./strain.js');
const title = require('./title.js');

let dirContents, fileName;

const viewOne = document.getElementById('viewImgOne');
const viewTwo = document.getElementById('viewImgTwo');

// Dialog box to load the file
openFile = () => {
  dialog.showOpenDialog(
    { filters: [{
      name: 'Comic Files',
      extensions: ['cbr', 'cbz']
      }]
    },

    // Open File function
    function(fileNames) {
      if (fileNames === undefined) return; // Returns on error
      fileName = fileNames[0]; // Filepath name
      fileLoad(fileName); // Extracts files to their proper locations
    }
  );
};

// The function that loads each file
fileLoad = (fileName, err) => { // checks and extracts files and then loads them
  if (err) {
    handleError(err);
  };
  let fileComic, tempFolder, looper;
  if ([".cbr", ".cbz"].indexOf(path.extname(fileName).toLowerCase()) > -1) {
    fileComic = path.posix.basename(fileName).replace(/#|!/g, "");
    if (process.platform == 'win32') {
      fileComic = path.win32.basename(fileName).replace(/#|!/g, "");
    };
  } else {
    handleError(evt);
  };

  // tempFolder Variable for loaded comic
  tempFolder = path.join(os.tmpdir(), 'wonderReader', 'cache', fileComic);
  looper = 0;
  console.log(`tempFolder = ${tempFolder}`);

  if (isThere(tempFolder)) { // Checks for existing Directory
    tempFolder = dirFunction.merge(tempFolder);
    dirContents = fs.readdirSync(tempFolder);
    if (dirContents.length == 0) {
      fileRouter(fileName, tempFolder, looper);
    } else {
      postExtract(fileName, tempFolder, dirContents);
    };
  } else { // If no Directory exists
    mkdirp.sync(tempFolder, {'mode': '0777'});
    fileRouter(fileName, tempFolder, looper);
    // Async class adding then hidden on final load
    $('#loader').addClass('loader').removeClass('hidden');
    $('#bgLoader').removeClass('hidden');
  }; // End Directory checker
};

// Enable et Disable ID's
enable = (id) => {
  document.getElementById(id).disabled = false;
};

// After extraction, loads stuff into img tags, as well as other junk
postExtract = (fileName, tempFolder, dirContents) => {
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

fileRouter = (fileName, tempFolder, looper) => {
  if (path.extname(fileName).toLowerCase() == ".cbr") {
    if (process.platform == 'linux') { //
      rarLinux(fileName, tempFolder, looper);
    } else {
      rarExtractor(fileName, tempFolder, looper);
    };
  } else if (path.extname(fileName).toLowerCase() == ".cbz") {
    zipExtractor(fileName, tempFolder, looper);
  } else {
    console.log('How did you get this error?');
    throw error;
  };
};

rarExtractor = (fileName, tempFolder, looper) => {
  console.log('Unrar extraction started.')
  cbr(fileName, tempFolder, function (error) {
    if (error) {console.log(error);};
    extractOptions(fileName, tempFolder, looper);
  });
};

rarLinux = (fileName, tempFolder, looper) => {
  console.log('Unrar extraction started.')
  let rar = new Unrar(fileName);
  rar.extract(tempFolder, null, function (err) {
    if (err) console.log(err);
    extractOptions(fileName, tempFolder, looper);
  });
};

zipExtractor = (fileName, tempFolder, looper) => {
  console.log('Unzip extraction started.');
  fs.createReadStream(fileName).pipe(
    unzip.Extract({
      path: tempFolder
    }).on('close', function() {
      extractOptions(fileName, tempFolder, looper);
    })
  );
};

extractOptions = (fileName, tempFolder, looper) => {
  tempFolder = dirFunction.merge(tempFolder);
  dirContents = fs.readdirSync(tempFolder);

  if (dirContents.length == 0 && looper <= 3) {
    looper++;
    console.log(`Loop = ${looper}`);
    if (path.extname(fileName).toLowerCase() == "cbz") {
      if (process.platform == 'linux') { //
        rarLinux(fileName, tempFolder, looper);
      } else {
        rarExtractor(fileName, tempFolder, looper);
      };
    } else if (path.extname(fileName).toLowerCase == "cbr") {
      zipExtractor(fileName, tempFolder, looper);
    } else {
      console.log('How did you manage to get this error?');
      throw error;
    };
  } else if (looper > 3) {
    alert('Possible broken file?');
    return;
  } else {
    console.log('Extraction complete!');
    $('#loader').addClass('hidden').removeClass('loader');
    $('#bgLoader').addClass('hidden');
    postExtract(fileName, tempFolder, dirContents);
  };
};
