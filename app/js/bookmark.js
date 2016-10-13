var fs = require('fs');
var jsonfile = require('jsonfile');
var os = require('os');
var page = require('./page.js')
var path = require('path');

var template = {
  "name": "",
  "currentIndex": 0,
  "fullIndex": 0
}

var baseName, index, json;
var bookmark = path.join(os.tmpdir(), 'wonderReader', 'json', 'bookmark.json');

exports.onLoad = (filePath, directoryContents) => {
  baseName = path.basename(filePath);

  template.name = baseName;
  template.currentIndex = 0;
  template.fullIndex = directoryContents.length - 1;
  console.log(template);

  template = Object.keys(template).map(function(k) { return template[k] }); // JSON => Array
  console.log(template);

  var json = jsonfile.readFile(bookmark, function(err, obj) {
    if (err) {
      var newArray = [];
      newArray.push(template); // Pushes into Array
      obj = JSON.stringify(newArray); // Array => JSON
      jsonfile.writeFileSync(bookmark, obj, {spaces: 2});
      return 0;
    }
    console.log(obj);
    var jsonArray = Object.keys(obj).map(function(k) { return obj[k] }); // JSON => Array
    jsonArray.push(template);
    console.log(JSON.stringify(jsonArray)); // TODO: Fix broken Arrays
    console.log(jsonArray);
  });

};

exports.onChange = (index) => {
  template.currentIndex = index;

}
