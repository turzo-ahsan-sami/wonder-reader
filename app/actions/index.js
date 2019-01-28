import dispatcher from '../dispatcher';

export function disableLoading() {
  dispatcher.dispatch({
    type: 'DISABLE_LOADING'
  });
}

export function enableLoading() {
  dispatcher.dispatch({
    type: 'ENABLE_LOADING'
  });
}

export function loadLibrary(directory) {
  dispatcher.dispatch({
    type: 'LOAD_LIBRARY',
    directory,
  });
}

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

export function openComic(filepath) {
  dispatcher.dispatch({
    type: 'OPEN_COMIC',
    filepath
  });
}

export function setContent(content) {
  dispatcher.dispatch({
    type: 'SET_CONTENT',
    content,
  });
}

export function togglePageCount() {
  dispatcher.dispatch({
    type: 'TOGGLE_PAGE_COUNT'
  });
}

export function turnPageLeft() {
  dispatcher.dispatch({
    type: 'TURN_PAGE_LEFT'
  });
}

export function turnPageRight() {
  dispatcher.dispatch({
    type: 'TURN_PAGE_RIGHT'
  });
}

export function toggleLibrary() {
  dispatcher.dispatch({
    type: 'TOGGLE_LIBRARY'
  });
}
