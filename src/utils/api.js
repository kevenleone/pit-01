import axios from 'axios';

const myAxios = axios.create({
  baseURL: 'http://localhost:3004',
});

export default myAxios;
