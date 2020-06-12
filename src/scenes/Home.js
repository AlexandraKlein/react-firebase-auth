import React from "react";
import { UsersContext } from "../context/Users";
import User from "../components/User";
import { Column, FlexContainer } from "../components/Container";
import { Gutters } from "../styles";
import { Caption, Heading, Subheading } from "../components/Text";

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
    </>
  );
};

const DataProvidedHome = React.memo(() => (
  <UsersContext.Consumer>
    {usersContext => <Home usersContext={usersContext} />}
  </UsersContext.Consumer>
));

export default DataProvidedHome;
