import React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import styled from "styled-components";
import { FiEdit, FiArrowDown } from "react-icons/fi";
import { AuthContext } from "../context/Auth";
import { Row, Column } from "./Container";
import { Heading } from "./Text";
import ProfileImage from "./ProfileImage";
import Form from "./Form";
import { BreakPoint, Colors, Gutters } from "../styles";

const postHeight = 600;
const postHeightMobile = 400;

class PostForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.textArea = React.createRef();

    this.state = {
      message: "",
      error: undefined,
      isOpen: false,
      isUpdating: false,
      placeholder: `What's on your mind, ${this.props.authContext.currentUser.displayName}?`,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isOpen !== this.state.isOpen && this.state.isOpen) {
      this.textArea.current.focus();
    }
  }

  onChange = event => {
    const message = event.currentTarget.value;
    this.setState({ message });
  };

  writePostData = event => {
    event.preventDefault();

    const { currentUser } = this.props.authContext;
    this.setState({ isUpdating: true });
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
          <Heading marginTop="10px" marginBottom="0px" color={Colors.PRIMARY}>
            {isOpen ? <FiArrowDown /> : <FiEdit />}
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
                ref={this.textArea}
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
  left: 0;
  right: 0;
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
  padding: ${Gutters.MEDIUM};
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
