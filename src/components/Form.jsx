import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { Column } from "./Container";
import { Gutters, BreakPoint } from "../styles";

const StyledForm = styled.form`
  display: flex;
  margin-bottom: ${Gutters.LARGE};
  margin-top: ${props => props.marginTop || "0px"};

  ${BreakPoint.TABLET} {
    width: 480px;
  }
`;

const StyledColumn = styled(Column)`
  padding: ${Gutters.MEDIUM};
`;

const Form = ({ submitText, children, onSubmit, isDisabled, marginTop }) => (
  <StyledForm marginTop={marginTop} onSubmit={onSubmit}>
    <StyledColumn flex={1} align="unset" justify="unset">
      {children}
      <Button isDisabled={isDisabled} text={submitText} type="submit" />
    </StyledColumn>
  </StyledForm>
);

export default Form;
