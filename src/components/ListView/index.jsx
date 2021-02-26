import React, { useState, useEffect } from 'react';
import Table from '../Table';
import api from '../../utils/api';

const ListView = ({ columns, endpoint }) => {
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    const response = await api.get(endpoint);
    setRows(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Table columns={columns} rows={rows} />
  );
};

export default ListView;
