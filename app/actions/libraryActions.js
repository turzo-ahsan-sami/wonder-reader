import { LOAD_LIBRARY } from '../constants/actions';
import dispatcher from '../dispatcher';

export function loadLibrary(directory) {
  dispatcher.dispatch({
    type: LOAD_LIBRARY,
    directory,
  });
}
