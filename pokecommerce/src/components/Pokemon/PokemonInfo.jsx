import React, { useState } from "react";
import ClayTabs from "@clayui/tabs";

import Status from "./Tabs/Status";
import About from "./Tabs/About";
import Evolutions from "./Tabs/Evolutions";

const PokemonInfo = ({ pokemon }) => {
  const [activeTabKeyValue, setActiveTabKeyValue] = useState(0);

  const { chain } = pokemon.evolution_chain;

  const tabs = [
    {
      name: "Pokemon About",
      render: () => <About pokemon={pokemon} />,
    },
    {
      name: "Pokemon Evolutions",
      render: () => <Evolutions chain={chain} />,
    },
    {
      name: "Pokemon Status",
      render: () => <Status base={pokemon.base} />,
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
