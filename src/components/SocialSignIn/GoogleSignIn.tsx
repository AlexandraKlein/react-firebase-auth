import React, { useCallback } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import * as firebase from "firebase/app";
import app from "../../base";
import Form from "../Form";
import Error from "../Error";

type Props = RouteComponentProps & {
  googleButtonText: string;
};

const GoogleSignIn = ({ history, googleButtonText }: Props): JSX.Element => {
  const [error, setError] = React.useState(undefined);
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const handleGoogleSignIn = useCallback(
    async event => {
      event.preventDefault();
      try {
        await app.auth().signInWithPopup(googleProvider);
        history.push("/");
      } catch (error) {
        setError(error.message);
      }
    },
    [history, googleProvider]
  );

  return (
    <>
      <Form submitText={googleButtonText} onSubmit={handleGoogleSignIn}>
        {error && <Error text={error} />}
      </Form>
    </>
  );
};

export default withRouter(GoogleSignIn);
