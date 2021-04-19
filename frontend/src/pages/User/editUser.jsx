import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../utils/api';
import Page from '../../components/Page';

export default function EditUser({ history }) {
  const { id } = useParams();

  const isNewUser = id === 'new';

  const initialState = {
    email: '',
    name: '',
  };

  const [form, setForm] = useState(initialState);

  const isFormValid = form.email && form.name;

  const fetchUser = async () => {
    const response = await axios.get(`/user/${id}`);
    setForm(response.data);
  };

  useEffect(() => {
    if (!isNewUser) {
      fetchUser();
    }
  }, []);

  const onChange = (event) => {
    const { target: { name, value } } = event;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      try {
        if (isNewUser) {
          await axios.post('/user', form);
          toast.info('Form Saved');
        } else {
          await axios.put(`/user/${id}`, form);
          toast.info('Updated');
        }
        history.push('/user');
      } catch (error) {
        toast.error('Unexpected Error');
      }
    } else {
      toast.error('Form Invalid');
    }
  };

  return (
    <Page title={isNewUser ? 'New User' : 'Edit User'}>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" type="text" required value={form.name} onChange={onChange} />
          <Form.Label>E-mail</Form.Label>
          <Form.Control name="email" type="email" required value={form.email} onChange={onChange} />
          <Button className="mt-3" disabled={!isFormValid} type="submit">Save</Button>
        </Form.Group>
      </Form>
    </Page>
  );
}
