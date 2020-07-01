import React from "react";
import app from "../base";
import { User } from "firebase";

export type AuthContextType = {
  currentUser: User | null;
};

export const AuthContext = React.createContext({
  currentUser: null,
});

const AuthProvider = (props: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [pending, setPending] = React.useState<boolean>(true);

  React.useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
