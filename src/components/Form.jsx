import React from "react";

const Form = ({ children, onSubmit }) => (
  <form onSubmit={onSubmit} style={{ display: "flex", marginBottom: 30 }}>
    <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>
  </form>
);

export default Form;
