import styled from "styled-components";
import { BreakPoint } from "../styles";

export const Container = styled.div`
  display: ${props => props.display || "flex"};
  flex-direction: ${props => props.direction || "column"};
  align-items: ${props => props.align || "stretch"};
  flex: ${props => props.flex || "unset"};

  ${BreakPoint.TABLET} {
    align-items: ${props => props.align || "center"};
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${props => props.align || "center"};
  justify-content: ${props => props.justify || "center"};
  flex: ${props => props.flex || "unset"};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align || "stretch"};
  justify-content: ${props => props.justify || "center"};
  flex: ${props => props.flex || "unset"};

  ${BreakPoint.TABLET} {
    align-items: ${props => props.align || "center"};
  }
`;

export default Container;
