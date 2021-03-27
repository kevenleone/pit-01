const express = require("express");

const WishListController = require("../controllers/wishlist.controller");

const Routes = express.Router();

Routes.get("/wishlist", WishListController.index);
Routes.post("/wishlist", WishListController.toggleWishList);

module.exports = Routes;
