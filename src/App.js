import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import LoginForm from "./components/auth/loginForm";
import auth from "./services/authService";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import BoxContainer from "./components/layout/box";

class App extends Component {
  state = {
    expired: false
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    if (user) {
      if (Date.now() >= user.exp * 1000) {
        console.log("EXPIRED");
        this.setState({ expired: true })
        localStorage.removeItem("token");
      }
      this.setState({ user });
    }
  }

  render() {
    const { user, expired } = this.state;
    return (
      <>
        <ReactNotification />
        {!user &&
          <>
            <Redirect to="/login" />
            <Route exact path="/login" component={LoginForm} />
          </>}

        {user && <>
          {expired ? <>
            <Redirect to="/login" />
            <Route exact path="/login" component={LoginForm} />
          </> :
            <BoxContainer user={user} />}
        </>}

      </>
    );
  }
}

export default App;
