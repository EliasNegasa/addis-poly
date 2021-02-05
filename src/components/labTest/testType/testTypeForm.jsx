import React from "react";
import _ from "lodash";
import { getTestCategories } from "../../../services/testCategoryService";
import { getTestType, saveTestType } from "../../../services/testTypeService";
import BackdropLoader from "../../common/Backdrop";
import Form from "../../common/form";
import Notification from "../../common/notification";
import Spinner from "../../common/spinner";
import { StyledFormContainer } from "../../styled-components/styledForm";

const Joi = require("joi-browser");

class TestTypeForm extends Form {
  state = {
    data: {
      name: "",
      testCategoryId: "",
      normalValue: "",
    },
    testCategoryOptions: [],
    errors: {},
    loading: false,
    backdrop: false,
    message: "",
  };

  schema = {
    name: Joi.string().required().label("Test Type"),
    normalValue: Joi.label("Normal Value"),
    testCategoryId: Joi.number().required().label("Test Category"),
  };

  populateTestType = async () => {
    try {
      const testTypeId = this.props.id;
      if (testTypeId === "") {
        this.setState({ loading: false });
        return;
      }

      const { data: testType } = await getTestType(testTypeId);

      this.setState({ data: this.mapToViewModel(testType), loading: false });
    } catch (ex) {
      this.props.history.replace("/not-found");
    }
  };

  async getTestCategoryOptions() {
    this.setState({ loading: true });
    const { data } = await getTestCategories();
    const options = data.testCategories.map((d) => ({
      value: d.id,
      label: `${d.name}`,
    }));
    console.log("OPTIONS", options);
    this.setState({ testCategoryOptions: options });
  }

  async componentDidMount() {
    await this.getTestCategoryOptions();
    await this.populateTestType();
  }

  mapToViewModel = (testType) => {
    return {
      id: testType.id,
      name: testType.name,
      normalValue: testType.normalValue,
      testCategoryId: testType.testCategoryId,
    };
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    console.log("Data", data);

    const updatedData = _.omitBy(data, function (emp) {
      return emp === "" || emp == null;
    });
    console.log("UP", updatedData);

    this.setState({ backdrop: true });
    try {
      const { data: testType } = await saveTestType(data);

      this.setState({
        message: testType.result
          ? "Test Type updated Successfully"
          : "Test Type created Successfully",
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
                  {this.renderInput("name", "Test Name")}
                  {this.renderInput("normalValue", "Normal Value")}
                  {this.renderPreloadedSelect(
                    "testCategoryId",
                    "Test Category",
                    this.state.testCategoryOptions
                  )}
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

export default TestTypeForm;
