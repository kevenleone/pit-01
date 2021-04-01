import React from "react";

import { Row, Table } from "./Util";

const Status = ({
  base: { HP, Attack, Defense, SpAttack, SpDefense, Speed },
}) => (
  <Table>
    <Row title="HP">{HP}</Row>
    <Row title="Attack">{Attack}</Row>
    <Row title="Defense">{Defense}</Row>
    <Row title="SpAttack">{SpAttack}</Row>
    <Row title="SpDefense">{SpDefense}</Row>
    <Row title="Speed">{Speed}</Row>
  </Table>
);

export default Status;
