var center = require('./centerfold.js');
var $ = require('jquery');
var path = require('path');
var fs = require('fs');

function pageTurn(val) {
  var filePath = decodeURIComponent(document.getElementById('viewImgOne').src.substr(7)); // removes file:// from PATH
  var fileDir = path.dirname(filePath);
  var dirContents = fs.readdirSync(fileDir);
  var fileName = path.basename(filePath);
  var index = Number(dirContents.indexOf(fileName));
  var centerFolds = center.fold('viewImgOne');
  var viewOne = document.getElementById('viewImgOne');
  var viewTwo = document.getElementById('viewImgTwo');

  var val = Number(val);

  var polarity = 1;
  if (val < 0) {
    var polarity = -1;
  };

  // Limits Val to range
  if (index + val >= dirContents.length -1) { // For last page
    index = dirContents.length -1;
    val = 0;
    polarity = 0;
    singlePage(fileDir, dirContents, index, polarity);
  } else if (index + val <= 0) { // For first page
    index = 0;
    val = 0;
    polarity = 0;
    defaults(fileDir, dirContents, index, polarity);
  } else {

    if (centerFolds.length == 0) {
    // For no centerFolds. This is easy.
      console.log(34);
      index = index + val;
      if (index == dirContents.length - 1) {
        singlePage(fileDir, dirContents, index, polarity);
      } else {
        defaults(fileDir, dirContents, index, polarity);
      }
    } else {
    // For when many CenterFold exists //
      console.log(43)
      if (centerFolds[0] % 2 == 0) { // EVEN
        if (centerFolds.indexOf(index + polarity) > -1) {
          console.log('I think you\'re landing on centerFolds[]')
          index = index + polarity;
          singlePage(fileDir, dirContents, index, polarity);
        } else if (centerFolds.indexOf(index + val) > -1) {
          console.log ('When landing on centerFolds[]')
          index = index + val;
          singlePage(fileDir, dirContents, index, polarity);
        } else if (centerFolds.indexOf(index) > -1) {
          console.log('For when actually on the centerFolds[]')
          index = index + polarity;
          defaults(fileDir, dirContents, index, polarity);
        } else {
          console.log('For when you have nothing to do with centerFolds[]');
          var index = index + val;
          defaults(fileDir, dirContents, index, polarity);
        };
      } else {
      // (centerFolds[0] % 2 == 1) :: ODD
        console.log(60)
        if (index == 0 || centerFolds.indexOf(index) > -1) {
        // For when displaying first page or leaving centerFolds
          index = index + polarity;
          defaults(fileDir, dirContents, index, polarity); // For when displaying 2 pages
        } else if (centerFolds.indexOf(index + val) > -1 || index + val == 0) {
        // For when landing on either CenterFold or Cover
          index = index + val;
          singlePage(fileDir, dirContents, index, polarity);
        } else {
        // For all other cases
          index = index + val;
          defaults(fileDir, dirContents, index, polarity);
        };
      };
    };
  };
};

function singlePage(fileDir, dirContents, index, polarity) { // For Single page viewing and styling
  var viewOne = document.getElementById('viewImgOne');
  var viewTwo = document.getElementById('viewImgTwo');

  viewOne.src = path.join(fileDir, encodeURIComponent(dirContents[index]));
  viewOne.style.width = '100%';
  viewTwo.style.display = 'none';
  viewTwo.src = path.join(fileDir, encodeURIComponent(dirContents[index]));
};

function defaults(fileDir, dirContents, index, polarity) {
  var viewOne = document.getElementById('viewImgOne');
  var viewTwo = document.getElementById('viewImgTwo');
  var centerFolds = center.fold('viewImgOne');
  var val = document.getElementById('column').dataset.val;

  if (Math.abs(val) == 2) {
    if (index >= dirContents.length -1 || centerFolds.indexOf(index) > -1 || centerFolds.indexOf(index + 1*polarity) > -1) {
      console.log(98 + ' ' + fileDir + ' ' + dirContents[index] + ' ' + index)
      singlePage(fileDir, dirContents, index, polarity);
    } else {
      console.log(101 + ' ' + fileDir + ' ' + dirContents[index] + ' ' + index)
      viewOne.style.display = 'initial';
      viewTwo.style.display = 'initial';
      viewOne.src = path.join(fileDir, encodeURIComponent(dirContents[index]));
      viewTwo.src = path.join(fileDir, encodeURIComponent(dirContents[index + 1]));
      viewOne.style.width = '50%';
      viewTwo.style.width = '50%';

      // var ratioOne = viewOne.width / viewOne.height;
      // var ratioTwo = viewTwo.width / viewTwo.height;
      //
      // viewOne.style.width = ratioOne/(ratioOne + ratioTwo)*100 + '%';
      // viewTwo.style.width = ratioTwo/(ratioOne + ratioTwo)*100 + '%';

    }
  } else if (Math.abs(val) == 1) { // If val == 1
    singlePage(fileDir, dirContents, index, polarity);
  } else {
    alert('Danger! Danger! Will Robinson!\nErr: page.js @ ln 140 :: Invalid variable val: ' + val)
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

exports.spread = () => { // Default is 2
  var filePath = decodeURIComponent(document.getElementById('viewImgOne').src.substr(7));
  var fileDir = path.dirname(filePath);
  var dirContents = fs.readdirSync(fileDir);
  var fileName = path.basename(filePath);
  var index = dirContents.indexOf(fileName);
  var polarity = 1;

  if($('#column').hasClass('disabled')) {
    $('#column').removeClass('disabled');
    document.getElementById('column').dataset.val = 2;
    defaults(fileDir, dirContents, index, polarity);
  } else {
    $('#column').addClass('disabled');
    document.getElementById('column').dataset.val = 1;
    singlePage(fileDir, dirContents, index, polarity);
  };
};

exports.onLoad = () => {
  var filePath = decodeURIComponent(document.getElementById('viewImgOne').src.substr(7)); // removes file:// from PATH
  var fileDir = path.dirname(filePath);
  var dirContents = fs.readdirSync(fileDir);
  var fileName = path.basename(filePath);
  var index = dirContents.indexOf(fileName);
  var centerFolds = center.fold('viewImgOne');
  var val = document.getElementById('column').dataset.val;
  var polarity = 0;

  console.log('The two-page spreads for this comic are indices: ' + centerFolds)

  if (centerFolds[0]%2 == 1 || val == 1) {
    singlePage(fileDir, dirContents, index, polarity);
  } else {
    defaults(fileDir, dirContents, index, polarity);
  };
};
