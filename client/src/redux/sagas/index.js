import { takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOGIN_USER, LOGIN_USER_SUCCESS, REGISTER_USER } from '../reducers/user';
import { UPLOAD_FILE, UPLOAD_FILE_SUCCESS } from '../reducers/files';
import { redirectToFiles } from './route';
import { login, register } from './user';
import { uploadFile, loadFileList } from './files';
import { asyncLoad } from './asyncLoad'

export default function* rootSaga() {
  yield [
    takeLatest(LOGIN_USER, login),
    takeLatest(LOGIN_USER_SUCCESS, redirectToFiles),
    takeLatest(LOCATION_CHANGE, asyncLoad),
    takeLatest(UPLOAD_FILE_SUCCESS, loadFileList),
    takeLatest(UPLOAD_FILE, uploadFile),
    takeLatest(REGISTER_USER, register)
    // takeLatest(LOCATION_CHANGE, asyncLoad)
    // takeLatest(LOGOUT_USER_SUCCESS, redirectToLogin)
  ]
}
