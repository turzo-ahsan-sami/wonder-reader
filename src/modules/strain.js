// strain.js cleans out the dirty files, like .DS_Store
const {copyArray} = require('./copyData.js');
const isDirectory = window.require('is-directory');
const path = require('path');

const comicTypes = ['.cbr', '.cbz'];
const imageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];

const isComic = (filename) => {
  return isSomething(filename, comicTypes);
};

const isImage = (filename) => {
  return isSomething(filename, imageTypes);
};

const isSomething = (filename, types) => {
  const extname = path.extname(filename).toLowerCase();
  const IsSomething = types.indexOf(extname) > -1;
  return IsSomething;
};

const sortArrayByAlpha = (ARRAY) => {
  const newARRAY = copyArray(ARRAY);
  newARRAY.sort((a, b) => {
    const nameA = a.toLowerCase();
    const nameB = b.toLowerCase();
    return nameA === nameB
      ? 0
      : nameA < nameB ? -1 : 1;
  });
  return newARRAY;
};

// Cleans out non image files from ARRAY
const strainer = (fileTypes, ARRAY, dirname) => {
  ARRAY.filter(function(x, i) {
    let isProperFileType = fileTypes.indexOf(path.extname(ARRAY[i]).toLowerCase()) > -1;
    if (dirname) {
      const filepath = path.join(dirname, ARRAY[i]);
      isProperFileType = (isProperFileType || isDirectory.sync(filepath));
    }
    return isProperFileType;
  });
  return sortArrayByAlpha(ARRAY);
};

const strainComics = (ARRAY, dirname) => {
  const strained = strainer(comicTypes, ARRAY, dirname);
  return strained;
};

const strainImages = (ARRAY) => {
  const strained = (imageTypes, ARRAY);
  return strained;
};

export {
  comicTypes,
  imageTypes,
  isComic,
  isImage,
  sortArrayByAlpha,
  strainComics,
  strainImages
};
