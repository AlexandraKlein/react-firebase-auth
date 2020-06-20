import React, { useCallback } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import styled from "styled-components";
import app from "../base";
import Form from "../components/Form";
import Input from "../components/Input";
import Error from "../components/Error";
import SocialSignIn from "../components/SocialSignIn";
import Link from "../components/Link";
import { Paragraph, Heading } from "../components/Text";
import { Column } from "../components/Container";

const StyledParagraph = styled(Paragraph)<{ fontWeight: string }>`
  align-self: center;
`;

const StyledLink = styled(Link)`
  align-self: center;
  font-weight: 700;
`;

const SignUp = ({ history }: RouteComponentProps): JSX.Element => {
  const [error, setError] = React.useState<Error["message"]>(undefined);
  const [userInfo, setUserInfo] = React.useState<{ [key: string]: any }>({});
  const [isDisabled, setIsDisabled] = React.useState(true);

  const onTypeUserInfo = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    userInfo[key] = e.currentTarget.value.trim();
    setUserInfo(userInfo);
    setIsDisabled(Object.values(userInfo).length < 4);
  };

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
          .then((userData) => {
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
    <Column>
      <Heading align="center">Sign Up</Heading>
      <Form
        isDisabled={isDisabled}
        submitText="Sign Up"
        onSubmit={handleSignUp}
      >
        <Input
          onChange={(e) => onTypeUserInfo("firstName", e)}
          label="First Name"
          type="text"
        />
        <Input
          onChange={(e) => onTypeUserInfo("lastName", e)}
          label="Last Name"
          type="text"
        />
        <Input
          onChange={(e) => onTypeUserInfo("email", e)}
          label="Email"
          type="email"
        />
        <Input
          onChange={(e) => onTypeUserInfo("password", e)}
          label="Password"
          type="password"
        />

        {error && <Error text={error} />}
      </Form>
      <StyledParagraph fontWeight="700">- OR -</StyledParagraph>
      <SocialSignIn googleButtonText="Continue with Google" />

      <StyledLink to="/login">Login</StyledLink>
    </Column>
  );
};

export default withRouter(SignUp);
