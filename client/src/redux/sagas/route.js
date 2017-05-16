import { select, call } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

export function* redirectToFiles() {
  let state = yield select();
  const { routing } = state;
  let path = routing.locationBeforeTransitions.pathname;
  if (path !== '/files') {
    yield call(browserHistory.push, '/files');
  }
}

export function* redirectToLogin() {
  let state = yield select();
  const { routing } = state;
  let path = routing.locationBeforeTransitions.pathname;
  if(path !== '/login') {
    yield call(browserHistory.push, '/login');
  }
}
