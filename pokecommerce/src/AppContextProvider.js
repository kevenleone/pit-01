import React, { useEffect, useState, useReducer } from "react";
import ClayLoadingIndicator from "@clayui/loading-indicator";

import AppContext, { reducer, initialState } from "./AppContext";
import axios from "./utils/api";
import { useDebounce } from "./hooks/useDebounce";

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const { loggedUser, pagination: paginationState } = state;
  const { currentPage, limit, search } = paginationState;

  const debouncedValue = useDebounce(search, 200);

  const fetchPokemons = async () => {
    setLoading(true);
    const responsePokemon = await axios.get(
      `/pokedex?page=${currentPage}&limit=${limit}&search=${debouncedValue}`
    );

    const { data: pokemonList, ...pagination } = responsePokemon.data;

    dispatch({ type: "SET_POKEMON", payload: pokemonList });
    // dispatch({
    //   type: "SET_PAGINATION",
    //   payload: { search, ...pagination },
    // });

    setLoading(false);
  };

  const fetchWishlist = async () => {
    const response = await axios.get("/wishlist");

    dispatch({ type: "SET_WISHLIST", payload: response.data.data });
  };

  useEffect(() => {
    if (loggedUser) {
      fetchPokemons();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUser, currentPage, limit, debouncedValue]);

  useEffect(() => {
    if (loggedUser) {
      fetchWishlist();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUser]);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
