import React, { useCallback } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import app from "../base";
import Form from "../components/Form";
import Input from "../components/Input";
import Error from "../components/Error";
import SocialSignIn from "../components/SocialSignIn";
import Link from "../components/Link";
import { Paragraph, Heading } from "../components/Text";
import { BreakPoint } from "../styles";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${BreakPoint.TABLET} {
    align-items: center;
    justify-content: center;
  }
`;

const StyledParagraph = styled(Paragraph)`
  align-self: center;
`;

const StyledLink = styled(Link)`
  align-self: center;
`;

const SignUp = ({ history }) => {
  const [error, setError] = React.useState(undefined);
  const [userInfo, setUserInfo] = React.useState({});
  const [isDisabled, setIsDisabled] = React.useState(true);

  const onTypeUserInfo = (key, e) => {
    userInfo[key] = e.currentTarget.value.trim();
    setUserInfo(userInfo);
    setIsDisabled(Object.values(userInfo).length < 4);
  };

  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
          .then(userData => {
            userData.user.updateProfile({
              displayName: `${userInfo.firstName} ${userInfo.lastName}`.trim(),
              photoURL: "",
            });
          });
        history.push("/");
      } catch (error) {
        setError(error.message);
      }
    },
    [history, userInfo]
  );

  return (
    <StyledContainer>
      <Heading align="center">Sign Up</Heading>
      <Form
        isDisabled={isDisabled}
        submitText="Sign Up"
        onSubmit={handleSignUp}
      >
        <Input
          onChange={e => onTypeUserInfo("firstName", e)}
          label="First Name"
          type="text"
        />
        <Input
          onChange={e => onTypeUserInfo("lastName", e)}
          label="Last Name"
          type="text"
        />
        <Input
          onChange={e => onTypeUserInfo("email", e)}
          label="Email"
          type="email"
        />
        <Input
          onChange={e => onTypeUserInfo("password", e)}
          label="Password"
          type="password"
        />
      </Form>
      <StyledParagraph>- OR -</StyledParagraph>
      <SocialSignIn googleButtonText="Continue with Google" />

      {error && <Error text={error} />}

      <StyledLink to="/login">Login</StyledLink>
    </StyledContainer>
  );
};

export default withRouter(SignUp);
