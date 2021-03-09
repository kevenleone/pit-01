import React from 'react';
import { Table } from 'react-bootstrap';

export default function index({ rows = [], colums = [] }) {
  return (
    <Table>
      <thead>
        <tr>
          {colums.map((colum) => (
            <th key={colum.value}>{colum.value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {colums.map((colum) => (
              <td key={colum.value}>
                {colum.render ? colum.render(row[colum.name]) : row[colum.name]}
              </td>
            ))}
          </tr>
        ))}

      </tbody>
    </Table>
  );
}
