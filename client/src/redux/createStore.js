import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import { callAPIMiddleware } from './callAPIMiddleware';

export default function configureStore() {
  const middleware = [callAPIMiddleware];

  const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

  const store = createStore(rootReducer, compose(applyMiddleware(...middleware), reduxDevTools));

  // if (module.hot) {
  //   module.hot.accept('./reducers', () =>
  //     store.replaceReducer(require('../reducers').default)
  //   );
  // }

  return store;
}
