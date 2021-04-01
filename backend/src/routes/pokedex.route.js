const express = require("express");

const PokedexController = require("../controllers/pokedex.controller");

const Routes = express.Router();

Routes.get("/pokedex/:name", PokedexController.getOne);
Routes.get("/pokedex", PokedexController.index);
Routes.post("/pokedex", PokedexController.store);
Routes.post("/purchase/pokemon", PokedexController.buyPokemon);

module.exports = Routes;
