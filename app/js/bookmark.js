var fs = require('fs');
var jsonfile = require('jsonfile');
var os = require('os');
var page = require('./page.js')
var path = require('path');

var template = {
  "name": "",
  "currentIndex": "0",
  "fullIndex": "0"
};

var baseName, index, json, obj;
var bookmark = path.join(os.tmpdir(), 'wonderReader', 'json', 'bookmark.json');

exports.onLoad = (filePath, directoryContents) => { // returns a new index for <img> tags
  baseName = path.basename(filePath);

  template.name = baseName;
  template.currentIndex = 0;
  template.fullIndex = directoryContents.length - 1;
  console.log(template);

  template = Object.keys(template).map(function(k) { return template[k] }); // JSON => Array
  console.log(template);

  var json = jsonfile.readFile(bookmark, function(err, obj) {
    if (err) { // On new bookmark.js creation
      obj = {};
      obj[baseName] = template; // Pushes into Array
      jsonfile.writeFileSync(bookmark, obj, {spaces: 2});
      console.log('New bookmark.json created. Loading Comic at index 0');
      return 0;
    } else { // If bookmark.js exists
      if (obj[baseName] != undefined) { // if baseName is listed
        console.log(baseName + ' located. Loading comic at index ' + obj[baseName].currentIndex)
        return obj[baseName][1];
      } else { // if baseName isn't listed, adds item to bookmark.json
        obj[baseName] = template;
        jsonfile.writeFile(bookmark, obj, {spaces: 2}, function(err) {
          if (err) {
            console.log(err);
            return 0;
          }
          console.log('Item, ' + baseName + ', added to bookmark.json.');
          return 0;
        });
      }
    };
  });
};

exports.onChange = (index) => {
  jsonfile.readFile(bookmark, function(err, obj) {
    if (err) {return err};
    obj[baseName][1] = index;
    console.log(obj[baseName].currentIndex);
    jsonfile.writeFile(bookmark, obj, {spaces: 2}, function(err) {
      if (err) { return err };
      console.dir(obj)
      console.log('bookmark.json updated');
    });
  });
};
