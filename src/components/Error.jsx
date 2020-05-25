import React from "react";
import styled from "styled-components";

const StyledError = styled.p`
  color: red;
`;

const Error = ({ text }) => <StyledError>{text}</StyledError>;

export default Error;
