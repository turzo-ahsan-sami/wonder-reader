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
const directoryFunction = require('./directory.js');
const isComic = require('./isComic.js');
const miniLib = require('./libMini.js');
const nextcomic = require('./nextcomic.js');
const page = require('./page.js');
const strain = require('./strain.js');
const title = require('./title.js');

// Global variables
let extractedImages, fileName, comic, tempFolder;

const bgLoader = document.getElementById('bgLoader');
const innerWindow = document.getElementById('innerWindow');
const loader = document.getElementById('loader');
const viewOne = document.getElementById('viewImgOne');
const viewTwo = document.getElementById('viewImgTwo');
const viewer = document.getElementById('viewer');

// Functions variables
let openFile, fileLoad, enable, postExtract, fileRouter, rarExtractor, zipExtractor, extractRouter, preLoad, postLoad;

preLoad = () => {
  innerWindow.classList.add('innerLoading');
  loader.classList.add('loader');
  loader.classList.remove('hidden');
  bgLoader.classList.remove('hidden');
};

postLoad = () => {
  innerWindow.classList.remove('innerLoading');
  loader.classList.add('hidden');
  loader.classList.remove('loader');
  bgLoader.classList.add('hidden');
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
  if (err) { return console.error(err); }
  let looper;
  // corrects a possible err with HTML loading
  if (process.platform == 'win32') {
    fileName = fileName.replace(/\//g, '\\');
    console.log(fileName);
  }
  if (isComic(fileName)) {
    comic = path.basename(fileName, path.extname(fileName)).replace(/#|!/g, '');
  } else {
    return;
  }
  document.getElementById('trash').dataset.current = comic;
  // tempFolder Variable for loaded comic
  tempFolder = path.join(os.tmpdir(), 'wonderReader', 'cache', comic);
  looper = 0;
  switch (isThere(tempFolder)) {
    case true:
      tempFolder = directoryFunction.merge(tempFolder);
      extractedImages = fs.readdirSync(tempFolder);
      if (extractedImages.length === 0) {
        fileRouter(fileName, tempFolder, looper);
      } else {
        postExtract(fileName, tempFolder, extractedImages);
      }
      break;
    default:
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
postExtract = (fileName, tempFolder, extractedImages) => {
  extractedImages = strain(extractedImages);

  viewOne.src = path.join(tempFolder, encodeURIComponent(extractedImages[0]));
  viewTwo.src = path.join(tempFolder, encodeURIComponent(extractedImages[1]));

  page.load(fileName, tempFolder, extractedImages);
  enable('pageLeft');
  enable('pageRight');
  viewer.dataset.active = true;
  title.onLoad(fileName);
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
  switch (isThere(fileName)) {
    case true:
      fileLoad(fileName);
      break;
    default:
      alert(`Missing or broken file: Could not open ${fileName}`);
  }
};

// File Extractors
fileRouter = (fileName, tempFolder, looper) => {
  let extName = path.extname(fileName).toLowerCase();
  switch (extName) {
    case '.cbr':
      rarExtractor(fileName, tempFolder, looper);
      break;
    case '.cbz':
      zipExtractor(fileName, tempFolder, looper);
      break;
    default:
      alert('Possible broken file?');
      postLoad();
  }
};

rarExtractor = (fileName, tempFolder, looper) => {
  let rar;
  switch (process.platform) {
    case 'linux':
      rar = new Unrar(fileName);
      rar.extract(tempFolder, null, function (err) {
        if (err) { console.error(err); }
        extractRouter(fileName, tempFolder, looper);
      });
      break;
    default:
      cbr(fileName, tempFolder, function (error) {
        if (error) { console.error(error); }
        extractRouter(fileName, tempFolder, looper);
      });
  }
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

  tempFolder = directoryFunction.merge(tempFolder);
  extractedImages = fs.readdirSync(tempFolder);
  let extName = path.extname(fileName).toLowerCase();

  switch(true) {
    case (extractedImages.length == 0 && looper <= 3):
      looper++;
      switch(extName) {
        case '.cbz':
          rarExtractor(fileName, tempFolder, looper);
          break;
        case '.cbr':
          zipExtractor(fileName, tempFolder, looper);
          break;
        default:
          alert('Possible broken file?');
          postLoad();
      }
      break;
    case (extractedImages.length != 0 && looper > 3):
      alert('Possible broken file?');
      postLoad();
      break;
    default:
      console.log('Extraction complete!');
      postLoad();
      postExtract(fileName, tempFolder, extractedImages);
  }
};
