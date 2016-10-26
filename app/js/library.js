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

function libBuilder(directory, array, listID) {
  $('#libStatus').remove();
  // console.log(directory)
  for (let i=0; i < array.length; i++) {
    let file = path.join(directory, array[i].name);
    if ( fs.statSync(file).isFile() ) {

      newDirectory = dirFunction.encode(directory);
      $(`#${listID}`).append(
        `<li class="file"><a href="#" onclick="file.loader('${path.join(newDirectory, encodeURIComponent(array[i].name))}')"><i class="fa fa-file" aria-hidden="true"></i>${array[i].name} ${bookmark.percent(array[i].name)}</a></li>`
      );
    } else if ( fs.statSync(file).isDirectory() ) { // Deep scans interior folders
      let newListID = (listID + array[i].name).replace(/\s|#|\(|\)|\'|,|&|\+|-/g, "");
      $(`#${listID}`).append(`<li class="folder"><a href="#" onclick="libFolders('${newListID}')"><i class="fa fa-folder" aria-hidden="true"></i><i class="fa fa-caret-down rotate" aria-hidden="true"></i>${array[i].name}</a></li><ul id=${newListID}>`);
      libBuilder(file, array[i].children, newListID);
      $(`#${listID}`).append('</ul>');
    } else {
      console.log(`${array[i].name} skipped`);
    };
  };
  $('#repeat').removeClass('rotater');
};

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
