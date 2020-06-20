import React from "react";
import { AuthContext } from "../context/Auth";
import { Column } from "../components/Container";
import { Heading, Subheading } from "../components/Text";
import Profile from "../components/Profile";

const Home = () => {
  const { currentUser } = React.useContext(AuthContext);

  return (
    <>
      <Column>
        <Heading align="center">Profile</Heading>
        <Subheading align="center">
          Hello, {currentUser.displayName || "Friend"}
        </Subheading>
        <Profile />
      </Column>
    </>
  );
};

export default Home;
