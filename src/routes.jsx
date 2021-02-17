import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Todo from './pages/Todo';

const routes = [{
  component: Home,
  name: 'Home',
  path: '/',
}, {
  component: Todo,
  name: 'Todo Task',
  path: '/todo',
}];

const Routes = () => (
  <BrowserRouter>
    <Switch>
      {routes.map(({ path, component }) => (
        <Route exact key={path} path={path} component={component} />
      ))}
    </Switch>
  </BrowserRouter>
);

export default Routes;
