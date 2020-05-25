import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  background-color: #eee;
  border: none;
  border-radius: 3px;
  font-size: 1em;
  margin-left: 15px;
  padding: 0.5em 1em;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1em;
  margin-bottom: 15px;
`;

const Input = ({ label, type, placeholder }) => (
  <StyledLabel>
    {label}
    <StyledInput name={type} type={type} placeholder={placeholder} />
  </StyledLabel>
);

export default Input;
