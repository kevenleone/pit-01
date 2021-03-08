const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const UserModel = require("../models/user.model");

const saltRounds = 10;

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const encryptPassword = await bcrypt.hash(password, salt);

  return encryptPassword;
};

class User {
  async index(req, res) {
    const users = await UserModel.find();

    res.send({ users });
  }

  async store(req, res) {
    const body = req.body;

    if (body.password) {
      body.password = await hashPassword(body.password);
    }

    const user = await UserModel.create(body);

    res.send({ user });
  }

  async getOne(req, res) {
    const { id } = req.params;

    try {
      const user = await UserModel.findById(id);
      res.send({ data: user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async remove(req, res) {
    const { id } = req.params;

    try {
      const user = await UserModel.findById(id);

      if (!user) {
        return res.send({ message: "User not exist" });
      }

      await user.remove();

      res.send({ message: "User removed" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async update(req, res) {
    const {
      body,
      params: { id },
    } = req;

    if (body.password) {
      body.password = await hashPassword(body.password);
    }

    const user = await UserModel.findByIdAndUpdate(id, body, { new: true });

    res.send({ user });
  }

  async auth(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email }).lean();

      if (!user) {
        throw new Error("User not exists");
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new Error("Password invalid");
      }

      const token = jwt.sign(user, process.env.JWT_SECRET)

      res.send({ token });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = new User();
