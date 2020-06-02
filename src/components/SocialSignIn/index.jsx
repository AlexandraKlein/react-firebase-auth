import React from "react";
import GoogleSignIn from "./GoogleSignIn";
import FacebookSignIn from "./FacebookSignIn";

const SocialSignIn = ({ googleButtonText, facbeookButtonText }) => {
  return (
    <>
      {googleButtonText && <GoogleSignIn googleButtonText={googleButtonText} />}
      {facbeookButtonText && (
        <FacebookSignIn facbeookButtonText={facbeookButtonText} />
      )}
    </>
  );
};

export default SocialSignIn;
