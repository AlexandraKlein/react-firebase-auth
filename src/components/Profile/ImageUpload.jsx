import React from "react";
import * as firebase from "firebase/app";
import "firebase/storage";
import styled from "styled-components";
import { AuthContext } from "../../Auth";
import FileUploadButton from "../FileUploadButton";
import { Column, Container, Row } from "../Container";
import Error from "../Error";
import { BreakPoint, Gutters, Colors } from "../../styles";

export const ImageUpload = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [image, setImage] = React.useState(undefined);
  const [url, setUrl] = React.useState(undefined);
  const [progress, setProgress] = React.useState(undefined);
  const [error, setError] = React.useState(undefined);

  const handleChange = file => {
    if (file[0]) {
      const image = file[0];
      setImage(image);
    }
  };

  React.useEffect(() => {
    if (image === undefined) {
      return;
    }

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
        setProgress(progress);
      },
      error => {
        setError(error);
      },
      () => {
        firebase
          .storage()
          .ref(`images/${currentUser.uid}`)
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
            firebase.auth().currentUser.updateProfile({ photoURL: url });
          })
          .finally(() => {
            setImage(undefined);
            setProgress(0);
          });
      }
    );
  }, [image, currentUser.uid]);

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
          <FileUploadButton text="Upload Image" onDropFiles={handleChange} />
        </Column>
      </StyledRow>
      {error && <Error text={error} />}
    </>
  );
};

export default ImageUpload;

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
