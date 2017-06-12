import {fromJS} from 'immutable';
import {LOGOUT_USER_SUCCESS} from './user';

export const LOAD_CHART_DATA = 'chart/LOAD_CHART_DATA';
export const LOAD_CHART_SUCCESS = 'chart/LOAD_CHART_SUCCESS';
export const LOAD_CHART_DATA_FAIL = 'chart/LOAD_CHART_DATA_FAIL';

export const CALCULATE = 'chart/CALCULATE';
export const CALCULATE_SUCCESS = 'chart/CALCULATE_SUCCESS';
export const CALCULATE_FAIL = 'chart/CALCULATE_FAIL';

export const CALCULATE_ARIMA = 'chart/CALCULATE_ARIMA';
export const CALCULATE_ARIMA_SUCCESS = 'chart/CALCULATE_ARIMA_SUCCESS';
export const CALCULATE_ARIMA_FAIL = 'chart/CALCULATE_ARIMA_FAIL';

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
            return state
                .setIn(['data', `${action.payload.fileId}`], fromJS(action.payload.result.data))
                .setIn(['valueList', `${action.payload.fileId}`], fromJS(action.payload.result.valueList))
                .setIn(['degreeList', `${action.payload.fileId}`], fromJS(action.payload.result.degreeList));
        case CALCULATE_FAIL:
            return state.delete('calculating');
        case CALCULATE_ARIMA:
            return state.set('calculating', true);
        case CALCULATE_ARIMA_SUCCESS:
            return state
                .setIn(['data', `${action.payload.result.fileId}`], fromJS(action.payload.result.data))
                .setIn(['noiseData'], fromJS(action.payload.result.noiseData))
                .delete('valueList')
                .delete('degreeList');
        case CALCULATE_ARIMA_FAIL:
            return state.delete('calculating');
        case LOGOUT_USER_SUCCESS:
            return initialState;
        default:
            return state;
    }
}

export function loadChartData(id) {
    return {
        type: LOAD_CHART_DATA,
        id
    }
}

export function isChartDataLoaded(state, id) {
    return state.charts.getIn(['data', `${id}`]) !== undefined;
}

export function calculateAC(demands, conversionData, data) {
    const conversion = !conversionData || !conversionData.data.D ? null : conversionData;
    const sample = data ? data.toJSON() : [];
    return {
        type: CALCULATE,
        demands,
        conversion,
        sample
    }
}

export function calculateArima(params, valueList, degreeList) {
    return {
        type: CALCULATE_ARIMA,
        params,
         valueList, degreeList
    }
}
