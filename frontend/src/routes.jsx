import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import User from './pages/User';
import EditUser from './pages/User/edit-user';
import Todo from './pages/Todo';
import Auth from './pages/Auth';

const routes = [
  {
    component: Home,
    name: 'Home',
    path: '/',
  },
  {
    component: User,
    name: 'User',
    path: '/user',
  },
  {
    component: EditUser,
    name: 'User',
    path: '/user/:id',
    visible: false,
  },
  {
    component: Todo,
    name: 'Todo',
    path: '/todo',
  },
  {
    component: Auth,
    name: 'Auth',
    path: '/auth',
    visible: false,
  },
];

const Routes = () => (
  <BrowserRouter>
    <Navbar title="Pitang" routes={routes} />
    <Switch>
      {routes.map(({ path, component }) => (
        <Route exact key={path} path={path} component={component} />
      ))}
    </Switch>
  </BrowserRouter>
);

export default Routes;
