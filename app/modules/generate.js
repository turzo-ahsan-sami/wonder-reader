// centerfold.js returns an array with the index locations of supposed centerfolds
import { strainComics } from './strain';

const fs = require('fs');
const path = require('path');

const sizeOf = require('image-size');
const { strainImages } = require('./strain.js');

// function variables
// const sortNumber = (a, b) => a - b;

// Returns with an array of indices for double page images for core array of image files
const generateCenterfolds = pages => {
  const strainedPages = strainImages(pages);
  const filtered = strainedPages.filter(page => {
    const dimensions = sizeOf(page);
    return dimensions.width >= dimensions.height;
  });
  return filtered.map(item => strainedPages.indexOf(item));
};

const generateContent = fullpath => {
  // Must return object
  if (fullpath && fullpath === null) {
    return null;
  }
  const stats = fs.statSync(fullpath);
  const isDirectory = stats.isDirectory();
  const content = generateContentPrototype(fullpath, isDirectory);
  return content;
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

// Must return array of object
const generateContents = (content, cb) => {
  console.log(content);
  if (content.isDirectory) {
    const renderContent = file => {
      const filepath = path.join(content.fullpath, file);
      return generateContent(filepath);
    };

    fs.readdir(content.fullpath, (err, files) => {
      if (!err) {
        const strainedFiles = strainComics(files, content.fullpath);
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
