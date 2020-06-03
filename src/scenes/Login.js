import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import styled from "styled-components";
import app from "../base";
import { AuthContext } from "../Auth";
import Form from "../components/Form";
import Input from "../components/Input";
import Error from "../components/Error";
import Link from "../components/Link";
import SocialSignIn from "../components/SocialSignIn";
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

const Login = ({ history }) => {
  const [error, setError] = React.useState(undefined);

  const handleLogin = useCallback(
    async event => {
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
    <StyledContainer>
      <Heading align="center">Log In</Heading>
      <Form submitText="Log In" onSubmit={handleLogin}>
        <Input label="Email" type="email" placeholder="email" />
        <Input label="Password" type="password" placeholder="Password" />
      </Form>
      {error && <Error text={error} />}
      <StyledParagraph>- OR -</StyledParagraph>
      <SocialSignIn googleButtonText="Sign in with Google" />
      <StyledLink to="/signup">Sign Up</StyledLink>
    </StyledContainer>
  );
};

export default withRouter(Login);
