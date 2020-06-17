import React from "react";
import * as firebase from "firebase/app";
import { FiThumbsUp } from "react-icons/fi";
import styled from "styled-components";
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

  render() {
    return (
      <StyledHeading color={Colors.PRIMARY} marginTop="0" marginBottom="0">
        <FiThumbsUp />
      </StyledHeading>
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
