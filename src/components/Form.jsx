import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { Gutters } from "../styles";

const StyledForm = styled.form`
  display: flex;
  margin-bottom: ${Gutters.X_LARGE};
  margin-top: ${props => props.marginTop || "0px"};
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = ({ submitText, children, onSubmit, isDisabled, marginTop }) => (
  <StyledForm marginTop={marginTop} onSubmit={onSubmit}>
    <StyledContainer>
      {children}
      <Button isDisabled={isDisabled} text={submitText} type="submit" />
    </StyledContainer>
  </StyledForm>
);

export default Form;
