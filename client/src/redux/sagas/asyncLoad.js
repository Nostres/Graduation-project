import { select, put, fork, call } from 'redux-saga/effects';
import { router } from 'redux-saga-router';
import { browserHistory } from 'react-router';
import { isFilesLoaded } from '../reducers/files';
import { loadFileListCall } from './files';
import { redirectToLogin } from './route';
import { checkData, extractData } from '../utils/Storage';
import { RESTORE_USER, isUserLoggedIn } from '../reducers/user';
import { LOAD_CHART_DATA } from '../reducers/charts';


function* loginCheck() {
  const state = yield select();
  if (isUserLoggedIn(state)) {
    yield call(browserHistory.push, '/files');
  }
}

function* loadFiles() {
  const state = yield select();
  if (isFilesLoaded(state)) {
    return;
  }
  yield call(loadFileListCall);
}

const routes = {
  '/': redirectToLogin,
  '/login': loginCheck,
  '/files': loadFiles,
  '/files/:id': function* userSaga({ id }) {
    yield put({type: LOAD_CHART_DATA, id});
  },
};

export function* asyncLoad() {
  let state = yield select();
  const { routing } = state;

  let path = routing.locationBeforeTransitions.pathname;

  if (!isUserLoggedIn(state) && checkData('token')) {
    yield put({ type: RESTORE_USER, payload: extractData('token') });
  }

  state = yield select();

  if (!isUserLoggedIn(state) && path !== '/login') {
    yield call(redirectToLogin);
  }

  yield fork(router, browserHistory, routes);
}
