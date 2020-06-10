import React from "react";
import styled from "styled-components";
import { Container } from "./Container";
import { Paragraph } from "./Text";
import { BreakPoint, Colors, Gutters } from "../styles";

const User = ({ userInfo }) => (
  <StyledContainer>
    <ImageContainer>
      <Image
        src={
          userInfo.photoURL ||
          "https://www.empa.ch/documents/56066/95227/Profile-Placeholder.png/34b47554-1996-4dd1-9b0d-63fa49e463c9?t=1513121750277"
        }
        alt={userInfo.nickName || "User"}
      />
    </ImageContainer>
    <TextContainer>
      <Paragraph fontWeight="bold" marginTop="0px" marginBottom="0px">
        {userInfo.nickName || "Anonymous"}
      </Paragraph>
      <Paragraph>{userInfo.email}</Paragraph>
    </TextContainer>
  </StyledContainer>
);

export default User;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: ${Gutters.MEDIUM} 0;

  ${BreakPoint.TABLET} {
    flex-direction: row;
    justify-content: space-between;
    width: 400px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${BreakPoint.TABLET} {
    align-items: flex-start;
    width: 200px;
  }
`;

const ImageContainer = styled(Container)`
  display: flex;
  justify-content: center;
  background-color: ${Colors.LIGHT_GRAY};
  position: relative;
  margin-right: 0;
  margin-bottom: ${Gutters.MEDIUM};
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;

  ${BreakPoint.TABLET} {
    margin-bottom: 0;
    margin-right: ${Gutters.MEDIUM};
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;
