import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import configureStore, { history } from './store';
import { register } from './serviceWorker';
import Routes from './routes';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

render(
  <Provider store={store}>
    <ConnectedRouter history={history} store={store}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

register();
