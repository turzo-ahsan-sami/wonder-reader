import dispatcher from '../dispatcher';
import {SET_ZOOM_LEVEL} from '../constants';

export function setZoomLevel(value) {
  dispatcher.dispatch({
    type: SET_ZOOM_LEVEL,
    value
  });
}
