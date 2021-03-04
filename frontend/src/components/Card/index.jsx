import React from 'react';
import { Card } from 'react-bootstrap';

export default function index({ title, children }) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  );
}
