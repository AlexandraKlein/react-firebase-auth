import React from "react";
import * as firebase from "firebase/app";
import "firebase/storage";
import styled from "styled-components";
import { AuthContext } from "../../Auth";
import FileUploadButton from "../FileUploadButton";
import { Column, Container, Row } from "../Container";
import Error from "../Error";
import { BreakPoint, Gutters, Colors } from "../../styles";

class ImageUpload extends React.PureComponent {
  state = {
    image: undefined,
    url: undefined,
    progress: undefined,
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
        <ProgressContainer>
          <Progress progress={progress} />
        </ProgressContainer>
        <StyledRow justify="space-around">
          <ImageContainer>
            <Image src={imgSrc} alt={currentUser.displayName} />
          </ImageContainer>
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

const DataProvidedImageUpload = React.memo(() => (
  <AuthContext.Consumer>
    {authContext => <ImageUpload authContext={authContext} />}
  </AuthContext.Consumer>
));

export default DataProvidedImageUpload;

const StyledRow = styled(Row)`
  flex-direction: column;

  ${BreakPoint.TABLET} {
    flex-direction: row;
  }
`;

const ImageContainer = styled(Container)`
  display: flex;
  justify-content: center;
  background-color: ${Colors.LIGHT_GRAY};
  position: relative;
  margin-right: 0;
  margin-bottom: ${Gutters.MEDIUM};
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;

  ${BreakPoint.TABLET} {
    margin-bottom: 0;
    margin-right: ${Gutters.MEDIUM};
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

const ProgressContainer = styled.div`
  position: relative;
  width: 100%;
  height: 2px;
  background-color: ${Colors.LIGHT_GRAY};
  margin-bottom: ${Gutters.MEDIUM};
`;

const Progress = styled.div`
  position: absolute;
  width: ${props => props.progress}%;
  height: 2px;
  background-color: ${Colors.PRIMARY};
`;
