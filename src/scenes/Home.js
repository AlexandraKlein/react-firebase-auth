import React from "react";
import app from "../base";
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
  return (
    <Container>
      <h1>Home</h1>
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
