import dispatcher from '../dispatcher';
import {SET_ZOOM_LEVEL} from '../constants';

export default function setZoomLevel(value) {
  dispatcher.dispatch({
    type: SET_ZOOM_LEVEL,
    value
  });
}
