import React, { useContext } from "react";

import Page from "../../components/Page";
import PokemonList from "../../components/Pokemon/PokemonList";
import AppContext from "../../AppContext";

const PurchasedPokemon = () => {
  const [
    {
      me: { purchasedPokemon },
    },
  ] = useContext(AppContext);

  return (
    <Page title="Purchased Pokemons">
      <PokemonList pokemons={purchasedPokemon} />
    </Page>
  );
};

export default PurchasedPokemon;
