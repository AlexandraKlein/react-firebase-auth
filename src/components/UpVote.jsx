import React from "react";
import * as firebase from "firebase/app";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import styled from "styled-components";
import { Row } from "./Container";
import { Heading, Paragraph } from "./Text";
import { Colors, Gutters } from "../styles";

class UpVote extends React.PureComponent {
  state = {
    like: {
      liker: undefined,
      timestamp: undefined,
      post: undefined,
    },
    error: undefined,
    isUpdating: false,
  };

  writeUserLike = (like) => {
    firebase.database
      .ref("likes/")
      .set(like)
      .then(() => this.setState({ isUpdating: false }))
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  onClick = () => {
    this.props.onClick();
  };

  render() {
    const { isLiked, count } = this.props;
    return (
      <Row onClick={this.onClick}>
        <StyledParagraph marginTop="0" marginBottom="0">
          {count}
        </StyledParagraph>
        <StyledHeading color={Colors.PRIMARY} marginTop="0" marginBottom="0">
          {isLiked ? <AiFillLike /> : <AiOutlineLike />}
        </StyledHeading>
      </Row>
    );
  }
}

export default UpVote;

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
