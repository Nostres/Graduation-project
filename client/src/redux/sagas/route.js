import { select } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

export function* redirectToFiles() {
  let state = yield select();
  const { routing } = state;
  let path = routing.locationBeforeTransitions.pathname;
  if (path !== '/files') {
    browserHistory.push('/files');
  }
}

export function* redirectToLogin() {
  let state = yield select();
  const { routing } = state;
  let path = routing.locationBeforeTransitions.pathname;
  if(path !== '/login') {
    browserHistory.push('/login');
  }
}
