import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch, Redirect } from 'react-router';
import 'normalize.css/normalize.css';
import I18nContext from './i18nContext';
import FarkleGame from '../farkleGame/farkleGame';
import './index.scss';
import './app.scss';

const App = ({ browserHistory, store }) => (
  <div className="c-farkle">
    <Provider store={store}>
      <I18nContext>
        <ConnectedRouter history={browserHistory}>
          <Switch>
            <Route component={FarkleGame} path="/home" />
            <Redirect path="/" to="/home" />
          </Switch>
        </ConnectedRouter>
      </I18nContext>
    </Provider>
  </div>
);
App.propTypes = {
  browserHistory: PropTypes.shape({}).isRequired,
  store: PropTypes.shape({}).isRequired,
};

export default App;
