import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';

import { toast } from 'react-toastify';
import axios from '../../utils/api';
import Page from '../../components/Page';
import ListView from '../../components/ListView';

export default function User({ history }) {
  const [fetchCount, setFetchCount] = useState(0);

  const onRemoveUser = async (id) => {
    await axios.delete(`/user/${id}`);
    setFetchCount(fetchCount + 1);
    toast.info('User removed success');
  };

  const columns = [
    {
      name: 'id',
      value: '#',
    },
    {
      name: 'name',
      value: 'Name',
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
          <Button onClick={() => history.push(`/user/${id}`)}>
            <FaPencilAlt />
            {' Edit'}
          </Button>
          <Button
            className="ml-3"
            variant="danger"
            onClick={() => onRemoveUser(id)}
          >
            <FaTrash />
            {' Remove'}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Page title="User">
      <Link className="btn btn-primary" to="/user/new">
        New User
      </Link>
      <div className="mt-4">
        <ListView
          fetchCount={fetchCount}
          columns={columns}
          endpoint="/user"
        />
      </div>
    </Page>
  );
}
