var fs = require('fs');
var isThere = require('is-there');
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

  json = jsonfile.readFile(bookmark, function(err, obj) {
    if (err) {
      jsonfile.writeFileSync(bookmark, template, {spaces: 2})
    }
    for (var i = 0; i < json.length; i++) {
      if (baseName == json[i].name) {
        template = json[i];
      };
    };
    if (template.currentIndex != 0) {
      var r = confirm("Continue from last page?");
      if (r == true) {
        return template.currentIndex;
      } else {
        return 0;
      };
    } else {
      jsonfile.writefile()
      return 0;
    };
  });
};

exports.onChange = (index) => {
  template.currentIndex = index;

}
