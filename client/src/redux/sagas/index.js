import { takeLatest, takeEvery } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOGIN_USER, LOGOUT_USER, LOGIN_USER_SUCCESS, REGISTER_USER, LOGOUT_USER_SUCCESS } from '../reducers/user';
import { GET_FILES, UPLOAD_FILE, DELETE_FILE } from '../reducers/files';
import { LOAD_CHART_DATA, CALCULATE } from '../reducers/charts';
import { redirectToFiles, redirectToLogin } from './route';
import { login, register, logout } from './user';
import { uploadFile, loadFileList, deleteFile } from './files';
import { loadChart, calculate } from './charts';
import { asyncLoad } from './asyncLoad'

export default function* rootSaga() {
  yield [
    takeLatest(LOGIN_USER, login),
    takeLatest(LOGOUT_USER, logout),
    takeLatest(LOGIN_USER_SUCCESS, redirectToFiles),
    takeLatest(LOGOUT_USER_SUCCESS, redirectToLogin),

    takeLatest(REGISTER_USER, register),

    takeLatest(LOCATION_CHANGE, asyncLoad),

    takeLatest(LOAD_CHART_DATA, loadChart),
    takeLatest(CALCULATE, calculate),

    takeLatest(GET_FILES, loadFileList),
    takeEvery(DELETE_FILE, deleteFile),
    takeLatest(UPLOAD_FILE, uploadFile)
  ];
}
