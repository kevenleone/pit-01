import React from "react";
import ClayCard from "@clayui/card";
import { ClayButtonWithIcon } from "@clayui/button";

export default function PokemonCard({ onClickFavorite, favoriteSymbol, name, image_url }) {
  return (
    <ClayCard>
      <ClayButtonWithIcon
        onClick={onClickFavorite}
        className="ml-2 mt-2"
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
          <ClayCard.Description displayType="title">
            {name.toUpperCase()}
          </ClayCard.Description>
        </ClayCard.Row>
      </ClayCard.Body>
    </ClayCard>
  );
}
