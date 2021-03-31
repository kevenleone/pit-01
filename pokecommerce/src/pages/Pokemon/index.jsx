import React, { useEffect, useState } from "react";
import ClayLayout from "@clayui/layout";

import Page from "../../components/Page";
import PokemonTypes from "../../components/Pokemon/PokemonTypes";
import axios from "../../utils/api";
import PokemonInfo from "../../components/Pokemon/PokemonInfo";

export default function Pokemon({
  match: {
    params: { name },
  },
}) {
  const [pokemon, setPokemon] = useState();

  const fetchData = async () => {
    try {
      const [
        { data: pokedexResponse },
        { data: pokeSpeciesResponse },
      ] = await Promise.all([
        axios.get(`/pokedex/${name}`),
        axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`
        ),
      ]);

      const { data: pokeChainResponse } = await axios.get(
        pokeSpeciesResponse.evolution_chain.url
      );

      setPokemon({
        ...pokedexResponse.data,
        ...pokeSpeciesResponse,
        evolution_chain: pokeChainResponse,
      });
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(pokemon);

  if (!pokemon?.id) {
    return null;
  }

  return (
    <Page title={`#${String(pokemon.id).padStart(3, "0")} ${name}`}>
      <ClayLayout.Row>
        <ClayLayout.Col size={12}>
          <center>
            <PokemonTypes types={pokemon?.type}></PokemonTypes>
            <img
              alt={`Pokemon: ${name}`}
              width={300}
              height={300}
              src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon?.id}.png`}
            />
          </center>
        </ClayLayout.Col>
        <ClayLayout.Col>
          <PokemonInfo pokemon={pokemon} />
        </ClayLayout.Col>
      </ClayLayout.Row>
    </Page>
  );
}
