import styled from "styled-components";

export const Container = styled.div`
  display: ${props => props.display || "flex"};
  flex-direction: ${props => props.direction || "column"};
  align-items: ${props => props.align || "center"};
  flex: ${props => props.flex || "unset"};
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
  align-items: ${props => props.align || "center"};
  justify-content: ${props => props.justify || "center"};
  flex: ${props => props.flex || "unset"};
`;

export default Container;
