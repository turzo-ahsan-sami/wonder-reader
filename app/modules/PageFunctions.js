import path from 'path';
import sizeOf from 'image-size';

import encodePath from './encodePath';
import { strainImages } from './strain';

import ComicStore from '../store/ComicStore';

const determineDimensions = image => {
  const { width, height } = sizeOf(image);
  return width >= height;
};

const generateCenterfolds = pages => {
  const strainedPages = strainImages(pages);
  const getStrainedPageIndex = item => strainedPages.indexOf(item);
  const determinedDimensions = strainedPages.filter(determineDimensions);
  return determinedDimensions.map(getStrainedPageIndex);
};

const generateEncodedPage = (key, bool, encodedPages) => {
  const { pages, tempDirectory } = ComicStore.getAll();

  const pagePath = path.join(tempDirectory, pages[key]);
  const page = encodePath(pagePath);
  const { width, height } = sizeOf(pagePath);
  const ratio = bool ? 1 : encodedPages[0].height / height;
  const applyRatio = item => item * ratio;
  const [WIDTH, HEIGHT] = [width, height].map(applyRatio);
  return {
    page,
    key,
    width: WIDTH,
    height: HEIGHT
  };
};

const includes = (ARRAY, index) => (
  ARRAY.includes(index) || ARRAY.includes(index + 1)
);

const mapPages = (files, tempDirectory) => files.map(pageMap(tempDirectory));

const pageMap = (tempDirectory) => (
  (file, key) => {
    const pagePath = path.join(tempDirectory, file);
    const encodedPagePath = encodePath(pagePath);
    return {
      key,
      encodedPagePath,
      pagePath
    };
  }
);

export {
  generateCenterfolds,
  generateEncodedPage,
  includes,
  mapPages,
};
