import React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { AuthContext, AuthContextType } from "../context/Auth";
import { UsersConsumer, UsersContextType } from "../context/Users";
import { PostsConsumer, PostsContext } from "../context/Posts";
import Post from "../components/Post";
import Modal from "../components/Modal";
import { Column } from "../components/Container";
import { Gutters } from "../styles";
import { Heading, Paragraph } from "../components/Text";
import PostForm from "../components/PostForm";

type Props = {
  authContext: AuthContextType;
  usersContext: UsersContextType;
  postsContext: PostsContext;
};

const Home = ({
  authContext,
  usersContext,
  postsContext,
}: Props): JSX.Element => {
  const { users } = usersContext;
  const { posts } = postsContext;
  const { currentUser } = authContext;
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [postID, setPostId] = React.useState<string | null>(null);

  const getUserPhotoFromUID = (uid: string) => {
    const user = Object.entries(users).find((user) => user[0] === uid);

    if (!user) {
      return;
    }

    return user[1].photoURL;
  };

  const getUserDisplayNameFromUID = (uid: string) => {
    const user = Object.entries(users).find((user) => user[0] === uid);

    if (!user) {
      return;
    }

    return user[1].nickName;
  };

  const handCloseModalConfirm = () => {
    setIsModalVisible(false);
    firebase.database().ref(`posts/${postID}/`).remove();
  };

  const formatDate = (milliseconds: string) =>
    new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(Number(milliseconds)));

  return (
    <>
      <Heading align="center">Home</Heading>
      <Column margin={`${Gutters.X_LARGE} 0 `}>
        {posts !== null &&
          Object.entries(posts)
            .slice(0)
            .reverse()
            .map((post, index) => {
              return (
                <Post
                  animationDelay={`${index / 5}s`}
                  currentUser={currentUser}
                  date={formatDate(post[0])}
                  displayName={getUserDisplayNameFromUID(post[1].uid)}
                  handleOpenModal={() => setIsModalVisible(true)}
                  key={post[0]}
                  photoURL={getUserPhotoFromUID(post[1].uid)}
                  post={post[1]}
                  postID={post[0] as any}
                  posts={posts}
                  setPostId={setPostId}
                />
              );
            })}
      </Column>
      <PostForm />
      <Modal
        onClickConfirm={handCloseModalConfirm}
        onClickClose={() => setIsModalVisible(false)}
        isVisible={isModalVisible}
        buttonText="Confirm"
      >
        <Paragraph align="center">
          Are you sure you want to delete your post?
        </Paragraph>
      </Modal>
    </>
  );
};

const DataProvidedHome = React.memo(() => (
  <AuthContext.Consumer>
    {(authContext) => (
      <UsersConsumer>
        {(usersContext) => (
          <PostsConsumer>
            {(postsContext) => (
              <Home
                authContext={authContext}
                usersContext={usersContext}
                postsContext={postsContext}
              />
            )}
          </PostsConsumer>
        )}
      </UsersConsumer>
    )}
  </AuthContext.Consumer>
));

export default DataProvidedHome;
