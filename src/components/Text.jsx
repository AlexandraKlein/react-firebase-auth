import styled from "styled-components";
import { Colors, Type } from "../styles";

export const Caption = styled.small`
  color: ${Colors.DARK_GRAY};
  font-size: ${Type.CAPTION};
  text-align: ${props => props.align || "left"};
`;

export const Paragraph = styled.p`
  font-size: ${Type.BODY};
  text-align: ${props => props.align || "left"};
`;

export const Subheading = styled.h3`
  font-size: ${Type.SUB_HEADING};
  text-align: ${props => props.align || "left"};
`;

export const Heading = styled.h2`
  font-size: ${Type.HEADING};
  text-align: ${props => props.align || "left"};
`;

export const Title = styled.h1`
  font-size: ${Type.TITLE};
  text-align: ${props => props.align || "left"};
`;
