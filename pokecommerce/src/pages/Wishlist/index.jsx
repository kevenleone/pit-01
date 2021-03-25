import React, { useContext } from "react";

import Page from "../../components/Page";
import PokemonList from "../../components/Pokemon/PokemonList";
import AppContext from "../../AppContext";

const WishList = () => {
  const [{ pokemons, wishlist }] = useContext(AppContext);

  const pokemonList = pokemons.filter((pokemon) =>
    wishlist.includes(pokemon.id)
  );

  return (
    <Page title="Wishlist">
      <PokemonList pokemons={pokemonList} />
    </Page>
  );
};

export default WishList;
