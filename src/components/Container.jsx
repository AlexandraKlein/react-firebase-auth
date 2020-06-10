import styled from "styled-components";
import { BreakPoint } from "../styles";

export const Container = styled.div`
  margin: ${props => props.margin || 0};
  padding: ${props => props.padding || 0};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${props => props.align || "center"};
  justify-content: ${props => props.justify || "center"};
  flex: ${props => props.flex || "unset"};
  margin: ${props => props.margin || "0"};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align || "stretch"};
  justify-content: ${props => props.justify || "center"};
  flex: ${props => props.flex || "unset"};
  margin: ${props => props.margin || "0"};

  ${BreakPoint.TABLET} {
    align-items: ${props => props.align || "center"};
  }
`;

export default Container;
