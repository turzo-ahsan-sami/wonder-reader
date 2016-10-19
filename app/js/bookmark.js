const fs = require('fs');
const isThere = require('is-there');
const jsonfile = require('jsonfile');
const os = require('os');
const page = require('./page.js')
const path = require('path');

var template = {
  "name": "",
  "currentIndex": "0",
  "fullIndex": "0"
};

let baseName, index, json, obj;
var bookmark = path.join(os.tmpdir(), 'wonderReader', 'json', 'bookmark.json');

exports.onLoad = (filePath, directoryContents) => { // returns a new index for <img> tags
  baseName = path.basename(filePath);

  template.name = baseName;
  template.currentIndex = 0;
  template.fullIndex = directoryContents.length - 1;

  template = Object.keys(template).map(function(k) { return template[k] }); // JSON => Array

  if ( isThere(bookmark) ) {
    var obj = jsonfile.readFileSync(bookmark);
    console.log(obj[baseName]);
    if (obj[baseName] != undefined) { // if baseName is listed
      console.log(`${baseName} located. Loading comic at index ${obj[baseName][1]}`);
      return obj[baseName][1];
    } else { // if baseName isn't listed, adds item to bookmark.json
      obj[baseName] = template;
      jsonfile.writeFile(bookmark, obj, {spaces: 2}, function(err) {
        if (err) {
          console.log(err);
          return 0;
        };
        console.log(`Item, ${baseName}, added to bookmark.json.`);
        return 0;
      });
    };
  } else {
    obj = {};
    obj[baseName] = template; // Pushes into Array
    jsonfile.writeFileSync(bookmark, obj, {spaces: 2});
    console.log('New bookmark.json created. Loading Comic at index 0');
    return 0;
  };
};

exports.onChange = (index) => {
  jsonfile.readFile(bookmark, function(err, obj) {
    if (err) {return err};
    obj[baseName][1] = index;
    console.log(obj[baseName][1]);
    jsonfile.writeFile(bookmark, obj, {spaces: 2}, function(err) {
      if (err) { return err };
      console.log('bookmark.json updated');
    });
  });
};

exports.percent = (fileName) => {
  var obj = jsonfile.readFileSync(bookmark);
  if ( obj[fileName] ) {
    var percent = obj[fileName][1]/obj[fileName][2];
    var xyz = `<span class="bookmark-percent">${percent.toFixed(2)*100}%</span>`;
    return xyz;
  } else { return '<span class="bookmark-percent">0%</span>'};
};
