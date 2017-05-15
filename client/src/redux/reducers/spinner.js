import { fromJS } from 'immutable';

import { UPLOAD_FILE, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAIL } from '../reducers/files';

export const SHOW_SPINNER = 'spinner/SHOW_SPINNER';
export const HIDE_SPINNER = 'spinner/HIDE_SPINNER';

const initialState = fromJS({show: false});

const showSpinnerConditions = [
  SHOW_SPINNER, UPLOAD_FILE
];

const hideSpinnerConditions = [
  HIDE_SPINNER, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAIL
];

export default function reducer(state = initialState, action = {}) {
  if (showSpinnerConditions.includes(action.type)) {
    return state.set('show', true);
  } else if (hideSpinnerConditions.includes(action.type)) {
    return state.set('show', false);
  } else {
    return state;
  }
}
