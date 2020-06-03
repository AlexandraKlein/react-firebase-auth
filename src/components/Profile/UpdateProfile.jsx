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

const choices = ["pizza", "bagels", "dogs", "cats"];

class UpdateProfile extends React.Component {
  state = {
    profile: {},
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
        ...this.state.userInfo,
        ...this.state.profile,
      };

      this.writeUserData(user);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  onChangeUserInfo = (key, e) => {
    this.setState({ isDisabled: false });
    this.setState({
      profile: {
        ...this.state.profile,
        [key]: e.currentTarget.value.trim(),
      },
    });
  };

  onSelectChoice = (key, e) => {
    this.setState({ isDisabled: false });
    this.setState({
      profile: {
        ...this.state.profile,
        [key]: e,
      },
    });
  };

  render() {
    const { isUpdating, isDisabled, userInfo, error } = this.state;

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
          <Input
            onChange={e => this.onChangeUserInfo("fullName", e)}
            defaultValue={
              userInfo && userInfo.fullName ? userInfo.fullName : ""
            }
            label="Full Name"
            type="name"
          />
          <Input
            onChange={e => this.onChangeUserInfo("address", e)}
            defaultValue={userInfo && userInfo.address ? userInfo.address : ""}
            label="Address"
            type="address"
          />
          <Input
            onChange={e => this.onChangeUserInfo("favoriteColor", e)}
            defaultValue={
              userInfo && userInfo.favoriteColor ? userInfo.favoriteColor : ""
            }
            label="Favorite Color"
            type="text"
          />

          <Paragraph>
            I like: <Caption>(please check all that apply)</Caption>
          </Paragraph>

          <Row justify="space-between">
            {choices.map(choice => (
              <Radiobox
                key={choice}
                defaultValue={userInfo && userInfo[choice]}
                onChange={e => this.onSelectChoice(choice, e)}
                label={choice.toUpperCase()}
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
