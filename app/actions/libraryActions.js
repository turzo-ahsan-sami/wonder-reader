import dispatcher from '../dispatcher';

export default function loadLibrary(directory) {
  dispatcher.dispatch({
    type: 'LOAD_LIBRARY',
    directory,
  });
}
