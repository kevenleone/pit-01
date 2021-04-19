import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Page from '../../components/Page';
import ListView from '../../components/ListView';
import axios from '../../utils/api';

export default function index({ history }) {
  const [fetchCount, setFetchCount] = useState(0);
  const onRemoveUser = async (id) => {
    await axios.delete(`/user/${id}`);
    setFetchCount(fetchCount + 1);
    toast.info('User removed');
  };

  const colums = [
    {
      name: 'id',
      value: '#',
    },
    {
      name: 'name',
      value: 'UserName',
    },
    {
      name: 'email',
      value: 'Email',
    },
    {
      name: '#',
      value: 'Actions',
      render: (_, { id }) => (
        <div>
          <Button onClick={() => history.push(`/user/${id}`)}><FaPencilAlt /></Button>
          <Button onClick={() => onRemoveUser(id)} className="ml-3" variant="danger"><FaTrash /></Button>
        </div>
      ),
    },
  ];
  return (
    <Page title="Task List">
      <Link className="btn btn-primary" to="/user/new">Add a New User</Link>
      <div className="mt-4">
        <ListView fetchCount={fetchCount} colums={colums} endpoint="/user" />
      </div>

    </Page>
  );
}
