import styled from "styled-components";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align || "center"};
  justify-content: ${props => props.justify || "center"};
`;

export default Column;
