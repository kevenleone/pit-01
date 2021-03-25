import React, { useCallback, useEffect, useState } from "react";
import ClayLayout from "@clayui/layout";
import ClayTabs from "@clayui/tabs";

import Page from "../../components/Page";
import PokemonTypes from "../../components/Pokemon/PokemonTypes";
import { fetchPokemon, gqlQueryPokemon } from "../../graphql";

const PokemonInfo = () => {
  const [activeTabKeyValue, setActiveTabKeyValue] = useState(0);

  const tabs = [
    {
      name: "Pokemon About",
      render: () => (
        <table className="table">
          <tbody>
            <tr>
              <td>Species</td>
              <td>Bulbassaur</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>Bulbassaur</td>
            </tr>
            <tr>
              <td>Width</td>
              <td>Bulbassaur</td>
            </tr>
            <tr>
              <td>Weekness</td>
              <td>A, B, C</td>
            </tr>
            <tr>
              <td>Species</td>
              <td>Bulbassaur</td>
            </tr>
          </tbody>
        </table>
      ),
    },
    {
      name: "Pokemon Status",
      render: () => <h1>Testando 2</h1>,
    },
    {
      name: "Pokemon Evolutions",
      render: () => <h1>Testando 3</h1>,
    },
  ];

  return (
    <>
      <ClayTabs modern className="mt-4">
        {tabs.map((tab, index) => (
          <ClayTabs.Item
            key={tab.name}
            active={activeTabKeyValue === index}
            innerProps={{
              "aria-controls": `tabpanel-${index + 1}`,
            }}
            onClick={() => setActiveTabKeyValue(index)}
          >
            {tab.name}
          </ClayTabs.Item>
        ))}
      </ClayTabs>
      <ClayTabs.Content activeIndex={activeTabKeyValue} fade>
        {tabs.map((tab, index) => (
          <ClayTabs.TabPane
            key={index}
            className="p-2"
            aria-labelledby={`tab-${index + 1}`}
          >
            {tab.render()}
          </ClayTabs.TabPane>
        ))}
      </ClayTabs.Content>
    </>
  );
};

export default function Pokemon({
  match: {
    params: { name },
  },
}) {
  const [pokemon, setPokemon] = useState();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetchPokemon(name, gqlQueryPokemon);
      setPokemon(response.data.pokemon);
    } catch (e) {
      console.error(e.message);
    }
  }, [name]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!pokemon?.id) {
    return null;
  }

  return (
    <Page title={`#${String(pokemon.id).padStart(3, "0")} ${name}`}>
      <ClayLayout.Row>
        <ClayLayout.Col size={12}>
          <center>
            <div className="mt-4">
              <PokemonTypes types={pokemon?.types}></PokemonTypes>
            </div>
            <img
              alt={`Pokemon: ${name}`}
              width={300}
              height={300}
              src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon?.id}.png`}
            />
          </center>
        </ClayLayout.Col>
        <ClayLayout.Col>
          <PokemonInfo />
        </ClayLayout.Col>
      </ClayLayout.Row>
    </Page>
  );
}
