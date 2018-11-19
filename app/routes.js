/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';

const routes = () => (
  <App>
    <Switch>
      <Route
        component={HomePage}
        path="/"
      />
    </Switch>
  </App>
);

export default routes;
