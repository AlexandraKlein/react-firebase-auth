import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { Column } from "./Container";
import { Gutters, BreakPoint } from "../styles";

type Props = {
  submitText?: string;
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent) => void;
  isDisabled?: boolean;
  marginTop?: string;
  width?: string;
  buttonMarginTop?: string;
};

const StyledForm = styled.form<{ marginTop?: string; width?: string }>`
  display: flex;
  margin-bottom: ${Gutters.LARGE};
  margin-top: ${(props) => props.marginTop || "0px"};

  ${BreakPoint.TABLET} {
    width: ${(props) => props.width || "480px"};
  }
`;

const Form = ({
  submitText,
  children,
  onSubmit,
  isDisabled,
  buttonMarginTop,
  ...props
}: Props): JSX.Element => (
  <StyledForm onSubmit={onSubmit} {...props}>
    <Column flex="1" align="unset" justify="unset">
      {children}
      <Button
        marginTop={buttonMarginTop}
        isDisabled={isDisabled}
        text={submitText}
        type="submit"
      />
    </Column>
  </StyledForm>
);

export default Form;
