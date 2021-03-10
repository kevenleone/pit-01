const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const morgan = require('morgan');

require('dotenv').config()

const Routes = require('./routes');
const authMiddleware = require('./middleware/auth.middleware');

const {MONGO_URL, HTTP_PORT} = process.env;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(authMiddleware);
app.use(morgan("dev"));

app.use(Routes);

app.get("/", (request, response) => {
  response.send({ message: "Hello World" });
});

app.listen(HTTP_PORT, () => {
  console.log(`Rodando na porta ${HTTP_PORT}`);
});
