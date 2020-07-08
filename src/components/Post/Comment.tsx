import React from "react";
import { CommentType } from "../../context/Posts";
import { Container, Row } from "../Container";
import { placeholderProfileUrl } from "../../helpers";
import ProfileImage from "../ProfileImage";
import { Caption, SmallParagraph } from "../Text";
import { Gutters } from "../../styles";

type Props = {
  comment: [string, CommentType];
};

const Comment = ({ comment }: Props): JSX.Element => (
  <Container margin={`${Gutters.X_LARGE} 0`} key={comment[0]}>
    <Row justify="flex-start">
      <ProfileImage
        marginTop="0"
        marginBottomMobile="0"
        marginRight={Gutters.MEDIUM}
        marginRightMobile={Gutters.MEDIUM}
        size="30px"
        imgSrc={comment[1].userPhotoURL || placeholderProfileUrl}
      />
      <SmallParagraph marginBottom="0px" marginTop="0px">
        {comment[1].user}
      </SmallParagraph>
    </Row>
    <Container margin={`${Gutters.MEDIUM} 0 0 0`}>
      <Caption>{comment[1].message}</Caption>
    </Container>
  </Container>
);
export default Comment;
