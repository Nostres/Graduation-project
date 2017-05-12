import { fromJS } from 'immutable';
import {
  LOGIN_USER_FAIL,
  REGISTER_USER_FAIL,
  LOGOUT_USER_FAIL,
  REGISTER_USER_SUCCESS
} from './user';
import { UPLOAD_FILE_FAIL, GET_FILES_FAIL, UPLOAD_FILE_SUCCESS } from './files';

const CLOSE_MESSAGE = 'message/CLOSE_MESSAGE';
const SHOW_MESSAGE = 'message/SHOW_MESSAGE';

const initialState = fromJS({
  show: false
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPLOAD_FILE_FAIL:
    case REGISTER_USER_FAIL:
    case LOGIN_USER_FAIL:
    case GET_FILES_FAIL:
    case LOGOUT_USER_FAIL: {
      try {
        return state
          .set('message', action.message)
          .set('error', action.error)
          .set('type', 'danger')
          .set('show', true);
      } catch (e){
        return state
          .set('message', 'Error occurs')
          .set('type', 'danger')
          .set('show', true);
      }
    }
    case UPLOAD_FILE_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return state
        .set('message', action.payload.message)
        .set('type', 'success')
        .set('show', true);
    case SHOW_MESSAGE:
      return state
        .set('message', action.text)
        .set('type', action.style)
        .set('show', true);
    case CLOSE_MESSAGE:
      return state
        .delete('message')
        .delete('error')
        .delete('type')
        .set('show', false);
    default:
      return state;
  }
}

export function closeModal() {
  return {
    type: CLOSE_MESSAGE
  }
}

export function showMessage(text, style) {
  return {
    type: SHOW_MESSAGE,
    text, style
  }
}
