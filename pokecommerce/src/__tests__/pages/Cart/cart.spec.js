import { render, fireEvent } from "@testing-library/react";
import AppContext, { initialState } from "../../../AppContext";

import { pokemonCharizard, pokemonMelMetal } from "../../test.utils";

import Cart from "../../../pages/Cart";

const CartWrapper = ({ state = initialState, dispatch }) => (
  <AppContext.Provider value={[state, dispatch]}>
    <Cart />
  </AppContext.Provider>
);

describe("Cart", () => {
  it("renders", () => {
    const { asFragment, container } = render(<CartWrapper />);

    const emptyState = container.querySelector(".empty-state");

    expect(emptyState).toBeTruthy();
    expect(emptyState.textContent).toBe(`You don't have any purchased pokemon`);

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with one purchased pokemon", () => {
    const state = {
      ...initialState,
      me: {
        purchasedPokemon: [pokemonMelMetal],
      },
    };

    const { container } = render(<CartWrapper state={state} />);

    const melMetalContainer = container.querySelector('div[title="Melmetal"]');

    expect(container.querySelectorAll(".pokemon-card")).toHaveLength(1);
    expect(melMetalContainer).toBeTruthy();
    expect(melMetalContainer.querySelector(".lexicon-icon-heart")).toBeTruthy();
    expect(
      melMetalContainer.querySelectorAll(".pokemon-types__pokemon-type")
    ).toHaveLength(1);
    expect(
      melMetalContainer.querySelector(".pokemon-types__pokemon-type span")
        .textContent
    ).toBe("Steel");
  });

  it("renders with more than one pokemon", () => {
    const state = {
      ...initialState,
      wishlist: [pokemonCharizard],
      me: {
        purchasedPokemon: [pokemonMelMetal, pokemonCharizard],
      },
    };

    const { container } = render(<CartWrapper state={state} />);

    const charizardContainer = container.querySelector(
      'div[title="Charizard"]'
    );

    expect(container.querySelectorAll(".pokemon-card")).toHaveLength(2);
    expect(charizardContainer).toBeTruthy();
    expect(
      charizardContainer.querySelector(".lexicon-icon-heart-full")
    ).toBeTruthy();

    const charizardFavoriteButton = charizardContainer.querySelector(
      ".favorite-pokemon"
    );

    fireEvent.click(charizardFavoriteButton);
  });
});
