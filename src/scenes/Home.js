import React from "react";
import styled from "styled-components";
import app from "../base";
import { AuthContext } from "../Auth";
import { Column, Row } from "../components/Container";
import { Heading, Subheading } from "../components/Text";
import Button from "../components/Button";
import Profile from "../components/Profile";
import { Gutters } from "../styles";

const SignOutButton = styled(Button)`
  position: relative;
  margin-top: ${Gutters.SMALL};
  margin-right: ${Gutters.SMALL};
`;

const Home = () => {
  const { currentUser } = React.useContext(AuthContext);

  return (
    <>
      <Row justify="flex-end">
        <SignOutButton
          marginTop="0"
          secondary={true}
          text="Sign out"
          onClick={() => app.auth().signOut()}
        />
      </Row>
      <Column>
        <Heading align="center">Home</Heading>
        <Subheading align="center">
          Hello, {currentUser.displayName || "Friend"}
        </Subheading>
        <Profile />
      </Column>
    </>
  );
};

export default Home;
