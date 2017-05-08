import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './css/App.css';
import './css/grails.css';
import './css/main.css';
import { Provider } from 'react-redux';
import configureStore from './redux/createStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store} key="provider">
    <App />
  </Provider>,
  document.getElementById('root')
);
