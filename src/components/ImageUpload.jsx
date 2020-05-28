import React, { Component } from "react";
import * as firebase from "firebase/app";
import "firebase/storage";
import styled from "styled-components";
import { AuthContext } from "../Auth";
import Button from "./Button";
import Container from "./Container";
import { Gutters, Colors } from "../styles";

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.LIGHT_GRAY};
  position: relative;
  margin: ${Gutters.LARGE} 0;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
`;

const Image = styled.img`
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

class ImageUpload extends Component {
  state = {
    image: undefined,
    url: "",
    progress: 0,
  };

  handleChange = event => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.setState({ image });
    }
  };

  handleUpload = () => {
    const { image } = this.state;

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
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        console.error(error);
      },
      () => {
        firebase
          .storage()
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
            firebase.auth().currentUser.updateProfile({ photoURL: url });
          });
      }
    );
  };
  render() {
    return (
      <AuthContext.Consumer>
        {authContext => (
          <Container>
            {console.log(this.state.progress)}
            <ProgressContainer>
              <Progress progress={this.state.progress} />
            </ProgressContainer>
            <Container>
              <input type="file" onChange={this.handleChange} />
              <Button
                isDisabled={this.state.image === undefined}
                text="Upload Image"
                onClick={this.handleUpload}
              />
            </Container>
            <ImageContainer>
              <Image
                src={this.state.url || authContext.currentUser.photoURL}
                alt="Uploaded Images"
                width="200"
              />
            </ImageContainer>
          </Container>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default ImageUpload;
