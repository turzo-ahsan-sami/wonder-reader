import dispatcher from '../dispatcher';
import { SET_CONTENT } from '../constants';

export default function setContent(content) {
  dispatcher.dispatch({
    type: SET_CONTENT,
    content,
  });
}
