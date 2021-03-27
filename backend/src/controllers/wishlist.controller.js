const UserModel = require("../models/user.model");
const { PokedexModel } = require("../models/pokedex.model");

class WishListController {
  async index(req, res) {
    const { _id: userId } = req.headers.loggedUser;
    const user = await UserModel.findById(userId).lean();

    const pokemons = await PokedexModel.find({
      _id: {
        $in: user.wishlist,
      },
    });

    res.send({ data: pokemons });
  }

  async toggleWishList(req, res) {
    const { _id: userId } = req.headers.loggedUser;
    const { pokemonId } = req.body;

    const user = await UserModel.findById(userId);

    let wishlist = user.wishlist;

    if (wishlist.includes(pokemonId)) {
      wishlist = wishlist.filter((id) => !id.equals(pokemonId));
    } else {
      wishlist = [...wishlist, pokemonId];
    }

    user.wishlist = wishlist;

    await user.save();

    const pokemons = await PokedexModel.find({
      _id: {
        $in: user.wishlist,
      },
    });

    res.send({ data: pokemons });
  }
}

module.exports = new WishListController();
