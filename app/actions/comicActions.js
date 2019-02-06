import { OPEN_COMIC } from '../constants';
import dispatcher from '../dispatcher';

export function openComic(filepath) {
  dispatcher.dispatch({
    type: OPEN_COMIC,
    filepath
  });
}
