import { fromJS } from 'immutable';
import { UPLOAD_FILE_FAIL, GET_DATA_FAIL, CLEAR_DATA_FAIL } from './charts';

const CLOSE_MESSAGE = 'message/CLOSE_MESSAGE';

const initialState = fromJS({
  show: false
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_DATA_FAIL:
    case UPLOAD_FILE_FAIL:
    case CLEAR_DATA_FAIL:
      return state
        .set('message', fromJS(action.payload.message))
        .set('error', fromJS(action.payload.error))
        .set('type', fromJS(action.payload.type))
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
