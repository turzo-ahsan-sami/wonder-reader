// centerfold.js returns an array with the index locations of supposed centerfolds
import { strainComics, strainImages } from './strain';

const fs = require('fs');
const path = require('path');

const sizeOf = require('image-size');

const determineIfDirectory = fullpath => fs.statSync(fullpath).isDirectory();

const determineDimensions = image => {
  const {width, height} = sizeOf(image);
  return width >= height;
};

const generateCenterfolds = pages => {
  const strainedPages = strainImages(pages);
  const determinedDimensions = strainedPages.filter(determineDimensions);
  return determinedDimensions.map(item => strainedPages.indexOf(item));
};

const generateContent = fullpath =>
  fullpath && fullpath === null ? null : generateContentObject(fullpath);

const generateContentObject = fullpath => {
  const isDirectory = determineIfDirectory(fullpath);
  return {
    id: encodeURIComponent(fullpath),
    basename: path.basename(fullpath),
    bookmark: isDirectory ? NaN : 0,
    dirname: path.dirname(fullpath),
    extname: path.extname(fullpath),
    fullpath,
    isDirectory,
    contents: []
  };
};

// Must return array of object
const generateContents = (content, cb) => {
  console.log(content);
  if (content.isDirectory) {
    fs.readdir(content.fullpath, (err, files) => {
      strainContents(err, files, content.fullpath, cb);
    });
  } else {
    cb(null, []);
  }
};

const generateNestedContentFromFilepath = (filepath, cb) => {
  const content = generateContent(filepath);
  generateContents(content, (err, contents) => {
    content.contents = contents;
    cb(content);
  });
};

const strainContents = (err, files, fullpath, cb) => {
  const renderContent = file => {
    const filepath = path.join(fullpath, file);
    return generateContent(filepath);
  };

  if (!err) {
    const strainedComics = strainComics(files, fullpath);
    const contents = strainedComics.map(renderContent);
    cb(err, contents);
  } else {
    cb(null, []);
  }
};

export { generateCenterfolds, generateNestedContentFromFilepath };
