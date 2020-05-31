import React from "react";
import * as firebase from "firebase/app";
import "firebase/storage";
import styled from "styled-components";
import { AuthContext } from "../../Auth";
import Button from "../Button";
import Container from "../Container";
import Error from "../Error";
import { Gutters, Colors } from "../../styles";

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.LIGHT_GRAY};
  position: relative;
  margin-right: ${Gutters.MEDIUM};
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
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

export const ImageUpload = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [image, setImage] = React.useState(undefined);
  const [url, setUrl] = React.useState(undefined);
  const [progress, setProgress] = React.useState(undefined);
  const [error, setError] = React.useState(undefined);

  const handleChange = event => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      setImage(image);
    }
  };

  const handleUpload = () => {
    if (image === undefined) {
      return;
    }
    const uploadTask = firebase
      .storage()
      .ref(`images/${image.name}`)
      .put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        setError(error);
      },
      () => {
        firebase
          .storage()
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
            firebase.auth().currentUser.updateProfile({ photoURL: url });
          });
      }
    );
  };

  return (
    <>
      <ProgressContainer>
        <Progress progress={progress} />
      </ProgressContainer>
      <Container direction="row">
        <ImageContainer>
          <Image
            src={
              url
                ? url
                : currentUser.photoURL
                ? currentUser.photoURL
                : "https://airthinx.io/images/profile-placeholder-639a7f5511.png"
            }
            alt={currentUser.displayName}
          />
        </ImageContainer>
        <Container>
          <input type="file" onChange={handleChange} />
          <Button
            isDisabled={image === undefined}
            text="Upload Image"
            onClick={handleUpload}
          />
        </Container>
      </Container>
      {error && <Error text={error} />}
    </>
  );
};

export default ImageUpload;
