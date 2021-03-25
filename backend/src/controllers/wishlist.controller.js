const UserModel = require("../models/user.model");

class WishListController {
  async toggleWishList(req, res) {
    const { _id: userId } = req.headers.loggedUser;
    const { pokemonId } = req.body;

    const user = await UserModel.findById(userId);

    let wishlist = user.wishlist;

    if (wishlist.includes(pokemonId)) {
      wishlist = wishlist.filter((id) => id !== pokemonId);
    } else {
      wishlist = [...wishlist, pokemonId];
    }

    user.wishlist = wishlist;

    await user.save();

    res.send({ wishlist });
  }
}

module.exports = new WishListController();
