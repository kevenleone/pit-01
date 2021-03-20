import { createContext } from "react";

const AppContext = createContext();

const initialState = {
  pokemons: [],
  wishlist: [],
  cart: [],
  loggedUser: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_POKEMON": {
      return {
        ...state,
        pokemons: action.payload,
      };
    }

    case "TOGGLE_WISHLIST": {
      let wishlist = state.wishlist;
      const pokemonId = action.payload;

      if (wishlist.includes(pokemonId)) {
        wishlist = wishlist.filter((id) => id !== pokemonId);
      } else {
        wishlist = [...wishlist, pokemonId];
      }

      return {
        ...state,
        wishlist,
      };
    }

    default: {
      return state;
    }
  }
};

export { initialState, reducer };

export default AppContext;
