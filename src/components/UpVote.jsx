import React from "react";
import * as firebase from "firebase/app";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import styled from "styled-components";
import { Container } from "./Container";
import { Heading } from "./Text";
import { Colors } from "../styles";

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

  writeUserLike = like => {
    firebase.database
      .ref("likes/")
      .set(like)
      .then(() => this.setState({ isUpdating: false }))
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  onClick = () => {
    this.props.onClick();
  };

  render() {
    return (
      <Container onClick={this.onClick}>
        <StyledHeading color={Colors.PRIMARY} marginTop="0" marginBottom="0">
          {this.props.isLiked ? <AiFillLike /> : <AiOutlineLike />}
        </StyledHeading>
      </Container>
    );
  }
}

export default UpVote;

const StyledHeading = styled(Heading)`
  cursor: pointer;

  &:hover {
    color: ${Colors.PRIMARY_HOVER};
  }
`;
