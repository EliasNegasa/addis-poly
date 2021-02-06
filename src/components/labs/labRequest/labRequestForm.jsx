import React from "react";
import _ from "lodash";
import BackdropLoader from "../../common/Backdrop";
import Form from "../../common/form";
import Notification from "../../common/notification";
import Spinner from "../../common/spinner";
import { StyledFormContainer } from "../../styled-components/styledForm";
import {
  getLabRequest,
  saveLabRequest,
} from "../../../services/labRequestService";
import { getTestCategories } from "../../../services/testCategoryService";
import { getPatients } from "../../../services/patientService";
const Joi = require("joi-browser");

class LabRequestForm extends Form {
  state = {
    data: {
      patientId: "",
      testCategoryId: [],
      testTypeId: [],
      status: "",
    },
    patientOptions: [],
    testCategoryOptions: [],
    testTypeOptions: [],
    errors: {},
    loading: false,
    backdrop: false,
    message: "",
  };

  schema = {
    // testCategoryId: Joi.number().required().label("Test Category"),
  };

  populateLabRequest = async () => {
    try {
      const labTestId = this.props.id;
      if (labTestId === "") {
        this.setState({ loading: false });
        return;
      }

      const { data: labRequests } = await getLabRequest(labTestId);

      this.setState({ data: this.mapToViewModel(labRequests), loading: false });
    } catch (ex) {
      this.props.history.replace("/not-found");
    }
  };

  async getPatientOptions() {
    this.setState({ loading: true });
    const { data } = await getPatients();
    const options = data.patients.map((d) => ({
      value: d.id,
      label: `${d.cardNumber} | ${d.firstName} ${d.fatherName}`,
    }));
    console.log("OPTIONS", options);
    this.setState({ patientOptions: options });
  }

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
    await this.getPatientOptions();
    await this.populateLabRequest();
  }

  mapToViewModel = (labRequest) => {
    return {
      id: labRequest.id,
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
      const { data: labRequest } = await saveLabRequest(data);

      this.setState({
        message: labRequest.result
          ? "Lab Request updated Successfully"
          : "Lab Request created Successfully",
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
                  {this.renderPreloadedSelect(
                    "patientId",
                    "Patient",
                    this.state.patientOptions
                  )}
                  {this.renderMultiSelect(
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

export default LabRequestForm;
