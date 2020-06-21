import React from "react";
import styled from "styled-components";
import { BreakPoint, Colors, Gutters, Type } from "../styles";

type Props = {
  label?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  label,
  type,
  placeholder,
  defaultValue,
  onChange,
}: Props): JSX.Element => (
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

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: ${Type.BODY};
  margin-bottom: ${Gutters.MEDIUM};

  ${BreakPoint.TABLET} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const StyledInput = styled.input`
  background-color: ${Colors.INPUT};
  border-radius: 0;
  border: none;
  font-size: ${Type.BODY};
  margin: ${Gutters.SMALL} 0 ${Gutters.MEDIUM};
  padding: ${Gutters.SMALL} ${Gutters.MEDIUM};

  ${BreakPoint.TABLET} {
    margin: 0 0 0 ${Gutters.MEDIUM};
  }
`;
