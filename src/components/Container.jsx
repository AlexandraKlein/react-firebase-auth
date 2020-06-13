import styled from "styled-components";
import { BreakPoint } from "../styles";

export const Container = styled.div`
  margin: ${props => props.margin || 0};
  padding: ${props => props.padding || 0};
`;

export const Row = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: ${props => props.align || "center"};
  justify-content: ${props => props.justify || "center"};
  flex: ${props => props.flex || "unset"};
`;

export const Column = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align || "stretch"};
  justify-content: ${props => props.justify || "center"};
  flex: ${props => props.flex || "unset"};

  ${BreakPoint.TABLET} {
    align-items: ${props => props.align || "center"};
  }
`;

export const FlexContainer = styled(Column)`
  flex-direction: ${props => props.direction || "column"};
  align-items: ${props => props.align || "center"};
  justify-content: ${props => props.justify || "center"};
  flex-wrap: ${props => props.wrap || "unwrap"};

  ${BreakPoint.TABLET} {
    flex-direction: ${props => props.directionTablet || "row"};
  }
`;

export default Container;
