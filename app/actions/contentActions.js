import { SET_CONTENT } from '../constants/actions';
import dispatcher from '../dispatcher';

export function setContent(content) {
  console.log(content);
  dispatcher.dispatch({
    type: SET_CONTENT,
    content,
  });
}
