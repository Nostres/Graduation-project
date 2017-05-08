import { fromJS } from 'immutable';

const GET_DATA = 'chart/GET_DATA';
const GET_DATA_SUCCESS = 'chart/GET_DATA_SUCCESS';
export const GET_DATA_FAIL = 'chart/GET_DATA_FAIL';
const CLEAR_DATA = 'chart/CLEAR_DATA';
const CLEAR_DATA_SUCCESS = 'chart/CLEAR_DATA_SUCCESS';
export const CLEAR_DATA_FAIL = 'chart/CLEAR_DATA_FAIL';

const UPLOAD_FILE = 'chart/UPLOAD_FILE';
const UPLOAD_FILE_SUCCESS = 'chart/UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_FAIL = 'chart/UPLOAD_FILE_FAIL';

const initialState = fromJS({
  data: []
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case GET_DATA:
      return state.set('loading', true);
    case GET_DATA_SUCCESS:
    case UPLOAD_FILE_SUCCESS:
      return state
        .set('data', fromJS(action.payload.data))
        .delete('loading');
    case GET_DATA_FAIL:
      return state.delete('loading');

    case CLEAR_DATA:
      return state.set('loading', true);
    case CLEAR_DATA_FAIL:
      return state.delete('loading');
    case CLEAR_DATA_SUCCESS:
      return state.set('data', fromJS([]));

    case UPLOAD_FILE:
      return state.set('uploading', true);
    case UPLOAD_FILE_FAIL:
      return state.delete('uploading', true);

    default:
      return state;
  }
}

export function getData() {
  return {
    types: [GET_DATA, GET_DATA_SUCCESS, GET_DATA_FAIL],
    request: {
      method: 'GET',
      url: 'getAll'
    }
  }
}

export function clearAllData() {
  return {
    types: [CLEAR_DATA, CLEAR_DATA_SUCCESS, CLEAR_DATA_FAIL],
    request: {
      method: 'GET',
      url: 'clearAll'
    }
  }
}

export function uploadFile(data) {
  return {
    types: [UPLOAD_FILE, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAIL],
    request: {
      method: 'POST',
      url: 'upload',
      file: data,
      headers: {
        'Content-Type': data.type,
        name: data.name
      }
    }
  }
}
