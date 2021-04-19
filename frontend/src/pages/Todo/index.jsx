import React, { useContext } from 'react';

import Page from '../../components/Page';
import TodoForm from '../../components/Todo/TodoForm';
import TodoList from '../../components/Todo/TodoList';
import TodoContextProvider, { TodoContext } from './TodoContextProvider';

import axios from '../../utils/api';

function Todo() {
  const [todos,, fetchData] = useContext(TodoContext);

  const clearAll = async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const todo of todos) {
      if (todo.isDone) {
        await axios.delete(`/todos/${todo.id}`);
      }
    }
    fetchData();
  };

  return (
    <Page title="To-Do List">

      <TodoForm />
      <TodoList />

      <button
        type="button"
        disabled={todos.length === 0}
        className="btn btn-primary"
        onClick={clearAll}
      >
        Clear Checked
      </button>

      <p>{`Counter: ${todos.length}`}</p>
    </Page>
  );
}
export default () => (
  <TodoContextProvider>
    <Todo />
  </TodoContextProvider>
);
