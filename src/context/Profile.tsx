import React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { AuthContext, AuthContextType } from "../context/Auth";
import Loading from "../components/Loading";

type PublicProps = {
  choiceData: { [key: string]: any };
};

type PrivateProps = {
  authContext: AuthContextType;
};

type Props = PrivateProps & PublicProps;

type ProfileContext = {
  profile: { [key: string]: any };
  error: Error;
  isDisabled: boolean;
  isUpdating: boolean;
  pending: boolean;
  onChangeUserInfo: (
    key: string,
    event: React.FormEvent<HTMLInputElement>
  ) => void;
  onSelectChoice: (key: string, event: any) => void;
  onSelectPreference: (key: string, event: string) => void;
  updateProfile: (event: React.FormEvent<HTMLInputElement>) => void;
  writeUserData: (user: firebase.User) => void;
};

const { Consumer, Provider } = React.createContext(null);

export { Consumer as ProfileConsumer };

class ProfileProvider extends React.Component<Props, ProfileContext> {
  profile: { [key: string]: any };

  constructor(props: Props) {
    super(props);
    this.profile = {};
    Object.keys(this.props.choiceData).forEach((k) => (this.profile[k] = ""));

    this.state = {
      error: undefined,
      isDisabled: true,
      isUpdating: false,
      pending: false,
      onChangeUserInfo: this.onChangeUserInfo,
      onSelectChoice: this.onSelectChoice,
      onSelectPreference: this.onSelectPreference,
      profile: this.profile,
      updateProfile: this.updateProfile,
      writeUserData: this.writeUserData,
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

    if (
      prevProps.authContext.currentUser !==
        this.props.authContext.currentUser &&
      this.props.authContext.currentUser === null
    ) {
      this.setState({
        profile: this.profile,
      });
    }
  }

  getCurrentUser = () => {
    firebase
      .database()
      .ref("users/" + this.props.authContext.currentUser.uid)
      .once("value", (snap) => {
        this.setState({
          profile: {
            ...this.state.profile,
            ...snap.val(),
          },
        });
      });
  };

  writeUserData = (user) => {
    this.setState({ isUpdating: true });
    firebase
      .database()
      .ref("users/" + user.uid)
      .set(user)
      .then(() => this.setState({ isUpdating: false }))
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  updateProfile = (event) => {
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
      return <Loading />;
    }

    return (
      <Provider value={this.state} {...this.props}>
        {this.props.children}
      </Provider>
    );
  }
}

const DataProvidedProfileProvider = React.memo((props: PublicProps) => (
  <AuthContext.Consumer>
    {(authContext) => <ProfileProvider authContext={authContext} {...props} />}
  </AuthContext.Consumer>
));

export default DataProvidedProfileProvider;