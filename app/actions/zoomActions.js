import { SET_ZOOM_LEVEL } from '../constants/actions';
import dispatcher from '../dispatcher';

export function setZoomLevel(value) {
  dispatcher.dispatch({
    type: SET_ZOOM_LEVEL,
    value
  });
}
