import { put, call, select } from 'redux-saga/effects';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL
} from '../reducers/user'
import sendRequest from '../utils/SendRequest';
import { storeData, deleteData } from '../utils/Storage';
import { getToken } from '../utils/Storage';


function loginUserRequest(username, password) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };
  return sendRequest('api/login', options)
}


function registerUserRequest(username, password) {
  const options = {
    method: 'POST',
    headers: { username, password }
  };
  return sendRequest('user/register', options)
}


function logoutUserRequest(token) {
  const options = {
    method: 'POST',
    headers: {
      'X-Auth-Token': token
    }
  };
  return sendRequest('api/logout', options)
}


export function* login(action) {
  try {
    const { username, password } = action;
    const result = yield call(loginUserRequest, username, password);
    yield call(storeData, 'token', result);
    yield put({ type: LOGIN_USER_SUCCESS, payload: result });
  } catch (e) {
    yield put({ type: LOGIN_USER_FAIL, payload: e.response });
  }
}


export function* register(action) {
  try {
    const { username, password } = action;
    const result = yield call(registerUserRequest, username, password);
    yield put({ type: REGISTER_USER_SUCCESS, payload: result });
  } catch (e) {
    yield put({ type: REGISTER_USER_FAIL, payload: e.response });
  }
}


export function* logout() {
  try {
    const state = yield select();
    yield call(logoutUserRequest, getToken(state));
    yield call(deleteData,'token');
    yield put({ type: LOGOUT_USER_SUCCESS });
  } catch (e) {
    yield put({ type: LOGOUT_USER_FAIL, payload: e.response });
  }
}
