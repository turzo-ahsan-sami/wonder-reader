// centerfold.js returns an array with the index locations of supposed centerfolds
import { strainComics, strainImages } from './strain';

const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

// function variables
// const sortNumber = (a, b) => a - b;
const filterByWiderImages = page => {
  const { height, width } = sizeOf(page);
  return width >= height;
};

// Returns with an array of indices for double page images for core array of image files
const generateCenterfolds = pages => {
  const strainedPages = strainImages(pages);
  const generateCenterfoldMap = page => strainedPages.indexOf(page);
  return strainedPages.filter(filterByWiderImages).map(generateCenterfoldMap);
};

const generateContentPrototype = (fullpath, isDirectory) => ({
  id: encodeURIComponent(fullpath),
  basename: path.basename(fullpath),
  bookmark: isDirectory ? NaN : 0,
  dirname: path.dirname(fullpath),
  extname: path.extname(fullpath),
  fullpath,
  isDirectory,
  contents: []
});

const generateContent = fullpath => {
  const isDirectory = fs.statSync(fullpath).isDirectory();
  return generateContentPrototype(fullpath, isDirectory);
};

// Must return array of object
const generateContents = (content, cb) => {
  console.log(content);
  if (content.isDirectory) {
    const renderContent = file =>
      generateContent(path.join(content.fullpath, file));

    fs.readdir(content.fullpath, (err, files) => {
      if (!err) {
        const strainedFiles = strainComics(files).map(file =>
          path.join(content.fullpath, file)
        );
        const contents = strainedFiles.map(renderContent);
        cb(err, contents);
      } else {
        cb(null, {});
      }
    });
  } else {
    cb(null, {});
  }
};

const generateNestedContentFromFilepath = (filepath, cb) => {
  const content = generateContent(filepath);
  generateContents(content, (err, contents) => {
    content.contents = contents;
    cb(content);
  });
};

export {
  generateCenterfolds,
  generateContent,
  generateContents,
  generateNestedContentFromFilepath
};
