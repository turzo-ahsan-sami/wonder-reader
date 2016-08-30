var $ = require('jquery');
var center = require('./centerfold.js');
var fs = require('fs');
var path = require('path');
var strain = require('./strain.js');

var centerFolds

function pageTurn(val) {
  var filePath = decodeURIComponent(document.getElementById('viewImgOne').src.substr(7));
  var fileDir = path.dirname(filePath);
  var dirContents = strain(fs.readdirSync(fileDir));
  var fileName = path.basename(filePath);
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
    // For no centerFolds. This is easy.
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
};

function singlePage(fileDir, dirContents, index) { // For Single page viewing and styling
  var viewOne = document.getElementById('viewImgOne');
  var viewTwo = document.getElementById('viewImgTwo');
  dirContents = strain(dirContents)

  viewOne.src = path.join(fileDir, encodeURIComponent(dirContents[index]));
  viewOne.style.width = '100%';
  viewTwo.style.display = 'none';
  viewTwo.src = path.join(fileDir, encodeURIComponent(dirContents[index]));
};

function defaults(fileDir, dirContents, index, polarity) {
  var inner = document.getElementById('innerWindow');
  var viewOne = document.getElementById('viewImgOne');
  var viewTwo = document.getElementById('viewImgTwo');
  var val = document.getElementById('column').dataset.val;

  dirContents = strain(dirContents);

  if (Math.abs(val) == 2) {
    if (index >= dirContents.length -1 || centerFolds.indexOf(index) > -1 || centerFolds.indexOf(index + 1*polarity) > -1) {
      singlePage(fileDir, dirContents, index);
    } else {
      viewOne.style.display = 'initial';
      viewTwo.style.display = 'initial';
      viewOne.src = path.join(fileDir, encodeURIComponent(dirContents[index]));
      viewTwo.src = path.join(fileDir, encodeURIComponent(dirContents[index + 1]));
      viewOne.style.width = '50%';
      viewTwo.style.width = '50%';

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
  if(viewOne.clientHeight >= viewTwo.clientHeight) {
    inner.style.height = viewOne.clientHeight + "px";
  } else {
    inner.style.height = viewTwo.clientHeight + "px";
  };
};

exports.Right = () => { // See page.spread()
  var val = document.getElementById('column').dataset.val;
  pageTurn(val);
}

exports.Left = () => {
  var val = document.getElementById('column').dataset.val * -1;
  pageTurn(val);
}

exports.spread = () => { // Default is 2
  var filePath = decodeURIComponent(document.getElementById('viewImgOne').src.substr(7));
  var fileDir = path.dirname(filePath);
  var dirContents = strain(fs.readdirSync(fileDir));
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

exports.onLoad = () => {
  var filePath = decodeURIComponent(document.getElementById('viewImgOne').src.substr(7));
  var fileDir = path.dirname(filePath);
  var dirContents = strain(fs.readdirSync(fileDir));
  var fileName = path.basename(filePath);
  var index = dirContents.indexOf(fileName);
  var val = document.getElementById('column').dataset.val;
  var polarity = 0;

  centerFolds = center.fold('viewImgOne');

  // Removed 'centerFolds[0]%2 == 1 ||' from if statement
  if (val == 1) {
    singlePage(fileDir, dirContents, index);
  } else {
    defaults(fileDir, dirContents, index, polarity);
  };
};
