import React from "react";
import * as firebase from "firebase/app";

const { Consumer, Provider } = React.createContext({
  users: null,
  pending: true,
});

export { Consumer as UsersConsumer };

class UsersProvider extends React.Component {
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
        error => console.warn({ error })
      );
  }

  render() {
    const { pending, users } = this.state;

    console.log({ users });

    if (pending) {
      return <>Loading...</>;
    }

    return (
      <Provider
        value={{
          users,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default UsersProvider;
