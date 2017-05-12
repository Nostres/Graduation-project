import { select, fork } from 'redux-saga/effects';
import { isFilesLoaded } from '../reducers/files';
import { loadFileList } from './files';

export function* asyncLoad() {
  let state = yield select();
  const { routing } = state;
  let path = routing.locationBeforeTransitions.pathname;

  // if (path !== '/login' && !isUserLoggedIn(state)) {
  //   yield redirectToLogin
  // }

  if (path === '/files' && !isFilesLoaded(state)) {
    yield fork(loadFileList)
  }

}
