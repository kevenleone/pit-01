import React, { useState } from "react";
import ClayTabs from "@clayui/tabs";
import ClayLayout from "@clayui/layout";
import { getPokemonImageUrl } from "../../utils/util";

const getPokemonEvolve = (evolve) => {
  return {
    id: evolve.species.url
      .split("https://pokeapi.co/api/v2/pokemon-species/")
      .pop()
      .replace("/", ""),
    evolution_details: evolve.evolution_details[0],
    name: evolve.species.name,
  };
};

const getEvolvesTo = (chain) => {
  const evolutionsDict = {};

  for (const firstEvolve of chain.evolves_to) {
    evolutionsDict[firstEvolve.species.name] = [
      getPokemonEvolve(chain),
      getPokemonEvolve(firstEvolve),
    ];

    for (const secondEvolve of firstEvolve.evolves_to) {
      evolutionsDict[firstEvolve.species.name].push(
        getPokemonEvolve(secondEvolve)
      );
    }
  }

  return evolutionsDict;
};

const Row = ({ title, children }) => (
  <tr>
    <th width="60%">{title}</th>
    <td>{children}</td>
  </tr>
);

const PokemonCard = ({ evolution }) => (
  <ClayLayout.Col className="pokemon-info__evolutions__evolution-card">
    <img
      alt={`Pokemon: ${evolution.name}`}
      src={getPokemonImageUrl(evolution.id)}
    />
  </ClayLayout.Col>
);

const getBooleanValue = (val) => {
  return val ? "Yes" : "No";
};

const PokemonInfo = ({ pokemon }) => {
  const [activeTabKeyValue, setActiveTabKeyValue] = useState(0);

  const {
    base: { HP, Attack, Defense, SpAttack, SpDefense, Speed },
  } = pokemon;

  const { chain } = pokemon.evolution_chain;

  const evolvesTo = getEvolvesTo(chain);

  const tabs = [
    {
      name: "Pokemon Evolutions",
      render: () => (
        <div className="pokemon-info__evolutions">
          {Object.keys(evolvesTo).map((key) => {
            return (
              <ClayLayout.Row>
                {evolvesTo[key].map((evolution) => (
                  <PokemonCard evolution={evolution} />
                ))}
              </ClayLayout.Row>
            );
          })}
        </div>
      ),
    },
    {
      name: "Pokemon About",
      render: () => (
        <table className="table">
          <tbody>
            <Row title="Habitat">{pokemon.habitat.name}</Row>
            <Row title="Is Baby">{getBooleanValue(pokemon.is_baby)}</Row>
            <Row title="Is Legendary">
              {getBooleanValue(pokemon.is_legendary)}
            </Row>
            <Row title="Is Mythical">
              {getBooleanValue(pokemon.is_mythical)}
            </Row>
            <Row title="Capture Rate">{pokemon.capture_rate}</Row>
            <Row title="Shape">{pokemon.shape.name}</Row>
          </tbody>
        </table>
      ),
    },
    {
      name: "Pokemon Status",
      render: () => (
        <table className="table">
          <tbody>
            <Row title="HP">{HP}</Row>
            <Row title="Attack">{Attack}</Row>
            <Row title="Defense">{Defense}</Row>
            <Row title="SpAttack">{SpAttack}</Row>
            <Row title="SpDefense">{SpDefense}</Row>
            <Row title="Speed">{Speed}</Row>
          </tbody>
        </table>
      ),
    },
  ];

  return (
    <div className="pokemon-info">
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
    </div>
  );
};

export default PokemonInfo;
