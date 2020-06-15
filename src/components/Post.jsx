import React from "react";
import styled from "styled-components";
import ProfileImage from "./ProfileImage";
import { Paragraph, Caption } from "./Text";
import { BreakPoint, Gutters, fadeUp } from "../styles";

const Post = ({ post, photoURL, displayName, ...props }) => (
  <StyledContainer {...props}>
    <ProfileImage
      altText={post.nickName || "User"}
      imgSrc={
        photoURL ||
        "https://www.empa.ch/documents/56066/95227/Profile-Placeholder.png/34b47554-1996-4dd1-9b0d-63fa49e463c9?t=1513121750277"
      }
    />
    <TextContainer>
      <Paragraph marginTop="0px" marginBottom="0px">
        {post.message}
      </Paragraph>
      <Paragraph
        fontWeight="bold"
        marginTop={Gutters.MEDIUM}
        marginBottom={Gutters.X_SMALL}
      >
        {displayName || "Anonymous"}
      </Paragraph>
      <Caption marginTop="0px">{post.email}</Caption>
    </TextContainer>
  </StyledContainer>
);

export default Post;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: ${Gutters.X_LARGE};
  opacity: 0;
  animation: ${fadeUp} 0.5s ease-out forwards;
  animation-delay: ${props => props.animationDelay || "0s"};

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
    width: 500px;
  }

  p {
    text-align: center;
    width: 100%;

    ${BreakPoint.TABLET} {
      text-align: left;
    }
  }
`;
