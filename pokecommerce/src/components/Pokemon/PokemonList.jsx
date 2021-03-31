import React, { useContext } from "react";
import ClayLayout from "@clayui/layout";

import PokemonCard from "./PokemonCard";
import AppContext from "../../AppContext";

import axios from "../../utils/api";
import { getPokemonImageUrl } from "../../utils/util";

export default function PokemonList({ pokemons }) {
  const [{ wishlist }, dispatch] = useContext(AppContext);

  const onClickFavorite = async (pokemon) => {
    const response = await axios.post("/wishlist", { pokemonId: pokemon._id });

    dispatch({ type: "SET_WISHLIST", payload: response.data.data });
  };

  return (
    <ClayLayout.Row>
      {pokemons.map((pokemon, index) => {
        return (
          <ClayLayout.Col key={index} size={4}>
            <PokemonCard
              types={pokemon.type}
              onClickFavorite={() => onClickFavorite(pokemon)}
              favoriteSymbol={
                wishlist.find((wish) => wish._id === pokemon._id)
                  ? "heart-full"
                  : "heart"
              }
              name={pokemon.name}
              image_url={getPokemonImageUrl(pokemon.id)}
            />
          </ClayLayout.Col>
        );
      })}
    </ClayLayout.Row>
  );
}
