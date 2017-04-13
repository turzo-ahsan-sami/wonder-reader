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
const dirFunction = require('./directory.js');
const miniLib = require('./libMini.js');
const nextcomic = require('./nextcomic.js');
const page = require('./page.js');
const strain = require('./strain.js');
const title = require('./title.js');

// Global variables
let dirContents, fileName;

const viewOne = document.getElementById('viewImgOne');
const viewTwo = document.getElementById('viewImgTwo');
const viewer = document.getElementById('viewer');

// Functions variables
let openFile, fileLoad, enable, postExtract, fileRouter, rarExtractor, rarLinux, zipExtractor, extractRouter, preLoad, postLoad;

preLoad = () => {
  $('#loader').addClass('loader').removeClass('hidden');
  $('#innerWindow').addClass('innerLoading');
  $('#bgLoader').removeClass('hidden');
};

postLoad = () => {
  $('#innerWindow').removeClass('innerLoading');
  $('#loader').addClass('hidden').removeClass('loader');
  $('#bgLoader').addClass('hidden');
};

// Dialog box to load the file
openFile = () => {
  dialog.showOpenDialog(
    { filters: [{
      name: 'Comic Files',
      extensions: ['cbr', 'cbz']
    }]
    },

    // Open File function
    function (fileNames) {
      if (fileNames === undefined) return; // Returns on error
      fileName = fileNames[0]; // Filepath name
      fileLoad(fileName); // Extracts files to their proper locations
    }
  );
};

// The function that loads each file
fileLoad = (fileName, err) => { // checks and extracts files and then loads them
  if (err) { console.error(err); }
  let fileComic, tempFolder, looper;
  if (process.platform == 'win32') { // corrects a possible err with HTML loading
    fileName = fileName.replace(/\//g, '\\');
    console.log(fileName);
  }
  if (['.cbr', '.cbz'].indexOf(path.extname(fileName).toLowerCase()) > -1) {
    fileComic = path.basename(fileName).replace(/#|!/g, '');
  } else {
    return;
  }

  // tempFolder Variable for loaded comic
  tempFolder = path.join(os.tmpdir(), 'wonderReader', 'cache', fileComic);
  looper = 0;

  if (isThere(tempFolder)) { // Checks for existing Directory
    tempFolder = dirFunction.merge(tempFolder);
    dirContents = fs.readdirSync(tempFolder);
    if (dirContents.length === 0) {
      fileRouter(fileName, tempFolder, looper);
    } else {
      postExtract(fileName, tempFolder, dirContents);
    }
  } else { // If no Directory exists
    preLoad();
    mkdirp.sync(tempFolder, {'mode': '0777'});
    fileRouter(fileName, tempFolder, looper);
  } // End Directory checker
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
  enable('pageLeft');
  enable('pageRight');
  enable('column');
  $('#viewer').addClass('active');
  title.onFileLoad(fileName);
  miniLib.load(fileName);
  nextcomic.load(fileName);
  $('#mainLib').slideUp(800);

  viewer.scrollTop = 0;
  viewer.scrollLeft = 0;
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
  }
};

// File Extractors
fileRouter = (fileName, tempFolder, looper) => {
  if (path.extname(fileName).toLowerCase() === '.cbr') {
    if (process.platform === 'linux') { //
      rarLinux(fileName, tempFolder, looper);
    } else {
      rarExtractor(fileName, tempFolder, looper);
    }
  } else if (path.extname(fileName).toLowerCase() === '.cbz') {
    zipExtractor(fileName, tempFolder, looper);
  } else {
    alert('Possible broken file?');
    postLoad();
  }
};

rarExtractor = (fileName, tempFolder, looper) => {
  console.log('Unrar extraction started.');
  cbr(fileName, tempFolder, function (error) {
    if (error) { console.error(error); }
    extractRouter(fileName, tempFolder, looper);
  });
};

rarLinux = (fileName, tempFolder, looper) => {
  let rar = new Unrar(fileName);
  rar.extract(tempFolder, null, function (err) {
    if (err) { console.error(err); }
    extractRouter(fileName, tempFolder, looper);
  });
};

zipExtractor = (fileName, tempFolder, looper) => {
  fs.createReadStream(fileName).pipe(
    unzip.Extract({
      path: tempFolder
    }).on('close', function () {
      extractRouter(fileName, tempFolder, looper);
    })
  );
};

extractRouter = (fileName, tempFolder, looper) => {
  tempFolder = dirFunction.merge(tempFolder);
  dirContents = fs.readdirSync(tempFolder);

  if (dirContents.length === 0 && looper <= 3) {
    looper++;
    if (path.extname(fileName).toLowerCase() === '.cbz') {
      if (process.platform === 'linux') { //
        rarLinux(fileName, tempFolder, looper);
      } else {
        rarExtractor(fileName, tempFolder, looper);
      }
    } else if (path.extname(fileName).toLowerCase() === '.cbr') {
      zipExtractor(fileName, tempFolder, looper);
    } else {
      alert('Possible broken file?');
      postLoad();
      return;
    }
  } else if (looper > 3) {
    alert('Possible broken file?');
    postLoad();
    return;
  } else {
    console.log('Extraction complete!');
    postLoad();
    postExtract(fileName, tempFolder, dirContents);
  }
};
