import React from 'react';
import { Table } from 'react-bootstrap';

export default function index({ rows = [], columns = [] }) {
  return (
    <Table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.value}>{column.value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.name}>
                {column.render
                  ? column.render(row[column.name], row)
                  : row[column.name]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
