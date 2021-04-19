import React, { useState, useEffect } from 'react';
import Table from '../Table';
import api from '../../utils/api';

const ListView = ({ colums, endpoint, fetchCount }) => {
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    const response = await api.get(endpoint);
    setRows(response.data);
  };

  useEffect(() => {
    fetchData();
  }, [fetchCount]);

  return (
    <Table colums={colums} rows={rows} />
  );
};
export default ListView;
