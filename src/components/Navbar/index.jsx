import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Pitang 1</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/todo">Todo</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
