import {
  DISABLE_LOADING,
  ENABLE_LOADING
} from '../constants/actions';
import dispatcher from '../dispatcher';

export function disableLoading() {
  dispatcher.dispatch({
    type: DISABLE_LOADING
  });
}

export function enableLoading() {
  dispatcher.dispatch({
    type: ENABLE_LOADING
  });
}
