import React from "react";

import AppContextProvider from "./AppContextProvider";
import Routes from './routes';

import './styles/index.scss'

export default function App() {
  return (
    <AppContextProvider>
      <Routes />
    </AppContextProvider>
  );
}
