import React from "react";
import styled from "styled-components";
import { Row } from "./Container";
import { BreakPoint, Gutters, Colors } from "../styles";

const ProfileImage = ({ imgSrc, altText, ...props }) => (
  <ImageContainer align="stretch">
    <Image src={imgSrc} alt={altText} />
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

  ${BreakPoint.TABLET} {
    margin-bottom: 0;
    margin-right: ${Gutters.MEDIUM};
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;
