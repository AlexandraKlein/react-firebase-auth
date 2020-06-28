import React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import styled from "styled-components";
import { BsTrash } from "react-icons/bs";
import ProfileImage from "./ProfileImage";
import Error from "./Error";
import { Paragraph, Caption, Heading } from "./Text";
import Like from "./Like";
import { BreakPoint, Colors, Gutters, fadeUp } from "../styles";
import { PostsContext, PostType, PostData } from "../context/Posts";

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
};

type State = {
  isLiked: boolean;
  error: Error;
};

class Post extends React.PureComponent<Props, State> {
  state = {
    isLiked: false,
    error: undefined,
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
        <ProfileImage
          altText={displayName || "User"}
          size="100px"
          imgSrc={
            photoURL ||
            "https://www.empa.ch/documents/56066/95227/Profile-Placeholder.png/34b47554-1996-4dd1-9b0d-63fa49e463c9?t=1513121750277"
          }
        />
        <TextContainer>
          <Caption>{date}</Caption>

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

          <Paragraph marginTop={Gutters.SMALL} marginBottom="0px">
            {post.message}
          </Paragraph>

          {post.imageURL && (
            <StyledImage alt="Post Image" src={post.imageURL} />
          )}

          <Paragraph
            fontWeight="bold"
            marginTop={Gutters.MEDIUM}
            marginBottom={Gutters.X_SMALL}
          >
            {displayName || "Anonymous"}
          </Paragraph>

          <Caption marginTop="0px">{post.email}</Caption>

          <StyledUpVote>
            <Like
              count={likes.length}
              isLiked={this.state.isLiked}
              onClick={this.handleLikeClick}
            />
          </StyledUpVote>
        </TextContainer>
        {error && <Error text={error} />}
      </StyledContainer>
    );
  }
}

export default Post;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: ${Gutters.X_LARGE};
  margin: ${Gutters.SMALL} 0;
  opacity: 0;
  animation: ${fadeUp} 0.5s ease-out forwards;
  background-color: ${Colors.PRIMARY_LIGHT};
  white-space: pre-line;

  ${BreakPoint.TABLET} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  margin-top: ${Gutters.MEDIUM};
  margin-bottom: ${Gutters.MEDIUM};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${BreakPoint.TABLET} {
    align-items: flex-start;
    width: 500px;
  }

  p {
    text-align: center;
    width: 100%;

    ${BreakPoint.TABLET} {
      text-align: left;
    }
  }
`;

const StyledUpVote = styled.div`
  position: absolute;
  right: ${Gutters.MEDIUM};
  bottom: ${Gutters.LARGE};

  ${BreakPoint.TABLET} {
    right: ${Gutters.LARGE};
  }
`;

const Delete = styled.div`
  cursor: pointer;
  position: absolute;
  right: ${Gutters.MEDIUM};
  top: ${Gutters.LARGE};

  &:hover {
    h2 {
      color: ${Colors.PRIMARY_HOVER};
    }
  }
`;
