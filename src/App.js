import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./scenes/Home";
import Login from "./scenes/Login";
import SignUp from "./scenes/SignUp";
import Profile from "./scenes/Profile";
import AuthProvider from "./context/Auth";
import UsersProvider from "./context/Users";
import ProfileProvider from "./context/Profile";
import PrivateRoute from "./PrivateRoute";
import { Gutters } from "./styles";
import { choiceData } from "./data";

const App = () => {
  return (
    <AuthProvider>
      <UsersProvider>
        <ProfileProvider choiceData={choiceData}>
          <Router>
            <div style={{ paddingBottom: Gutters.DOUBLE_X }}>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
            </div>
          </Router>
        </ProfileProvider>
      </UsersProvider>
    </AuthProvider>
  );
};

export default App;
