import dispatcher from '../dispatcher';
import { OPEN_COMIC } from '../constants';

export default function openComic(filepath) {
  dispatcher.dispatch({
    type: OPEN_COMIC,
    filepath
  });
}
