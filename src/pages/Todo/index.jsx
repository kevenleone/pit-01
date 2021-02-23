import React, { useState } from 'react';

import Page from '../../components/Page';
import TodoForm from '../../components/Todo/TodoForm';
import TodoList from '../../components/Todo/TodoList';

export default function index() {
  const [todos, setTodos] = useState([]);

  return (
    <Page title="To-Do List">

      <TodoForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />

      <button
        //disabled={undefined}
        type="button"
        className="btn btn-primary"
        onClick={() => setTodos([])}
      >
        Clear All
      </button>

      <p>{`Counter: ${todos.length}`}</p>
    </Page>
  );
}
