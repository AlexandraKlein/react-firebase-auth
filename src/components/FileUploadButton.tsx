import React from "react";
import Button from "./Button";

type Props = {
  text: string;
  onDropFiles: (files: File[]) => void;
};

class FileUploadButton extends React.PureComponent<Props> {
  input: HTMLInputElement | null;

  onClick = () => {
    if (!this.input) {
      return;
    }
    this.input.click();
  };

  onChangeInput = (e: React.ChangeEvent) => {
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
        <Button text={this.props.text} onClick={this.onClick} />
        <input
          ref={ref => (this.input = ref)}
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
