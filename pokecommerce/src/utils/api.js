import axios from "axios";
import { toast } from "react-toastify";

const { REACT_APP_API_BASE_URL: apiBaseURL } = process.env;

const myAxios = axios.create({
  baseURL: apiBaseURL,
});

myAxios.interceptors.request.use((request) => {
  const token = localStorage.getItem("@pokemon-token");

  if (token) {
    request.headers.Authorization = `bearer ${token}`;
  }

  return request;
});

myAxios.interceptors.response.use((response) => {
  if (response.status >= 400) {
    toast.error("Request Failed ...");
  }

  return response;
});

export default myAxios;
