import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import app from "../base";
import { AuthContext } from "../Auth";
import Form from "../components/Form";
import Input from "../components/Input";

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
    <>
      <h1>Log in</h1>

      <Form onSubmit={handleLogin}>
        <Input label="Email" type="email" placeholder="email" />
        <Input label="Password" type="password" placeholder="Password" />
        <button type="submit">Log in</button>
      </Form>

      {error && <p>{error}</p>}

      <Link to="/signup">Sign Up</Link>
    </>
  );
};

export default withRouter(Login);
