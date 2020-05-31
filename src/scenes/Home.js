import React from "react";
import app from "../base";
import { AuthContext } from "../Auth";
import Container from "../components/Container";
import Button from "../components/Button";
import Profile from "../components/Profile";
import styled from "styled-components";
import { Gutters } from "../styles";

const SignOutButton = styled(Button)`
  position: absolute;
  top: ${Gutters.MEDIUM};
  right: ${Gutters.MEDIUM};
`;

const Home = () => {
  const { currentUser } = React.useContext(AuthContext);

  return (
    <Container>
      <h1>Home</h1>
      <h3>Hello, {currentUser.displayName || "Friend"}</h3>
      <Profile />
      <SignOutButton
        marginTop="0"
        secondary={true}
        text="Sign out"
        onClick={() => app.auth().signOut()}
      />
    </Container>
  );
};

export default Home;
