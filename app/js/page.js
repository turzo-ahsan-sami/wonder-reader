var center = require('./centerfold.js');
var $ = require('jquery');

function pageTurn(val) {
  var filePath = decodeURIComponent(document.getElementById('viewImgOne').src.substr(7)); // removes file:// from PATH
  var fileDir = path.dirname(filePath);
  var dirArray = fs.readdirSync(fileDir);
  var fileName = path.basename(filePath);
  var index = dirArray.indexOf(fileName);
  var centerFolds = center.fold('viewImgOne');
  var viewOne = document.getElementById('viewImgOne');
  var viewTwo = document.getElementById('viewImgTwo');
  var one = 1;

  var polarity = 1;
  if (val < 0) {
    var polarity = -1;
  };

  if (index + val >= dirArray.length -1) { // Limits val to range
    index = dirArray.length -1;
    val = 0;
    one = 0;
  } else if (index + val <= 0) {
    index = 0;
    val = 0;
    one = 0;
  };

  if (centerFolds.length == 0) {
  // For no centerFolds. This is easy.
    console.log(29);
    index = index + val;
    if (index + 1 == dirArray.length) {
      singlePage(val, fileDir, dirArray, index);
    } else {
      defaults(val, fileDir, dirArray, index)
    }
  } else if (centerFolds.length == 1) {
  // For when a single CenterFold exists //
    console.log(38)
    if (centerFolds[0] % 2 == 0) { // EVEN, assumes page turning right && two page turning
      if (index + val == centerFolds[0]) { //
        index = index + val;
        singlePage(val, fileDir, dirArray, index);
      } else if (index == centerFolds[0]) { // For when actually on the centerFold
        index = index + one*polarity;
        defaults(val, fileDir, dirArray, index)
      } else {
        index = index + val;
        defaults(val, fileDir, dirArray, index);
      };
    } else {
    // (centerFolds[0] % 2 == 1) :: ODD, assumes page turning right && two page turning
      console.log(49);
      if (index == 0 || index == centerFolds[0]) {
      // For when displaying first page
        index = index + one*polarity;
        defaults(val, fileDir, dirArray, index); // For when displaying 2 pages
      } else if (index + val == centerFolds[0] || index + val == 0) {
      // For when landing on either CenterFold or Cover
        index = index + val;
        singlePage(val, fileDir, dirArray, index);
      } else {
      // For all other cases
        index = index + val;
        defaults(val, fileDir, dirArray, index);
      };
    };

  } else {
    // For when many CenterFold exists //
    console.log(67)
    if (centerFolds[0] % 2 == 0) { // EVEN, assumes page turning right && two page turning
      if (centerFolds.indexOf(index + val) > -1) {
      // When landing on centerFolds[]
        index = index + val;
        singlePage(val, fileDir, dirArray, index);
      } else if (centerFolds.indexOf(index) > -1 || centerFolds.indexOf(index + val) > -1) {
      // For when actually on the centerFolds[]
        index = index + one*polarity;
        defaults(val, fileDir, dirArray, index);
      } else {
      // For when you have nothing to do with centerFolds[]
        index = index + val;
        defaults(val, fileDir, dirArray, index);
      };
    } else {
    // (centerFolds[0] % 2 == 1) :: ODD, assumes page turning right && two page turning
      console.log(79)
      if (index == 0 || centerFolds.indexOf(index) > -1) {
      // For when displaying first page
        index = index + one*polarity;
        defaults(val, fileDir, dirArray, index); // For when displaying 2 pages
      } else if (centerFolds.indexOf(index + val) > -1 || index + val == 0) {
      // For when landing on either CenterFold or Cover
        index = index + val;
        singlePage(val, fileDir, dirArray, index);
      } else {
      // For all other cases
        index = index + val;
        defaults(val, fileDir, dirArray, index);
      }
    }
  }

  if (centerFolds.indexOf(index + 1*polarity) > -1 || dirArray[index + 1*polarity] == null) { // if nextPage is two-page spread |or| for when the last page falls on #viewImgOne
    singlePage(val, fileDir, dirArray, index);
    if (index >= dirArray.length -1) {
      index = dirArray.length -1; // TODO: figure out this proper value
    } else if (index <= 0) {
      index = 0;
    };
  }

};

function singlePage(val, fileDir, dirArray, index) { // For Single page viewing and styling
  var viewOne = document.getElementById('viewImgOne');
  var viewTwo = document.getElementById('viewImgTwo');

  viewOne.style.width = '100%';
  viewTwo.src = path.join(fileDir, encodeURIComponent(dirArray[index]));
  viewTwo.style.display = 'none';
  viewOne.src = path.join(fileDir, encodeURIComponent(dirArray[index]));
};

function defaults(val, fileDir, dirArray, index) {
  var viewOne = document.getElementById('viewImgOne');
  var viewTwo = document.getElementById('viewImgTwo');
  var centerFolds = center.fold('viewImgOne');
  if (index >= dirArray.length -1) {
    index = dirArray.length -1;
  } else if (index <= 0) {
    index = 0;
  };
  if (Math.abs(val) == 2) {
    if (index + 1 >= dirArray.length || centerFolds.indexOf(index) > -1 || centerFolds.indexOf(index + 1) > -1) {
      singlePage(val, fileDir, dirArray, index);
    } else {
      viewOne.style.width = '50%';
      viewTwo.style.width = '50%';
      viewOne.style.display = 'initial';
      viewTwo.style.display = 'initial';
      viewOne.src = path.join(fileDir, encodeURIComponent(dirArray[index]));
      viewTwo.src = path.join(fileDir, encodeURIComponent(dirArray[index + 1]));
    }
  } else if (Math.abs(val) == 1) { // If val == 1
    singlePage(val, fileDir, dirArray, index);
  } else {
    alert('Danger! Danger! Will Robinson!\nErr: page.js @ ln 140 :: Invalid variable val: ' + val)
  }
};

exports.right = () => { // Gets val from #column... see pageturn.js: pageSpread()
  var val = document.getElementById('column').dataset.val;
  pageTurn(val);
}

exports.left = () => {
  var val = document.getElementById('column').dataset.val * -1;
  pageTurn(val);
}

exports.spread = () => { // Default is 2
  var filePath = decodeURIComponent(document.getElementById('viewImgOne').src.substr(7)); // removes file:// from PATH
  var fileDir = path.dirname(filePath);
  var dirArray = fs.readdirSync(fileDir);
  var fileName = path.basename(filePath);
  var index = dirArray.indexOf(fileName);
  var centerFolds = center.fold('viewImgOne');
  var viewOne = document.getElementById('viewImgOne');
  var viewTwo = document.getElementById('viewImgTwo');

  if($('#column').hasClass('disabled')) {
    $('#column').removeClass('disabled');
    document.getElementById('column').dataset.val = 2;
    defaults(val, fileDir, dirArray, index);
  } else {
    $('#column').addClass('disabled');
    document.getElementById('column').dataset.val = 1;
    singlePage(val, fileDir, dirArray, index);
  };
};

exports.onLoad = () => {
  var filePath = decodeURIComponent(document.getElementById('viewImgOne').src.substr(7)); // removes file:// from PATH
  var fileDir = path.dirname(filePath);
  var dirArray = fs.readdirSync(fileDir);
  var fileName = path.basename(filePath);
  var index = dirArray.indexOf(fileName);
  var centerFolds = center.fold('viewImgOne');
  var val = document.getElementById('column').dataset.val;

  if (centerFolds[0]%2 == 1 || val == 1) {
    singlePage(val, fileDir, dirArray, index);
  } else {
    defaults(val, fileDir, dirArray, index);
  };
};
