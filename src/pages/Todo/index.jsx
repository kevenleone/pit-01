import React, { useState } from 'react';

import Page from '../../components/Page';
import TodoForm from '../../components/Todo/TodoForm';
import TodoList from '../../components/Todo/TodoList';

export default function index() {
  const [todos, setTodos] = useState([]);

  return (
    <Page title="Todo App">

      <TodoForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />

      <button
        type="button"
        className="btn btn-info"
        onClick={() => setTodos([])}
      >
        Clear Todos
      </button>

      <p>{`Todo count: ${todos.length}`}</p>
    </Page>
  );
}
