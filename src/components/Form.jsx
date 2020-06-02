import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { Column } from "./Container";
import { Gutters } from "../styles";

const StyledForm = styled.form`
  display: flex;
  margin-bottom: ${Gutters.X_LARGE};
  margin-top: ${props => props.marginTop || "0px"};

  @media (min-width: 768px) {
    min-width: 400px;
  }
`;

const Form = ({ submitText, children, onSubmit, isDisabled, marginTop }) => (
  <StyledForm marginTop={marginTop} onSubmit={onSubmit}>
    <Column flex={1} align="unset" justify="unset">
      {children}
      <Button isDisabled={isDisabled} text={submitText} type="submit" />
    </Column>
  </StyledForm>
);

export default Form;
