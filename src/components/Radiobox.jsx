import * as React from "react";
import styled from "styled-components";
import { Colors, Gutters } from "../styles";
import { Row } from "./Container";
import { Paragraph } from "./Text";

const StyledRadiobox = styled(Row)`
  position: relative;
  background-color: ${props =>
    props.isChecked ? Colors.PRIMARY : Colors.WHITE};
  border-radius: 50%;
  border: 1px solid ${Colors.PRIMARY};
  width: ${props => props.size || "20px"};
  height: ${props => props.size || "20px"};
  margin-left: ${props => (props.label !== undefined ? Gutters.SMALL : "0")};
  opacity: ${props => (props.isDisabled ? "0.5" : "1")};

  &:after {
    content: "";
    position: absolute;
    border: 2px solid ${Colors.WHITE};
    border-radius: 50%;
    width: 80%;
    height: 80%;
  }
`;

const StyledContainer = styled.div`
  margin: ${Gutters.MEDIUM} 0;
  display: flex;
  align-items: center;
`;

const TouchableContainer = styled(StyledContainer)`
  cursor: pointer;
`;

const Label = styled(Paragraph)`
  margin: 0;
`;

class Radiobox extends React.Component {
  state = {
    isControlled: this.props.value !== undefined,
    value: this.props.value === undefined ? this.props.defaultValue : undefined,
  };

  static defaultProps = {
    defaultValue: false,
    isDisabled: false,
  };

  getValue() {
    return this.state.isControlled ? this.props.value : this.state.value;
  }

  onClick = () => {
    const newValue = !this.getValue();

    if (!this.state.isControlled) {
      this.setState({
        value: newValue,
      });
    }

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
    return <Label>{this.props.label}</Label>;
  }

  renderContent() {
    return (
      <>
        {this.props.label !== undefined && this.renderLabel()}
        <StyledRadiobox isChecked={this.getValue()} {...this.props} />
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
