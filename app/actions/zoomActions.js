import { SET_ZOOM_LEVEL } from '../constants';
import dispatcher from '../dispatcher';

export function setZoomLevel(value) {
  dispatcher.dispatch({
    type: SET_ZOOM_LEVEL,
    value
  });
}
