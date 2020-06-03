import React from "react";
import { Column } from "../Container";
import ImageUpload from "./ImageUpload";
// import UpdateName from "./UpdateName";
import UpdateProfile from "./UpdateProfile";

class Profile extends React.Component {
  render() {
    return (
      <Column align="unset">
        {/* <UpdateName /> */}
        <ImageUpload />
        <UpdateProfile />
      </Column>
    );
  }
}

export default Profile;
