const express = require('express');

const TodoController = require("../controllers/todo.controller");

const Routes = express.Router();

Routes.get("/todo/:id", TodoController.getOne);
Routes.delete("/todo/:id", TodoController.remove);
Routes.put("/todo/:id", TodoController.update);
Routes.get("/todo", TodoController.index);
Routes.post("/todo", TodoController.store);

module.exports = Routes;