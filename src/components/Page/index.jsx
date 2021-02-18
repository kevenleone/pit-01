import React from 'react';
import { Container } from 'react-bootstrap';

import Card from '../Card';

export default function Page({ children, title }) {
  return (
    <Container className="mt-4">
      <Card title={title}>
        {children}
      </Card>
    </Container>
  );
}
