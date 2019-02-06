import fs from 'fs';
import path from 'path';

import * as comicActions from '../actions/comicActions';
import { strainOnlyComics } from './strain';
import ComicStore from '../store/ComicStore';

const generateVariables = (files, polarity) => {
  const { name } = ComicStore.getAll();

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
  const { origin } = ComicStore.getAll();
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
    comicActions.openComic(newComicFilepath);
  }
};

const openAdjacentComic = (polarity) => {
  const { origin } = ComicStore.getAll();
  const parentDirname = path.dirname(origin);
  const handleReadDirectoryFiles = (err, files) => {
    determineAvailableAdjComic(err, files, polarity);
  };
  if (ComicStore.isComicActive()) {
    fs.readdir(parentDirname, handleReadDirectoryFiles);
  }
};

export default openAdjacentComic;
