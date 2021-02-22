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
      firstName: "",
      fatherName: "",
      grandName: "",
      gender: "",
      age: "",
      phone: "",
      kebele: "",
      woreda: "",
      subCity: "",
      houseNo: "",
    },
    errors: {},
    loading: false,
    backdrop: false,
    message: "",
    genderOptions: ["Male", "Female"],
    subCityOptions: [
      "Addis Ketema",
      "Akaki Kaliti",
      "Arada",
      "Bole",
      "Gullele",
      "Kirkos",
      "Kolfe Keranio",
      "Lideta",
      "Nefassilk",
      "Yeka",
    ],
  };

  schema = {
    firstName: Joi.string().required().label("First Name"),
    fatherName: Joi.string().required().label("Last Name"),
    grandName: Joi.label("Grand Name"),
    gender: Joi.label("Gender"),
    age: Joi.label("Age"),
    phone: Joi.label("Phone"),
    kebele: Joi.label("Kebele"),
    woreda: Joi.label("Woreda"),
    subCity: Joi.label("Subcity"),
    houseNo: Joi.label("House No."),
  };

  populatePatient = async () => {
    try {
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
      firstName: patient.firstName,
      fatherName: patient.fatherName,
      grandName: patient.grandName,
      gender: patient.gender,
      age: patient.age,
      phone: patient.phone,
      kebele: patient.kebele,
      woreda: patient.woreda,
      subCity: patient.subCity,
      houseNo: patient.houseNo,
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
      const { data: patient } = await savePatient(updatedData);

      this.setState({
        message: patient.result
          ? "Patient data updated Successfully"
          : "Patient created Successfully",
        messageType: "success",
        messageTitle: "Success",
        backdrop: false,
      });
      console.log("Saved");
      this.setState({ message: "" });

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
        this.setState({ message: "" });
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
            {message && (
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
                  {this.renderInput("fatherName", "Father's Name")}
                  {this.renderInput("grandName", "Grand Father's Name")}
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
                  <strong>Address Information:</strong>
                  {this.renderInput("kebele", "Kebele", "number")}
                  {this.renderInput("woreda", "Woreda", "number")}
                  {this.renderSelect(
                    "subCity",
                    "Subcity",
                    this.state.subCityOptions
                  )}
                  {this.renderInput("houseNo", "House No.")}
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
