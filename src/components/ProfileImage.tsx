import React from "react";
import styled from "styled-components";
import { BreakPoint, Gutters, Colors, fadeIn } from "../styles";

type StyleProps = {
  marginBottom?: string;
  marginRight?: string;
  size?: string;
};

type Props = StyleProps & {
  imgSrc?: string;
  altText?: string;
  children?: React.ReactNode;
};

const ProfileImage = ({ imgSrc, altText, ...props }: Props) => (
  <ImageContainer {...props}>
    {imgSrc && <Image src={imgSrc} alt={altText} />}
    {props.children}
  </ImageContainer>
);

export default ProfileImage;

const ImageContainer = styled.div<StyleProps>`
  background-color: ${Colors.LIGHT_GRAY};
  position: relative;
  margin-bottom: ${(props) => props.marginBottom || Gutters.MEDIUM};
  width: ${(props) => props.size || "160px"};
  height: ${(props) => props.size || "160px"};
  border-radius: 50%;
  overflow: hidden;
  will-change: transform;

  ${BreakPoint.TABLET} {
    margin-bottom: 0;
    margin-right: ${(props) => props.marginRight || Gutters.LARGE};
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  animation: ${fadeIn} 0.75s ease-out forwards;
`;
