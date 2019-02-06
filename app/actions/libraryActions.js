import { LOAD_LIBRARY } from '../constants';
import dispatcher from '../dispatcher';

export function loadLibrary(directory) {
  dispatcher.dispatch({
    type: LOAD_LIBRARY,
    directory,
  });
}
