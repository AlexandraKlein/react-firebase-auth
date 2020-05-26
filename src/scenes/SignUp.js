import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../base";
import Container from "../components/Container";
import Form from "../components/Form";
import Input from "../components/Input";
import Error from "../components/Error";
import Link from "../components/Link";

const SignUp = ({ history }) => {
  const [error, setError] = React.useState(undefined);

  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        console.log({ error });
        setError(error.message);
      }
    },
    [history]
  );

  return (
    <Container>
      <h1>Sign Up</h1>

      <Form submitText="Sign Up" onSubmit={handleSignUp}>
        <Input label="Email" type="email" placeholder="email" />
        <Input label="Password" type="password" placeholder="Password" />
      </Form>

      {error && <Error text={error} />}

      <Link to="/login">Login</Link>
    </Container>
  );
};

export default withRouter(SignUp);
