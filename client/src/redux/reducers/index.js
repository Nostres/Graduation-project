import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import objects from './objects';
import charts from './charts';
import message from './message';
import files from './files';
import user from './user';

const combinedReducers = combineReducers({
  routing: routerReducer,
  user,
  files,
  charts,
  message,
  objects
});

export default combinedReducers;
