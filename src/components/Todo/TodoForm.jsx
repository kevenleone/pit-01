import React, { useState } from 'react';
import {
  Row, Form, Col, Button,
} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../utils/api';

toast.configure();

export default function TodoForm({ todos, setTodos }) {
  const [todo, setTodo] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    for (let i = 0; i < todos.length; i += 1) {
      if (todos[i].name === todo) {
        return toast.error('This task is already in your list!', { pauseOnHover: false });
      }
    }

    try {
      const response = await axios.post('/todos', { isDone: false, name: todo });

      setTodos([
        ...todos,
        response.data,
      ]);
      setTodo('');
      return toast.success('You\'ve added a new task!');
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChange = ({ target: { value } }) => {
    setTodo(value);
  };

  return (
    <Form
      className="mb-3"
      onSubmit={handleSubmit}
    >
      <Row>
        <Col lg={9} xl={9}>
          <Form.Group>
            <Form.Control
              value={todo}
              onChange={onChange}
              placeholder="Insert your daily activity"
            />
          </Form.Group>
        </Col>
        <Col>
          <Button
            disabled={!todo.trim()}
            type="submit"
          >
            Add Todo

          </Button>

        </Col>
      </Row>
    </Form>
  );
}
