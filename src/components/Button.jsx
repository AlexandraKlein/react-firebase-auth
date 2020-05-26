import React from "react";
import styled from "styled-components";
import { Colors, Type, Gutters } from "../styles";

const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  padding: ${Gutters.MEDIUM} ${Gutters.LARGE};
  background-color: ${props =>
    props.secondary ? Colors.WHITE : Colors.PRIMARY};
  border: ${props =>
    props.secondary
      ? `1px solid ${Colors.PRIMARY}`
      : `1px solid ${Colors.WHITE}`};
  margin-top: ${props => props.marginTop || Gutters.MEDIUM};
  color: ${props => (props.secondary ? Colors.PRIMARY : Colors.WHITE)};
  font-size: ${Type.BODY};

  &:hover {
    background-color: ${props =>
      props.secondary ? Colors.PRIMARY : Colors.PRIMARY_HOVER};
    color: ${Colors.WHITE};
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Button = ({ onClick, type, text, isDisabled, ...props }) => (
  <StyledButton onClick={onClick} disabled={isDisabled} type={type} {...props}>
    {text}
  </StyledButton>
);

export default Button;
