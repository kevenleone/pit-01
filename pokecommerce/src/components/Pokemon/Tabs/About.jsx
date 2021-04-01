import React from "react";

import { Row, Table } from "./Util";

const getBooleanValue = (val) => {
  return val ? "Yes" : "No";
};

export default function About({ pokemon }) {
  return (
    <Table>
      <Row title="Habitat">{pokemon?.habitat?.name}</Row>
      <Row title="Is Baby">{getBooleanValue(pokemon.is_baby)}</Row>
      <Row title="Is Legendary">{getBooleanValue(pokemon.is_legendary)}</Row>
      <Row title="Is Mythical">{getBooleanValue(pokemon.is_mythical)}</Row>
      <Row title="Capture Rate">{pokemon.capture_rate}</Row>
      <Row title="Shape">{pokemon.shape.name}</Row>
    </Table>
  );
}
