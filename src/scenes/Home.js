import React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { AuthContext } from "../Auth";
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

function writeUserData(user) {
  firebase
    .database()
    .ref("users/" + user.uid)
    .set(user)
    .catch(error => {
      console.log(error.message);
    });
}

async function updateUserInfo(currentUser) {
  try {
    const user = {
      phoneNumber: "4129530814",
      address: "12345 Aroad Street",
      uid: currentUser.uid,
      email: currentUser.email,
    };
    writeUserData(user);
  } catch (error) {
    console.log(error.message);
  }
}

const Home = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [userData, setUserData] = React.useState(undefined);

  React.useEffect(() => {
    firebase
      .database()
      .ref("users/" + currentUser.uid)
      .once("value", snap => {
        setUserData(snap.val());
      });
  }, [currentUser.uid]);

  console.log(userData);
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
      <Button text="Update Info" onClick={() => updateUserInfo(currentUser)} />
    </Container>
  );
};

export default Home;
