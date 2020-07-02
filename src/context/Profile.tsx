import React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { AuthConsumer, AuthContextType } from "../context/Auth";
import Loading from "../components/Loading";
import { ChoiceDataType } from "../data";

type PublicProps = {
  choiceData: ChoiceDataType;
  children: React.ReactNode;
};

type PrivateProps = {
  authContext: AuthContextType;
};

type Props = PrivateProps & PublicProps;

export type ProfileContext = {
  profile: { [key: string]: any };
  error: Error["message"];
  isDisabled: boolean;
  isUpdating: boolean;
  onChangeUserInfo: (
    key: any,
    event: React.FormEvent<HTMLInputElement>
  ) => void;
  onSelectChoice: (key: string, value: boolean) => void;
  onSelectPreference: (key: string, category: string) => void;
  updateProfile: (event: React.FormEvent) => void;
  writeUserData: (userData: { [key: string]: string }) => void;
};

const { Consumer, Provider } = React.createContext(null);

export { Consumer as ProfileConsumer };

class ProfileProvider extends React.Component<Props, ProfileContext> {
  constructor(props: Props) {
    super(props);

    this.state = {
      error: undefined,
      isDisabled: true,
      isUpdating: false,
      onChangeUserInfo: this.onChangeUserInfo,
      onSelectChoice: this.onSelectChoice,
      onSelectPreference: this.onSelectPreference,
      profile: undefined,
      updateProfile: this.updateProfile,
      writeUserData: this.writeUserData,
    };
  }

  componentDidMount() {
    if (this.props.authContext.currentUser !== null) {
      this.getCurrentUser();
    }
  }

  componentDidUpdate(prevProps: Props) {
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
      this.setState({ profile: undefined });
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

  writeUserData = (userData: { [key: string]: string }) => {
    this.setState({ isUpdating: true });
    firebase
      .database()
      .ref("users/" + userData.uid)
      .set(userData)
      .then(() => this.setState({ isUpdating: false }))
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  updateProfile = (event: React.FormEvent<Element>) => {
    if (event) {
      event.preventDefault();
    }

    this.setState({ isDisabled: true });

    try {
      const userData = {
        ...this.state.profile,
        uid: this.props.authContext.currentUser.uid,
        email: this.props.authContext.currentUser.email,
        photoURL: this.props.authContext.currentUser.photoURL || "",
      };

      this.writeUserData(userData);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  onChangeUserInfo = (key: any, event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      isDisabled: false,
      profile: {
        ...this.state.profile,
        [key]: event.currentTarget.value.trim(),
      },
    });
  };

  onSelectChoice = (key: any, value: boolean) => {
    this.setState({
      isDisabled: false,
      profile: {
        ...this.state.profile,
        [key]: value,
      },
    });
  };

  onSelectPreference = (key: string, category: string) => () => {
    this.setState({
      isDisabled: false,
      profile: {
        ...this.state.profile,
        [category]: this.state.profile[category] !== key ? key : "",
      },
    });
  };

  render() {
    return (
      <Provider value={this.state} {...this.props}>
        {this.props.children}
      </Provider>
    );
  }
}

const DataProvidedProfileProvider = React.memo((props: PublicProps) => (
  <AuthConsumer>
    {(authContext) => <ProfileProvider authContext={authContext} {...props} />}
  </AuthConsumer>
));

export default DataProvidedProfileProvider;
