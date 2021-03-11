import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { toast } from 'react-toastify';
import Page from '../../components/Page';
import api from '../../utils/api';
import { tokenKey } from '../../utils/constants';

export default function SignIn() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/auth', form);
      localStorage.setItem(tokenKey, response.data.token);
      toast.info('Welcome, user');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Page title="Login">
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" value={form.email} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" value={form.password} onChange={onChange} />
        </Form.Group>
        <Button type="submit">Sign In</Button>
      </Form>
    </Page>
  );
}
