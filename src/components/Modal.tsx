import React from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import Button from "./Button";
import { BreakPoint, Colors, Gutters } from "../styles";
import { Heading } from "./Text";

type Props = {
  buttonText?: string;
  children?: React.ReactNode;
  isVisible: boolean;
  onClickButton?: () => void;
  onClickClose?: () => void;
};

const Modal = ({
  buttonText,
  children,
  isVisible,
  onClickButton,
  onClickClose,
}) => (
  <Container isVisible={isVisible}>
    <InnerContainer>
      <Close onClick={onClickClose}>
        <Heading marginBottom="0px" marginTop="0px">
          <GrClose />
        </Heading>
      </Close>
      {children}
      <Button onClick={onClickButton} text={buttonText} />
    </InnerContainer>
  </Container>
);

export default Modal;

const Container = styled.div<{ isVisible: boolean }>`
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.isVisible ? "all" : "none")};
  transition: opacity 0.2s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const InnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${Colors.WHITE};

  ${BreakPoint.TABLET} {
    width: 80%;
    height: 80%;
  }
`;

const Close = styled.div`
  position: absolute;
  top: ${Gutters.MEDIUM};
  right: ${Gutters.MEDIUM};
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;
