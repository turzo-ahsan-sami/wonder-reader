// strain.js cleans out the dirty files, like .DS_Store
const isDirectory = require('is-directory');
const path = require('path');

const polaritySort = require('./polaritySort.js');
const { copyArray } = require('./copyData');

const comicTypes = ['.cbr', '.cbz'];
const imageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];

const sortArrayByAlpha = ARRAY => copyArray(ARRAY).sort(polaritySort);

const isSomething = types => (
  filename => (
    types.includes(path.extname(filename).toLowerCase())
  )
);

const isDir = (dirname, file) => (
  typeof dirname === 'undefined'
    ? false
    : isDirectory.sync(path.join(dirname, file))
);

const isThisProperThing = (fileTypes) => (
  (dirname) => (
    (file) => {
      const extname = path.extname(file);
      const isThisAProperFileType = fileTypes.includes(extname.toLowerCase());
      return isThisAProperFileType || isDir(dirname, file);
    }
  )
);

// Cleans out non image files from ARRAY
const strainer = (fileTypes) => (
  (ARRAY, dirname) => {
    const isProperType = isThisProperThing(fileTypes);
    console.log(isProperType);
    const isProperDirname = isProperType(dirname);
    console.log(isProperDirname);
    const filtered = ARRAY.filter(isProperDirname);
    console.log(filtered);
    const strained = sortArrayByAlpha(ARRAY.filter(isProperType(dirname)));
    console.log(strained);
  }
);

const isComic = isSomething(comicTypes);
const isImage = isSomething(imageTypes);
const strainComics = strainer(comicTypes);
const strainOnlyComics = strainer(comicTypes);
const strainImages = strainer(imageTypes);

const strain = {
  comics: strainComics,
  images: strainImages,
}

export {
  isComic,
  isImage,
  strain,
}
  strainComics,
  strainOnlyComics,
  strainImages
};
