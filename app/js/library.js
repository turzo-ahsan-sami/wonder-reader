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

// Builds the library with proper HTML
libBuilder = (directory, array, listID) => {
  $('#libStatus').remove();
  for (let i=0; i < array.length; i++) {
    let file = array[i].name;
    let filePath = path.join(directory, file);

    // Inserts file.loader() for files
    if ( fs.statSync(filePath).isFile() ) {

      newDirectory = dirFunction.encode(directory);
      $(`#${listID}`).append(
        `<li class="file"><a href="#" onclick="file.loader('${path.join(newDirectory, encodeURIComponent(file))}')"><i class="fa fa-file" aria-hidden="true"></i>${file} ${bookmark.percent(file)}</a></li>`
      );

    // Deep scans interior folders
    } else if ( fs.statSync(file).isDirectory() ) {
      let newListID = (listID + file).replace(/\s|#|\(|\)|\'|,|&|\+|-/g, "");
      $(`#${listID}`).append(`<li class="folder"><a href="#" onclick="libFolders('${newListID}')"><i class="fa fa-folder" aria-hidden="true"></i><i class="fa fa-caret-down rotate" aria-hidden="true"></i>${file}</a></li><ul id=${newListID}>`);
      libBuilder(file, array[i].children, newListID);
      $(`#${listID}`).append('</ul>');
    } else {
      console.log(`${file} skipped`);
    };
  };
  $('#repeat').removeClass('rotater');
};

// Dialog to open up directory
exports.openDir = () => {
  dialog.showOpenDialog({
    properties: [
      'openDirectory'
    ]
  },
  function(fileNames) {
    if (fileNames === undefined) return;

    let directory = fileNames[0];
    let config = path.join(os.tmpdir(), 'wonderReader', 'json', 'config.json');
    let comics = path.join(os.tmpdir(), 'wonderReader', 'json', 'comics.json');
    let obj = {'library': directory};
    let dirArray = dirTree(directory, ['.cbr', '.cbz']);
    let listID = 'ulLib';

    jsonfile.writeFileSync(comics, dirArray, {'spaces': 2});
    jsonfile.writeFileSync(config, obj);
    $('#ulLib li').remove();
    $('#ulLib ul').remove();

    $('#repeat').addClass('rotater');
    libBuilder(directory, dirArray.children, listID);
  });
};

// Exported version of libBuilder()
exports.builder = () => {
  let config = jsonfile.readFileSync(path.join(os.tmpdir(), 'wonderReader', 'json', 'config.json'));
  let directory = config.library;
  let dirArray = dirTree(directory, ['.cbr', '.cbz']);
  let listID = 'ulLib';
  $('#ulLib li').remove();
  $('#ulLib ul').remove();

  $('#repeat').addClass('rotater');
  libBuilder(directory, dirArray.children, listID);
};

// Loads library on program start
exports.onLoad = () => {
  let configFile = path.join(os.tmpdir(), 'wonderReader', 'json', 'config.json');
  if ( isThere(configFile) ) {
    let config = jsonfile.readFileSync(configFile);
    if (config.library != undefined) {
      let dirArray = dirTree(config.library, ['.cbr', '.cbz']);
      let listID = 'ulLib';
      libBuilder(config.library, dirArray.children, listID);
    } else {
      $('#libStatus').append('The library is empty. Click <span class="code"><i class="fa fa-search"></i></span> to load a directory.');
    };
  } else {
    mkdirp.sync(path.join(os.tmpdir(), 'wonderReader', 'json'));
    fs.writeFileSync(configFile, '{}');
    $('#libStatus').append('The library is empty. Click <span class="code"><i class="fa fa-search"></i></span> to load a directory.');
  };
};
