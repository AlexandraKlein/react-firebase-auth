import React from "react";

const Input = ({ label, type, placeholder }) => (
  <label
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 15,
    }}
  >
    {label}
    <input
      style={{ marginLeft: 15 }}
      name={type}
      type={type}
      placeholder={placeholder}
    />
  </label>
);

export default Input;
