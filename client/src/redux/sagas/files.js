import { put, call, select } from 'redux-saga/effects';
import {
  GET_FILES_SUCCESS,
  GET_FILES_FAIL,
  GET_FILES,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAIL
} from '../reducers/files'
import sendRequest from '../utils/SendRequest';
import { getToken } from '../utils/Storage';

function loadList(token) {
  const options = {
    method: 'GET',
    headers: { 'X-Auth-Token': token }
  };
  return sendRequest('file', options)
}

function upload(token, file) {
  const options = {
    method: 'POST',
    body: file,
    headers: {
      'X-Auth-Token': token,
      'Content-Type': file.type,
      name: file.name
    }
  };
  return sendRequest('file/upload', options)
}

export function* loadFileList() {
  try {
    yield put({ type: GET_FILES });
    const state = yield select();
    const result = yield call(loadList, getToken(state));
    yield put({ type: GET_FILES_SUCCESS, payload: result });
  } catch (e) {
    yield put({ type: GET_FILES_FAIL, e });
  }
}

export function* uploadFile(action) {
  try {
    const { file } = action;
    const state = yield select();
    const result = yield call(upload, getToken(state), file);
    yield put({ type: UPLOAD_FILE_SUCCESS, payload: result });
  } catch (e) {
    yield put({ type: UPLOAD_FILE_FAIL, e });
  }
}