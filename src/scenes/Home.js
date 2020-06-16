import React from "react";
import { UsersConsumer } from "../context/Users";
import { PostsConsumer } from "../context/Posts";
import Post from "../components/Post";
import { Column } from "../components/Container";
import { Gutters } from "../styles";
import { Heading } from "../components/Text";
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

  const formatDate = milliseconds => {
    const dateTimeFormat = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

    const [
      { value: month },
      ,
      { value: day },
      ,
      { value: year },
    ] = dateTimeFormat.formatToParts(new Date(Number(milliseconds)));

    return `${month} ${day}, ${year}`;
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
                date={formatDate(post[0])}
                key={post[0]}
                animationDelay={`${index / 5}s`}
                post={post[1]}
                displayName={getUserDisplayNameFromUID(post[1].uid)}
                photoURL={getUserPhotoFromUID(post[1].uid)}
              />
            );
          })}
      </Column>
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
