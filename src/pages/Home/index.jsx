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
    value: 'UserName',
  },
  {
    name: 'email',
    value: 'Email',
  },
];

export default function index() {
  return (
    <Page title="Task List">
      <ListView colums={colums} endpoint="/user" />
    </Page>
  );
}
