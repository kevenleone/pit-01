const { PokedexModel } = require("../models/pokedex.model");

class PokedexController {
  async index(req, res) {
    const { page = 1, limit = 10 } = req.query;

    // const count = await Product.countDocuments();

    //   return res.json({
    //     products,
    //     totalProducts: count,
    //     totalPages: Math.ceil(count / limit),
    //     currentPage: page,
    //   });

    const pokedex = await PokedexModel.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    res.send({ data: pokedex });
  }
}

module.exports = new PokedexController();
