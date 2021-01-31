import React from "react";
import _ from "lodash";
import { getUser, saveUser } from "../../services/userService";
import Form from "../common/form";
import { StyledFormContainer } from "../styled-components/styledForm";
import Spinner from "../common/spinner";
import Notification from "../common/notification";
import AvatarImage from "../common/avatar";
import BackdropLoader from "../common/Backdrop";
import { StyledFlex } from "../styled-components/container";

const Joi = require("joi-browser");

class UserForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      phone: "",
      role: "",
    },
    RoleSelection: ["Admin", "Reception", "Lab"],
    errors: {},
    loading: false,
    backdrop: false,
    message: "",
  };

  schema = {
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    phone: this.state.data.phone
      ? Joi.number().min(10).label("Phone")
      : Joi.label("Phone"),
    role: Joi.string().required().label("Role"),
  };

  populateUser = async () => {
    try {
      // const userId = this.props.match.params.id;
      const userId = this.props.id;
      if (userId === "") return;

      this.setState({ loading: true });
      const { data: user } = await getUser(userId);

      this.setState({ data: this.mapToViewModel(user), loading: false });
    } catch (ex) {
      this.props.history.replace("/not-found");
    }
  };

  async componentDidMount() {
    await this.populateUser();
  }

  mapToViewModel = (user) => {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      phone: user.phone,
      role: user.role,
    };
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    console.log("Data", data);

    this.setState({ backdrop: true });
    try {
      const { data: user } = await saveUser(data);

      this.setState({
        message: user.result
          ? "User data updated Successfully"
          : "User created Successfully",
        messageType: "success",
        messageTitle: "Success",
        backdrop: false,
      });
      console.log("Saved");

      this.props.setOpenPopup(false);
      this.props.setId("");
      this.props.onUpdated();
      // this.props.history.push("/users");
      // this.props.history.push(this.props.location);
    } catch (ex) {
      if (ex.response && ex.response.status !== 200) {
        const error = ex.response.data;
        this.setState({
          message: error.message,
          messageType: "danger",
          messageTitle: "Error",
          backdrop: false,
        });
      }
    }
  };

  render() {
    const {
      backdrop,
      loading,
      message,
      messageType,
      messageTitle,
      data,
    } = this.state;
    return (
      <>
        {backdrop && <BackdropLoader />}
        {loading && <Spinner />}
        {!loading && (
          <>
            {message && this.props.openPopup && (
              <Notification
                title={messageTitle}
                message={message}
                type={messageType}
              />
            )}

            <form onSubmit={this.handleSubmit}>
              <StyledFlex>
                <StyledFormContainer>
                  <strong>Personal Information:</strong>
                  {this.renderInput("firstName", "First Name")}
                  {this.renderInput("lastName", "Last Name")}
                  {this.renderInput("phone", "Phone No.")}
                </StyledFormContainer>
                <StyledFormContainer>
                <strong>Account Information:</strong>
                  {this.renderInput("username", "Username")}
                  {this.renderInput("password", "Password", "password")}
                  {this.renderSelect("role", "Role", this.state.RoleSelection)}
                </StyledFormContainer>
              </StyledFlex>
              {this.renderButton("Save")}
            </form>
          </>
        )}
      </>
    );
  }
}

export default UserForm;
