import React, { useContext } from "react";

import Page from "../../components/Page";
import PokemonList from "../../components/Pokemon/PokemonList";
import AppContext from "../../AppContext";

const WishList = () => {
  const [{ wishlist }] = useContext(AppContext);

  return (
    <Page title="Wishlist">
      <PokemonList pokemons={wishlist} />
    </Page>
  );
};

export default WishList;
