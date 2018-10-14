import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import { sessionService } from 'redux-react-session';
import Alert from 'react-s-alert';
import indexRoutes from 'routes/index';
import NotFound from 'modules/not-found/not-found';
import reducers from './reducers';
import 'assets/scss/material-dashboard-pro-react.css';
import 'assets/scss/style.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';

const history = createBrowserHistory();
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(promise)),
);
sessionService.initSessionService(store, { driver: 'LOCALSTORAGE' });

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          {indexRoutes.map(route => (<Route key={route.path} {...route} />))}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
    <Alert stack />
  </React.Fragment>,
  document.getElementById('root'),
);
