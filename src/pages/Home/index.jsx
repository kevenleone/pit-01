import React from 'react';
import Page from '../../components/Page';
import ListView from '../../components/ListView';

const columns = [
  {
    name: 'id',
    value: '#',
  },
  {
    name: 'name',
    value: 'Name',
  },
  {
    name: 'email',
    value: 'Email',
  },
];

export default function index() {
  return (
    <Page title="User">
      <ListView columns={columns} endpoint="/user" />
    </Page>
  );
}
