import React from "react";
import app from "../base";
import Button from "../components/Button";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <Button onClick={() => app.auth().signOut()}>Sign out</Button>
    </>
  );
};

export default Home;
