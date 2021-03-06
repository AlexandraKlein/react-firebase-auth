import React from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import Button from "./Button";
import { BreakPoint, Colors, Gutters } from "../styles";
import { Title } from "./Text";

type Props = {
  buttonText?: string;
  children?: React.ReactNode;
  isVisible: boolean;
  onClickConfirm?: () => void;
  onClickClose?: () => void;
};

const Modal = ({
  buttonText,
  children,
  isVisible,
  onClickConfirm,
  onClickClose,
}) => (
  <Container isVisible={isVisible}>
    <InnerContainer isVisible={isVisible}>
      <Close onClick={onClickClose}>
        <Title marginBottom="0px" marginTop="0px">
          <GrClose />
        </Title>
      </Close>
      {children}
      <Button onClick={onClickConfirm} text={buttonText} />
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

const InnerContainer = styled.div<{ isVisible: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  padding: ${Gutters.DOUBLE_X} ${Gutters.MEDIUM};
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${Colors.WHITE};

  ${BreakPoint.TABLET} {
    width: 80%;
    height: auto;
    opacity: ${(props) => (props.isVisible ? 1 : 0)};
    transform: ${(props) =>
      props.isVisible ? "translateY(0)" : "translateY(60px)"};
    transition: all 0.2s ease-out;
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
