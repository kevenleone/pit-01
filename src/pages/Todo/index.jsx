import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import Page from '../../components/Page';
import TodoForm from '../../components/Todo/TodoForm';
import TodoList from '../../components/Todo/TodoList';

import axios from '../../utils/api';

export default function index() {
  const [todos, setTodos] = useState([]);

  const fetchData = async () => {
    const response = await axios.get('/todos');
    setTodos(response.data);
  };

  const deleteAll = async () => {
    for (const todo of todos) {
      if (todo.completed) {
        await axios.delete(`/todos/${todo.id}`);
        toast.info(`Task ${todo.name} removed with success`);
      }
    }

    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Page title="Todo App">
      <TodoForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />

      <button
        type="button"
        className="btn btn-info"
        onClick={deleteAll}
      >
        Clear Todos
      </button>

      <p>{`Todo count: ${todos.length}`}</p>
    </Page>
  );
}
