import axios from 'axios';

const { REACT_APP_API_BASE_URL: apiBaseUrl } = process.env;

const myAxios = axios.create({
  baseURL: apiBaseUrl,
});

export default myAxios;
