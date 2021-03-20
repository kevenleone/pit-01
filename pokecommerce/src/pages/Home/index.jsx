import React, {useContext} from "react";

import Page from "../../components/Page";
import PokemonList from '../../components/Pokemon/PokemonList'
import AppContext from '../../AppContext'

const Pokemons = () => {
  const [{ pokemons }] = useContext(AppContext);

  return (
    <Page title="Pokemon List">
      <PokemonList pokemons={pokemons} />
    </Page>
  )
};

export default Pokemons;
