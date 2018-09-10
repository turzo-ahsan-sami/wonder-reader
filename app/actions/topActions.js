import dispatcher from '../dispatcher';

export function closeLibrary() {
  dispatcher.dispatch({
    type: 'CLOSE_LIBRARY',
  });
}

export function openLibrary() {
  dispatcher.dispatch({
    type: 'OPEN_LIBRARY',
  });
}
