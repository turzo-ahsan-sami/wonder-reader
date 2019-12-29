// strain.js cleans out the dirty files, like .DS_Store
const { copyArray } = require('./copyData');
const isDirectory = require('is-directory');
const path = require('path');

const polaritySort = require('../modules/polaritySort.js');

const comicTypes = ['.cbr', '.cbz'];
const imageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];

const isSomething = types => filename => {
  const extname = path.extname(filename).toLowerCase();
  return types.includes(extname);
};

const isComic = isSomething(comicTypes);
const isImage = isSomething(imageTypes);

const sortArrayByAlpha = ARRAY => {
  const newARRAY = copyArray(ARRAY);
  newARRAY.sort((a, b) => polaritySort(a, b));
  return newARRAY;
};

// Cleans out non image files from ARRAY
const strainer = (ARRAY, dirname) => fileTypes => {
  function isProperFileType(file) {
    const extname = path.extname(file);
    const isThisAProperFileType = fileTypes.includes(extname.toLowerCase());
    if (dirname) {
      const filepath = path.join(dirname, file);
      return isThisAProperFileType || isDirectory.sync(filepath);
    }
    return isThisAProperFileType;
  }
  const newARRAY = ARRAY.filter((x, i) => isProperFileType(x, i));
  return sortArrayByAlpha(newARRAY);
};

const strainComics = strainer(comicTypes);
const strainOnlyComics = strainer(comicTypes);
const strainImages = strainer(imageTypes);

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
