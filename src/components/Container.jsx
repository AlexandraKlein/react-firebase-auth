import styled from "styled-components";

const Container = styled.div`
  display: ${props => props.display || "flex"};
  flex-direction: ${props => props.direction || "column"};
  align-items: ${props => props.align || "center"};
`;

export default Container;
