import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@clayui/css/lib/css/atlas.css";
import { ClayIconSpriteContext } from "@clayui/icon";
import spritemap from "./icons.svg";

ReactDOM.render(
  <React.StrictMode>
    <ClayIconSpriteContext.Provider value={spritemap}>
      <App />
    </ClayIconSpriteContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
