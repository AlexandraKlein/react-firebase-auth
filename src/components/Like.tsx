import React from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import styled from "styled-components";
import { Row } from "./Container";
import { Heading, Paragraph } from "./Text";
import { Colors, Gutters } from "../styles";

type Props = {
  count: number;
  isLiked: boolean;
  onClick: VoidFunction;
};

const Like = ({ count, isLiked, onClick }: Props): JSX.Element => (
  <Row onClick={onClick}>
    <StyledParagraph marginTop="0" marginBottom="0">
      {count}
    </StyledParagraph>
    <StyledHeading color={Colors.PRIMARY} marginTop="0" marginBottom="0">
      {isLiked ? <AiFillLike /> : <AiOutlineLike />}
    </StyledHeading>
  </Row>
);

export default Like;

const StyledHeading = styled(Heading)`
  line-height: 1;
  cursor: pointer;

  &:hover {
    color: ${Colors.PRIMARY_HOVER};
  }
`;

const StyledParagraph = styled(Paragraph)`
  margin-right: ${Gutters.X_SMALL};
`;
