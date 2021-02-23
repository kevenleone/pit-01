import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';

import Modal from '../Modal';

import './Todo.scss';

const TodoList = ({ setTodos, todos = [] }) => {
  const [editTodo, setEditTodo] = useState();
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState('');

  const handleChecked = (event, { id }) => {
    const { checked } = event.target;

    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isDone: checked,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const handleEdit = (todo) => {
    setEditTodo(todo);
    setText(todo?.name);
    setShowModal(!showModal);
  };

  const handleRemove = ({ id }) => {
    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);
  };

  const onEditTodo = () => {
    const newTodos = todos.map((todo) => {
      if (todo.id === editTodo.id) {
        return {
          ...todo,
          name: text,
        };
      }

      return todo;
    });

    setTodos(newTodos);
    handleEdit();
  };

  return (
    <>
      <Table bordered hover className="todos">
        <thead>
          <tr>
            <th>#</th>
            <th width="60%">Task Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index} className="todo">
              <td>
                <input
                  onChange={(event) => handleChecked(event, todo)}
                  type="checkbox"
                />
              </td>
              <td>
                <span className={todo.isDone ? 'done' : ''}>{todo.name}</span>
              </td>
              <td>
                <Button onClick={() => handleEdit(todo)}>
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
          <Form.Label>New Task Name:</Form.Label>
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
