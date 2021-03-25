import React, { useCallback, useEffect, useReducer } from "react";

import AppContext, { reducer, initialState } from "./AppContext";
import { fetchPokemon } from "./graphql";
import axios from "./utils/api";

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchPokemons = useCallback(async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    const data = await response.json();
    const promisesPokemons = [];

    for (const pokemon of data.results) {
      promisesPokemons.push(fetchPokemon(pokemon.name));
    }

    const pokemons = await Promise.all(promisesPokemons);

    const pokemonList = pokemons.map(({ data: { pokemon } }) => pokemon);

    dispatch({ type: "SET_POKEMON", payload: pokemonList });
  }, []);

  const fetchMe = async () => {
    const response = await axios.post("/me");

    dispatch({ type: "SET_WISHLIST", payload: response.data.user.wishlist });
  };

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  useEffect(() => {
    fetchMe()
  }, [])

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
