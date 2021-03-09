import React, { useState } from 'react';
import {
  Row, Form, Col, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from '../../utils/api';

export default function TodoForm({ todos, setTodos }) {
  const [todo, setTodo] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!todo.trim()) {
      return alert('Todo vazio.');
    }

    try {
      const response = await axios.post('/todos', { isDone: false, name: todo });

      setTodos([
        ...todos,
        response.data,
      ]);

      setTodo('');

      toast.info('Task Created Successfully');
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChange = ({ target: { value } }) => {
    setTodo(value);
  };

  return (
    <Form className="mb-3" onSubmit={handleSubmit}>
      <Row>
        <Col lg={9} xl={9}>
          <Form.Group>
            <Form.Control
              required
              value={todo}
              onChange={onChange}
              placeholder="Insert your daily activity"
            />
          </Form.Group>
        </Col>
        <Col>
          <Button disabled={!todo.trim()} type="submit">Add Task</Button>
        </Col>
      </Row>
    </Form>
  );
}
