import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 1em 2em;
  background-color: ${props => (props.secondary ? "white" : "dodgerblue")};
  border: ${props =>
    props.secondary ? "1px solid dodgerblue" : "1px solid white"};
  margin-top: ${props => props.marginTop || "15px"};
  color: ${props => (props.secondary ? "dodgerblue" : "white")};
  font-size: 1em;

  &:hover {
    background-color: ${props => (props.secondary ? "dodgerblue" : "#0073e2")};
    color: white;
  }
`;

const Button = ({ onClick, type, text, ...props }) => (
  <StyledButton onClick={onClick} type={type} {...props}>
    {text}
  </StyledButton>
);

Button.displayName = "Button.Primary";

export default Button;
