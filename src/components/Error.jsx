import React from "react";
import styled from "styled-components";
import { Colors } from "../styles";

const StyledError = styled.p`
  color: ${Colors.ERROR};
`;

const Error = ({ text }) => <StyledError>{text}</StyledError>;

export default Error;
