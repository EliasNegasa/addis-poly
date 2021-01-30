import React from "react";
import BackdropLoader from "../common/Backdrop.js";
import Form from "../common/form";
import { StyledCard } from "../styled-components/card";
import { StyledSubHeading } from "../styled-components/heading";
import { Message, StyledFormContainer } from "../styled-components/styledForm";

import auth from "../../services/authService";

const Joi = require("joi-browser");

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
    backdrop: false,
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
  };

  componentDidMount() {
    if (window.location.pathname === "/login/confirmed") {
      this.setState({ confirmed: true });
    }
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      this.setState({ backdrop: true });
      await auth.login(data.username, data.password);
      window.location = "/";
      this.setState({ backdrop: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        console.log("CATCH", ex.response.data);
        errors.username = "Invalid Username or Password";
        this.setState({ errors, backdrop: false });
      }
    }
  };

  render() {
    return (
      <>
        {this.state.backdrop && <BackdropLoader />}
        <StyledCard big loginCard>
          <StyledSubHeading>Login</StyledSubHeading>
          {this.state.confirmed && (
            <Message success role="alert">
              Your account is Activated! Please log in.
            </Message>
          )}
          <StyledFormContainer oneColumn>
            <div className="login-form">
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("username", "Username")}
                {this.renderInput("password", "Password", "password")}
                {this.renderButton("Login")}
              </form>
            </div>
          </StyledFormContainer>
        </StyledCard>
      </>
    );
  }
}

export default LoginForm;
