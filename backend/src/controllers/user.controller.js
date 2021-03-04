const UserModel = require("../models/user.model");

class User {
  async index(request, response) {
    const users = await UserModel.find();

    response.send({ users });
  }

  async store(request, response) {
    const body = request.body;

    const user = await UserModel.create(body);

    response.send({ user });
  }
}

module.exports = new User();
