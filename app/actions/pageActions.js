import dispatcher from '../dispatcher';

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
