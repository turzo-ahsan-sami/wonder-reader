import {
  CLOSE_LIBRARY,
  OPEN_LIBRARY
} from '../constants/actions';
import dispatcher from '../dispatcher';

export function closeLibrary() {
  console.log('closeLibrary');
  dispatcher.dispatch({
    type: CLOSE_LIBRARY,
  });
}

export function openLibrary() {
  dispatcher.dispatch({
    type: OPEN_LIBRARY,
  });
}

export function toggleLibrary() {
  dispatcher.dispatch({
    type: 'TOGGLE_LIBRARY'
  });
}
