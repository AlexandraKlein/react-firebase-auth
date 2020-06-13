import React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { AuthContext } from "../context/Auth";

const { Consumer, Provider } = React.createContext({
  profile: undefined,
  error: false,
  isDisabled: true,
  isUpdating: false,
});

export { Consumer as ProfileConsumer };

class ProfileProvider extends React.Component {
  constructor(props) {
    super(props);
    this.profile = {};
    Object.keys(this.props.choiceData).forEach(k => (this.profile[k] = ""));

    this.state = {
      profile: undefined,
      error: false,
      isDisabled: true,
      isUpdating: false,
      writeUserData: this.writeUserData,
      updateProfile: this.updateProfile,
      onChangeUserInfo: this.onChangeUserInfo,
      onSelectChoice: this.onSelectChoice,
      onSelectPreference: this.onSelectPreference,
    };
  }

  componentDidMount() {
    if (this.props.authContext.currentUser !== null) {
      this.getCurrentUser();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.authContext.currentUser !==
        this.props.authContext.currentUser &&
      this.props.authContext.currentUser !== null
    ) {
      this.getCurrentUser();
    }
  }

  getCurrentUser = () => {
    firebase
      .database()
      .ref("users/" + this.props.authContext.currentUser.uid)
      .once("value", snap => {
        console.log({ currentUser: this.props.authContext.currentUser });
        this.setState({
          profile: {
            ...this.profile,
            ...snap.val(),
          },
        });
      });
  };

  writeUserData = user => {
    this.setState({ isUpdating: true });
    firebase
      .database()
      .ref("users/" + user.uid)
      .set(user)
      .then(() => this.setState({ isUpdating: false }))
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  updateProfile = event => {
    if (event) {
      event.preventDefault();
    }

    this.setState({ isDisabled: true });

    try {
      const user = {
        ...this.state.profile,
        uid: this.props.authContext.currentUser.uid,
        email: this.props.authContext.currentUser.email,
        photoURL: this.props.authContext.currentUser.photoURL || "",
      };

      this.writeUserData(user);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  onChangeUserInfo = (key, event) => {
    this.setState({
      isDisabled: false,
      profile: {
        ...this.state.profile,
        [key]: event.currentTarget.value.trim(),
      },
    });
  };

  onSelectChoice = (key, event) => {
    this.setState({
      isDisabled: false,
      profile: {
        ...this.state.profile,
        [key]: event,
      },
    });
  };

  onSelectPreference = (key, category) => () => {
    this.setState({
      isDisabled: false,
      profile: {
        ...this.state.profile,
        [category]: this.state.profile[category] !== key ? key : "",
      },
    });
  };

  render() {
    const { pending } = this.state;

    if (pending) {
      return <>Loading...</>;
    }

    return (
      <Provider value={this.state} {...this.props}>
        {this.props.children}
      </Provider>
    );
  }
}

const DataProvidedProfileProvider = React.memo(props => (
  <AuthContext.Consumer>
    {authContext => <ProfileProvider authContext={authContext} {...props} />}
  </AuthContext.Consumer>
));

export default DataProvidedProfileProvider;
