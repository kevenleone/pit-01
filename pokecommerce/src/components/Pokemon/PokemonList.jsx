import React, { useContext } from "react";
import ClayLayout from "@clayui/layout";

import PokemonCard from "./PokemonCard";
import AppContext from "../../AppContext";

export default function PokemonList({ pokemons }) {
  const [{ wishlist }, dispatch] = useContext(AppContext);

  const onClickFavorite = (pokemonId) => {
    dispatch({ type: "TOGGLE_WISHLIST", payload: pokemonId });
  };

  return (
    <ClayLayout.Row>
      {pokemons.map((pokemon, index) => {

        return (
          <ClayLayout.Col key={index} size={4}>
            <PokemonCard
              types={pokemon.types}
              onClickFavorite={() => onClickFavorite(pokemon.id)}
              favoriteSymbol={
                wishlist.includes(pokemon.id) ? "heart-full" : "heart"
              }
              name={pokemon.name}
              image_url={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
            />
          </ClayLayout.Col>
        );
      })}
    </ClayLayout.Row>
  );
}
