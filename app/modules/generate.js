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
  const spread = filtered.map(item => strainedPages.indexOf(item));
  return spread;
};

// Must return object
const generateContent = fullpath => {
  if (fullpath && fullpath === null) {
    return null;
  }
  const stats = fs.statSync(fullpath);
  const isDirectory = stats.isDirectory();
  const content = {
    id: encodeURIComponent(fullpath),
    basename: path.basename(fullpath),
    bookmark: isDirectory ? NaN : 0,
    dirname: path.dirname(fullpath),
    extname: path.extname(fullpath),
    fullpath,
    isDirectory,
    contents: []
  };
  return content;
};

// Must return array of object
const generateContents = (content, cb) => {
  if (content.isDirectory) {
    const filepath = content.fullpath;
    fs.readdir(filepath, (err, files) => {
      if (!err) {
        const strainedFiles = strainComics(files, filepath);
        const contents = strainedFiles.map(file => {
          const fullpath = path.join(filepath, file);
          return generateContent(fullpath);
        });
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
