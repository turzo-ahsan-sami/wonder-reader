import dispatcher from '../dispatcher';

export function turnPage(polarity) {
  dispatcher.dispatch({
    type: 'TURN_PAGE',
    polarity
  });
}

export function turnPageLeft() {
  dispatcher.dispatch({
    type: 'TURN_PAGE_LEFT',
    polarity: -1
  });
}

export function turnPageRight() {
  dispatcher.dispatch({
    type: 'TURN_PAGE_RIGHT',
    polarity: 1
  });
}

export function togglePageCount() {
  dispatcher.dispatch({
    type: 'TOGGLE_PAGE_COUNT'
  });
}
