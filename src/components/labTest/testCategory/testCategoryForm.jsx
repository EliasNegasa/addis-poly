import React from "react";
import {
  getTestCategory,
  saveTestCategory,
} from "../../../services/testCategoryService";
import BackdropLoader from "../../common/Backdrop";
import Form from "../../common/form";
import Notification from "../../common/notification";
import Spinner from "../../common/spinner";
import { StyledFormContainer } from "../../styled-components/styledForm";

const Joi = require("joi-browser");

class TestCategoryForm extends Form {
  state = {
    data: {
      name: "",
      remark: "",
    },
    errors: {},
    loading: false,
    backdrop: false,
    message: "",
  };

  schema = {
    name: Joi.string().required().label("Test Category"),
    remark: Joi.label("Remark"),
  };

  populateTestCategory = async () => {
    try {
      const testCategoryId = this.props.id;
      if (testCategoryId === "") return;

      const { data: testCategory } = await getTestCategory(testCategoryId);

      this.setState({ data: this.mapToViewModel(testCategory) });
    } catch (ex) {
      this.props.history.replace("/not-found");
    }
  };

  async componentDidMount() {
    await this.populateTestCategory();
  }

  mapToViewModel = (testCategory) => {
    return {
      id: testCategory.id,
      name: testCategory.name,
      remark: testCategory.remark,
    };
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    console.log("Data", data);

    this.setState({ backdrop: true });
    try {
      const { data: testCategory } = await saveTestCategory(data);
      console.log("IDD", testCategory);

      this.setState({
        message: testCategory.result
          ? "Test Category updated Successfully"
          : "Test Category created Successfully",
        messageType: "success",
        messageTitle: "Success",
        backdrop: false,
      });
      console.log("Saved");

      this.props.setOpenPopup(false);
      this.props.setId("");
      this.props.onUpdated();
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
            <StyledFormContainer oneColumn>
              <div className="login-form">
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("name", "Test Category Name")}
                  {this.renderTextArea("remark", "Remark")}
                  {this.renderButton("Save")}
                </form>
              </div>
            </StyledFormContainer>
          </>
        )}
      </>
    );
  }
}

export default TestCategoryForm;
