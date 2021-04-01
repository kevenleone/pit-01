const { PokedexModel } = require("../models/pokedex.model");
const UserModel = require("../models/user.model");

class PokedexController {
  async index(req, res) {
    const { page = 1, limit = 10, search = "" } = req.query;

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

  async buyPokemon(req, res) {
    const { _id: userId } = req.headers.loggedUser;
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Pokemon ID is missing" });
    }

    const user = await UserModel.findById(userId);
    const pokedex = await PokedexModel.findById(id).lean();

    if (user.pokeDolar >= pokedex.price) {
      user.pokeDolar = user.pokeDolar - pokedex.price;
      user.purchasedPokemon.push(pokedex);

      await user.save();

      res.json({ message: "Pokemon bought with success", data: user });
    } else {
      return res.status(400).json({ message: "Insufficient Balance" });
    }
  }
}

module.exports = new PokedexController();
