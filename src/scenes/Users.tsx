import React from "react";
import { UsersConsumer } from "../context/Users";
import User from "../components/User";
import Link from "../components/Link";
import { Column, FlexContainer } from "../components/Container";
import { Gutters } from "../styles";
import { Caption, Heading, Subheading } from "../components/Text";

const Users = ({ usersContext }): JSX.Element => {
  const { users } = usersContext;

  return (
    <>
      <Heading align="center">Users</Heading>
      <Column>
        <Subheading align="center">Below are your fellow teammates.</Subheading>
        <Caption align="center">
          Please be sure to fill out your <Link to="/profile">profile</Link>.
        </Caption>
      </Column>
      <FlexContainer margin={`${Gutters.X_LARGE} 0 0 0`} wrap="wrap">
        {users !== null &&
          Object.values(users).map((info, index) => (
            <User
              animationDelay={`${index / 5}s`}
              key={index}
              userInfo={info as any}
            />
          ))}
      </FlexContainer>
    </>
  );
};

const DataProvidedUsers = React.memo(() => (
  <UsersConsumer>
    {(usersContext) => <Users usersContext={usersContext} />}
  </UsersConsumer>
));

export default DataProvidedUsers;
