import React, { useContext } from "react";

import Page from "../../components/Page";
import PokemonList from "../../components/Pokemon/PokemonList";
import AppContext from "../../AppContext";

const getPokemonId = ({ url }) => {
  return url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", "");
};

const WishList = () => {
  const [{ pokemons, wishlist }] = useContext(AppContext);

  const pokemonList = pokemons.filter((pokemon) =>
    wishlist.includes(getPokemonId(pokemon))
  );

  return (
    <Page title="Wishlist">
      <PokemonList pokemons={pokemonList} />
    </Page>
  );
};

export default WishList;
