import React from "react";
import styled from "styled-components";
import ProfileImage from "./ProfileImage";
import { Paragraph } from "./Text";
import { BreakPoint, Gutters, fadeUp } from "../styles";
import { placeholderProfileUrl } from "../helpers";

type Props = {
  userInfo: { [key: string]: string };
  animationDelay?: string;
};

const User = ({ userInfo, ...props }: Props) => (
  <StyledContainer {...props}>
    <ProfileImage
      altText={userInfo.nickName || "User"}
      imgSrc={userInfo.photoURL || placeholderProfileUrl}
    />
    <TextContainer>
      <Paragraph fontWeight="bold" marginTop="0px" marginBottom="0px">
        {userInfo.nickName || "Anonymous"}
      </Paragraph>
      <Paragraph marginTop={Gutters.X_SMALL} marginBottom="0px">
        {userInfo.email}
      </Paragraph>
    </TextContainer>
  </StyledContainer>
);

export default User;

const StyledContainer = styled.div<{ animationDelay?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: ${Gutters.X_LARGE};
  opacity: 0;
  animation: ${fadeUp} 0.5s ease-out forwards;
  animation-delay: ${(props) => props.animationDelay || "0s"};

  ${BreakPoint.TABLET} {
    flex-direction: row;
    justify-content: space-between;
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

  p {
    text-align: center;
    width: 100%;
    display: block;
    margin: auto;
    overflow: hidden;
    text-overflow: ellipsis;

    ${BreakPoint.TABLET} {
      text-align: left;
    }
  }
`;
