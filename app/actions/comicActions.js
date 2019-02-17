import { OPEN_COMIC } from '../constants/actions';
import dispatcher from '../dispatcher';

export function openComic(filepath) {
  dispatcher.dispatch({
    type: OPEN_COMIC,
    filepath
  });
}
