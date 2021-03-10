import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Table from '../Table';
import api from '../../utils/api';

const ListView = ({ columns, endpoint, fetchCount }) => {
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get(endpoint);
      setRows(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchCount]);

  return <Table columns={columns} rows={rows} />;
};

export default ListView;
