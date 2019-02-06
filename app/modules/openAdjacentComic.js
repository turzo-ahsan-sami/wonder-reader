import fs from 'fs';
import path from 'path';

import * as actions from '../actions';
import * as store from '../store';
import { strainOnlyComics } from './strain';

const generateVariables = (files, polarity) => {
  const { name } = store.comic.getAll();

  const strainedComics = strainOnlyComics(files);
  const newIndex = strainedComics.indexOf(name) + polarity;
  const isNewIndexWithinPageLimits = (
    newIndex > -1 && newIndex < strainedComics.length
  );

  return {
    isNewIndexWithinPageLimits,
    newIndex,
    strainedComics,
  };
};

const determineAvailableAdjComic = (err, files, polarity) => {
  const { origin } = store.comic.getAll();
  const {
    isNewIndexWithinPageLimits,
    newIndex,
    strainedComics,
  } = generateVariables(files, polarity);

  if (isNewIndexWithinPageLimits) {
    const newComicFilepath = path.join(
      path.dirname(origin),
      strainedComics[newIndex]
    );
    actions.comic.openComic(newComicFilepath);
  }
};

const openAdjacentComic = (polarity) => {
  const { origin } = store.comic.getAll();
  const parentDirname = path.dirname(origin);
  const handleReadDirectoryFiles = (err, files) => {
    determineAvailableAdjComic(err, files, polarity);
  };
  if (store.comic.isComicActive()) {
    fs.readdir(parentDirname, handleReadDirectoryFiles);
  }
};

export default openAdjacentComic;
