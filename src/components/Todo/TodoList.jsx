import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import axios from '../../utils/api';

import Modal from '../Modal';

import './Todo.scss';

const TodoList = ({ setTodos, todos = [] }) => {
  const [editTodo, setEditTodo] = useState();
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState('');

  const handleChecked = async (event, _editTodo) => {
    const { checked: isDone } = event.target;

    const newTodos = todos.map((todo) => {
      if (todo.id === _editTodo.id) {
        return {
          ...todo,
          isDone,
        };
      }

      return todo;
    });

    try {
      await axios.put(`todos/${_editTodo.id}`, { ..._editTodo, isDone });
      setTodos(newTodos);
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleEdit = (todo) => {
    setEditTodo(todo);
    setText(todo?.name);
    setShowModal(!showModal);
  };

  const handleRemove = async ({ id }) => {
    const newTodos = todos.filter((todo) => todo.id !== id);

    try {
      await axios.delete(`/todos/${id}`);
      setTodos(newTodos);
    } catch (e) {
      console.error(e);
    }
  };

  const onEditTodo = async () => {
    const name = text;
    const newTodos = todos.map((todo) => {
      if (todo.id === editTodo.id) {
        return {
          ...todo,
          name,
        };
      }

      return todo;
    });

    try {
      await axios.put(`/todos/${editTodo.id}`, { ...editTodo, name });
      setTodos(newTodos);
      handleEdit();
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <>
      <Table bordered hover className="todos">
        <thead>
          <tr>
            <th>#</th>
            <th width="60%">Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index} className="todo">
              <td>
                <input
                  checked={todo.isDone}
                  onChange={(event) => handleChecked(event, todo)}
                  type="checkbox"
                />
              </td>
              <td>
                <span className={todo.isDone ? 'done' : ''}>{todo.name}</span>
              </td>
              <td>
                <Button
                  onClick={() => handleEdit(todo)}
                >
                  <FaPencilAlt />
                  {' Edit'}
                </Button>
                <Button
                  onClick={() => handleRemove(todo)}
                  className="ml-2"
                  variant="danger"
                >
                  <FaTrash />
                  {' Remove'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        onSubmit={onEditTodo}
        show={showModal}
        toggle={() => handleEdit()}
        title={editTodo?.name}
      >
        <Form.Group>
          <Form.Label>Todo Name</Form.Label>
          <Form.Control
            value={text}
            onChange={({ target: { value } }) => setText(value)}
          />
        </Form.Group>
      </Modal>
    </>
  );
};

export default TodoList;
