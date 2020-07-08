import React from "react";
import { CommentType } from "../../context/Posts";
import { Container, Column, Row } from "../Container";
import { formatDate, placeholderProfileUrl } from "../../helpers";
import ProfileImage from "../ProfileImage";
import { Caption, SmallParagraph } from "../Text";
import { Colors, Gutters, fadeUp } from "../../styles";
import styled from "styled-components";

type Props = {
  comment: [string, CommentType];
};

const Comment = ({ comment }: Props): JSX.Element => (
  <CommentContainer
    margin={`${Gutters.X_LARGE} 0`}
    padding={Gutters.MEDIUM}
    key={comment[0]}
  >
    <Row justify="flex-start">
      <ProfileImage
        marginTop="0"
        marginBottomMobile="0"
        marginRight={Gutters.MEDIUM}
        marginRightMobile={Gutters.MEDIUM}
        size="48px"
        imgSrc={comment[1].userPhotoURL || placeholderProfileUrl}
      />
      <Column align="flex-start">
        <SmallParagraph fontWeight="bold" marginBottom="0px" marginTop="0px">
          {comment[1].user}
        </SmallParagraph>
        <Caption>{formatDate(comment[0])}</Caption>
      </Column>
    </Row>
    <Container margin={`${Gutters.MEDIUM} 0 0 ${Gutters.DOUBLE_X}`}>
      <SmallParagraph>{comment[1].message}</SmallParagraph>
    </Container>
  </CommentContainer>
);
export default Comment;

const CommentContainer = styled(Container)`
  background-color: ${Colors.WHITE_70};
  opacity: 0;
  animation: ${fadeUp} 0.5s ease-out forwards;
`;
