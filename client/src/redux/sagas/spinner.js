import { put } from 'redux-saga/effects';

import { SHOW_SPINNER, HIDE_SPINNER } from '../reducers/spinner';


export function* showSpinner() {
  yield put({ type: SHOW_SPINNER })
}

export function* hideSpinner() {
  yield put({ type: HIDE_SPINNER })
}
