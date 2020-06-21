import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthContext } from "./context/Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }: RouteProps) => {
  const { currentUser } = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser ? (
          <>
            <RouteComponent {...routeProps} />
          </>
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};

export default PrivateRoute;
