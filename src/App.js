import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Home from "./scenes/Home";
import Login from "./scenes/Login";
import SignUp from "./scenes/SignUp";
import Profile from "./scenes/Profile";
import AuthProvider, { AuthContext } from "./context/Auth";
import UsersProvider from "./context/Users";
import ProfileProvider from "./context/Profile";
import PostsProvider from "./context/Posts";
import PrivateRoute from "./PrivateRoute";
import Navigation from "./components/Navigation";
import { Container } from "./components/Container";
import { Gutters } from "./styles";
import { choiceData } from "./data";

const App = () => {
  return (
    <AuthProvider>
      <UsersProvider>
        <ProfileProvider choiceData={choiceData}>
          <PostsProvider>
            <AuthContext.Consumer>
              {authContext => (
                <Router>
                  {authContext.currentUser && <Navigation />}
                  <Container
                    padding={`0 ${Gutters.MEDIUM} ${Gutters.DOUBLE_X}`}
                  >
                    <ScrollToTop />
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                  </Container>
                </Router>
              )}
            </AuthContext.Consumer>
          </PostsProvider>
        </ProfileProvider>
      </UsersProvider>
    </AuthProvider>
  );
};

export default App;
