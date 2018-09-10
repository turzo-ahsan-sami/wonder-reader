import dispatcher from '../dispatcher';

export default function setContent(content) {
  dispatcher.dispatch({
    type: 'SET_CONTENT',
    content,
  });
}
