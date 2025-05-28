import React from "react";

export function Textarea(props) {
  return (
    <textarea
      {...props}
      style={{
        padding: "0.5rem",
        marginBottom: "0.5rem",
        width: "100%",
        height: "100px",
        borderRadius: "6px",
        border: "1px solid #ccc",
      }}
    />
  );
}
