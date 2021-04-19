const { request } = require('express');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const UserRouter = require('./routes/user.route');

const {MONGO_URL, HTTP_PORT} = process.env;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

app.use(express.json());

app.use('')

app.use('/api', UserRouter);

app.get('/', (resquest, response) => {
    response.status(404).send({message: "Hello World!", querry: request.query})
});

app.listen(HTTP_PORT, () => {
    console.log(`Rodando na porta ${HTTP_PORT}`);
})
