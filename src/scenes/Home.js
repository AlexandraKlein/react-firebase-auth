import React from "react";
import { UsersConsumer } from "../context/Users";
import { PostsConsumer } from "../context/Posts";
import User from "../components/User";
import Post from "../components/Post";
import { Column, FlexContainer } from "../components/Container";
import { Gutters } from "../styles";
import { Caption, Heading, Subheading } from "../components/Text";
import PostForm from "../components/PostForm";

const Home = ({ usersContext, postsContext }) => {
  const { users } = usersContext;
  const { posts } = postsContext;

  const getUserPhotoFromUID = uid => {
    const user = Object.entries(users).find(user => user[0] === uid);

    if (!user) {
      return;
    }

    return user[1].photoURL;
  };

  const getUserDisplayNameFromUID = uid => {
    const user = Object.entries(users).find(user => user[0] === uid);

    if (!user) {
      return;
    }

    return user[1].nickName;
  };

  return (
    <>
      <Heading align="center">Home</Heading>
      <Column margin={`${Gutters.X_LARGE} 0 `}>
        {Object.entries(posts)
          .slice(0)
          .reverse()
          .map((post, index) => {
            return (
              <Post
                key={post[0]}
                animationDelay={`${index / 5}s`}
                post={post[1]}
                displayName={getUserDisplayNameFromUID(post[1].uid)}
                photoURL={getUserPhotoFromUID(post[1].uid)}
              />
            );
          })}
      </Column>
      <Column>
        <Subheading align="center">Below are your fellow teammates.</Subheading>
        <Caption align="center">
          Please be sure to fill out your profile.
        </Caption>
      </Column>
      <FlexContainer margin={`${Gutters.X_LARGE} 0 0 0`} wrap="wrap">
        {users !== null &&
          Object.values(users).map((info, index) => (
            <User
              animationDelay={`${index / 5}s`}
              key={index}
              userInfo={info}
            />
          ))}
      </FlexContainer>

      <PostForm />
    </>
  );
};

const DataProvidedHome = React.memo(() => (
  <UsersConsumer>
    {usersContext => (
      <PostsConsumer>
        {postsContext => (
          <Home usersContext={usersContext} postsContext={postsContext} />
        )}
      </PostsConsumer>
    )}
  </UsersConsumer>
));

export default DataProvidedHome;
