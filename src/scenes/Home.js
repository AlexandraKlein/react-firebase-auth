import React from "react";
import styled from "styled-components";
import * as firebase from "firebase/app";
import app from "../base";
import { AuthContext } from "../Auth";
import { Column, Row } from "../components/Container";
import { Heading, Subheading } from "../components/Text";
import Button from "../components/Button";
import Link from "../components/Link";
import { Gutters } from "../styles";

const SignOutButton = styled(Button)`
  position: relative;
  margin-top: ${Gutters.SMALL};
  margin-right: ${Gutters.SMALL};
`;

class Home extends React.PureComponent {
  state = {
    allUserInfo: null,
    error: undefined,
  };

  componentDidMount() {
    const ref = firebase.database().ref().child("users");

    ref.on(
      "value",
      snapshot => this.setState({ allUserInfo: snapshot.val() }),
      error => this.setState({ error })
    );
  }

  render() {
    const { currentUser } = this.props.authContext;
    const { allUserInfo } = this.state;

    console.log({ allUserInfo });

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
          <Link to="/profile">My Profile</Link>
        </Column>
        {/* <Column>
          {allUserInfo !== null &&
            Object.values(allUserInfo).map((info, index) => (
              <Row key={info.email + index}>
                <div>
                  <img src={info.photoURL} alt={info.nickName || "User"} />
                </div>
                <p>{info.email}</p>
              </Row>
            ))}
        </Column> */}
      </>
    );
  }
}

const DataProvidedHome = React.memo(() => (
  <AuthContext.Consumer>
    {authContext => <Home authContext={authContext} />}
  </AuthContext.Consumer>
));

export default DataProvidedHome;
