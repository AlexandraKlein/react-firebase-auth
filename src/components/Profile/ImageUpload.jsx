import React from "react";
import * as firebase from "firebase/app";
import "firebase/storage";
import styled from "styled-components";
import { AuthContext } from "../../context/Auth";
import FileUploadButton from "../FileUploadButton";
import ProfileImage from "../ProfileImage";
import { Column, Row } from "../Container";
import { Paragraph } from "../Text";
import Error from "../Error";
import { BreakPoint, Colors, Gutters } from "../../styles";

class ImageUpload extends React.PureComponent {
  state = {
    image: undefined,
    url: undefined,
    progress: 0,
    error: undefined,
  };

  handleChange = file => {
    if (file[0]) {
      const image = file[0];
      this.setState({ image }, this.handleImageUpload);
    }
  };

  handleImageUpload = () => {
    if (this.state.image === undefined) {
      return;
    }

    const { image } = this.state;
    const { currentUser } = this.props.authContext;

    const uploadTask = firebase
      .storage()
      .ref(`images/${currentUser.uid}/${image.name}`)
      .put(image);

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        this.setState({ error });
      },
      () => {
        firebase
          .storage()
          .ref(`images/${currentUser.uid}`)
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
            firebase.auth().currentUser.updateProfile({ photoURL: url });
            this.props.writeUserData({
              ...this.props.profile,
              uid: this.props.authContext.currentUser.uid,
              email: this.props.authContext.currentUser.email,
              photoURL: url,
            });
          })
          .finally(() => {
            this.setState({
              image: undefined,
              progress: 0,
            });
          });
      }
    );
  };

  render() {
    const { url, progress, error } = this.state;
    const { currentUser } = this.props.authContext;

    const imgSrc = url
      ? url
      : currentUser.photoURL
      ? currentUser.photoURL
      : "https://www.empa.ch/documents/56066/95227/Profile-Placeholder.png/34b47554-1996-4dd1-9b0d-63fa49e463c9?t=1513121750277";

    return (
      <>
        <StyledRow justify="space-between" margin={`0 0 ${Gutters.MEDIUM} 0`}>
          <ProfileImage
            imgSrc={imgSrc}
            alt={currentUser.displayName || "User Profile"}
          >
            {progress !== 0 && (
              <ProgressOverlay>
                <Paragraph color={Colors.WHITE}>{progress}%</Paragraph>
              </ProgressOverlay>
            )}
          </ProfileImage>
          <Column>
            <FileUploadButton
              text="Upload Image"
              onDropFiles={this.handleChange}
            />
          </Column>
        </StyledRow>
        {error && <Error text={error} />}
      </>
    );
  }
}

const DataProvidedImageUpload = React.memo(props => (
  <AuthContext.Consumer>
    {authContext => <ImageUpload authContext={authContext} {...props} />}
  </AuthContext.Consumer>
));

export default DataProvidedImageUpload;

const StyledRow = styled(Row)`
  flex-direction: column;

  ${BreakPoint.TABLET} {
    flex-direction: row;
  }
`;

const ProgressOverlay = styled(Row)`
  position: absolute;
  opacity: 0.75;
  width: 100%;
  height: 100%;
  background-color: ${Colors.PRIMARY};
`;
