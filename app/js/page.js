// page.js turns pages.  TODO: Research how files are held in win32 environments

var $ = require('jquery');
var center = require('./centerfold.js');
var fs = require('fs');
var path = require('path');
var strain = require('./strain.js');

var centerFolds;
var dirContents;
var fileDir;
var fileName;
var filePath;

var inner = document.getElementById('innerWindow');
var viewOne = document.getElementById('viewImgOne');
var viewTwo = document.getElementById('viewImgTwo');

exports.load = () => {
  filePath = decodeURIComponent(document.getElementById('viewImgOne').src.substr(7));
  if (process.platform == "win32") {
    filePath = decodeURIComponent(document.getElementById('viewImgOne').src.substr(8));
  }
  fileName = path.basename(filePath);
  fileDir = path.dirname(filePath);
  dirContents = strain(fs.readdirSync(fileDir));
  centerFolds = center.fold('viewImgOne');

  var index = dirContents.indexOf(fileName);
  var val = Number(document.getElementById('column').dataset.val);
  var polarity = 0;

  if (val == 1) {
    singlePage(fileDir, dirContents, index);
  } else {
    defaults(fileDir, dirContents, index, polarity);
  };
};

function pageTurn(val) {
  filePath = decodeURIComponent(document.getElementById('viewImgOne').src.substr(7));
  if (process.platform == "win32") {
    filePath = decodeURIComponent(document.getElementById('viewImgOne').src.substr(8));
  }
  fileName = path.basename(filePath);
  var index = Number(dirContents.indexOf(fileName));
  val = Number(val);

  var polarity = 1;
  if (val < 0) {
    var polarity = -1;
  };

  // Limits Val to range
  if (index + val >= dirContents.length -1) { // For last page
    index = dirContents.length -1;
    val = 0;
    polarity = 0;
    singlePage(fileDir, dirContents, index);
  } else if (index + val <= 0) { // For first page
    index = 0;
    val = 0;
    polarity = 0;
    defaults(fileDir, dirContents, index, polarity);
  } else {
    if (centerFolds.length == 0) {
    // For no centerFolds. This is easy
      index = index + val;
      if (index == dirContents.length - 1) {
        singlePage(fileDir, dirContents, index);
      } else {
        defaults(fileDir, dirContents, index, polarity);
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
        defaults(fileDir, dirContents, index, polarity);
      } else {
        index = index + val;
        defaults(fileDir, dirContents, index, polarity);
      };
    };
  };
  document.getElementById('viewer').scrollTop = 0;
  document.getElementById('viewer').scrollLeft = 0;
};

function singlePage(fileDir, dirContents, index) { // For Single page viewing and styling
  viewOne.src = path.join(fileDir, encodeURIComponent(dirContents[index]));
  viewOne.style.width = '100%';
  viewTwo.style.display = 'none';
  viewTwo.src = path.join(fileDir, encodeURIComponent(dirContents[index]));
  // if(viewOne.clientHeight >= viewTwo.clientHeight) {
  //   inner.style.height = viewOne.clientHeight + "px";
  // } else {
  //   inner.style.height = viewTwo.clientHeight + "px";
  // };
};

function defaults(fileDir, dirContents, index, polarity) {
  var val = Number(document.getElementById('column').dataset.val);

  if (Math.abs(val) == 2) {
    if (index >= dirContents.length -1 || centerFolds.indexOf(index) > -1 || centerFolds.indexOf(index + 1*polarity) > -1) {
      singlePage(fileDir, dirContents, index);
    } else {
      viewOne.style.display = 'initial';
      viewTwo.style.display = 'initial';
      viewOne.style.width = '50%';
      viewTwo.style.width = '50%';
      viewOne.src = path.join(fileDir, encodeURIComponent(dirContents[index]));
      viewTwo.src = path.join(fileDir, encodeURIComponent(dirContents[index + 1]));


      // if(viewOne.clientHeight >= viewTwo.clientHeight) {
      //   inner.style.height = viewOne.clientHeight + "px";
      // } else {
      //   inner.style.height = viewTwo.clientHeight + "px";
      // };

      // var ratioOne = viewOne.width / viewOne.height;
      // var ratioTwo = viewTwo.width / viewTwo.height;
      // viewOne.style.width = ratioOne/(ratioOne + ratioTwo)*100 + '%';
      // viewTwo.style.width = ratioTwo/(ratioOne + ratioTwo)*100 + '%';
    }
  } else if (Math.abs(val) == 1) { // If val == 1
    singlePage(fileDir, dirContents, index);
  } else {
    alert('Danger! Danger! Will Robinson!\nErr: page.js @ ln 126 :: Invalid variable val: ' + val)
  }
};

exports.Right = () => { // See page.spread()
  var val = document.getElementById('column').dataset.val;
  pageTurn(val);
}

exports.Left = () => {
  var val = document.getElementById('column').dataset.val * -1;
  pageTurn(val);
}

exports.spread = () => {
  filePath = decodeURIComponent(document.getElementById('viewImgOne').src.substr(7));
  if (process.platform == "win32") {
    filePath = decodeURIComponent(document.getElementById('viewImgOne').src.substr(8));
  }
  var index = dirContents.indexOf(path.basename(filePath));
  var polarity = 1;

  if($('#column').hasClass('disabled')) {
    $('#column').removeClass('disabled');
    document.getElementById('column').dataset.val = 2;
    defaults(fileDir, dirContents, index, polarity);
  } else {
    $('#column').addClass('disabled');
    document.getElementById('column').dataset.val = 1;
    singlePage(fileDir, dirContents, index);
  };
};
