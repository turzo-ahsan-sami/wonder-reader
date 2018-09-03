// strain.js cleans out the dirty files, like .DS_Store
const { copyArray } = require('./copyData');
const isDirectory = require('is-directory');
const path = require('path');

const polaritySort = require('../modules/polaritySort.js');

const comicTypes = ['.cbr', '.cbz'];
const imageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];

const isComic = filename => isSomething(filename, comicTypes);
const isImage = filename => isSomething(filename, imageTypes);

// const isProperFileType = (x, i)

const isSomething = (filename, types) => {
  const extname = path.extname(filename).toLowerCase();
  return types.includes(extname);
};

const sortArrayByAlpha = ARRAY => {
  const newARRAY = copyArray(ARRAY);
  newARRAY.sort((a, b) => polaritySort(a, b));
  return newARRAY;
};

// Cleans out non image files from ARRAY
const strainer = (fileTypes, ARRAY, dirname) => {
  function isProperFileType(x, i) {
    // console.log(x, i);
    const extname = path.extname(ARRAY[i]);
    let isThisAProperFileType = fileTypes.includes(extname.toLowerCase());
    if (dirname) {
      const filepath = path.join(dirname, ARRAY[i]);
      isThisAProperFileType =
        isThisAProperFileType || isDirectory.sync(filepath);
    }
    return isThisAProperFileType;
  }
  const newARRAY = ARRAY.filter((x, i) => isProperFileType(x, i));
  return sortArrayByAlpha(newARRAY);
};

const strainComics = (ARRAY, dirname) => strainer(comicTypes, ARRAY, dirname);
const strainOnlyComics = ARRAY => strainer(comicTypes, ARRAY);
const strainImages = ARRAY => strainer(imageTypes, ARRAY);

export {
  comicTypes,
  imageTypes,
  isComic,
  isImage,
  sortArrayByAlpha,
  strainComics,
  strainOnlyComics,
  strainImages
};
