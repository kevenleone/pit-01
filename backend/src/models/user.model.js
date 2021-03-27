const mongoose = require("mongoose");
const { PokedexSchema } = require("./pokedex.model");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    pokeDolar: Number,
    wishlist: [mongoose.Types.ObjectId],
    cart: [
      {
        pokemonId: mongoose.Types.ObjectId,
        count: Number,
      },
    ],
    purchasedPokemon: [PokedexSchema],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
