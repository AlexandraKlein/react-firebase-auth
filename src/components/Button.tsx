import React from "react";
import styled from "styled-components";
import { BreakPoint, Colors, Type, Gutters } from "../styles";

type StyleProps = {
  secondary?: boolean;
  marginTop?: string;
};

type ButtonProps = {
  onClick?: () => void;
  text?: string;
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
};

type Props = StyleProps & ButtonProps;

const StyledButton = styled.button<StyleProps>`
  min-width: 180px;
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

  ${BreakPoint.TABLET} {
    min-width: 220px;
  }

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

const Button = ({ onClick, type, text, isDisabled, ...props }: Props) => (
  <StyledButton onClick={onClick} disabled={isDisabled} type={type} {...props}>
    {text}
  </StyledButton>
);

export default Button;
