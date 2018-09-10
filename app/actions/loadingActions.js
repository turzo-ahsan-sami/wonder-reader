import dispatcher from '../dispatcher';

export function enableLoading() {
  dispatcher.dispatch({
    type: 'ENABLE_LOADING'
  });
}

export function disableLoading() {
  dispatcher.dispatch({
    type: 'DISABLE_LOADING'
  });
}
