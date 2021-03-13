import Home from './pages/Home';
import User from './pages/User';
import EditUser from './pages/User/edit-user';
import Todo from './pages/Todo';
import Auth from './pages/Auth';

const routes = [
  {
    component: Home,
    name: 'Home',
    path: '/home',
    private: true,
  },
  {
    component: User,
    name: 'User',
    path: '/user',
    private: true,
  },
  {
    component: EditUser,
    name: 'User',
    path: '/user/:id',
    visible: false,
    private: true,
  },
  {
    component: Todo,
    name: 'Todo',
    path: '/todo',
    private: true,
  },
  {
    component: Auth,
    name: 'Auth',
    path: '/auth',
    visible: false,
    private: false,
  },
];

export default routes;
