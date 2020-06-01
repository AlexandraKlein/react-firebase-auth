import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../base";
import { Column } from "../components/Container";
import Form from "../components/Form";
import Input from "../components/Input";
import Error from "../components/Error";
import Link from "../components/Link";

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
        console.log({ error });
        setError(error.message);
      }
    },
    [history, userInfo]
  );

  return (
    <Column>
      <h1>Sign Up</h1>

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

      {error && <Error text={error} />}

      <Link to="/login">Login</Link>
    </Column>
  );
};

export default withRouter(SignUp);
