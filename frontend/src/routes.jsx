import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';

import Navbar from './components/Navbar';

import routes from './routelist';
import { tokenKey } from './utils/constants';

const publicRoutes = routes.filter((route) => !route.private);
const privateRoutes = routes.filter((route) => route.private);

const PublicRouter = ({ component: Component, ...otherProps }) => {
  const isAuthenticated = localStorage.getItem(tokenKey);

  return (
    <Route
      exact
      {...otherProps}
      render={(props) => {
        if (isAuthenticated) {
          return <Redirect to={{ pathname: '/home' }} />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

const PrivateRouter = ({ component: Component, ...otherProps }) => {
  const isAuthenticated = localStorage.getItem(tokenKey);

  return (
    <Route
      exact
      {...otherProps}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        }

        return <Redirect to={{ pathname: '/auth' }} />;
      }}
    />
  );
};

const Routes = () => (
  <BrowserRouter>
    <Navbar title="Pitang" routes={routes} />
    <Switch>
      {publicRoutes.map((route) => (
        <PublicRouter key={route.path} {...route} />
      ))}

      {privateRoutes.map((route) => (
        <PrivateRouter key={route.path} {...route} />
      ))}
    </Switch>
  </BrowserRouter>
);

export default Routes;
