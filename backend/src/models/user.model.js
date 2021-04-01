const mongoose = require("mongoose");
const { PokedexSchema } = require("./pokedex.model");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    pokeDolar: { type: Number, default: 1000 },
    wishlist: [mongoose.Types.ObjectId],
    purchasedPokemon: [PokedexSchema],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
