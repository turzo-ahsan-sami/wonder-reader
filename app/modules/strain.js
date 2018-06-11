// strain.js cleans out the dirty files, like .DS_Store
const { copyArray } = require('./copyData');
const isDirectory = require('is-directory');
const path = require('path');

const comicTypes = ['.cbr', '.cbz'];
const imageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];

const isComic = filename => isSomething(filename, comicTypes);
const isImage = filename => isSomething(filename, imageTypes);
const isSomething = (filename, types) => {
  const extname = path.extname(filename).toLowerCase();
  const IsSomething = types.indexOf(extname) > -1;
  return IsSomething;
};

const sortArrayByAlpha = ARRAY => {
  const newARRAY = copyArray(ARRAY);
  newARRAY.sort((a, b) => {
    const nameA = a.toLowerCase();
    const nameB = b.toLowerCase();
    const polarity = nameA < nameB ? -1 : 1;
    return nameA === nameB ? 0 : polarity;
  });
  return newARRAY;
};

// Cleans out non image files from ARRAY
const strainer = (fileTypes, ARRAY, dirname) => {
  // console.log(ARRAY);
  function isProperFileType(x, i) {
    let isThisAProperFileType =
      fileTypes.indexOf(path.extname(ARRAY[i]).toLowerCase()) > -1;
    if (dirname) {
      const filepath = path.join(dirname, ARRAY[i]);
      isThisAProperFileType =
        isThisAProperFileType || isDirectory.sync(filepath);
    }
    return isThisAProperFileType;
  }
  ARRAY.filter((x, i) => isProperFileType(x, i));
  return sortArrayByAlpha(ARRAY);
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
