import React, { useState } from 'react';
import {
  Row, Form, Col, Button,
} from 'react-bootstrap';

export default function TodoForm({ todos, setTodos }) {
  const [todo, setTodo] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    setTodos([
      ...todos,
      { name: todo, isDone: false, id: new Date().getTime() },
    ]);
    setTodo('');
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
