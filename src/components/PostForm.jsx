import React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import styled from "styled-components";
import {
  AiOutlineArrowDown,
  AiOutlineArrowRight,
  AiOutlineEdit,
} from "react-icons/ai";
import { AuthContext } from "../context/Auth";
import { Row, Column } from "./Container";
import { Heading } from "./Text";
import ProfileImage from "./ProfileImage";
import { BreakPoint, Colors, Gutters } from "../styles";

const postHeight = 160;

class PostForm extends React.PureComponent {
  state = {
    message: "",
    error: false,
    isOpen: false,
    isUpdating: false,
  };

  onChange = event => {
    const message = event.currentTarget.value;
    this.setState({ message });
  };

  writePostData = event => {
    event.preventDefault();

    const { currentUser } = this.props.authContext;
    this.setState({ isUpdating: true });

    try {
      const post = {
        date: new Date(),
        message: this.state.message,
        uid: currentUser.uid,
        email: currentUser.email,
      };

      firebase
        .database()
        .ref("posts/" + Date.now())
        .set(post)
        .then(() => {
          this.setState({ isUpdating: false, message: "" });
        })
        .catch(error => {
          this.setState({ error: error.message });
        });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { currentUser } = this.props.authContext;
    const { isOpen } = this.state;

    return (
      <>
        <StyledContainer
          style={{ bottom: isOpen ? "0px" : `-${postHeight + 2}px` }}
        >
          <ShowHide
            align="flex-start"
            onClick={() => this.setState({ isOpen: !isOpen })}
          >
            <Heading marginTop="12px" marginBottom="0px" color={Colors.PRIMARY}>
              {isOpen ? <AiOutlineArrowDown /> : <AiOutlineEdit />}
            </Heading>
          </ShowHide>
          <StyledInnerContainer>
            <Row>
              <ProfileImage
                imgSrc={currentUser.photoURL}
                marginBottom="0px"
                marginRight="0px"
                size="74px"
              />
              <StyledTextArea
                value={this.state.message}
                onChange={this.onChange}
                placeholder={`What's on your mind, ${currentUser.displayName}?`}
              ></StyledTextArea>
              <Send
                isDisabled={this.state.message.length === 0}
                onClick={this.writePostData}
              >
                <Heading
                  marginTop="0px"
                  marginBottom="0px"
                  color={Colors.PRIMARY}
                  style={{ height: 28 }}
                >
                  <AiOutlineArrowRight />
                </Heading>
              </Send>
            </Row>
          </StyledInnerContainer>
        </StyledContainer>
        <Gutter />
      </>
    );
  }
}

const DataProvidedPostForm = React.memo(() => (
  <AuthContext.Consumer>
    {authContext => <PostForm authContext={authContext} />}
  </AuthContext.Consumer>
));

export default DataProvidedPostForm;

const StyledContainer = styled.div`
  display: flex;
  position: fixed;
  height: ${postHeight}px;
  width: 100%;
  border-top: 2px solid ${Colors.LIGHT_GRAY};
  transition: bottom 0.2s ease;
`;

const StyledInnerContainer = styled(Column)`
  flex: 1;
  position: relative;
  background-color: ${Colors.WHITE};
`;

const StyledTextArea = styled.textarea`
  background-color: ${Colors.INPUT};
  font-size: 16px;
  border: none;
  outline: 0;
  resize: none;
  padding: ${Gutters.MEDIUM};
  width: 50%;
  height: 80px;
  margin: 0 ${Gutters.MEDIUM};

  ${BreakPoint.TABLET} {
    width: 400px;
  }
`;

const Send = styled.div`
  cursor: pointer;
  pointer-events: ${props => (props.isDisabled ? "none" : "all")};
  opacity: ${props => (props.isDisabled ? ".5" : "1")};

  &:hover {
    h2 {
      color: ${Colors.PRIMARY_HOVER};
    }
  }
`;

const ShowHide = styled(Row)`
  position: absolute;
  top: -52px;
  right: 24px;
  width: 64px;
  height: 88px;
  background: white;
  border-radius: 64px;
  border: 2px solid ${Colors.LIGHT_GRAY};
  cursor: pointer;

  ${BreakPoint.TABLET} {
    right: 42px;
  }

  &:hover {
    h2 {
      color: ${Colors.PRIMARY_HOVER};
    }
  }
`;

const Gutter = styled.div`
  height: ${postHeight}px;
`;
