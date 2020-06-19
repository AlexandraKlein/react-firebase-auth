import React from "react";
import app from "../base.js";
import Loading from "../components/Loading";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [pending, setPending] = React.useState(true);

  React.useEffect(() => {
    app.auth().onAuthStateChanged(user => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
