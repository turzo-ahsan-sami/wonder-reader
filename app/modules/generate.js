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
  console.log(pages);
  const strainedPages = strainImages(pages);
  console.log(strainedPages);
  const filtered = strainedPages.filter(page => {
    const dimensions = sizeOf(page);
    return dimensions.width >= dimensions.height;
  });
  console.log(filtered);
  const spread = filtered.map(item => strainedPages.indexOf(item));
  console.log(spread);
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

const generateNextComics = (filepath, cb) => {
  let nextOrigin = null;
  let prevOrigin = null;
  console.log(filepath);

  const { name, origin } = filepath;
  const dirname = path.dirname(origin);
  fs.readdir(dirname, (err, comics) => {
    console.log(err, comics);
    const strainedComics = strainComics(comics);
    // Gets index position of file inside directory array
    const currentIssue = strainedComics.indexOf(name);
    if (comics.length > 1) {
      if (currentIssue <= 0) {
        // If loaded comic is first comic in directory
        nextOrigin = path.join(dirname, strainedComics[currentIssue + 1]);
      } else if (currentIssue >= comics.length - 1) {
        // If loaded comic is the last comic in directory
        prevOrigin = path.join(dirname, strainedComics[currentIssue - 1]);
      } else {
        // If comic is somewhere in the middle of the directory array
        nextOrigin = path.join(dirname, strainedComics[currentIssue + 1]);
        prevOrigin = path.join(dirname, strainedComics[currentIssue - 1]);
      }
    }
    cb(nextOrigin, prevOrigin);
  });
};

export {
  generateCenterfolds,
  generateContent,
  generateContents,
  generateNestedContentFromFilepath,
  generateNextComics
};
