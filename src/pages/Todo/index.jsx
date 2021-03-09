import React, { useState, useEffect } from 'react';

import Page from '../../components/Page';
import TodoForm from '../../components/Todo/TodoForm';
import TodoList from '../../components/Todo/TodoList';

import axios from '../../utils/api';

export default function index() {
  const [todos, setTodos] = useState([]);

  const fetchData = async () => {
    const response = await axios.get('/todos');
    console.log(response);
    setTodos(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clearAll = async () => {
    for (const todo of todos) {
      if (todo.isDone) {
        await axios.delete(`/todos/${todo.id}`);
      }
    }
    fetchData();
  };

  return (
    <Page title="To-Do List">

      <TodoForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />

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
