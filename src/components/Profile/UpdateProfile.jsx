import React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { AuthContext } from "../../Auth";
import { Row } from "../Container";
import Form from "../Form";
import Input from "../Input";
import Radiobox from "../Radiobox";
import Error from "../Error";
import { Caption, Paragraph } from "../Text";
import { Gutters } from "../../styles";

const inputs = [
  {
    key: "fullName",
    label: "Full Name",
    type: "name",
  },
  {
    key: "address",
    label: "Address",
    type: "address",
  },
  {
    key: "favoriteColor",
    label: "Favorite Color",
    type: "text",
  },
];
const choices = ["pizza", "bagels", "salads", "poke"];
const preferences = ["cats", "dogs"];

class UpdateProfile extends React.Component {
  state = {
    profile: { animal: [] },
    userInfo: undefined,
    error: false,
    isDisabled: true,
    isUpdating: false,
  };

  componentDidMount() {
    firebase
      .database()
      .ref("users/" + this.props.authContext.currentUser.uid)
      .once("value", snap => {
        this.setState({
          userInfo: snap.val(),
          profile: snap.val(),
        });
      });
  }

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

  updateUserInfo = event => {
    event.preventDefault();
    this.setState({ isDisabled: true });
    try {
      const user = {
        uid: this.props.authContext.currentUser.uid,
        email: this.props.authContext.currentUser.email,
        ...this.state.profile,
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

  onSelectPreference = key => () => {
    this.setState({
      isDisabled: false,
      profile: {
        ...this.state.profile,
        animal: this.state.profile.animal !== key ? key : "",
      },
    });
  };

  render() {
    const { isUpdating, isDisabled, userInfo, profile, error } = this.state;

    if (userInfo === undefined) {
      return null;
    }

    return (
      <>
        <Form
          isDisabled={isUpdating || isDisabled}
          submitText="Update Profile"
          onSubmit={this.updateUserInfo}
          marginTop={Gutters.LARGE}
        >
          {inputs.map(input => (
            <Input
              key={input.key}
              onChange={e => this.onChangeUserInfo([input.key], e)}
              defaultValue={userInfo[input.key] ? userInfo[input.key] : ""}
              label={input.label}
              type={input.type}
            />
          ))}

          <Paragraph>
            I Like: <Caption>(please check all that apply)</Caption>
          </Paragraph>

          <Row justify="space-between">
            {choices.map(choice => (
              <Radiobox
                key={choice}
                defaultValue={userInfo[choice]}
                onChange={e => this.onSelectChoice(choice, e)}
                label={`${choice.charAt(0).toUpperCase()}${choice.slice(1)}`}
              />
            ))}
          </Row>

          <Paragraph>
            I Prefer: <Caption>(please check only one)</Caption>
          </Paragraph>

          <Row justify="space-evenly">
            {preferences.map(preference => (
              <Radiobox
                key={preference}
                value={profile.animal === preference}
                onChange={this.onSelectPreference(preference)}
                label={`${preference.charAt(0).toUpperCase()}${preference.slice(
                  1
                )}`}
              />
            ))}
          </Row>
        </Form>

        {error && <Error text={error} />}
      </>
    );
  }
}

const DataProvidedUpdateProfile = React.memo(() => (
  <AuthContext.Consumer>
    {authContext => <UpdateProfile authContext={authContext} />}
  </AuthContext.Consumer>
));

export default DataProvidedUpdateProfile;
