import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: dodgerblue;
  &:hover {
    color: #0073e2;
  }
`;

export default StyledLink;
