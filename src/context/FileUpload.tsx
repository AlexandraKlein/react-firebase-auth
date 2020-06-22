import React from "react";
import * as firebase from "firebase/app";
import "firebase/storage";

import { AuthContext, AuthContextType } from "./Auth";

type PublicProps = {
  children: React.ReactNode;
};

type PrivateProps = {
  authContext: AuthContextType;
};

type Props = PublicProps & PrivateProps;

export type FileUploadContext = {
  file?: File;
  url?: string;
  progress: number;
  error: Error["message"];
  handleChange: (files: File[], directory?: string) => void;
  handleImageUpload: (directory?: string) => void;
  clearUrl: () => void;
};

const { Consumer, Provider } = React.createContext(null);

export { Consumer as FileUploadConsumer };

class FileUpload extends React.PureComponent<Props, FileUploadContext> {
  componentDidUpdate(prevProps: Props, prevState: FileUploadContext) {
    if (
      prevProps.authContext.currentUser !==
        this.props.authContext.currentUser &&
      this.props.authContext.currentUser === null
    ) {
      this.setState({ url: undefined });
    }
  }

  handleChange = (files: File[], directory?: string) => {
    if (files[0]) {
      this.setState({ file: files[0] }, () =>
        this.handleImageUpload(directory)
      );
    }
  };

  handleImageUpload = (directory?: string) => {
    if (this.state.file === undefined) {
      return;
    }

    const { file } = this.state;
    const { currentUser } = this.props.authContext;

    const uploadTask = firebase
      .storage()
      .ref(
        `images/${currentUser.uid}/${directory ? directory + "/" : ""}${
          file.name
        }`
      )
      .put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      (error) => this.setState({ error: error.message }),
      () => {
        firebase
          .storage()
          .ref(`images/${currentUser.uid}/${directory ? directory + "/" : ""}`)
          .child(file.name)
          .getDownloadURL()
          .then((url) => this.setState({ url }))
          .finally(() => {
            this.setState({ file: undefined, progress: 0 });
          });
      }
    );
  };

  clearUrl = () => this.setState({ url: undefined });

  state = {
    file: undefined,
    url: undefined,
    progress: 0,
    error: undefined,
    handleImageUpload: this.handleImageUpload,
    handleChange: this.handleChange,
    clearUrl: this.clearUrl,
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

const DataProvidedFileUpload = React.memo((props: PublicProps) => (
  <AuthContext.Consumer>
    {(authContext) => <FileUpload authContext={authContext} {...props} />}
  </AuthContext.Consumer>
));

export default DataProvidedFileUpload;
