// strain.js cleans out the dirty files, like .DS_Store
const isDirectory = require('is-directory');
const path = require('path');

const polaritySort = require('./polaritySort.js');
const { copyArray } = require('./copyData');

const comicTypes = ['.cbr', '.cbz'];
const imageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];

const isSomething = (types) => (
  (filename) => (
    types.includes(
      path.extname(filename)
        .toLowerCase()
    )
  )
);

const isComic = isSomething(comicTypes);
const isImage = isSomething(imageTypes);
const strainComics = (ARRAY, dirname) => strainer(comicTypes, ARRAY, dirname);
const strainOnlyComics = ARRAY => strainer(comicTypes, ARRAY);
const strainImages = ARRAY => strainer(imageTypes, ARRAY);

const isDir = (dirname, file) => {
  return typeof dirname === 'undefined'
    ? false
    : isDirectory
      .sync(path.join(
        dirname, file
      ));
};

const isThisProperThing = (fileTypes) => (
  (dirname) => (
    (file) => {
      const extname = path.extname(file);
      let isThisAProperFileType = fileTypes.includes(extname.toLowerCase());
      return isThisAProperFileType || isDir(dirname, file);
    }
  )
);

const sortArrayByAlpha = ARRAY => {
  const newARRAY = copyArray(ARRAY);
  return newARRAY.sort((a, b) => polaritySort(a, b));
};

// Cleans out non image files from ARRAY
const strainer = (fileTypes) => (
  (ARRAY, dirname) => {
    const isProperFileType = isThisProperThing(fileTypes)(dirname);
    const newARRAY = ARRAY.filter(isProperFileType);
    return sortArrayByAlpha(newARRAY);
  }
);

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
