import { fromJS } from 'immutable';

export const LOAD_CHART_DATA = 'chart/LOAD_CHART_DATA';
export const LOAD_CHART_SUCCESS = 'chart/LOAD_CHART_SUCCESS';
export const LOAD_CHART_DATA_FAIL = 'chart/LOAD_CHART_DATA_FAIL';


const initialState = fromJS({
  data: {},
  loading: false,
  isLoaded: false
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_CHART_DATA:
      return state
        .set('loading', true)
        .set('isLoaded', false);
    case LOAD_CHART_SUCCESS:
      return state
        .setIn(['data', `${action.payload.fileId}`], fromJS(action.payload.data))
        .set('active', action.payload.fileId)
        .set('isLoaded', true)
        .delete('loading');
    case LOAD_CHART_DATA_FAIL:
      return state
        .delete('loading')
        .set('isLoaded', false);
    default:
      return state;
  }
}

