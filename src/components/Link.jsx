import { Link } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../styles";

const StyledLink = styled(Link)`
  color: ${Colors.PRIMARY};

  &:hover {
    color: ${Colors.PRIMARY_HOVER};
  }
`;

export default StyledLink;
