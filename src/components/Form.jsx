import React from "react";
import styled from "styled-components";
import Button from "../components/Button";

const StyledForm = styled.form`
  display: flex;
  margin-bottom: 30px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = ({ submitText, children, onSubmit, isDisabled }) => (
  <StyledForm onSubmit={onSubmit}>
    <StyledContainer>
      {children}
      <Button isDisabled={isDisabled} text={submitText} type="submit" />
    </StyledContainer>
  </StyledForm>
);

export default Form;
