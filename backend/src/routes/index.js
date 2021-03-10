const express = require('express');

const UserRouter = require('./user.route');
const TodoRouter = require('./todo.route');

const Routes = express.Router();

Routes.use('/api', UserRouter);
Routes.use('/api', TodoRouter);

module.exports = Routes;

