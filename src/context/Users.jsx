import React, { useEffect, useState } from "react";
import * as firebase from "firebase/app";

export const UsersContext = React.createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    firebase
      .database()
      .ref("users")
      .on(
        "value",
        snapshot => {
          setUsers(snapshot.val());
          setPending(false);
        },
        error => console.warn({ error })
      );
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <UsersContext.Provider
      value={{
        users,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
