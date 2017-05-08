import { combineReducers } from 'redux';

import charts from './charts';
import message from './message';

const rootReducer = combineReducers({
  charts,
  message
});

export default rootReducer;
