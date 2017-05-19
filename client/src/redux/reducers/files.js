import { fromJS } from 'immutable';
import { LOGOUT_USER_SUCCESS } from './user';

export const GET_FILES = 'files/GET_FILES';
export const GET_FILES_SUCCESS = 'files/GET_FILES_SUCCESS';
export const GET_FILES_FAIL = 'files/GET_FILES_FAIL';

export const UPLOAD_FILE = 'files/UPLOAD_FILE';
export const UPLOAD_FILE_SUCCESS = 'files/UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_FAIL = 'files/UPLOAD_FILE_FAIL';

export const DELETE_FILE = 'files/DELETE_FILE';
export const DELETE_FILE_SUCCESS = 'files/DELETE_FILE_SUCCESS';
export const DELETE_FILE_FAIL = 'files/DELETE_FILE_FAIL';

export const UPDATE_DESCRIPTION = 'files/UPDATE_DESCRIPTION';
export const UPDATE_DESCRIPTION_SUCCESS = 'files/UPDATE_DESCRIPTION_SUCCESS';
export const UPDATE_DESCRIPTION_FAIL = 'files/UPDATE_DESCRIPTION_FAIL';

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
      return state.set('uploading', true);
    case UPLOAD_FILE_FAIL:
    case UPLOAD_FILE_SUCCESS:
      return state.delete('uploading', false);
    case DELETE_FILE:
      return state.set('deleting', true);
    case DELETE_FILE_SUCCESS: {
      const indexToDelete = state.get('data').findIndex(i => i.get('id') === action.payload);
      if (indexToDelete > -1) {
        return state.update('data', (list) => list.delete(indexToDelete));
      }
      return state;
    }
    case UPDATE_DESCRIPTION_SUCCESS: {
      const indexToUpdate = state.get('data').findIndex(i => i.get('id') === action.payload.id);
      if (indexToUpdate > -1) {
        return state.setIn(['data', `${indexToUpdate}`, 'description'], 'action.payload.text' );
      }
      return state;
    }
    case DELETE_FILE_FAIL:
      return state.delete('deleting');
    case LOGOUT_USER_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export function getFilesAC() {
  return { type: GET_FILES }
}

export function uploadFileAC(file) {
  return { type: UPLOAD_FILE, file }
}

export function deleteFileAC(id) {
  return { type: DELETE_FILE, id}
}

export function updateDescription(id, text) {
  return { type: UPDATE_DESCRIPTION, id, text }
}

export function isFilesLoaded(storage) {
  return storage.files.get('loaded');
}
