// library.js : to populate the library with an interactive list of available selections

const $ = require('jquery');
const bookmark = require('./bookmark.js');
const {dialog} = require('electron').remote;
const dirFunction = require('./directory.js');
const dirTree = require('directory-tree'); // https://www.npmjs.com/package/directory-tree
const fs = require('fs');
const isThere = require('is-there');
const jsonfile = require('jsonfile'); // https://www.npmjs.com/package/jsonfile
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');

const config = path.join(os.tmpdir(), 'wonderReader', 'json', 'config.json');
const comics = path.join(os.tmpdir(), 'wonderReader', 'json', 'comics.json');

const defaults = 'The library is empty. Click <span class="code"><i class="fa fa-search"></i></span> to load a directory.';
const libError = 'Library not found. Click <span class="code"><i class="fa fa-search"></i></span> to load a directory.';
const loading = 'Your library is loading';
const finished = '';

// Function variables
let libBuilder, folders;

// Builds the library with proper HTML
libBuilder = (directory, array, listID) => {
  $('#libStatus').text(loading);
  for (let i = 0; i < array.length; i++) {
    let file = array[i].name;
    let filePath = path.join(directory, file);

    // Inserts file.loader() for files
    if (fs.statSync(filePath).isFile()) {
      let fileTarget = dirFunction.encode(filePath);
      if (process.platform == 'win32') { // Converts win32 paths to HTML compatible paths
        fileTarget = fileTarget.replace(/\\/g, '/');
      }
      $(`#${listID}`).append(
        `<li class="file"><a href="#" onclick="file.loader('${fileTarget}')"><i class="fa fa-file" aria-hidden="true"></i>${file} ${bookmark.percent(file)}</a></li>`
      );

    // Deep scans interior folders
    } else if (fs.statSync(filePath).isDirectory()) {
      let newListID = (`${listID}${file}`).replace(/\s|#|\(|\)|\'|,|&|\+|-|!|\[|\]/g, '');
      $(`#${listID}`).append(
        `<li class="folder"><span><i class="fa fa-folder" aria-hidden="true"></i><i class="fa fa-caret-down rotate" aria-hidden="true"></i>${file}</span><ul id=${newListID}>`
      );
      libBuilder(filePath, array[i].children, newListID);
      $(`#${listID}`).append('</ul></li>');
    } else {
      // Do Nothing
    }
  }
  folders();
  $('#libStatus').text(finished);
};

// Dialog to open up directory
exports.openDir = () => {
  dialog.showOpenDialog({
    properties: [
      'openDirectory'
    ]
  },
  function (fileNames) {
    if (fileNames === undefined) return;

    let obj = {'library': fileNames[0]};
    let dirArray = dirTree(fileNames[0], ['.cbr', '.cbz']);

    jsonfile.writeFileSync(comics, dirArray, {'spaces': 2});
    jsonfile.writeFileSync(config, obj);
    $('#ulLib li, #ulLib ul').remove();
    libBuilder(fileNames[0], dirArray.children, 'ulLib');
  });
};

// Exported version of libBuilder()
exports.builder = () => {
  let configJSON = jsonfile.readFileSync(config);
  let dirArray = dirTree(configJSON.library, ['.cbr', '.cbz']);
  $('#ulLib li, #ulLib ul').remove();
  libBuilder(configJSON.library, dirArray.children, 'ulLib');
};

// Loads library on program start
exports.onLoad = () => {
  if (isThere(config)) {
    let configJSON = jsonfile.readFileSync(config);
    if (configJSON.library !== undefined) {
      let dirArray = dirTree(configJSON.library, ['.cbr', '.cbz']);
      if (dirArray !== null) {
        libBuilder(configJSON.library, dirArray.children, 'ulLib');
      } else {
        $('#libStatus').append(libError);
      }
    } else {
      $('#libStatus').append(defaults);
    }
  } else {
    mkdirp.sync(path.join(os.tmpdir(), 'wonderReader', 'json'));
    fs.writeFileSync(config, '{}');
    $('#libStatus').append(defaults);
  }
  folders();
};

folders = () => { // Toggle for folders in MainLib
  console.log('folders() engaged.');
  let folders = document.querySelectorAll('.folder');
  for (let i = 0; i < folders.length; i++) {
    folders[i].querySelector('span').addEventListener('click', function() {
      let _ul = $(this).next('ul');
      if (_ul.is(':animated')) return;
      $(this).children('.fa-caret-down').toggleClass('rotate');
      _ul.slideToggle(300, 'linear');
    });
  }
};
