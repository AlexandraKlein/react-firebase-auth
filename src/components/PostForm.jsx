import React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import styled from "styled-components";
import { AiOutlineArrowDown, AiOutlineEdit } from "react-icons/ai";
import { AuthContext } from "../context/Auth";
import { Row, Column } from "./Container";
import { Heading } from "./Text";
import ProfileImage from "./ProfileImage";
import Form from "./Form";
import { BreakPoint, Colors, Gutters } from "../styles";

const postHeight = 600;
const postHeightMobile = 400;

class PostForm extends React.PureComponent {
  state = {
    message: "",
    error: false,
    isOpen: false,
    isUpdating: false,
    placeholder: `What's on your mind, ${this.props.authContext.currentUser.displayName}?`,
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
          this.setState(
            { isUpdating: false, message: "", placeholder: "Posted!" },
            () => {
              setTimeout(
                () =>
                  this.setState({
                    isOpen: false,
                    placeholder: `What's on your mind, ${this.props.authContext.currentUser.displayName}?`,
                  }),
                1000
              );
            }
          );
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
      <StyledContainer isOpen={isOpen}>
        <ShowHide
          align="flex-start"
          onClick={() => this.setState({ isOpen: !isOpen })}
        >
          <Heading marginTop="12px" marginBottom="0px" color={Colors.PRIMARY}>
            {isOpen ? <AiOutlineArrowDown /> : <AiOutlineEdit />}
          </Heading>
        </ShowHide>
        <StyledInnerContainer>
          <StyledForm
            submitText="Post"
            isDisabled={this.state.message.length === 0}
            onSubmit={this.writePostData}
          >
            <Row justify="space-between">
              <ProfileImage
                imgSrc={currentUser.photoURL}
                marginBottom="0px"
                marginRight="0px"
                size="74px"
              />
              <StyledTextArea
                value={this.state.message}
                onChange={this.onChange}
                placeholder={this.state.placeholder}
              ></StyledTextArea>
            </Row>
          </StyledForm>
        </StyledInnerContainer>
      </StyledContainer>
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
  height: ${postHeightMobile}px;
  bottom:  ${props => (props.isOpen ? "0px" : `-${postHeightMobile + 2}px`)}
  width: 100%;
  border-top: 2px solid ${Colors.LIGHT_GRAY};
  transition: bottom 0.2s ease;

  ${BreakPoint.TABLET}  {
    height: ${postHeight}px;
    bottom:  ${props => (props.isOpen ? "0px" : `-${postHeight + 2}px`)}
  }
`;

const StyledInnerContainer = styled(Column)`
  flex: 1;
  position: relative;
  background-color: ${Colors.WHITE};
`;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: ${Gutters.MEDIUM};

  ${BreakPoint.TABLET} {
    width: 600px;
  }
`;

const StyledTextArea = styled.textarea`
  flex: 1;
  background-color: ${Colors.INPUT};
  font-size: 16px;
  border: none;
  outline: 0;
  resize: none;
  padding: ${Gutters.MEDIUM};
  height: 100px;
  margin-left: ${Gutters.MEDIUM};
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
