import React from "react";
import Container from "../Container";
import ImageUpload from "./ImageUpload";
import UpdateProfile from "./UpdateProfile";

class Profile extends React.Component {
  render() {
    return (
      <Container>
        <UpdateProfile />
        <ImageUpload />
      </Container>
    );
  }
}

export default Profile;
