import fs from 'fs';
import path from 'path';

import * as comicActions from '../actions/comicActions';
import { strainOnlyComics } from '../modules/strain';
import ComicStore from '../store/ComicStore';

const determineAvailableAdjComic = (err, files, polarity) => {
  const openedComic = ComicStore.getAll();
  const { name, origin } = openedComic;

  const strainedComics = strainOnlyComics(files);
  const newIndex = strainedComics.indexOf(name) + polarity;
  const isNewIndexWithinPageLimits = (
    newIndex > -1 && newIndex < strainedComics.length
  );
  if (isNewIndexWithinPageLimits) {
    const newComicFilepath = path.join(
      path.dirname(origin),
      strainedComics[newIndex]
    );
    comicActions.openComic(newComicFilepath);
  }
};

const openAdjacentComic = (polarity) => {
  const Comic = ComicStore.getAll();
  if (ComicStore.isComicActive()) {
    const parentDirname = path.dirname(Comic.origin);
    fs.readdir(parentDirname, (err, files) => {
      determineAvailableAdjComic(err, files, polarity);
    });
  }
};

export default openAdjacentComic;
