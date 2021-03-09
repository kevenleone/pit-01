import React from 'react';
import Page from '../../components/Page';
import ListView from '../../components/ListView';

const colums = [
  {
    name: 'id',
    value: '#',
  },
  {
    name: 'name',
    value: 'Username',
  },
  {
    name: 'email',
    value: 'Email',
  },
];

export default function index() {
  return (
    <Page title="Home">
      <ListView colums={colums} endpoint="/user" />
    </Page>
  );
}
