import React from "react";
import { AuthContext } from "../context/Auth";
import { UsersConsumer } from "../context/Users";
import { PostsConsumer } from "../context/Posts";
import Post from "../components/Post";
import { Column } from "../components/Container";
import { Gutters } from "../styles";
import { Heading } from "../components/Text";
import PostForm from "../components/PostForm";

const Home = ({ authContext, usersContext, postsContext }) => {
  const { users } = usersContext;
  const { posts } = postsContext;
  const { currentUser } = authContext;

  const getUserPhotoFromUID = (uid) => {
    const user = Object.entries(users).find((user) => user[0] === uid);

    if (!user) {
      return;
    }

    return user[1].photoURL;
  };

  const getUserDisplayNameFromUID = (uid) => {
    const user = Object.entries(users).find((user) => user[0] === uid);

    if (!user) {
      return;
    }

    return user[1].nickName;
  };

  const formatDate = (milliseconds) =>
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
                  key={post[0]}
                  photoURL={getUserPhotoFromUID(post[1].uid)}
                  post={post[1]}
                  postID={post[0]}
                  posts={posts}
                />
              );
            })}
      </Column>
      <PostForm />
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
