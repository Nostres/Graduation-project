import { select, put, fork, call, take } from 'redux-saga/effects';
import { router } from 'redux-saga-router';
import { browserHistory } from 'react-router';
import { isFilesLoaded } from '../reducers/files';
import { loadFileListCall } from './files';
import { redirectToLogin, redirectToFiles } from './route';
import { checkData, extractData } from '../utils/Storage';
import { RESTORE_USER, isUserLoggedIn, isUserLogouting } from '../reducers/user';
import { LOAD_CHART_DATA, calculate, LOAD_CHART_SUCCESS } from '../reducers/charts';



function* loadFiles() {
  const state = yield select();
  if (isFilesLoaded(state)) {
    return;
  }
  yield call(loadFileListCall);
}


function* beginChartLoading({ id }) {
  yield put({type: LOAD_CHART_DATA, id});
  yield take(LOAD_CHART_SUCCESS);
  yield put(calculate([], null));
}


const routes = {
  '/': redirectToLogin,
  '/files': loadFiles,
  '/files/:id': beginChartLoading,
};

export function* loadData() {
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

  state = yield select();

  if(isUserLoggedIn(state) && path === '/login' && !(isUserLogouting(state)) ) {
    yield call(redirectToFiles)
  }

  yield fork(router, browserHistory, routes);
}
