import { put, call, select } from 'redux-saga/effects';
import {
  LOAD_CHART_SUCCESS, LOAD_CHART_DATA_FAIL,
  CALCULATE_SUCCESS, CALCULATE_FAIL
} from '../reducers/charts';
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

export function* loadChart(action) {
  try {
    const { id } = action;
    const state = yield select();
    const result = yield call(load, getToken(state), id);
    yield put({ type: LOAD_CHART_SUCCESS, payload: { fileId: id, ...result }});
  } catch (e) {
    yield put({ type: LOAD_CHART_DATA_FAIL, payload: e.response });
  }
}


function sendCalc(token, object) {
  const options = {
    method: 'POST',
    headers: {
      'X-Auth-Token': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(object)
  };
  return sendRequest(`math`, options)
}


function buildReqestJson(action, fileId) {
  return {
    calculations: {
      fileId: fileId,
      demands: action.demands,
      goalList: ["value", "degree"],
      conversion: action.conversion
    }
  }
}

export function* calculate(action) {
  try {
    const state = yield select();
    const fileId = state.charts.get('active');
    const obj = buildReqestJson(action, fileId);
    const result = yield call(sendCalc, getToken(state), obj);
    yield put({ type: CALCULATE_SUCCESS, payload: { result, fileId }});
  } catch (e) {
    yield put({ type: CALCULATE_FAIL, payload: e.response });
  }
}