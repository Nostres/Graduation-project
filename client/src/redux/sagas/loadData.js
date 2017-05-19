import { select, put, call, take } from 'redux-saga/effects';
import { isFilesLoaded, getFilesAC } from '../reducers/files';
import { redirectToLogin, redirectToFiles } from './route';
import { isDataStored, extractData } from '../utils/Storage';
import { RESTORE_USER, isUserLoggedIn } from '../reducers/user';
import { calculateAC, LOAD_CHART_SUCCESS, loadChartData, isChartDataLoaded } from '../reducers/charts';

import { parsePath } from '../utils/PathParser';

export function* loadData() {
  let state = yield select();
  const { routing } = state;

  if (!isUserLoggedIn(state) && isDataStored('token')) {
    yield put({ type: RESTORE_USER, payload: extractData('token') });
    state = yield select();
  }

  const path = routing.locationBeforeTransitions.pathname;

  if(isUserLoggedIn(state)) {
    if(['/', '/login'].includes(path)) {
      yield call(redirectToFiles);
    }
  } else if(path !== '/login') {
    yield call(redirectToLogin);
  }

  const { matched, param } = parsePath(path);

  if(matched) {
    if(!isFilesLoaded(state)) {
      yield put(getFilesAC())
    }
    if (param) {
      if (!isChartDataLoaded(state, param)) {
        yield put(loadChartData(param));
        yield take(LOAD_CHART_SUCCESS);
      }
      yield put(calculateAC([], null));
    }
  }
}
