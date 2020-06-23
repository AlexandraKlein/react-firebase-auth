import React from "react";
import * as firebase from "firebase/app";
import Loading from "../components/Loading";

export type UsersContextType = {
  users: { photoURL: string; nickName: string; email: string }[];
  pending: boolean;
};

const { Consumer, Provider } = React.createContext({
  users: null,
  pending: true,
});

export { Consumer as UsersConsumer };

class UsersProvider extends React.Component<{}, UsersContextType> {
  state = {
    users: null,
    pending: true,
  };

  componentDidMount() {
    firebase
      .database()
      .ref("users")
      .on(
        "value",
        snapshot => {
          this.setState({
            users: snapshot.val(),
            pending: false,
          });
        },
        (error: Error) => console.warn({ error })
      );
  }

  render() {
    if (this.state.pending) {
      return <Loading />;
    }

    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export default UsersProvider;
