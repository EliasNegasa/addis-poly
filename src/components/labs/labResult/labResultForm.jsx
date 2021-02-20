import React from "react";
import { getLabRequest } from "../../../services/labRequestService";
import _ from "lodash";
import BackdropLoader from "../../common/Backdrop";
import Form from "../../common/form";
import Notification from "../../common/notification";
import Spinner from "../../common/spinner";
import { StyledFlex } from "../../styled-components/container";
import { StyledFormContainer } from "../../styled-components/styledForm";
import { saveLabResult } from "../../../services/labResultService";

class LabResultForm extends Form {
  state = {
    labRequest: "",
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
      const labRequestId = this.props.id;
      if (labRequestId === "") {
        this.setState({ loading: false });
        return;
      }

      const { data: labRequests } = await getLabRequest(labRequestId);
      console.log("Lab Request:", labRequests);

      this.setState({
        labRequest: labRequests,
        data: this.mapToViewModel(labRequests),
        loading: false,
      });
    } catch (ex) {
      this.props.history.replace("/not-found");
    }
  };

  async componentDidMount() {
    this.populateLabRequest();
  }

  mapToViewModel = (labRequest) => {
    return {
      labRequestId: labRequest.id,
      patientId: labRequest.patientId,
    };
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    console.log("Data", data);

    const newData = _.map(
      _.pickBy(
        _.pickBy(data, function (value, key) {
          return _.startsWith(key, "tType");
        }),
        function (value, key) {
          return value !== "";
        }
      ),
      function (value, key) {
        return {
          patientId: data.patientId,
          labRequestId: data.labRequestId,
          testTypeId: _.replace(key, "tType", ""),
          result: value,
        };
      }
    );
    console.log("newData", newData);

    this.setState({ backdrop: true });

    try {
      const { data: labRequest } = await saveLabResult(newData);

      this.setState({
        message: labRequest.result
          ? "Lab Result updated Successfully"
          : "Lab Request submitted Successfully",
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
      labRequest,
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
              <>
                <strong>Card No: </strong>
                {labRequest && `${labRequest.patient.cardNumber}`}
              </>
              <>
                <br />
                <strong>Name: </strong>
                {labRequest &&
                  `${labRequest.patient.firstName} ${labRequest.patient.fatherName} ${labRequest.patient.grandName}`}
              </>
              <form onSubmit={this.handleSubmit} style={{ margin: "2rem 0" }}>
                <StyledFlex wrapFlex>
                  {labRequest &&
                    labRequest.testCategories.map((testCategory) => {
                      return (
                        <div
                          key={testCategory.id}
                          style={{
                            padding: "2rem",
                            borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
                          }}
                        >
                          <strong>{testCategory.name}</strong>
                          {testCategory.testTypes &&
                            testCategory.testTypes.map((testType) => {
                              return (
                                <div key={testType.id}>
                                  {this.renderInput(
                                    `tType${testType.id}`,
                                    `${testType.name}`
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      );
                    })}
                </StyledFlex>
                {this.renderButton("Submit Result")}
              </form>
            </StyledFormContainer>
          </>
        )}
      </>
    );
  }
}

export default LabResultForm;
