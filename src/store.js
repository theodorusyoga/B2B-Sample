import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import auth from './middleware/auth';

export const history = createHistory();

const middleware = [
  thunk,
  routerMiddleware(history),
  auth
];

const enhancers = [];

if (process.env.NODE_ENV === 'development') {
  /* eslint-disable */
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
    /* eslint-enable */

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

history.listen((location, action) => {
  window.scrollTo(0, 0);
});


export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    composedEnhancers
  );
}
