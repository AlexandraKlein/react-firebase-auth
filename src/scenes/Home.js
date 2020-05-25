import React from "react";
import app from "../base";
import Button from "../components/Button";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <Button text="Sign out" onClick={() => app.auth().signOut()} />
    </>
  );
};

export default Home;
