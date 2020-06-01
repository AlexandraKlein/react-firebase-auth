import React from "react";
import styled from "styled-components";
import app from "../base";
import { AuthContext } from "../Auth";
import { Column } from "../components/Container";
import { Heading, Subheading } from "../components/Text";
import Button from "../components/Button";
import Profile from "../components/Profile";
import { Gutters } from "../styles";

const SignOutButton = styled(Button)`
  position: absolute;
  top: ${Gutters.MEDIUM};
  right: ${Gutters.MEDIUM};
`;

const Home = () => {
  const { currentUser } = React.useContext(AuthContext);

  return (
    <Column>
      <Heading>Home</Heading>
      <Subheading>Hello, {currentUser.displayName || "Friend"}</Subheading>
      <Profile />
      <SignOutButton
        marginTop="0"
        secondary={true}
        text="Sign out"
        onClick={() => app.auth().signOut()}
      />
    </Column>
  );
};

export default Home;
