import React, { useContext } from "react";
import { ClayPaginationWithBasicItems } from "@clayui/pagination";
import { useHistory } from "react-router";
import ClayLayout from "@clayui/layout";
import { ClayInput } from "@clayui/form";

import Page from "../../components/Page";
import PokemonList from "../../components/Pokemon/PokemonList";
import AppContext from "../../AppContext";

const Pokemons = () => {
  const [{ pokemons, pagination }, dispatch] = useContext(AppContext);

  const history = useHistory();

  const onPageChange = (page) => {
    dispatch({
      type: "SET_PAGINATION",
      payload: { ...pagination, currentPage: page },
    });

    history.replace(`/?page=${page}`);
  };

  const onChangeValue = ({ target: { value } }) => {
    dispatch({
      type: "SET_PAGINATION",
      payload: { ...pagination, search: value },
    });
  };

  return (
    <Page title="Pokemon List">
      <ClayInput
        placeholder="Search for a Pokemon"
        onChange={onChangeValue}
        value={pagination.search}
      />
      <ClayLayout.Row className="mt-4 mb-2 flex justify-content-center">
        <ClayPaginationWithBasicItems
          activePage={pagination.currentPage}
          ellipsisBuffer={3}
          onPageChange={onPageChange}
          totalPages={pagination.totalPages}
        />
      </ClayLayout.Row>
      <PokemonList pokemons={pokemons} />
    </Page>
  );
};

export default Pokemons;
