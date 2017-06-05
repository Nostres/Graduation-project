import {put, call, select} from 'redux-saga/effects';
import {
    LOAD_CHART_SUCCESS,
    LOAD_CHART_DATA_FAIL,
    CALCULATE_SUCCESS,
    CALCULATE_FAIL,
    CALCULATE_ARIMA_SUCCESS,
    CALCULATE_ARIMA_FAIL
} from '../reducers/charts';
import sendRequest from '../utils/SendRequest';
import {getToken} from '../utils/Storage';

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
        const {id} = action;
        const state = yield select();
        const result = yield call(load, getToken(state), id);
        yield put({type: LOAD_CHART_SUCCESS, payload: {fileId: id, ...result}});
    } catch (e) {
        yield put({type: LOAD_CHART_DATA_FAIL, payload: e.response});
    }
}


function sendCalc(token, object, path) {
    const options = {
        method: 'POST',
        headers: {
            'X-Auth-Token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    };
    return sendRequest(path, options)
}


function buildReqestJson(action, fileId) {
    return {
        calculations: {
            fileId: fileId,
            sample: action.sample,
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
        const body = buildReqestJson(action, fileId);
        const result = yield call(sendCalc, getToken(state), body, `math/doCalculations`);
        yield put({type: CALCULATE_SUCCESS, payload: {result, fileId}});
    } catch (e) {
        yield put({type: CALCULATE_FAIL, payload: e.response});
    }
}

export function* calculateArima(action) {
    try {
        const state = yield select();
        const fileId = state.charts.get('active');
        const body = { params: action.params, fileId: fileId };
        const result = yield call(sendCalc, getToken(state), body, `math/calculateArima`);
        yield put({type: CALCULATE_ARIMA_SUCCESS, payload: {result}});
    } catch (e) {
        yield put({type: CALCULATE_ARIMA_FAIL, payload: e.response});
    }
}