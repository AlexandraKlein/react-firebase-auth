import React from "react";
import GoogleSignIn from "./GoogleSignIn";
import FacebookSignIn from "./FacebookSignIn";

type Props = {
  googleButtonText: string;
  facebeookButtonText: string;
};

const SocialSignIn = ({
  googleButtonText,
  facebeookButtonText,
}: Props): JSX.Element => {
  return (
    <>
      {googleButtonText && <GoogleSignIn googleButtonText={googleButtonText} />}
      {facebeookButtonText && (
        <FacebookSignIn facebeookButtonText={facebeookButtonText} />
      )}
    </>
  );
};

export default SocialSignIn;
