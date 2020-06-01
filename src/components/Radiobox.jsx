import * as React from "react";
import styled from "styled-components";
import { Colors, Type, Gutters } from "../styles";

const StyledRadiobox = styled.div`
  background-color: ${props =>
    props.isChecked ? Colors.PRIMARY : Colors.WHITE};
  border-radius: 50%;
  border: 1px solid ${Colors.PRIMARY};
  width: ${props => props.size || "20px"};
  height: ${props => props.size || "20px"};
  margin-left: ${props => (props.label !== undefined ? Gutters.SMALL : "0")};
  opacity: ${props => (props.isDisabled ? "0.5" : "1")};
`;

const StyledContainer = styled.div`
  margin: ${Gutters.MEDIUM} 0;
  display: flex;
  align-items: center;
`;

const TouchableContainer = styled(StyledContainer)`
  cursor: pointer;
`;

const StyledLabel = styled.label`
  font-size: ${Type.BODY};
`;

class Radiobox extends React.Component {
  state = {
    value: this.props.value === undefined ? this.props.defaultValue : undefined,
  };

  static defaultProps = {
    defaultValue: false,
    isDisabled: false,
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
      <>
        {this.props.label !== undefined && this.renderLabel()}
        <StyledRadiobox isChecked={this.state.value} {...this.props} />
      </>
    );
  }

  render() {
    return (
      <>
        {this.props.onChange === undefined || this.props.isDisabled ? (
          <StyledContainer>{this.renderContent()}</StyledContainer>
        ) : (
          this.renderTouchable()
        )}
      </>
    );
  }
}

export default Radiobox;
