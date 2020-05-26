import React from "react";
import styled from "styled-components";
import { Colors, Gutters, Type } from "../styles";

const StyledInput = styled.input`
  background-color: ${Colors.LIGHT_GRAY};
  border: none;
  font-size: ${Type.BODY};
  margin-left: ${Gutters.MEDIUM};
  padding: ${Gutters.SMALL} ${Gutters.MEDIUM};
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${Type.BODY};
  margin-bottom: ${Gutters.MEDIUM};
`;

const Input = ({ label, type, placeholder, defaultValue, onChange }) => (
  <StyledLabel>
    {label}
    <StyledInput
      onChange={onChange}
      defaultValue={defaultValue}
      name={type}
      type={type}
      placeholder={placeholder}
    />
  </StyledLabel>
);

export default Input;
