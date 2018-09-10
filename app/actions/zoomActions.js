import dispatcher from '../dispatcher';

export default function setZoomLevel() {
  dispatcher.dispatch({
    type: 'SET_ZOOM_LEVEL',
  });
}
