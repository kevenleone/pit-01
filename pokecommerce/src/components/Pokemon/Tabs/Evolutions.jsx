import React from "react";
import ClayLayout from "@clayui/layout";
import { getPokemonImageUrl } from "../../../utils/util";

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

export default function Evolutions({ chain }) {
  const evolvesTo = getEvolvesTo(chain);

  return (
    <div className="pokemon-info__evolutions">
      {Object.keys(evolvesTo).map((key) => {
        return (
          <ClayLayout.Row key={key}>
            {evolvesTo[key].map((evolution) => (
              <ClayLayout.Col className="pokemon-info__evolutions__evolution-card">
                <img
                  alt={`Pokemon: ${evolution.name}`}
                  src={getPokemonImageUrl(evolution.id)}
                />
              </ClayLayout.Col>
            ))}
          </ClayLayout.Row>
        );
      })}
    </div>
  );
}
