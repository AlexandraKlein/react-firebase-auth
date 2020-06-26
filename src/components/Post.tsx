import React from "react";
import * as firebase from "firebase/app";
import { RiDeleteBin5Line } from "react-icons/ri";
import "firebase/database";
import styled from "styled-components";
import ProfileImage from "./ProfileImage";
import Error from "./Error";
import { Paragraph, Caption, Heading } from "./Text";
import Like from "./Like";
import { BreakPoint, Colors, Gutters, fadeUp } from "../styles";

type PostType = {
  email: string;
  imageURL?: string;
  message: string;
  uid: string;
  likes?: {
    [key: string]: boolean;
  };
};

type Props = {
  animationDelay: string;
  currentUser: firebase.User;
  date: string;
  displayName: string;
  photoURL: string;
  posts: { [key: string]: PostType };
  post: Pick<PostType, "email" | "message" | "imageURL" | "uid">;
  postID: string;
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

    this.setState({
      isLiked:
        posts[postID].likes &&
        posts[postID].likes.hasOwnProperty(currentUser.uid),
    });
  }

  writeUserLike = () => {
    const ref = firebase.database().ref(`posts/${this.props.postID}/likes`);

    if (this.state.isLiked) {
      ref
        .child(this.props.currentUser.uid)
        .set(true)
        .catch(error => this.setState({ error: error.message }));
    } else {
      ref
        .child(this.props.currentUser.uid)
        .remove()
        .catch(error => this.setState({ error: error.message }));
    }
  };

  handleLikeClick = () => {
    this.setState({ isLiked: !this.state.isLiked }, this.writeUserLike);
  };

  handleDeletePost = () => {
    firebase.database().ref(`posts/${this.props.postID}/`).remove();
  };

  render() {
    const {
      animationDelay,
      currentUser,
      post,
      photoURL,
      displayName,
      date,
      posts,
      postID,
    } = this.props;

    const { error } = this.state;

    return (
      <StyledContainer animationDelay={animationDelay}>
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
            <Delete onClick={this.handleDeletePost}>
              <Heading
                color={Colors.PRIMARY}
                marginTop="0px"
                marginBottom="0px"
              >
                <RiDeleteBin5Line />
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
              count={
                posts[postID].likes
                  ? Object.keys(posts[postID].likes).length
                  : 0
              }
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

const StyledContainer = styled.div<{ animationDelay: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: ${Gutters.X_LARGE};
  margin: ${Gutters.SMALL} 0;
  opacity: 0;
  animation: ${fadeUp} 0.5s ease-out forwards;
  animation-delay: ${props => props.animationDelay || "0s"};
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
