// bookmark.js updates read percentage as well as saving the position in $temp/bookmark.json

const isThere = require('is-there');
const jsonfile = require('jsonfile');
const os = require('os');
const path = require('path');

let template = {}; // {"name": "", "currentIndex": "0", "fullIndex": "0"}
let baseName, obj;
const bookmark = path.join(os.tmpdir(), 'wonderReader', 'json', 'bookmark.json');
const regex = /\s|#|\(|\)|\'|,|&|\+|-|!|\[|\]/gi; // Reg Ex for classes

// Invoked on Comic.onLoad(), returns with current page and option to continue
exports.onFileLoad = (filePath, directoryContents) => {
  baseName = path.basename(filePath); // Gets basename
  console.log(`${baseName} loaded into Wonder Reader!`);

  template = {
    name: baseName,
    currentIndex: 0,
    fullIndex: directoryContents.length - 1
  };

  switch (isThere(bookmark)) {
  case true:
    obj = jsonfile.readFileSync(bookmark);
    if (obj[baseName] !== undefined) { // if baseName is listed
      return obj[baseName].currentIndex;
    } else { // if baseName isn't listed, adds item to bookmark.json
      obj[baseName] = template;
      jsonfile.writeFileSync(bookmark, obj, {spaces: 2});
      return 0;
    }
  default:
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
    let base = path.basename(obj[baseName].name, path.extname(obj[baseName].name));
    let spanClass = base.replace(regex, '');

    let elem = document.getElementsByClassName(spanClass);
    for (let i = 0; i < elem.length; i++) {
      elem[i].innerHTML = `${percent.toFixed(0)}%`;
    }
  });
};

exports.onStart = () => {
  if (isThere(bookmark)) {
    obj = jsonfile.readFileSync(bookmark);
  } else {
    obj = {};
  }
};

// Fills library with percentage read on right hand side
exports.percent = (fileName) => {
  let base = path.basename(fileName, path.extname(fileName));
  let spanClass = base.replace(regex, '');
  if (isThere(bookmark)) {
    let comic = obj[fileName];
    if (comic) {
      let percent = (comic.currentIndex / comic.fullIndex) * 100;
      return `<span class="bmPercent ${spanClass}">${percent.toFixed(0)}%</span>`;
    } else { return `<span class="bmPercent ${spanClass}">0%</span>`; }
  } else {
    jsonfile.writeFileSync(bookmark, obj, {spaces: 2});
    return `<span class="bmPercent ${spanClass}">0%</span>`;
  }
};
