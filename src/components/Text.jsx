import styled from "styled-components";
import { Colors, Type } from "../styles";

export const Caption = styled.small`
  font-size: ${Type.CAPTION};
  color: ${Colors.DARK_GRAY};
`;

export const Paragraph = styled.p`
  font-size: ${Type.BODY};
`;

export const Subheading = styled.h3`
  font-size: ${Type.SUB_HEADING};
`;

export const Heading = styled.h2`
  font-size: ${Type.HEADING};
`;

export const Title = styled.h1`
  font-size: ${Type.TITLE};
`;
