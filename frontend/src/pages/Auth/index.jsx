import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { toast } from 'react-toastify';
import Page from '../../components/Page';
import api from '../../utils/api';
import { tokenKey } from '../../utils/constants';

export default function SignIn({ history }) {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    email: '',
    name: '',
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
      if (isLogin) {
        const response = await api.post('/auth', form);
        localStorage.setItem(tokenKey, response.data.token);
        toast.info('Welcome, user');
        history.push('/home');
      } else {
        await api.post('/user', form);
        toast.info('User created with success');
        setIsLogin(true);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const title = isLogin ? 'Sign In' : 'Sign Up';

  return (
    <Page title={title}>
      <Form onSubmit={onSubmit}>

        {!isLogin && (
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" value={form.name} onChange={onChange} />
          </Form.Group>
        )}

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" value={form.email} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" value={form.password} onChange={onChange} />
        </Form.Group>

        <div className="mb-4">
          <Button
            onClick={() => setIsLogin(!isLogin)}
            variant="outline-primary"
          >
            {isLogin ? 'Create Account' : 'Login'}
          </Button>
        </div>

        <Button type="submit">{title}</Button>
      </Form>
    </Page>
  );
}
