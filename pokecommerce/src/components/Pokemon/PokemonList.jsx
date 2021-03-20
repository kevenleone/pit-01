import React, { useContext } from "react";
import ClayLayout from "@clayui/layout";

import PokemonCard from "./PokemonCard";
import AppContext from "../../AppContext";

const getPokemonId = ({ url }) => {
  return url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", "");
};

export default function PokemonList({ pokemons }) {
  const [{ wishlist }, dispatch] = useContext(AppContext);

  const onClickFavorite = (pokemonId) => {
    dispatch({ type: "TOGGLE_WISHLIST", payload: pokemonId });
  };

  return (
    <ClayLayout.Row>
      {pokemons.map((pokemon, index) => {
        const pokemonId = getPokemonId(pokemon);

        return (
          <ClayLayout.Col key={index} size={4}>
            <PokemonCard
              onClickFavorite={() => onClickFavorite(pokemonId)}
              favoriteSymbol={
                wishlist.includes(pokemonId) ? "heart-full" : "heart"
              }
              name={pokemon.name}
              image_url={`https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`}
            />
          </ClayLayout.Col>
        );
      })}
    </ClayLayout.Row>
  );
}
