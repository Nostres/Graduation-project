import { put, call, select } from 'redux-saga/effects';
import { LOAD_CHART_SUCCESS, LOAD_CHART_DATA_FAIL } from '../reducers/charts';
import sendRequest from '../utils/SendRequest';
import { getToken } from '../utils/Storage';

function load(token, id) {
  const options = {
    method: 'GET',
    headers: {
      'X-Auth-Token': token,
    }
  };
  return sendRequest(`file/${id}`, options)
}


export function* loadChart (action) {
  try {
    const { id } = action;
    const state = yield select();
    const result = yield call(load, getToken(state), id);
    yield put({ type: LOAD_CHART_SUCCESS, payload: { fileId: id, ...result }});
  } catch (e) {
    yield put({ type: LOAD_CHART_DATA_FAIL, e });
  }
}