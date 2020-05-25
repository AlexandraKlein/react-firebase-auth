import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 1em 2em;
  background-color: dodgerblue;
  color: white;
  font-size: 1em;
`;

const Button = ({ isSubmitting = false, text, onClick }) => (
  <StyledButton onClick={onClick} type={isSubmitting ? "submit" : ""}>
    {text}
  </StyledButton>
);

export default Button;
