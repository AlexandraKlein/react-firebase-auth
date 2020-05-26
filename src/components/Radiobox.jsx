import * as React from "react";
import styled from "styled-components";

const StyledRadiobox = styled.div`
  background-color: ${props => (props.isChecked ? "dodgerblue" : "white")};
  border-radius: 50%;
  border: 1px solid dodgerblue;
  width: ${props => props.size || "20px"};
  height: ${props => props.size || "20px"};
  margin-left: ${props => (props.label !== undefined ? "10px" : "0")};
  opacity: ${props => (props.isDisabled ? "0.5" : "1")};
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TouchableContainer = styled(StyledContainer)`
  cursor: pointer;
`;

const StyledLabel = styled.label`
  margin: 12px 0;
`;

class FabricRadiobox extends React.Component {
  state = {
    value: this.props.value === undefined ? this.props.defaultValue : undefined,
  };

  onClick = () => {
    const newValue = !this.state.value;

    this.setState({ value: newValue });

    if (this.props.onChange !== undefined) {
      this.props.onChange(newValue);
    }
  };

  renderTouchable() {
    const { isDisabled, value, onChange, size, ...props } = this.props;

    return (
      <TouchableContainer
        onClick={this.onClick}
        isDisabled={isDisabled}
        {...props}
      >
        {this.renderContent()}
      </TouchableContainer>
    );
  }

  renderLabel() {
    return <StyledLabel>{this.props.label}</StyledLabel>;
  }

  renderContent() {
    return (
      <StyledContainer>
        {this.props.label !== undefined && this.renderLabel()}
        <StyledRadiobox isChecked={this.state.value} {...this.props} />
      </StyledContainer>
    );
  }

  render() {
    return (
      <>
        {this.props.onChange === undefined || this.props.isDisabled
          ? this.renderContent()
          : this.renderTouchable()}
      </>
    );
  }
}

const DefaultRadiobox = React.memo(props => <FabricRadiobox {...props} />);
DefaultRadiobox.displayName = "Radiobox";

const Radiobox = DefaultRadiobox;

export default Radiobox;
