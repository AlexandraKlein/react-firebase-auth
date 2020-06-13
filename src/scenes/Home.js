import React from "react";
import { UsersConsumer } from "../context/Users";
import User from "../components/User";
import { Column, FlexContainer } from "../components/Container";
import { Gutters } from "../styles";
import { Caption, Heading, Subheading } from "../components/Text";
import PostForm from "../components/PostForm";

const Home = ({ usersContext }) => {
  const { users } = usersContext;
  return (
    <>
      <Column>
        <Heading align="center">Home</Heading>
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
    {usersContext => <Home usersContext={usersContext} />}
  </UsersConsumer>
));

export default DataProvidedHome;
