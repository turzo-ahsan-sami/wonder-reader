// page.js turns pages.

const bookmark = require('./bookmark.js');
const center = require('./centerfold.js');
const config = require('./config.js');
const path = require('path');
const sizeOf = require('image-size');

let centerFolds, extractedImages, filePath, PAGE, loadedImages;

// Function variables
let defaults, pageTurn, singlePage;

const viewOne = document.getElementById('viewImgOne');
const viewTwo = document.getElementById('viewImgTwo');
const column = document.getElementById('column');
const columnIcon = document.getElementById('columnIcon');
const viewer = document.getElementById('viewer');
const clearImg = path.join('.', 'images', 'FFFFFF-0.0.png');

exports.load = (file, DIR, IMAGES) => {
  let savedPAGE, r;
  filePath = DIR;
  extractedImages = IMAGES;
  centerFolds = center.fold(filePath, extractedImages);

  PAGE = 0;
  savedPAGE = Number(bookmark.onLoad(file, extractedImages));
  viewOne.src = clearImg; // Clears the screen to minimize choppiness
  viewTwo.src = clearImg;
  if (savedPAGE > 0) {
    r = confirm(`Continue ${path.basename(file)} at page ${savedPAGE}`);
    if (r === true) {
      PAGE = savedPAGE;
    } else {
      PAGE = 0;
    }
  }
  PAGE = Number(PAGE);

  column.classList.remove('disabled');
  switch (Number(column.dataset.val)) {
  case 1:
    singlePage(DIR, extractedImages, PAGE);
    break;
  default:
    defaults(DIR, extractedImages, PAGE);
  }

  // Preloads each image file for a smoother experience
  imageLoad();
};

async function imageLoad() {
  loadedImages = [];
  for (let i = 0; i < extractedImages.length; i++) {
    let img = new Image();
    let imgSrc = path.join(DIR, encodeURIComponent(extractedImages[i]));
    img.src = imgSrc;
    loadedImages.push(img);
  }
}

pageTurn = (val) => {
  let polarity;
  PAGE = Number(PAGE);
  val = Number(val);

  polarity = 1;
  if (val < 0) {
    polarity = -1;
  }

  // Limits Val to range
  if (PAGE + val >= extractedImages.length - 1) { // For last page
    if (Math.abs(val) === 2 && PAGE === extractedImages.length - 2) {
      if (centerFolds.indexOf(extractedImages.length - 1) > -1) {
        PAGE = extractedImages.length - 1;
        singlePage(filePath, extractedImages, PAGE);
      } else {
        PAGE = extractedImages.length - 2;
        defaults(filePath, extractedImages, PAGE);
      }
    } else {
      PAGE = extractedImages.length - 1;
      singlePage(filePath, extractedImages, PAGE);
    }
  } else if (PAGE + val <= 0) { // For first page
    PAGE = 0;
    defaults(filePath, extractedImages, PAGE);
  } else {
    if (centerFolds.length === 0) {
      // For no centerFolds. This is easy
      PAGE = PAGE + val;
      if (PAGE === extractedImages.length - 1) {
        singlePage(filePath, extractedImages, PAGE);
      } else {
        defaults(filePath, extractedImages, PAGE);
      }
    } else {
      // For when any CenterFold exists //
      if (centerFolds.indexOf(PAGE + polarity) > -1) {
        PAGE = PAGE + polarity;
        singlePage(filePath, extractedImages, PAGE);
      } else if (centerFolds.indexOf(PAGE + val) > -1) {
        PAGE = PAGE + val;
        singlePage(filePath, extractedImages, PAGE);
      } else if (centerFolds.indexOf(PAGE) > -1) {
        if (polarity > 0) {
          PAGE = PAGE + polarity;
        } else {
          PAGE = PAGE + val;
        }
        defaults(filePath, extractedImages, PAGE);
      } else {
        PAGE = PAGE + val;
        defaults(filePath, extractedImages, PAGE);
      }
    }
  }
  bookmark.onChange(PAGE); // Updates bookmark.json
};

// For Single page viewing and styling
singlePage = (filePath, extractedImages, PAGE) => {
  viewOne.style.width = '100%';
  viewTwo.style.display = 'none';
  viewOne.src = path.join(filePath, encodeURIComponent(extractedImages[PAGE]));
  viewTwo.src = path.join('images', 'FFFFFF-0.0.png');
  viewer.scrollTop = 0;
  viewer.scrollLeft = 0;
};

defaults = (filePath, extractedImages, PAGE) => {
  let val = Number(column.dataset.val), sizeOne, sizeTwo, ratioOne, ratioTwo;
  switch (Math.abs(val)) {
  case 1:
    singlePage(filePath, extractedImages, PAGE);
    break;
  default:
    if (PAGE >= extractedImages.length - 1 || centerFolds.indexOf(PAGE) > -1 || centerFolds.indexOf(PAGE + 1) > -1) {
      singlePage(filePath, extractedImages, PAGE);
    } else {
      viewOne.style.display = 'initial';
      viewTwo.style.display = 'initial';

      sizeOne = sizeOf(path.join(filePath, extractedImages[PAGE]));
      sizeTwo = sizeOf(path.join(filePath, extractedImages[PAGE + 1]));
      ratioOne = sizeOne.width / sizeOne.height;
      ratioTwo = sizeTwo.width / sizeTwo.height;

      viewOne.style.width = `${ratioOne / (ratioOne + ratioTwo) * 100}%`;
      viewTwo.style.width = `${ratioTwo / (ratioOne + ratioTwo) * 100}%`;

      viewOne.src = path.join(filePath, encodeURIComponent(extractedImages[PAGE]));
      viewTwo.src = path.join(filePath, encodeURIComponent(extractedImages[PAGE + 1]));

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
  switch (Number(column.dataset.val)) {
  case 1:
    columnIcon.classList.remove('fa-square-o');
    columnIcon.classList.add('fa-minus-square-o');
    column.dataset.val = 2;
    defaults(filePath, extractedImages, PAGE);
    break;
  case 2:
    columnIcon.classList.remove('fa-minus-square-o');
    columnIcon.classList.add('fa-square-o');
    column.dataset.val = 1;
    singlePage(filePath, extractedImages, PAGE);
  }
  config.pageViewSave(column.dataset.val);
};
