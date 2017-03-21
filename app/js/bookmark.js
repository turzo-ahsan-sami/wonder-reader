const isThere = require('is-there');
const jsonfile = require('jsonfile');
const os = require('os');
const path = require('path');

let template = {}; // {"name": "", "currentIndex": "0", "fullIndex": "0"}
let baseName, obj;
const bookmark = path.join(os.tmpdir(), 'wonderReader', 'json', 'bookmark.json');
const regex = /\s|#|\(|\)|\'|,|&|\+|-|!|\[|\]/gi; // Reg Ex for classes

// Invoked on Comic.onLoad(), returns with current page
exports.onLoad = (filePath, directoryContents) => { // returns a new index for <img> tags
  baseName = path.basename(filePath); // Gets basename
  console.log(`${baseName} loaded into Wonder Reader!`);

  template = {};
  template.name = baseName;
  template.currentIndex = 0;
  template.fullIndex = directoryContents.length - 1;

  if (isThere(bookmark)) {
    obj = jsonfile.readFileSync(bookmark);
    if (obj[baseName] !== undefined) { // if baseName is listed
      return obj[baseName].currentIndex;
    } else { // if baseName isn't listed, adds item to bookmark.json
      obj[baseName] = template;
      jsonfile.writeFile(bookmark, obj, {spaces: 2}, function (err) {
        if (err) {
          console.error(err);
          return 0;
        }
        return 0;
      });
    }
  } else {
    obj = {};
    obj[baseName] = template; // Pushes into Array
    jsonfile.writeFileSync(bookmark, obj, {spaces: 2});
    return 0;
  }
};

// Updates JSON with current page
exports.onChange = (index) => {
  jsonfile.readFile(bookmark, function (err, obj) {
    if (err) { return err; }
    obj[baseName].currentIndex = index;
    jsonfile.writeFile(bookmark, obj, {spaces: 2}, function (err) {
      if (err) { return err; }
    });
    let percent = (obj[baseName].currentIndex / obj[baseName].fullIndex) * 100;
    let spanClass = obj[baseName].name.replace(regex, '');

    let elem = document.getElementsByClassName(spanClass);
    for (let i = 0; i < elem.length; i++) {
      elem[i].innerHTML = `${percent.toFixed(0)}%`;
    }
  });
};

// Fills library with percentage read on right hand side
exports.percent = (fileName) => {
  let spanClass = fileName.replace(regex, '');
  if (isThere(bookmark)) {
    obj = jsonfile.readFileSync(bookmark);
    if (obj[fileName]) {
      let percent = (obj[fileName].currentIndex / obj[fileName].fullIndex) * 100;
      return `<span class="bookmark-percent ${spanClass}">${percent.toFixed(0)}%</span>`;
    } else { return `<span class="bookmark-percent ${spanClass}">0%</span>`; }
  } else {
    obj = {};
    jsonfile.writeFileSync(bookmark, obj, {spaces: 2});
    return `<span class="bookmark-percent ${spanClass}">0%</span>`;
  }
};
