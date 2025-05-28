import React from "react";

export function Input(props) {
  return (
    <input
      {...props}
      style={{
        padding: "0.5rem",
        marginBottom: "0.5rem",
        width: "100%",
        borderRadius: "6px",
        border: "1px solid #ccc",
      }}
    />
  );
}
