import { SET_CONTENT } from '../constants';
import dispatcher from '../dispatcher';

export function setContent(content) {
  dispatcher.dispatch({
    type: SET_CONTENT,
    content,
  });
}
