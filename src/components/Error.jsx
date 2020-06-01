import React from "react";
import styled from "styled-components";
import { Colors } from "../styles";
import { Paragraph } from "./Text";

const StyledError = styled(Paragraph)`
  color: ${Colors.ERROR};
`;

const Error = ({ text }) => <StyledError>{text}</StyledError>;

export default Error;
