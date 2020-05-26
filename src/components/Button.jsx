import styled from "styled-components";

const Button = styled.button`
  border: none;
  cursor: pointer;
  padding: 1em 2em;
  background-color: dodgerblue;
  margin-top: ${props => props.marginTop || "15px"};
  color: white;
  font-size: 1em;
`;

export default Button;