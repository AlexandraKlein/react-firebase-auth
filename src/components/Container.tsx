import styled from "styled-components";
import { BreakPoint } from "../styles";

type Props = {
  margin?: string;
  padding?: string;
  align?: string;
  justify?: string;
  flex?: string;
  direction?: string;
  directionTablet?: string;
  wrap?: string;
};

export const Container = styled.div<Pick<Props, "margin" | "padding">>`
  margin: ${(props) => props.margin || 0};
  padding: ${(props) => props.padding || 0};
`;

export const Row = styled(Container)<Pick<Props, "align" | "justify" | "flex">>`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.justify || "center"};
  flex: ${(props) => props.flex || "unset"};
`;

// eslint-disable-next-line
export const Column = styled(Container)<
  Pick<Props, "align" | "justify" | "flex">
>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align || "stretch"};
  justify-content: ${(props) => props.justify || "center"};
  flex: ${(props) => props.flex || "unset"};

  ${BreakPoint.TABLET} {
    align-items: ${(props) => props.align || "center"};
  }
`;

// eslint-disable-next-line
export const FlexContainer = styled(Column)<
  Pick<Props, "direction" | "directionTablet" | "align" | "justify" | "wrap">
>`
  flex-direction: ${(props) => props.direction || "column"};
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.justify || "center"};
  flex-wrap: ${(props) => props.wrap || "unwrap"};

  ${BreakPoint.TABLET} {
    flex-direction: ${(props) => props.directionTablet || "row"};
  }
`;

export default Container;
