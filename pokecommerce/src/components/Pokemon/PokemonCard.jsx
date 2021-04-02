import React from "react";
import ClayCard from "@clayui/card";
import { ClayButtonWithIcon } from "@clayui/button";
import { useHistory } from "react-router-dom";
import PokemonTypes from "./PokemonTypes";

export default function PokemonCard({
  onClickFavorite,
  types = [],
  favoriteSymbol,
  name,
  image_url,
}) {
  const history = useHistory();

  return (
    <ClayCard title={name} className="pokemon-card">
      <ClayButtonWithIcon
        onClick={onClickFavorite}
        className="ml-2 mt-2 favorite-pokemon"
        symbol={favoriteSymbol}
        displayType="secondary"
      />
      <center>
        <img
          draggable={false}
          width="50%"
          height="50%"
          alt={`Pokemon: ${name}`}
          src={image_url}
        />
      </center>
      <ClayCard.Body>
        <ClayCard.Row>
          <ClayCard.Description title={`Description: ${name}`} displayType="title">
            <span
              className="pokemon-card__name"
              onClick={() => history.push(`/pokemon/${name}`)}
            >
              {name.toUpperCase()}
            </span>
          </ClayCard.Description>
        </ClayCard.Row>
        <ClayCard.Row>
          <PokemonTypes types={types} />
        </ClayCard.Row>
      </ClayCard.Body>
    </ClayCard>
  );
}
