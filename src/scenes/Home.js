import React from "react";
import * as firebase from "firebase/app";
import { AuthContext } from "../Auth";
import { Column } from "../components/Container";
import { Heading, Subheading } from "../components/Text";
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
        <Column>
          <Heading align="center">Home</Heading>
          <Subheading align="center">
            Hello, {currentUser.displayName || "Friend"}
          </Subheading>
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
