import * as React from "react";
import styled from "styled-components";
import { Colors, Gutters } from "../styles";
import { Row } from "./Container";
import { Paragraph } from "./Text";

type Props = {
  defaultValue?: boolean;
  value?: boolean;
  isDisabled?: boolean;
  onChange?: (...args: any[]) => void;
  size?: string;
  label: string;
};

type State = {
  isControlled: boolean;
  value: boolean;
};

class Radiobox extends React.Component<Props, State> {
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
    const {
      defaultValue,
      isDisabled,
      value,
      onChange,
      size,
      ...props
    } = this.props;

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
        <StyledRadiobox
          isChecked={this.getValue()}
          defaultValue={this.props.defaultValue as any}
          {...this.props}
        />
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

const StyledContainer = styled.div<{ marginRight?: string }>`
  display: flex;
  align-items: center;
  margin-right: ${props => props.marginRight || Gutters.MEDIUM};
`;

const TouchableContainer = styled(StyledContainer)<{ isDisabled?: boolean }>`
  cursor: pointer;
`;

const Label = styled(Paragraph)`
  margin: 0;
`;

// eslint-disable-next-line
const StyledRadiobox = styled(Row)<{
  isChecked?: boolean;
  isDisabled?: boolean;
  label?: string;
  size?: string;
}>`
  position: relative;
  background-color: ${props =>
    props.isChecked ? Colors.PRIMARY : Colors.WHITE};
  border-radius: 50%;
  border: ${props =>
    props.isChecked ? "none" : `1px solid ${Colors.PRIMARY}`};
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
