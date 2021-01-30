import React from "react";
import _ from "lodash";
import { getPatient, savePatient } from "../../services/patientService";
import Form from "../common/form";
import { StyledFormContainer } from "../styled-components/styledForm";
import Spinner from "../common/spinner";
import Notification from "../common/notification";
import BackdropLoader from "../common/Backdrop";
import { StyledFlex } from "../styled-components/container";

const Joi = require("joi-browser");

class PatientForm extends Form {
  state = {
    data: {
      firstname: "",
      fathername: "",
      grandname: "",
      gender: "",
      age: "",
      phone: "",
      kebele: "",
      woreda: "",
      sub_city: "",
      house_no: "",
    },
    errors: {},
    loading: false,
    backdrop: false,
    message: "",
    genderOptions: ["Male", "Female"],
  };

  schema = {
    firstname: Joi.string().required().label("First Name"),
    fathername: Joi.string().required().label("Father's Name"),
    grandname: Joi.label("Grand Name"),
    gender: Joi.label("Gender"),
    age: Joi.label("Age"),
    phone: Joi.label("Phone"),
    kebele: Joi.label("Kebele"),
    woreda: Joi.label("Woreda"),
    sub_city: Joi.label("Subcity"),
    house_no: Joi.label("House No."),
  };

  populatePatient = async () => {
    try {
      // const userId = this.props.match.params.id;
      const patientId = this.props.id;
      if (patientId === "") return;

      this.setState({ loading: true });
      const { data: patient } = await getPatient(patientId);

      this.setState({ data: this.mapToViewModel(patient), loading: false });
    } catch (ex) {
      this.props.history.replace("/not-found");
    }
  };

  async componentDidMount() {
    await this.populatePatient();
  }

  mapToViewModel = (patient) => {
    return {
      id: patient.id,
      firstname: patient.firstname,
      fathername: patient.fathername,
      grandname: patient.grandname,
      gender: patient.gender,
      age: patient.age,
      phone: patient.phone,
      kebele: patient.kebele,
      woreda: patient.woreda,
      sub_city: patient.sub_city,
      house_no: patient.house_no,
    };
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    console.log("Data", data);
    this.setState({ backdrop: true });
    try {
      // const {data: patient} =
      const { data: patient } = await savePatient(data);
      console.log("Reseponse Logged", patient);

      this.setState({
        message: patient.result
          ? "Patient data updated Successfully"
          : "Patient created Successfully",
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

            <form onSubmit={this.handleSubmit}>
              <StyledFlex>
                <StyledFormContainer>
                  <strong>Personal Information:</strong>
                  {this.renderInput("firstname", "First Name")}
                  {this.renderInput("fathername", "Father's Name")}
                  {this.renderInput("grandname", "Grand Father's Name")}
                  <div className="double-field">
                    {this.renderSelect(
                      "gender",
                      "Gender",
                      this.state.genderOptions
                    )}
                    {this.renderInput("age", "Age", "number")}
                  </div>
                  {this.renderInput("phone", "Phone", "number")}
                </StyledFormContainer>

                <StyledFormContainer>
                  <strong>Address:</strong>
                  {this.renderInput("kebele", "Kebele", "number")}
                  {this.renderInput("woreda", "Woreda", "number")}
                  {this.renderInput("sub_city", "Subcity/Zone")}
                  {this.renderInput("house_no", "House No.")}
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

export default PatientForm;
