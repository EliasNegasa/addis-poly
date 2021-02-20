import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import Home from "./components/home";
import LoginForm from "./components/auth/loginForm";
import auth from "./services/authService";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import BoxContainer from "./components/layout/box";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    console.log("AUTH", user);
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <ReactNotification />
        {!user &&
          <>
            <Route
              exact path="/"
              render={(props) => {
                if (!user) {
                  return <Redirect to="/login" />;
                }
                return <BoxContainer {...props} user={user} />;
              }}
            />
            <Route exact path="/login" component={LoginForm} />
          </>}

        {user && <BoxContainer user={user} />}

      </>
    );
  }
}

export default App;
