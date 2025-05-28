import React from "react";

export function Button({ children, ...props }) {
  return (
    <button
      style={{
        padding: "0.5rem 1rem",
        background: "#333",
        color: "#fff",
        borderRadius: "6px",
      }}
      {...props}
    >
      {children}
    </button>
  );
}
