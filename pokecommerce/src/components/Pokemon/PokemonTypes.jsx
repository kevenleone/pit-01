import React from "react";

const typesColors = {
  grass: "#62b957",
  poison: "#a552cc",
  fire: "#fd7d24",
  water: "#4a90da",
  flying: "#748fc9",
  bug: "#8cb230",
  normal: "#9da0aa",
  other: "#333",
};

export default function PokemonTypes({ types = [] }) {
  return (
    <div className="pokemon-types">
      {types.map((name) => {
        const backgroundColor =
          typesColors[name.toLowerCase()] || typesColors.other;

        return (
          <div
            key={name}
            style={{ backgroundColor }}
            className="pokemon-types__pokemon-type"
          >
            <img
              className="mr-2"
              alt={name}
              width={16}
              height={16}
              src={`/assets/${name}.svg`}
            />

            <span>{name}</span>
          </div>
        );
      })}
    </div>
  );
}
