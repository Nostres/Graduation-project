import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Login from './components/Login/Login';
import App from './containers/Application/App';
import Workspace from './containers/Workspace/Workspace';
import FileList from './containers/FileList/FileList';
import configureStore from './redux/createStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store} key="provider">
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/login" component={Login}/>
        <Route path="/files" component={FileList}/>
        <Route path="/files/:id" component={Workspace}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
