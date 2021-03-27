const { PokedexModel } = require("../models/pokedex.model");

class PokedexController {
  async index(req, res) {
    const { page = 1, limit = 10, search = '' } = req.query;

    const count = await PokedexModel.countDocuments();

    const pokedex = await PokedexModel.find({
      name: { $regex: search, $options: "i" },
    })
      .sort({ id: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    res.json({
      data: pokedex,
      total: count,
      limit,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
    });
  }

  async getOne(req, res) {
    const {
      params: { name },
    } = req;

    const pokedex = await PokedexModel.findOne({ name });

    res.json({ data: pokedex });
  }

  async store(req, res) {
    const pokemons = req.body.map((pokemon) => ({
      ...pokemon,
      name: pokemon.name.english,
    }));

    await PokedexModel.create(pokemons);

    res.json({ message: "Feito" });
  }
}

module.exports = new PokedexController();
