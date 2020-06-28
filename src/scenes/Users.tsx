import React from "react";
import { UsersConsumer, UsersContextType } from "../context/Users";
import User from "../components/User";
import Link from "../components/Link";
import { Column, FlexContainer } from "../components/Container";
import { Gutters } from "../styles";
import { Caption, Heading, Subheading } from "../components/Text";

const Users = ({
  usersContext,
}: {
  [key: string]: UsersContextType;
}): JSX.Element => {
  const { users } = usersContext;

  const getUsers = () => {
    return Object.values(users).sort((a, b) =>
      a.email < b.email ? -1 : a.email > b.email ? 1 : 0
    );
  };

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
          Object.values(getUsers()).map((info, index) => (
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
