import React, { useEffect, useReducer } from "react";

import AppContext, { reducer, initialState } from "./AppContext";
import axios from "./utils/api";
import { useDebounce } from "./hooks/useDebounce";

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loggedUser, pagination: paginationState } = state;
  const { currentPage, limit, search } = paginationState;

  const debouncedValue = useDebounce(search, 200);

  const fetchPokemons = async () => {
    const responsePokemon = await axios.get(
      `/pokedex?page=${currentPage}&limit=${limit}&search=${debouncedValue}`
    );

    const { data: pokemonList, ...pagination } = responsePokemon.data;

    dispatch({ type: "SET_POKEMON", payload: pokemonList });

    dispatch({
      type: "SET_PAGINATION",
      payload: { search, ...pagination },
    });
  };

  const fetchMe = async () => {
    const response = await axios.post("/me");

    dispatch({
      type: "SET_ME",
      payload: response.data.user,
    });
  };

  const fetchWishlist = async () => {
    const response = await axios.get("/wishlist");

    dispatch({ type: "SET_WISHLIST", payload: response.data.data });
  };

  useEffect(() => {
    fetchMe();
  }, []);

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
