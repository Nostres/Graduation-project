import { fromJS } from 'immutable';

export const LOAD_CHART_DATA = 'LOAD_CHART_DATA';


const initialState = fromJS({
  data: []
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}


