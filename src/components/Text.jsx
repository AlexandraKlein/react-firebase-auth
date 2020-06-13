import styled from "styled-components";
import { Colors, Type } from "../styles";

export const Caption = styled.small`
  font-family: "Roboto Mono", serif;
  font-weight: 300;
  color: ${Colors.DARK_GRAY};
  font-size: ${Type.CAPTION};
  text-align: ${props => props.align || "left"};
`;

export const Paragraph = styled.p`
  color: ${props => props.color || Colors.BLACK_TEXT};
  font-family: "Roboto Mono", serif;
  font-weight: ${props => props.fontWeight || 400};
  font-size: ${Type.BODY};
  text-align: ${props => props.align || "left"};
  margin-top: ${props => props.marginTop || "1em"};
  margin-bottom: ${props => props.marginBottom || "1em"};
`;

export const Subheading = styled.h3`
  color: ${props => props.color || Colors.BLACK_TEXT};
  font-family: "Roboto Slab", serif;
  font-size: ${Type.SUB_HEADING};
  text-align: ${props => props.align || "left"};
  margin-top: ${props => props.marginTop || "1em"};
  margin-bottom: ${props => props.marginBottom || "1em"};
`;

export const Heading = styled.h2`
  color: ${props => props.color || Colors.BLACK_TEXT};
  font-family: "Roboto Slab", serif;
  font-size: ${Type.HEADING};
  text-align: ${props => props.align || "left"};
  margin-top: ${props => props.marginTop || "1em"};
  margin-bottom: ${props => props.marginBottom || "1em"};
`;

export const Title = styled.h1`
  color: ${props => props.color || Colors.BLACK_TEXT};
  font-family: "Roboto Slab", serif;
  font-size: ${Type.TITLE};
  text-align: ${props => props.align || "left"};
  margin-top: ${props => props.marginTop || "1em"};
  margin-bottom: ${props => props.marginBottom || "1em"};
`;
