import { fromJS } from 'immutable';

export const GET_FILES = 'files/GET_FILES';
export const GET_FILES_SUCCESS = 'files/GET_FILES_SUCCESS';
export const GET_FILES_FAIL = 'files/GET_FILES_FAIL';

export const UPLOAD_FILE = 'files/UPLOAD_FILE';
export const UPLOAD_FILE_SUCCESS = 'files/UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_FAIL = 'files/UPLOAD_FILE_FAIL';

const initialState = fromJS({
  data: [],
  loaded: false
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case GET_FILES:
      return state.set('loading', true);
    case GET_FILES_SUCCESS:
      return state
        .set('data', fromJS(action.payload.data))
        .set('loaded', true)
        .delete('loading');
    case GET_FILES_FAIL:
      return state.delete('loading');
    case UPLOAD_FILE:
    case UPLOAD_FILE_SUCCESS:
      return state.set('uploading', true);
    case UPLOAD_FILE_FAIL:
      return state.delete('uploading', true);

    default:
      return state;
  }
}

export function getFiles() {
  return { type: GET_FILES }
}

export function uploadFile(file) {
  return { type: UPLOAD_FILE, file }
}

export function isFilesLoaded(storage) {
  return storage.files.get('loaded');
}
