import React from "react";

export function Card({ children }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "1rem",
        background: "#f9f9f9",
      }}
    >
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}
