import React from "react";
import styled from "styled-components";
import { AiOutlineArrowDown, AiOutlineEdit } from "react-icons/ai";
import { AuthContext } from "../context/Auth";
import { Row, Column } from "./Container";
import { Heading } from "./Text";
import ProfileImage from "./ProfileImage";
import { BreakPoint, Colors, Gutters } from "../styles";

const postHeight = "160px";

class PostForm extends React.PureComponent {
  state = {
    message: null,
    isOpen: false,
  };

  render() {
    const { currentUser } = this.props.authContext;
    const { isOpen } = this.state;

    return (
      <>
        <StyledContainer style={{ bottom: isOpen ? "0px" : `-${postHeight}` }}>
          <ShowHide
            align="flex-start"
            onClick={() => this.setState({ isOpen: !isOpen })}
          >
            <Heading marginTop="12px" marginBottom="0px" color={Colors.PRIMARY}>
              {isOpen ? <AiOutlineArrowDown /> : <AiOutlineEdit />}
            </Heading>
          </ShowHide>
          <StyledInnerContainer>
            <Row>
              <ProfileImage imgSrc={currentUser.photoURL} size="100px" />
              <StyledTextArea
                placeholder={`What's on your mind, ${currentUser.displayName}?`}
              ></StyledTextArea>
            </Row>
          </StyledInnerContainer>
        </StyledContainer>
        <Gutter />
      </>
    );
  }
}

const DataProvidedPostForm = React.memo(() => (
  <AuthContext.Consumer>
    {authContext => <PostForm authContext={authContext} />}
  </AuthContext.Consumer>
));

export default DataProvidedPostForm;

const StyledContainer = styled.div`
  display: flex;
  position: fixed;
  height: ${postHeight};
  width: 100%;
  border-top: 2px solid ${Colors.LIGHT_GRAY};
  transition: bottom 0.2s ease;
`;

const StyledInnerContainer = styled(Column)`
  flex: 1;
  position: relative;
  background-color: ${Colors.WHITE};
`;

const StyledTextArea = styled.textarea`
  background-color: ${Colors.INPUT};
  border: none;
  outline: 0;
  resize: none;
  padding: ${Gutters.MEDIUM};
  width: 250px;

  ${BreakPoint.TABLET} {
    width: 400px;
  }
`;

const ShowHide = styled(Row)`
  position: absolute;
  top: -52px;
  right: 42px;
  width: 64px;
  height: 88px;
  background: white;
  border-radius: 64px;
  border: 2px solid ${Colors.LIGHT_GRAY};
  cursor: pointer;

  &:hover {
    h2 {
      color: ${Colors.PRIMARY_HOVER};
    }
  }
`;

const Gutter = styled.div`
  height: ${postHeight};
`;
