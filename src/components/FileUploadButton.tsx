import React from "react";
import Button from "./Button";

type Props = {
  text: string;
  onDropFiles: (files: File[]) => void;
  isDisabled?: boolean;
};

class FileUploadButton extends React.PureComponent<Props> {
  input: HTMLInputElement | null;

  onClick = (event: MouseEvent) => {
    event.preventDefault();
    if (!this.input) {
      return;
    }

    this.input.click();
  };

  onChangeInput = (event: React.ChangeEvent) => {
    event.preventDefault();
    if (!this.input) {
      return;
    }

    if (this.input.files === null) {
      return;
    }

    const files: File[] = [];
    for (let i = 0; i < this.input.files.length; i += 1) {
      files.push(this.input.files[i]);
    }
    this.props.onDropFiles(files);
  };

  render() {
    return (
      <>
        <Button
          isDisabled={this.props.isDisabled}
          text={this.props.text}
          onClick={this.onClick}
        />
        <input
          ref={(ref) => (this.input = ref)}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={this.onChangeInput}
        />
      </>
    );
  }
}

export default FileUploadButton;
