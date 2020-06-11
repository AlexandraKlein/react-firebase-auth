import React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { AuthContext } from "../../Auth";
import { Container, Column, Row } from "../Container";
import ImageUpload from "./ImageUpload";
import Form from "../Form";
import Input from "../Input";
import Radiobox from "../Radiobox";
import Error from "../Error";
import { Subheading } from "../Text";
import { Gutters } from "../../styles";
import { capitalize } from "../../helpers";

const inputs = [
  {
    key: "nickName",
    label: "Display Name",
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
const choicesMultiple = ["pizza", "salads", "poke"];

const choiceData = {
  animals: ["cats", "dogs"],
  icecream: ["chocolate", "vanilla"],
  bands: ["beatles", "stones"],
  vegetable: ["peas", "carrots"],
};

let profile = {};
Object.keys(choiceData).forEach(k => (profile[k] = ""));

class Profile extends React.Component {
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
          profile: {
            ...profile,
            ...snap.val(),
          },
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
    if (event) {
      event.preventDefault();
    }
    this.setState({ isDisabled: true });
    try {
      const user = {
        ...this.state.profile,
        uid: this.props.authContext.currentUser.uid,
        email: this.props.authContext.currentUser.email,
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
      <Column align="unset">
        <ImageUpload
          writeUserData={this.writeUserData}
          profile={this.state.profile}
        />
        <Form
          isDisabled={isUpdating || isDisabled}
          submitText="Update Profile"
          onSubmit={this.updateProfile}
        >
          <Subheading>Details:</Subheading>
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

          <Container margin={`${Gutters.MEDIUM} 0`}>
            <Subheading>I Like:</Subheading>

            <Row justify="flex-start">
              {choicesMultiple.map(choice => (
                <Radiobox
                  key={choice}
                  defaultValue={profile && profile[choice]}
                  onChange={e => this.onSelectChoice(choice, e)}
                  label={capitalize(choice)}
                />
              ))}
            </Row>
          </Container>

          <Container margin={`${Gutters.MEDIUM} 0`}>
            {Object.entries(choiceData).map((data, index) => {
              return (
                <div key={`${data[0]}${index}`}>
                  <Subheading>{`${capitalize(data[0])}:`}</Subheading>
                  <Row justify="flex-start">
                    {data[1].map(d => (
                      <Radiobox
                        key={d}
                        value={profile && profile[data[0]] === d}
                        onChange={this.onSelectPreference(d, data[0])}
                        label={capitalize(d)}
                      />
                    ))}
                  </Row>
                </div>
              );
            })}
          </Container>
          {error && <Error text={error} />}
        </Form>
      </Column>
    );
  }
}

const DataProvidedProfile = React.memo(props => (
  <AuthContext.Consumer>
    {authContext => <Profile authContext={authContext} {...props} />}
  </AuthContext.Consumer>
));

export default DataProvidedProfile;
