import React from "react";
import styled, { keyframes } from "styled-components";
import { Column } from "./Container";
import { Colors } from "../styles";

const Loading = (): JSX.Element => (
  <Column flex="1">
    <Container>
      <span></span>
      <span></span>
      <span></span>
    </Container>
  </Column>
);

export default Loading;

const bounce = keyframes`
  0%, 75%, 100% {
    transform: translateY(0);
  }

  25% {
    transform: translateY(-20px);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;

  span {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: ${Colors.PRIMARY};
    margin: 35px 5px;

    &:nth-child(1) {
      animation: ${bounce} 1s ease-in-out infinite;
    }

    &:nth-child(2) {
      animation: ${bounce} 1s ease-in-out 0.33s infinite;
    }

    &:nth-child(3) {
      animation: ${bounce} 1s ease-in-out 0.66s infinite;
    }
  }
`;
