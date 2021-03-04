const express = require("express");
const mongoose = require("mongoose");

const UserController = require("./controllers/user.controller");

mongoose.connect("mongodb://localhost:27017/pit01", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.status(404).send({ message: "Hello World", query: request.query });
});

app.get("/user", (request, response) =>
  UserController.index(request, response)
);

app.post("/user", (request, response) =>
  UserController.store(request, response)
);

app.listen(3333, () => {
  console.log("Rodando na porta 3333");
});
