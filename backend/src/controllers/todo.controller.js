const TodoModel = require("../models/todo.model");

class Todo {
  async index(req, res) {
    const { _id: userId } = req.headers.loggedUser;

    const todos = await TodoModel.find({ userId });

    res.send({ data: todos });
  }

  async store(req, res) {
    const body = req.body;

    const { _id: userId } = req.headers.loggedUser;

    const todo = await TodoModel.create({ ...body, userId });

    res.send({ data: todo });
  }

  async getOne(req, res) {
    const { id } = req.params;

    try {
      const todo = await TodoModel.findById(id);
      res.send({ data: todo });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async remove(req, res) {
    const { id } = req.params;

    try {
      const todo = await TodoModel.findById(id);

      if (!todo) {
        return res.send({ message: "todo not exist" });
      }

      await todo.remove();

      res.send({ message: "todo removed" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async update(req, res) {
    const {
      body,
      params: { id },
    } = req;

    const todo = await TodoModel.findByIdAndUpdate(id, body, { new: true });

    res.send({ data: todo });
  }
}

module.exports = new Todo();
