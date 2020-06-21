import React from "react";
import styled from "styled-components";
import { Colors } from "../styles";
import { Paragraph } from "./Text";

type Props = {
  text: Error["message"];
};

const Error = ({ text }: Props) => (
  <StyledError align="center">{text}</StyledError>
);

export default Error;

const StyledError = styled(Paragraph)`
  color: ${Colors.ERROR};
`;
