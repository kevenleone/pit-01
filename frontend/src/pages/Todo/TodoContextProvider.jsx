import React, { createContext, useState, useEffect } from 'react';
import axios from '../../utils/api';

export const TodoContext = createContext();

export default function TodoContextProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const fetchData = async () => {
    const response = await axios.get('/todos');
    setTodos(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TodoContext.Provider value={[todos, setTodos, fetchData]}>
      {children}
    </TodoContext.Provider>
  );
}
