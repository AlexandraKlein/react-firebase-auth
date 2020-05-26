import React, { useContext } from "react";
import app from "../base";
import { AuthContext } from "../Auth";
import Container from "../components/Container";
import Button from "../components/Button";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  console.log({ currentUser });
  return (
    <Container>
      <h1>Home</h1>
      <p>Hello, {currentUser.email}</p>
      <Button text="Sign out" onClick={() => app.auth().signOut()} />
    </Container>
  );
};

export default Home;
