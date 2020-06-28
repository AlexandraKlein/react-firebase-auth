import React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { FileUploadConsumer, FileUploadContext } from "../context/FileUpload";
import styled from "styled-components";
import { FiEdit, FiArrowDown } from "react-icons/fi";
import { AuthContext, AuthContextType } from "../context/Auth";
import { Row, Column } from "./Container";
import { Heading } from "./Text";
import ProfileImage from "./ProfileImage";
import Form from "./Form";
import Error from "./Error";
import { BreakPoint, Colors, Gutters } from "../styles";
import FileUploadButton from "./FileUploadButton";
import { PostsConsumer, PostsContext } from "../context/Posts";

const postHeight = 600;
const postHeightMobile = 400;
const postHeightMobileWithPhotoPreview = 500;

type State = {
  message: string;
  imageURL?: string;
  error: Error;
  isOpen: boolean;
  isUpdating: boolean;
  placeholder: string;
};

type Props = {
  authContext: AuthContextType;
  fileUploadContext: FileUploadContext;
  postsContext: PostsContext;
};

class PostForm extends React.PureComponent<Props, State> {
  private textArea: React.RefObject<HTMLTextAreaElement>;

  constructor(props: Props) {
    super(props);
    this.textArea = React.createRef();

    this.state = {
      message: "",
      error: undefined,
      imageURL: "",
      isOpen: false,
      isUpdating: false,
      placeholder: `What's on your mind, ${this.props.authContext.currentUser.displayName}?`,
    };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.isOpen !== this.state.isOpen && this.state.isOpen) {
      this.textArea.current.focus();
    }

    if (
      prevProps.fileUploadContext.url !== this.props.fileUploadContext.url &&
      this.props.fileUploadContext.url !== undefined
    ) {
      this.setState({ imageURL: this.props.fileUploadContext.url });
    }
  }

  onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const message = event.currentTarget.value;
    this.setState({ message });
  };

  writePostData = (event: React.FormEvent<Element>) => {
    event.preventDefault();
    const { currentUser } = this.props.authContext;
    this.setState({ isUpdating: true });

    const post = {
      date: new Date(),
      message: this.state.message,
      imageURL: this.state.imageURL,
      uid: currentUser.uid,
      email: currentUser.email,
    };

    firebase
      .database()
      .ref("posts/" + Date.now())
      .set(post)
      .catch((error) => {
        this.setState({ error: error.message });
      })
      .finally(() => {
        this.props.postsContext.fetchPosts();
        this.setState(
          { isUpdating: false, message: "", placeholder: "Posted!" },
          () => {
            setTimeout(() => {
              this.setState({
                isOpen: false,
                placeholder: `What's on your mind, ${this.props.authContext.currentUser.displayName}?`,
              });
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }, 1000);
          }
        );
        this.props.fileUploadContext.clearUrl();
      });
  };

  onClickShowHide = () => {
    this.setState({ isOpen: !this.state.isOpen });

    if (this.state.isOpen) {
      this.setState({ message: "", imageURL: "" });
      this.props.fileUploadContext.clearUrl();
    }
  };

  render() {
    const { currentUser } = this.props.authContext;
    const { handleChange, error, url, progress } = this.props.fileUploadContext;
    const { isOpen } = this.state;

    return (
      <StyledContainer isOpen={isOpen} url={url}>
        <ShowHide align="flex-start" onClick={this.onClickShowHide}>
          <Heading marginTop="10px" marginBottom="0px" color={Colors.PRIMARY}>
            {isOpen ? <FiArrowDown /> : <FiEdit />}
          </Heading>
        </ShowHide>
        <StyledInnerContainer>
          <StyledForm
            submitText="Post"
            isDisabled={this.state.message.length === 0 && url === undefined}
            onSubmit={this.writePostData}
          >
            {error && <Error text={error} />}
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
            {url && <ImagePreview src={url} />}
            <FileUploadButton
              text={
                url === undefined && progress === 0
                  ? "Upload Image"
                  : progress > 0 && progress < 100
                  ? progress + "%"
                  : "Success!"
              }
              isDisabled={url !== undefined}
              onDropFiles={(file) => handleChange(file, "post")}
            />
          </StyledForm>
        </StyledInnerContainer>
      </StyledContainer>
    );
  }
}

const DataProvidedPostForm = React.memo(() => (
  <FileUploadConsumer>
    {(fileUploadContext) => (
      <PostsConsumer>
        {(postsContext) => (
          <AuthContext.Consumer>
            {(authContext) => (
              <PostForm
                authContext={authContext}
                fileUploadContext={fileUploadContext}
                postsContext={postsContext}
              />
            )}
          </AuthContext.Consumer>
        )}
      </PostsConsumer>
    )}
  </FileUploadConsumer>
));

export default DataProvidedPostForm;

const StyledContainer = styled.div<{ isOpen: boolean; url?: string }>`
  display: flex;
  position: fixed;
  height: ${(props) =>
    props.url === undefined
      ? postHeightMobile
      : postHeightMobileWithPhotoPreview}px;
  left: 0;
  right: 0;
  bottom:  ${(props) => (props.isOpen ? "0px" : `-${postHeightMobile + 2}px`)}
  width: 100%;
  border-top: 2px solid ${Colors.LIGHT_GRAY};
  transition: bottom 0.2s ease;

  ${BreakPoint.TABLET}  {
    height: ${postHeight}px;
    bottom:  ${(props) => (props.isOpen ? "0px" : `-${postHeight + 2}px`)}
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

const ImagePreview = styled.img`
  margin-top: ${Gutters.MEDIUM};
  width: auto;
  height: 150px;
  object-fit: contain;
`;

const ShowHide = styled(Row)<{ onClick: () => void }>`
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
