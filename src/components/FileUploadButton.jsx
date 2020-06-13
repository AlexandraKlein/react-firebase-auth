import React from "react";
import Button from "./Button";

class FileUploadButton extends React.PureComponent {
  onClick = () => {
    if (!this.input) {
      return;
    }
    this.input.click();
  };

  onChangeInput = e => {
    if (!this.input) {
      return;
    }

    if (this.input.files === null) {
      return;
    }

    const files = [];
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
