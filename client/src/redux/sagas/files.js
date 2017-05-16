import { put, call, select } from 'redux-saga/effects';
import {
  GET_FILES_SUCCESS,
  GET_FILES_FAIL,
  getFiles,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAIL,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_FAIL,
  GET_FILES
} from '../reducers/files';
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
  return sendRequest('file', options)
}


function deleteF(token, id) {
  const options = {
    method: 'DELETE',
    headers: {
      'X-Auth-Token': token,
    }
  };
  return sendRequest(`file/${id}`, options)
}

export function* loadFileList() {
  try {
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
    yield put({ type: GET_FILES });
  } catch (e) {
    yield put({ type: UPLOAD_FILE_FAIL, e });
  }
}

export function* deleteFile (action) {
  try {
    const { id } = action;
    const state = yield select();
    yield call(deleteF, getToken(state), id);
    yield put({ type: DELETE_FILE_SUCCESS, payload: id });
  } catch (e) {
    yield put({ type: DELETE_FILE_FAIL, e });
  }
}

export function* loadFileListCall() {
  yield put(getFiles())
}