import React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import styled from "styled-components";
import { BsTrash } from "react-icons/bs";
import { placeholderProfileUrl } from "../../helpers";
import { CommentType } from "../../context/Posts";
import ProfileImage from "../ProfileImage";
import Error from "../Error";
import { Paragraph, SmallParagraph, Caption, Heading } from "../Text";
import Like from "../Like";
import { BreakPoint, Colors, Gutters, fadeUp } from "../../styles";
import { PostsContext, PostType, PostData } from "../../context/Posts";
import Container, { Row, Column } from "../Container";
import CommentForm from "./CommentForm";

type Props = {
  currentUser: firebase.User;
  date: string;
  displayName: string;
  fetchPosts: PostsContext["fetchPosts"];
  handleOpenModal: () => void;
  photoURL: string;
  posts: PostData[];
  post: PostType;
  postID: string;
  setPostId: (postID: string) => void;
  commenterDisplayName: string;
  commenterPhotoURL: string;
};

type State = {
  isLiked: boolean;
  error: Error["message"];
  comment: CommentType;
  commentSuccess: boolean;
};

class Post extends React.PureComponent<Props, State> {
  state = {
    isLiked: false,
    error: undefined,
    comment: undefined,
    commentSuccess: false,
  };

  componentDidMount() {
    const { posts, postID, currentUser } = this.props;

    const likedPost = posts.find(
      (post) => post.id === postID && post.value["likes"] !== undefined
    );

    this.setState({
      isLiked:
        likedPost !== undefined &&
        likedPost.value.likes.hasOwnProperty(currentUser.uid),
    });
  }

  writeUserLike = () => {
    const ref = firebase.database().ref(`posts/${this.props.postID}/likes`);

    if (this.state.isLiked) {
      ref
        .child(this.props.currentUser.uid)
        .set(true)
        .catch((error) => this.setState({ error: error.message }));
    } else {
      ref
        .child(this.props.currentUser.uid)
        .remove()
        .catch((error) => this.setState({ error: error.message }));
    }
  };

  onTypeComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const message = event.currentTarget.value;
    this.setState({
      comment: {
        message,
        user: this.props.commenterDisplayName,
        userPhotoURL: this.props.commenterPhotoURL,
      },
    });
  };

  writeUserComment = (event: React.FormEvent<Element>) => {
    event.preventDefault();

    firebase
      .database()
      .ref(`posts/${this.props.postID}/comments`)
      .child(Date.now().toString())
      .set(this.state.comment)
      .catch((error) => {
        this.setState({ error: error.message });
      })
      .finally(() => {
        this.setState({ comment: undefined });
        this.props.fetchPosts();
      });
  };

  handleLikeClick = () => {
    this.setState({ isLiked: !this.state.isLiked }, this.writeUserLike);
    this.props.fetchPosts();
  };

  handleClickDeletePost = (postID: string) => {
    this.props.handleOpenModal();
    this.props.setPostId(postID);
  };

  render() {
    const {
      currentUser,
      post,
      photoURL,
      displayName,
      date,
      postID,
    } = this.props;

    const { error } = this.state;

    const likes = post.likes !== undefined ? Object.keys(post.likes) : [];

    return (
      <StyledContainer>
        <InnerContainer>
          <PosterInfo>
            <Row justify="flex-start">
              <ProfileImage
                marginRightMobile={Gutters.MEDIUM}
                marginBottomMobile="0"
                marginTop="0"
                altText={displayName || "User"}
                size="40px"
                imgSrc={photoURL || placeholderProfileUrl}
              />
              <Column align="flex-start" flex="1">
                <Paragraph fontWeight="bold" marginTop="0px" marginBottom="0px">
                  {displayName || "Anonymous"}
                </Paragraph>
                <Caption>{date}</Caption>
              </Column>

              {currentUser.uid === post.uid && (
                <Delete onClick={() => this.handleClickDeletePost(postID)}>
                  <Heading
                    color={Colors.PRIMARY}
                    marginTop="0px"
                    marginBottom="0px"
                  >
                    <BsTrash />
                  </Heading>
                </Delete>
              )}
            </Row>

            {post.message && (
              <Paragraph marginTop={Gutters.LARGE} marginBottom="0px">
                {post.message}
              </Paragraph>
            )}
          </PosterInfo>

          {post.imageURL && (
            <StyledImage alt="Post Image" src={post.imageURL} />
          )}

          <LikeContainer>
            <Like
              count={likes.length}
              isLiked={this.state.isLiked}
              onClick={this.handleLikeClick}
            />
          </LikeContainer>

          {post.comments && (
            <>
              <Paragraph
                fontWeight="bold"
                marginTop={Gutters.X_LARGE}
                marginBottom={Gutters.X_SMALL}
              >
                Comments:
              </Paragraph>
              <CommentsContainer>
                {Object.entries(post.comments).map((comment) => (
                  <Comment key={comment[0]}>
                    <Row justify="flex-start">
                      <ProfileImage
                        marginTop="0"
                        marginBottomMobile="0"
                        size="30px"
                        imgSrc={
                          comment[1].userPhotoURL || placeholderProfileUrl
                        }
                      />
                      <SmallParagraph marginBottom="0px" marginTop="0px">
                        {comment[1].user}
                      </SmallParagraph>
                    </Row>
                    <Container margin={`${Gutters.MEDIUM} 0 0 0`}>
                      <Caption>{comment[1].message}</Caption>
                    </Container>
                  </Comment>
                ))}
              </CommentsContainer>
            </>
          )}

          <CommentForm
            onSubmit={this.writeUserComment}
            comment={this.state.comment}
            onType={this.onTypeComment}
          >
            <Paragraph>Comment:</Paragraph>
            <StyledTextArea
              value={this.state.comment ? this.state.comment.message : ""}
              onChange={this.onTypeComment}
            />
          </CommentForm>
        </InnerContainer>
        {error && <Error text={error} />}
      </StyledContainer>
    );
  }
}

export default Post;

const StyledContainer = styled.div`
  padding: ${Gutters.X_LARGE};
  margin: ${Gutters.SMALL} 0;
  opacity: 0;
  animation: ${fadeUp} 0.5s ease-out forwards;
  background-color: ${Colors.PRIMARY_LIGHT};
  white-space: pre-line;

  ${BreakPoint.TABLET} {
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  margin-top: ${Gutters.MEDIUM};
  margin-bottom: ${Gutters.MEDIUM};
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${BreakPoint.TABLET} {
    width: 600px;
  }
`;

const PosterInfo = styled.div`
  position: relative;
`;

const LikeContainer = styled.div`
  align-self: flex-end;
`;

const Delete = styled.div`
  cursor: pointer;
  margin-left: ${Gutters.SMALL}

  &:hover {
    h2 {
      color: ${Colors.PRIMARY_HOVER};
    }
  }
`;

const CommentsContainer = styled.div`
  margin-left: ${Gutters.LARGE};
  margin-top: ${Gutters.MEDIUM};
`;

const Comment = styled.div`
  margin-top: ${Gutters.X_LARGE};
  margin-bottom: ${Gutters.X_LARGE};
`;

const StyledTextArea = styled.textarea`
  flex: 1;
  background-color: ${Colors.WHITE};
  font-size: 16px;
  border: none;
  border-radius: 0;
  outline: 0;
  resize: none;
  padding: ${Gutters.MEDIUM};
  height: 100px;
`;
