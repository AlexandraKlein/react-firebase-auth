import React from "react";
import styled from "styled-components";
import { Row } from "./Container";
import { BreakPoint, Gutters, Colors, fadeIn } from "../styles";

const ProfileImage = ({ imgSrc, altText, ...props }) => (
  <ImageContainer align="stretch">
    {imgSrc && <Image src={imgSrc} alt={altText} />}
    {props.children}
  </ImageContainer>
);

export default ProfileImage;

const ImageContainer = styled(Row)`
  display: flex;
  justify-content: center;
  background-color: ${Colors.LIGHT_GRAY};
  position: relative;
  margin-bottom: ${Gutters.MEDIUM};
  width: ${props => props.size || "160px"};
  height: ${props => props.size || "160px"};
  border-radius: 50%;
  overflow: hidden;
  will-change: transform;

  ${BreakPoint.TABLET} {
    margin-bottom: 0;
    margin-right: ${Gutters.LARGE};
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  opacity: 0;
  animation: ${fadeIn} 0.75s ease-out forwards;
`;
