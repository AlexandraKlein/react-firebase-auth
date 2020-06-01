import React from "react";
import * as firebase from "firebase/app";
import "firebase/storage";
import styled from "styled-components";
import { AuthContext } from "../../Auth";
import Button from "../Button";
import { Row, Column } from "../Container";
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
      .ref(`images/${image.name}-${new Date().getTime() / 1000}`)
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
          })
          .finally(() => setProgress(0));
      }
    );
  };

  const imgSrc = url
    ? url
    : currentUser.photoURL
    ? currentUser.photoURL
    : "https://firebasestorage.googleapis.com/v0/b/fir-react-auth-7849e.appspot.com/o/images%2Fprofile-placeholder.jpg?alt=media&token=17ebab1a-01de-4f8c-8b64-207ebf7b6664";

  return (
    <>
      <ProgressContainer>
        <Progress progress={progress} />
      </ProgressContainer>
      <Row>
        <ImageContainer>
          <Image src={imgSrc} alt={currentUser.displayName} />
        </ImageContainer>
        <Column>
          <input type="file" onChange={handleChange} />
          <Button
            isDisabled={image === undefined}
            text="Upload Image"
            onClick={handleUpload}
          />
        </Column>
      </Row>
      {error && <Error text={error} />}
    </>
  );
};

export default ImageUpload;
