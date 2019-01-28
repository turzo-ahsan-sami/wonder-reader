import dispatcher from '../dispatcher';
import {
  CLOSE_LIBRARY,
  OPEN_LIBRARY
} from '../constants';

export function closeLibrary() {
  dispatcher.dispatch({
    type: CLOSE_LIBRARY,
  });
}

export function openLibrary() {
  dispatcher.dispatch({
    type: OPEN_LIBRARY,
  });
}
