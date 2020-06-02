import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../base";
import { AuthContext } from "../Auth";
import { Column } from "../components/Container";
import Form from "../components/Form";
import Input from "../components/Input";
import Error from "../components/Error";
import Link from "../components/Link";
import SocialSignIn from "../components/SocialSignIn";
import { Paragraph } from "../components/Text";

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
    <Column>
      <h1>Log In</h1>
      <Form submitText="Log In" onSubmit={handleLogin}>
        <Input label="Email" type="email" placeholder="email" />
        <Input label="Password" type="password" placeholder="Password" />
      </Form>
      {error && <Error text={error} />}
      <Paragraph>- OR -</Paragraph>
      <SocialSignIn googleButtonText="Sign in with Google" />
      <Link to="/signup">Sign Up</Link>
    </Column>
  );
};

export default withRouter(Login);
