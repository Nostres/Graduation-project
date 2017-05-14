import { takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOGIN_USER, LOGOUT_USER, LOGIN_USER_SUCCESS, REGISTER_USER, LOGOUT_USER_SUCCESS } from '../reducers/user';
import { UPLOAD_FILE, UPLOAD_FILE_SUCCESS } from '../reducers/files';
import { redirectToFiles, redirectToLogin } from './route';
import { login, register, logout } from './user';
import { uploadFile, loadFileList } from './files';
import { asyncLoad } from './asyncLoad'

export default function* rootSaga() {
  yield [
    takeLatest(LOGIN_USER, login),
    takeLatest(LOGOUT_USER, logout),
    takeLatest(LOCATION_CHANGE, asyncLoad),
    takeLatest(LOGIN_USER_SUCCESS, redirectToFiles),
    takeLatest(UPLOAD_FILE_SUCCESS, loadFileList),
    takeLatest(UPLOAD_FILE, uploadFile),
    takeLatest(REGISTER_USER, register),
    takeLatest(LOGOUT_USER_SUCCESS, redirectToLogin)
  ]
}
