import dispatcher from '../dispatcher';

export default function openComic(filepath) {
  dispatcher.dispatch({
    type: 'OPEN_COMIC',
    filepath
  });
}
