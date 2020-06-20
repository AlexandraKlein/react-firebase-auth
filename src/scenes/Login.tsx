import React, { useCallback, useContext } from "react";
import { withRouter, Redirect, RouteComponentProps } from "react-router";
import styled from "styled-components";
import app from "../base";
import { AuthContext } from "../context/Auth";
import Form from "../components/Form";
import Input from "../components/Input";
import Error from "../components/Error";
import Link from "../components/Link";
import SocialSignIn from "../components/SocialSignIn";
import { Paragraph, Heading } from "../components/Text";
import { Column } from "../components/Container";

const Login = ({ history }: RouteComponentProps): JSX.Element => {
  const [error, setError] = React.useState(undefined);

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        setError(error.message);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Column>
      <Heading align="center">Log In</Heading>
      <Form submitText="Log In" onSubmit={handleLogin}>
        <Input label="Email" type="email" placeholder="email" />
        <Input label="Password" type="password" placeholder="Password" />
        {error && <Error text={error} />}
      </Form>
      <StyledParagraph fontWeight="700">- OR -</StyledParagraph>
      <SocialSignIn googleButtonText="Sign in with Google" />
      <StyledLink to="/signup">Sign Up</StyledLink>
    </Column>
  );
};

export default withRouter(Login);

const StyledParagraph = styled(Paragraph)<{ fontWeight: string }>`
  align-self: center;
`;

const StyledLink = styled(Link)`
  align-self: center;
  font-weight: 700;
`;
