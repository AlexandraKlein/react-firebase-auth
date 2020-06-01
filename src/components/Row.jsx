import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${props => props.align || "center"};
  justify-content: ${props => props.justify || "center"};
`;

export default Row;
