const mongoose = require("mongoose");

const PokedexSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    price: Number,
    type: [String],
    base: {
      HP: Number,
      Attack: Number,
      Defense: Number,
      SpAttack: Number,
      SpDefense: Number,
      Speed: Number,
    },
  },
  {
    timestamps: true,
  }
);

const PokedexModel = mongoose.model("pokedex", PokedexSchema);

module.exports = { PokedexSchema, PokedexModel };
