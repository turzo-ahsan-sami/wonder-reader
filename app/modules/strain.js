// strain.js cleans out the dirty files, like .DS_Store
const { copyArray } = require('./copyData');
const path = require('path');

const polaritySort = require('../modules/polaritySort.js');

const comicTypes = ['.cbr', '.cbz'];
const imageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];

// Determiner Functions
const isSomething = (filename, types) =>
  types.includes(path.extname(filename).toLowerCase());

const isComic = filename => isSomething(filename, comicTypes);
const isImage = filename => isSomething(filename, imageTypes);

// Array Functions
const sortArrayByAlpha = ARRAY =>
  copyArray(ARRAY).sort((a, b) => polaritySort(a, b));

// Cleans out non image files from ARRAY
const strainer = fileTypes => files =>
  sortArrayByAlpha(
    files.filter(file => fileTypes.includes(path.extname(file))),
  );

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
  strainImages,
};
