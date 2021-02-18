import React from 'react';
import {
  Row, Col, Form, Button,
} from 'react-bootstrap';

export default function TodoForm() {
  return (
    <Row>
      <Col lg={9} xl={9}>
        <Form.Group>
          <Form.Control placeholder="Insert your daily activity" />
        </Form.Group>
      </Col>
      <Col>
        <Button onClick={() => alert('Add Todo')}>Add Todo</Button>
      </Col>
    </Row>
  );
}
