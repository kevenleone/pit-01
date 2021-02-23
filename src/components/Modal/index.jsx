import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalComponent = ({
  show, toggle, title, children, onSubmit,
}) => (
  <Modal show={show} onHide={toggle}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={toggle}>
        Close
      </Button>
      <Button variant="primary" onClick={onSubmit}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ModalComponent;
