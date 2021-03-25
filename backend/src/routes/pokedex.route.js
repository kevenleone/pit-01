const express = require("express");

const PokedexController = require("../controllers/pokedex.controller");

const Routes = express.Router();

Routes.get("/pokedex", PokedexController.index);

module.exports = Routes;
