import { SET_CONTENT } from '../constants';
import dispatcher from '../dispatcher';

export function setContent(content) {
  console.log(content);
  dispatcher.dispatch({
    type: SET_CONTENT,
    content,
  });
}
