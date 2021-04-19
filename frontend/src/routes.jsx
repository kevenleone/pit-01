import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import User from './pages/User';
import EditUser from './pages/User/editUser';
import Todo from './pages/Todo';

const routes = [{
  component: Home,
  name: 'Home',
  path: '/',
}, {
  component: User,
  name: 'User',
  path: '/user',
}, {
  component: EditUser,
  name: 'User',
  path: '/user/:id',
  visible: false,
}, {
  component: Todo,
  name: 'To-Do App',
  path: '/todo',
}];

const Routes = () => (
  <BrowserRouter>
    <Navbar title="smarTo-Do" routes={routes} />
    <Switch>
      {routes.map(({ path, component }) => (
        <Route exact key={path} path={path} component={component} />
      ))}
    </Switch>
  </BrowserRouter>
);

export default Routes;
