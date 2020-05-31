import React from "react";
import Container from "../Container";
import ImageUpload from "./ImageUpload";
import UpdateName from "./UpdateName";
import UpdateProfile from "./UpdateProfile";

class Profile extends React.Component {
  render() {
    return (
      <Container>
        <UpdateName />
        <ImageUpload />
        <UpdateProfile />
      </Container>
    );
  }
}

export default Profile;
