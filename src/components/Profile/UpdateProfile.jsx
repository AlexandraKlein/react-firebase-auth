import React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { AuthContext } from "../../Auth";
import Form from "../Form";
import Input from "../Input";
import Error from "../Error";
import { Gutters } from "../../styles";

const UpdateProfile = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [profile, setProfile] = React.useState({});
  const [userInfo, setUserInfo] = React.useState(undefined);
  const [error, setError] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const writeUserData = user => {
    setIsUpdating(true);
    firebase
      .database()
      .ref("users/" + user.uid)
      .set(user)
      .then(() => setIsUpdating(false))
      .catch(error => {
        setError(error.message);
      });
  };

  const updateUserInfo = event => {
    event.preventDefault();

    try {
      const user = {
        uid: currentUser.uid,
        email: currentUser.email,
        ...userInfo,
        ...profile,
      };

      writeUserData(user);
    } catch (error) {
      setError(error.message);
    }
  };

  const onChangeUserInfo = (key, e) => {
    profile[key] = e.currentTarget.value.trim();
    setProfile(profile);
  };

  React.useEffect(() => {
    firebase
      .database()
      .ref("users/" + currentUser.uid)
      .once("value", snap => {
        setUserInfo(snap.val());
      });
  }, [currentUser.uid]);

  return (
    <>
      <Form
        isDisabled={isUpdating}
        submitText="Update Profile"
        onSubmit={updateUserInfo}
        marginTop={Gutters.LARGE}
      >
        <Input
          onChange={e => onChangeUserInfo("fullName", e)}
          defaultValue={userInfo && userInfo.fullName ? userInfo.fullName : ""}
          label="Full Name"
          type="name"
        />
        <Input
          onChange={e => onChangeUserInfo("address", e)}
          defaultValue={userInfo && userInfo.address ? userInfo.address : ""}
          label="Address"
          type="address"
        />
        <Input
          onChange={e => onChangeUserInfo("favoriteColor", e)}
          defaultValue={
            userInfo && userInfo.favoriteColor ? userInfo.favoriteColor : ""
          }
          label="Favorite Color"
          type="text"
        />
      </Form>

      {error && <Error text={error} />}
    </>
  );
};

export default UpdateProfile;
