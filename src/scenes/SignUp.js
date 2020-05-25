import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import app from "../base";
import Form from "../components/Form";
import Input from "../components/Input";

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
    <div>
      <h1>Sign up</h1>

      <Form onSubmit={handleSignUp}>
        <Input label="Email" type="email" placeholder="email" />
        <Input label="Password" type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </Form>

      {error && <p>{error}</p>}

      <Link to="/login">Login</Link>
    </div>
  );
};

export default withRouter(SignUp);
