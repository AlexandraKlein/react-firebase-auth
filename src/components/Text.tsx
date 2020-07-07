import styled from "styled-components";
import { Colors, Type } from "../styles";

type Props = {
  align?: string;
  fontWeight?: string;
  marginTop?: string;
  marginBottom?: string;
};

export const Caption = styled.small<Props>`
  font-family: "Roboto Mono", serif;
  font-weight: 300;
  color: ${Colors.DARK_GRAY};
  font-size: ${Type.CAPTION};
  text-align: ${(props) => props.align || "left"};
`;

export const Paragraph = styled.p<Props>`
  color: ${(props) => props.color || Colors.BLACK_TEXT};
  font-family: "Roboto Mono", serif;
  font-weight: ${(props) => props.fontWeight || 400};
  font-size: ${Type.BODY};
  text-align: ${(props) => props.align || "left"};
  margin-top: ${(props) => props.marginTop || "1em"};
  margin-bottom: ${(props) => props.marginBottom || "1em"};
`;

export const SmallParagraph = styled(Paragraph)`
  font-size: ${Type.CAPTION};
`;

export const Subheading = styled.h3<Props>`
  color: ${(props) => props.color || Colors.BLACK_TEXT};
  font-family: "Roboto Slab", serif;
  font-size: ${Type.SUB_HEADING};
  text-align: ${(props) => props.align || "left"};
  margin-top: ${(props) => props.marginTop || "1em"};
  margin-bottom: ${(props) => props.marginBottom || "1em"};
`;

export const Heading = styled.h2<Props>`
  color: ${(props) => props.color || Colors.BLACK_TEXT};
  font-family: "Roboto Slab", serif;
  font-size: ${Type.HEADING};
  text-align: ${(props) => props.align || "left"};
  margin-top: ${(props) => props.marginTop || "1em"};
  margin-bottom: ${(props) => props.marginBottom || "1em"};
`;

export const Title = styled.h1<Props>`
  color: ${(props) => props.color || Colors.BLACK_TEXT};
  font-family: "Roboto Slab", serif;
  font-size: ${Type.TITLE};
  text-align: ${(props) => props.align || "left"};
  margin-top: ${(props) => props.marginTop || "1em"};
  margin-bottom: ${(props) => props.marginBottom || "1em"};
`;
