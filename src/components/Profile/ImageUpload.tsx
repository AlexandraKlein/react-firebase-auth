import React from "react";
import * as firebase from "firebase/app";
import "firebase/storage";
import styled from "styled-components";
import { AuthConsumer, AuthContextType } from "../../context/Auth";
import {
  FileUploadConsumer,
  FileUploadContext,
} from "../../context/FileUpload";
import FileUploadButton from "../FileUploadButton";
import ProfileImage from "../ProfileImage";
import { Column, Row } from "../Container";
import { Paragraph } from "../Text";
import Error from "../Error";
import { BreakPoint, Colors, Gutters } from "../../styles";
import { placeholderProfileUrl } from "../../helpers";

type PrivateProps = {
  authContext: AuthContextType;
  fileUploadContext: FileUploadContext;
};

type PublicProps = {
  profile: { [key: string]: any };
  writeUserData: (data: any) => void;
};

type Props = PrivateProps & PublicProps;

class ImageUpload extends React.PureComponent<Props> {
  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.fileUploadContext.url !== this.props.fileUploadContext.url &&
      this.props.fileUploadContext.url !== undefined
    ) {
      firebase.auth().currentUser.updateProfile({
        photoURL: this.props.fileUploadContext.url,
      });
      this.props.writeUserData({
        ...this.props.profile,
        uid: this.props.authContext.currentUser.uid,
        email: this.props.authContext.currentUser.email,
        photoURL: this.props.fileUploadContext.url,
      });
    }
  }

  componentWillUnmount() {
    this.props.fileUploadContext.clearUrl();
  }

  render() {
    const { handleChange, error, url, progress } = this.props.fileUploadContext;
    const { currentUser } = this.props.authContext;

    const imgSrc = url
      ? url
      : currentUser.photoURL
      ? currentUser.photoURL
      : placeholderProfileUrl;

    return (
      <>
        <StyledRow justify="space-between" margin={`0 0 ${Gutters.MEDIUM} 0`}>
          <ProfileImage
            imgSrc={imgSrc}
            altText={currentUser.displayName || "User Profile"}
          >
            {progress !== 0 && (
              <ProgressOverlay>
                <Paragraph color={Colors.WHITE}>{progress}%</Paragraph>
              </ProgressOverlay>
            )}
          </ProfileImage>
          <Column>
            <FileUploadButton text="Upload Image" onDropFiles={handleChange} />
          </Column>
        </StyledRow>
        {error && <Error text={error} />}
      </>
    );
  }
}

const DataProvidedImageUpload = React.memo((props: PublicProps) => (
  <FileUploadConsumer>
    {(fileUploadContext) => (
      <AuthConsumer>
        {(authContext) => (
          <ImageUpload
            authContext={authContext}
            fileUploadContext={fileUploadContext}
            {...props}
          />
        )}
      </AuthConsumer>
    )}
  </FileUploadConsumer>
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
  top: 0;
  opacity: 0.75;
  width: 100%;
  height: 100%;
  background-color: ${Colors.PRIMARY};
`;
