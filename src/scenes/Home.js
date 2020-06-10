import React from "react";
import * as firebase from "firebase/app";
import { AuthContext } from "../Auth";
import User from "../components/User";
import { Column } from "../components/Container";
import { Gutters } from "../styles";
import { Caption, Heading, Subheading } from "../components/Text";
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
    const { allUserInfo } = this.state;

    return (
      <>
        <Column>
          <Heading align="center">Home</Heading>
          <Subheading align="center">
            Below are your fellow teammates.
          </Subheading>
          <Caption align="center">
            Please be sure to fill out your profile
          </Caption>
        </Column>
        <Column margin={`${Gutters.X_LARGE} 0 0 0`}>
          {allUserInfo !== null &&
            Object.values(allUserInfo).map((info, index) => (
              <User key={index} userInfo={info} />
            ))}
        </Column>
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
