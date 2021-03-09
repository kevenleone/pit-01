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
    value: 'Task',
  },
  {
    name: 'isDone',
    value: 'isDone',
    render: (isDone) => <b>{isDone ? 'Completed' : 'Incompleted'}</b>,
  },
];

export default function index() {
  return (
    <Page title="Task List">
      <ListView colums={colums} endpoint="/todos" />
    </Page>
  );
}
