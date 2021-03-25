const express = require("express");

const UserRouter = require("./user.route");
const TodoRouter = require("./todo.route");
const WishlistRouter = require("./wishlist.route");
const PokedexRouter = require("./pokedex.route");

const Routes = express.Router();

Routes.use("/api", WishlistRouter);
Routes.use("/api", UserRouter);
Routes.use("/api", TodoRouter);
Routes.use("/api", PokedexRouter);

module.exports = Routes;
