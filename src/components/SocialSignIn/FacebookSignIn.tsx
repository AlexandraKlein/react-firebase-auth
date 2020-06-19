import React, { useCallback } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import * as firebase from "firebase/app";
import app from "../../base";
import Form from "../Form";
import Error from "../Error";

type Props = RouteComponentProps & {
  facebeookButtonText: string;
};

const FacebookSignIn = ({
  history,
  facebeookButtonText,
}: Props): JSX.Element => {
  const [error, setError] = React.useState(undefined);
  const facebookProvider = new firebase.auth.FacebookAuthProvider();

  const handleFacebookoSignIn = useCallback(
    async event => {
      event.preventDefault();
      try {
        await app.auth().signInWithPopup(facebookProvider);
        history.push("/");
      } catch (error) {
        setError(error.message);
      }
    },
    [history, facebookProvider]
  );

  return (
    <>
      <Form submitText={facebeookButtonText} onSubmit={handleFacebookoSignIn}>
        {error && <Error text={error} />}
      </Form>
    </>
  );
};

export default withRouter(FacebookSignIn);
