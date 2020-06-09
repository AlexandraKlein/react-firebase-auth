import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./scenes/Home";
import Login from "./scenes/Login";
import SignUp from "./scenes/SignUp";
import Profile from "./scenes/Profile";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
