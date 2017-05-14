import { put, call } from 'redux-saga/effects';
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

function loginUser(username, password) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };
  return sendRequest('api/login', options)
}

function registerUser(username, password) {
  const options = {
    method: 'POST',
    headers: { username, password }
  };
  return sendRequest('user/register', options)
}

export function* login(action) {
  try {
    const { username, password } = action;
    const result = yield call(loginUser, username, password);
    storeData('token', result);
    yield put({ type: LOGIN_USER_SUCCESS, payload: result });
  } catch (e) {
    yield put({ type: LOGIN_USER_FAIL, e });
  }
}

export function* register(action) {
  try {
    const { username, password } = action;
    const result = yield call(registerUser, username, password);
    yield put({ type: REGISTER_USER_SUCCESS, payload: result });
  } catch (e) {
    yield put({ type: REGISTER_USER_FAIL, e });
  }
}

export function* logout(action) {
  try {
    deleteData('token');
    yield put({ type: LOGOUT_USER_SUCCESS });
  } catch (e) {
    yield put({ type: LOGOUT_USER_FAIL, e });
  }
}