import path from 'path';
import sizeOf from 'image-size';

import encodepath from './encodepath';
import { strainImages } from './strain';

import ComicStore from '../store/ComicStore';

const generateCenterfolds = pages => {
  const determineDimensions = image => {
    const { width, height } = sizeOf(image);
    return width >= height;
  };

  const strainedPages = strainImages(pages);
  const determinedDimensions = strainedPages.filter(determineDimensions);
  return determinedDimensions.map(item => strainedPages.indexOf(item));
};

const generateEncodedPage = (key, bool, encodedPages) => {
  const openedComic = ComicStore.getAll();
  const { pages, tempdir } = openedComic;

  const pagePath = path.join(tempdir, pages[key]);
  const page = encodepath(pagePath);
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

const mapPages = (files, tempdir) => {
  const mapper = pageMap(tempdir);
  return files.map((file, key) => mapper(file, key));
};

const pageMap = (tempdir) => (
  (file, key) => {
    const pagePath = path.join(tempdir, file);
    const encodedPagePath = encodepath(pagePath);
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
