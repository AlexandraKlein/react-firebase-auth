import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 1em 2em;
  background-color: dodgerblue;
  margin-top: ${props => props.marginTop || "15px"};
  color: white;
  font-size: 1em;

  &:hover {
    background-color: #0073e2;
  }
`;

const Button = ({ onClick, marginTop, type, text }) => (
  <StyledButton onClick={onClick} marginTop={marginTop} type={type}>
    {text}
  </StyledButton>
);

export default Button;
