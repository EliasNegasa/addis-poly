import React from "react";
import BackdropLoader from "../common/Backdrop";
import Form from "../common/form";
import { StyledSubHeading } from "../styled-components/heading";
import { StyledFormContainer } from "../styled-components/styledForm";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Button from "@material-ui/core/Button";

import auth from "../../services/authService";

import Container from "@material-ui/core/Container";
import { Avatar, Typography } from "@material-ui/core";

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
      <Container component="main" maxWidth="xs">
        {this.state.backdrop && <BackdropLoader />}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "25vh",
          }}
        >
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <StyledSubHeading style={{ color: "#b7b7b7" }}>
            Addis Poly Specialized Clinic
          </StyledSubHeading>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <StyledFormContainer oneColumn>
            <div className="login-form">
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("username", "Username")}
                {this.renderInput("password", "Password", "password")}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    margin: "3rem, 0 2rem",
                    backgroundColor: "#3399ff",
                    color: "#fff",
                    padding: "0.5rem",
                    fontSize: "14px",
                  }}
                >
                  Login
                </Button>
              </form>
            </div>
          </StyledFormContainer>
        </div>
      </Container>
    );
  }
}

export default LoginForm;
