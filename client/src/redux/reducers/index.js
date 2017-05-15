import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import charts from './charts';
import message from './message';
import files from './files';
import user from './user';
import spinner from './spinner';

const combinedReducers = combineReducers({
  routing: routerReducer,
  user,
  files,
  charts,
  message,
  spinner
});

export default combinedReducers;
