import {
  TOGGLE_PAGE_COUNT,
  TURN_PAGE,
  TURN_PAGE_LEFT,
  TURN_PAGE_RIGHT,
} from '../constants/actions';
import dispatcher from '../dispatcher';

export function togglePageCount() {
  dispatcher.dispatch({
    type: TOGGLE_PAGE_COUNT
  });
}

export function turnPage(polarity) {
  dispatcher.dispatch({
    type: TURN_PAGE,
    polarity
  });
}

export function turnPageLeft() {
  dispatcher.dispatch({
    type: TURN_PAGE_LEFT,
  });
}

export function turnPageRight() {
  dispatcher.dispatch({
    type: TURN_PAGE_RIGHT,
  });
}
