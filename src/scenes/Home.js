import React from "react";
import * as firebase from "firebase/app";
import { AuthContext } from "../Auth";
import User from "../components/User";
import { Column, FlexContainer } from "../components/Container";
import { Gutters } from "../styles";
import { Caption, Heading, Subheading } from "../components/Text";

class Home extends React.PureComponent {
  isUnmounted = false;

  state = {
    allUserInfo: null,
    error: undefined,
  };

  componentDidMount() {
    firebase
      .database()
      .ref("users")
      .on(
        "value",
        snapshot => {
          if (this.isUnmounted) {
            return;
          }
          this.setState({ allUserInfo: snapshot.val() });
        },
        error => this.setState({ error })
      );
  }

  componentWillUnmount() {
    this.isUnmounted = true;
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
            Please be sure to fill out your profile.
          </Caption>
        </Column>
        <FlexContainer margin={`${Gutters.X_LARGE} 0 0 0`} wrap="wrap">
          {allUserInfo !== null &&
            Object.values(allUserInfo).map((info, index) => (
              <User
                animationDelay={`${index / 5}s`}
                key={index}
                userInfo={info}
              />
            ))}
        </FlexContainer>
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
