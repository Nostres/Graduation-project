import { select, put, fork, call } from 'redux-saga/effects';
import { isFilesLoaded } from '../reducers/files';
import { loadFileList } from './files';
import { redirectToLogin } from './route';
import { checkData, extractData } from '../utils/Storage';
import { RESTORE_USER, isUserLoggedIn } from '../reducers/user';

export function* asyncLoad() {
  let state = yield select();
  const { routing } = state;

  let path = routing.locationBeforeTransitions.pathname;

  if (!isUserLoggedIn(state) && checkData('token')) {
    yield put({ type: RESTORE_USER, payload: extractData('token') });
  }

  if (path === '/files' && !isFilesLoaded(state)) {
    yield fork(loadFileList)
  }

}
