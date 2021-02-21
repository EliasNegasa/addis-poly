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
import { getTestTypes } from "../../../services/testTypeService";
import { StyledFlex } from "../../styled-components/container";

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

  schema = {};

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
    this.setState({ patientOptions: options });
  }

  async getTestCategoryOptions() {
    this.setState({ loading: true });
    const { data } = await getTestCategories();
    const options = data.testCategories.map((d) => ({
      value: d.id,
      label: `${d.name}`,
    }));
    this.setState({ testCategoryOptions: options });
  }

  async getTestTypeOptions() {
    this.setState({ loading: true });
    const { data } = await getTestTypes();
    const options = data.testTypes.map((d) => ({
      value: d.id,
      label: d.name,
      category: d.testCategoryId,
    }));
    this.setState({ testTypeOptions: options });
  }

  async componentDidMount() {
    await this.getTestCategoryOptions();
    await this.getTestTypeOptions();
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

    let typeId = [];

    _.forEach(
      _.keys(
        _.pickBy(
          _.pickBy(data, function (value, key) {
            return _.startsWith(key, "type");
          }),
          function (value, key) {
            return value === true;
          }
        )
      ),
      function (value) {
        typeId.push(parseInt(_.replace(value, "type", "")));
      }
    );

    const newData = {
      testTypesId: _.toString(typeId),
      patientId: data.patientId,
    };

    console.log("NEW DATA", newData);

    this.setState({ backdrop: true });
    try {
      const { data: labRequest } = await saveLabRequest(newData);

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

            <StyledFormContainer fullWidth>
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
                <StyledFlex wrapFlex>
                  {!_.isEmpty(data.testCategoryId) &&
                    data.testCategoryId.map((testCategory) => {
                      return (
                        <div
                          key={testCategory}
                          style={{
                            padding: "1rem",
                            borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
                          }}
                        >
                          <strong>
                            {
                              _.find(this.state.testCategoryOptions, [
                                "value",
                                testCategory,
                              ]).label
                            }
                          </strong>

                          {_.filter(this.state.testTypeOptions, [
                            "category",
                            testCategory.toString(),
                          ]).map((testType) => {
                            return (
                              <div key={testType.value}>
                                {this.renderCheckBox(
                                  `type${testType.value}`,
                                  `${testType.label}`
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                </StyledFlex>
                {this.renderButton("Submit Request")}
              </form>
            </StyledFormContainer>
          </>
        )}
      </>
    );
  }
}

export default LabRequestForm;
