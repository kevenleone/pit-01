import React from "react";
import { ToastContainer } from "react-toastify";

import AppContextProvider from "./AppContextProvider";
import Routes from "./routes";

import "react-toastify/dist/ReactToastify.css";
import "./styles/index.scss";

export default function App() {
  return (
    <AppContextProvider>
      <ToastContainer />
      <Routes />
    </AppContextProvider>
  );
}
