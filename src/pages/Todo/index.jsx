import React from 'react';
import Page from '../../components/Page';
import TodoForm from '../../components/Todo/TodoForm';
import TodoList from '../../components/Todo/TodoList';

export default function index() {
  return (
    <Page title="Todo App">
      <TodoForm />
      <TodoList />
    </Page>
  );
}
