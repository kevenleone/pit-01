import React from "react";

import { Loader } from "react-bulma-components";

export default function Loading() {
  return (
    <Loader
      style={{
        width: 300,
        height: 300,
        borderTopColor: "transparent",
        borderRightColor: "transparent",
      }}
    />
  );
}
