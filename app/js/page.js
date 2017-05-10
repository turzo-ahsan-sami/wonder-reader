// page.js turns pages.

const bookmark = require('./bookmark.js');
const center = require('./centerfold.js');
const config = require('./config.js');
const decode = require('./decode.js');
const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');
const strain = require('./strain.js');

let centerFolds, dirContents, fileDir, fileName, filePath, loadedImages;

// Function variables
let defaults, pageTurn, singlePage;

const viewOne = document.getElementById('viewImgOne');
const viewTwo = document.getElementById('viewImgTwo');
const column = document.getElementById('column');
const viewer = document.getElementById('viewer');
const clearImg = path.join('.', 'images', 'FFFFFF-0.0.png');

exports.load = (file) => {
  let continueIndex, index, r;

  filePath = decode(viewOne);
  fileName = path.basename(filePath);
  fileDir = path.dirname(filePath);
  dirContents = strain(fs.readdirSync(fileDir));
  centerFolds = center.fold('viewImgOne');

  index = 0;
  continueIndex = Number(bookmark.onFileLoad(file, dirContents));
  viewOne.src = clearImg; // Clears the screen to minimize choppiness
  viewTwo.src = clearImg;
  if (continueIndex > 0) {
    r = confirm(`Continue ${path.basename(file)} at page ${continueIndex}`);
    if (r === true) {
      index = continueIndex;
    } else {
      index = 0;
    }
  }

  switch (Number(column.dataset.val)) {
  case 1:
    singlePage(fileDir, dirContents, index);
    break;
  default:
    defaults(fileDir, dirContents, index);
  }

  // Preloads each image file for a smoother experience
  loadedImages = [];
  for (let i = 0; i < dirContents.length; i++) {
    let img = new Image();
    let imgSrc = path.join(fileDir, encodeURIComponent(dirContents[i]));
    img.src = imgSrc;
    loadedImages.push(img);
  }
};

pageTurn = (val) => {
  let index, polarity;

  filePath = decode(viewOne);
  fileName = path.basename(filePath);
  index = Number(dirContents.indexOf(fileName));
  val = Number(val);

  polarity = 1;
  if (val < 0) {
    polarity = -1;
  }

  // Limits Val to range
  if (index + val >= dirContents.length - 1) { // For last page
    if (Math.abs(val) === 2 && index === dirContents.length - 2) {
      if (centerFolds.indexOf(dirContents.length - 1) > -1) {
        index = dirContents.length - 1;
        singlePage(fileDir, dirContents, index);
      } else {
        index = dirContents.length - 2;
        defaults(fileDir, dirContents, index);
      }
    } else {
      index = dirContents.length - 1;
      singlePage(fileDir, dirContents, index);
    }
  } else if (index + val <= 0) { // For first page
    index = 0;
    defaults(fileDir, dirContents, index);
  } else {
    if (centerFolds.length === 0) {
      // For no centerFolds. This is easy
      index = index + val;
      if (index === dirContents.length - 1) {
        singlePage(fileDir, dirContents, index);
      } else {
        defaults(fileDir, dirContents, index);
      }
    } else {
      // For when any CenterFold exists //
      if (centerFolds.indexOf(index + polarity) > -1) {
        index = index + polarity;
        singlePage(fileDir, dirContents, index);
      } else if (centerFolds.indexOf(index + val) > -1) {
        index = index + val;
        singlePage(fileDir, dirContents, index);
      } else if (centerFolds.indexOf(index) > -1) {
        if (polarity > 0) {
          index = index + polarity;
        } else {
          index = index + val;
        }
        defaults(fileDir, dirContents, index);
      } else {
        index = index + val;
        defaults(fileDir, dirContents, index);
      }
    }
  }
  bookmark.onChange(index); // Updates bookmark.json
};

// For Single page viewing and styling
singlePage = (fileDir, dirContents, index) => {
  viewOne.style.width = '100%';
  viewTwo.style.display = 'none';
  viewOne.src = path.join(fileDir, encodeURIComponent(dirContents[index]));
  viewTwo.src = path.join('images', 'FFFFFF-0.0.png');
  viewer.scrollTop = 0;
  viewer.scrollLeft = 0;
};

defaults = (fileDir, dirContents, index) => {
  let val = Number(column.dataset.val), sizeOne, sizeTwo, ratioOne, ratioTwo;
  switch (Math.abs(val)) {
  case 1:
    singlePage(fileDir, dirContents, index);
    break;
  default:
    if (index >= dirContents.length - 1 || centerFolds.indexOf(index) > -1 || centerFolds.indexOf(index + 1) > -1) {
      singlePage(fileDir, dirContents, index);
    } else {
      viewOne.style.display = 'initial';
      viewTwo.style.display = 'initial';

      sizeOne = sizeOf(path.join(fileDir, dirContents[index]));
      sizeTwo = sizeOf(path.join(fileDir, dirContents[index + 1]));
      ratioOne = sizeOne.width / sizeOne.height;
      ratioTwo = sizeTwo.width / sizeTwo.height;

      viewOne.style.width = `${ratioOne / (ratioOne + ratioTwo) * 100}%`;
      viewTwo.style.width = `${ratioTwo / (ratioOne + ratioTwo) * 100}%`;

      viewOne.src = path.join(fileDir, encodeURIComponent(dirContents[index]));
      viewTwo.src = path.join(fileDir, encodeURIComponent(dirContents[index + 1]));

      viewer.scrollTop = 0;
      viewer.scrollLeft = 0;
    }
  }
};

exports.Right = () => { // See exports.spread
  let val = column.dataset.val;
  pageTurn(val);
};

exports.Left = () => {
  let val = column.dataset.val * -1;
  pageTurn(val);
};

exports.spread = () => {
  filePath = decode(viewOne);
  let index = dirContents.indexOf(path.basename(filePath));

  if (column.classList.contains('disabled')) {
    column.classList.remove('disabled');
    column.dataset.val = 2;
    defaults(fileDir, dirContents, index);
  } else {
    column.classList.add('disabled');
    column.dataset.val = 1;
    singlePage(fileDir, dirContents, index);
  }
  config.pageViewSave(column.dataset.val);
};
