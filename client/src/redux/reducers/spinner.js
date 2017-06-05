import {fromJS} from 'immutable';

import {
    UPLOAD_FILE, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAIL,
    DELETE_FILE, DELETE_FILE_SUCCESS, DELETE_FILE_FAIL
} from '../reducers/files';

import {
    CALCULATE, CALCULATE_FAIL, CALCULATE_SUCCESS,
    CALCULATE_ARIMA, CALCULATE_ARIMA_FAIL, CALCULATE_ARIMA_SUCCESS
} from '../reducers/charts';

export const SHOW_SPINNER = 'spinner/SHOW_SPINNER';
export const HIDE_SPINNER = 'spinner/HIDE_SPINNER';

const initialState = fromJS({show: false});

const showSpinnerConditions = [
    SHOW_SPINNER, UPLOAD_FILE, DELETE_FILE, CALCULATE, CALCULATE_ARIMA
];

const hideSpinnerConditions = [
    HIDE_SPINNER,
    UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAIL,
    DELETE_FILE_SUCCESS, DELETE_FILE_FAIL,
    CALCULATE_SUCCESS, CALCULATE_FAIL,
    CALCULATE_ARIMA_FAIL, CALCULATE_ARIMA_SUCCESS
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
