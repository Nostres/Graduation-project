import { fromJS } from 'immutable';

export const LOAD_CHART_DATA = 'chart/LOAD_CHART_DATA';
export const LOAD_CHART_SUCCESS = 'chart/LOAD_CHART_SUCCESS';
export const LOAD_CHART_DATA_FAIL = 'chart/LOAD_CHART_DATA_FAIL';

export const CALCULATE = 'chart/CALCULATE';
export const CALCULATE_SUCCESS = 'chart/CALCULATE_SUCCESS';
export const CALCULATE_FAIL = 'chart/CALCULATE_FAIL';

export const CLEAR_ALL = 'chart/CLEAR_ALL';

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
    case CALCULATE:
      return state.set('calculating', true);
    case CALCULATE_SUCCESS:
      return state.setIn(['valueList', `${action.payload.fileId}`], fromJS(action.payload.result.valueList));
    case CALCULATE_FAIL:
      return state.delete('calculating');
    case CLEAR_ALL:
      return initialState;
    default:
      return state;
  }
}

export function calculate(demands, conversionData) {
  const conversion = !conversionData || !conversionData.data.D ? null : conversionData;
  return {
    type: CALCULATE,
    demands,
    conversion
  }
}
