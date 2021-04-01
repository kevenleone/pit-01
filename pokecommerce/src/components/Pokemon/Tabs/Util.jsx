import React from "react";

const Table = ({ children }) => (
  <table className="table">
    <tbody>{children}</tbody>
  </table>
);

const Row = ({ title, children }) => (
  <tr>
    <th width="60%">{title}</th>
    <td>{children}</td>
  </tr>
);

export { Row, Table };
