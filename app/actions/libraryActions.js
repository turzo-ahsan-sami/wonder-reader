import dispatcher from '../dispatcher';

export default function setContent(directory) {
  dispatcher.dispatch({
    type: 'LOAD_LIBRARY',
    directory,
  });
}
