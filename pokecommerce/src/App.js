import React from "react";

import AppContextProvider from "./AppContextProvider";
import Routes from './routes';

export default function App() {
  return (
    <AppContextProvider>
      <Routes />
    </AppContextProvider>
  );
}
