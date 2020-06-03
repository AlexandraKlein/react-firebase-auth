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
const choices = ["pizza", "salads", "poke"];
const animals = ["cats", "dogs"];
const icecream = ["chocolate", "vanilla"];
const bands = ["beatles", "stones"];

const capitalize = val => `${val.charAt(0).toUpperCase()}${val.slice(1)}`;

class UpdateProfile extends React.Component {
  state = {
    profile: undefined,
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
          profile: { animal: undefined, ...snap.val() },
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

  updateProfile = event => {
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
    const { isUpdating, isDisabled, profile, error } = this.state;

    if (profile === undefined) {
      return <>Loading...</>;
    }

    return (
      <>
        <Form
          isDisabled={isUpdating || isDisabled}
          submitText="Update Profile"
          onSubmit={this.updateProfile}
          marginTop={Gutters.LARGE}
        >
          {inputs.map(input => (
            <Input
              key={input.key}
              onChange={e => this.onChangeUserInfo([input.key], e)}
              defaultValue={
                profile && profile[input.key] ? profile[input.key] : ""
              }
              label={input.label}
              type={input.type}
            />
          ))}

          <Paragraph>
            I Like: <Caption>(please check all that apply)</Caption>
          </Paragraph>

          <Row justify="space-evenly">
            {choices.map(choice => (
              <Radiobox
                key={choice}
                defaultValue={profile && profile[choice]}
                onChange={e => this.onSelectChoice(choice, e)}
                label={capitalize(choice)}
              />
            ))}
          </Row>

          <Paragraph>
            I Prefer: <Caption>(please check only one from each set)</Caption>
          </Paragraph>

          <Row justify="space-evenly">
            {animals.map(val => (
              <Radiobox
                key={val}
                value={profile && profile.animal === val}
                onChange={this.onSelectPreference(val, "animal")}
                label={capitalize(val)}
              />
            ))}
          </Row>

          <Row justify="space-evenly">
            {icecream.map(val => (
              <Radiobox
                key={val}
                value={profile && profile.icecream === val}
                onChange={this.onSelectPreference(val, "icecream")}
                label={capitalize(val)}
              />
            ))}
          </Row>

          <Row justify="space-evenly">
            {bands.map(val => (
              <Radiobox
                key={val}
                value={profile && profile.bands === val}
                onChange={this.onSelectPreference(val, "bands")}
                label={capitalize(val)}
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
