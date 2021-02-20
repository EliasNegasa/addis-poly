import React from "react";
import _ from "lodash";
import BackdropLoader from "../common/Backdrop";
import Form from "../common/form";
import Spinner from "../common/spinner";
import { StyledFormContainer } from "../styled-components/styledForm";
import { filterPatients } from "../../services/patientService";
import { StyledFlex } from "../styled-components/container";

const Joi = require("joi-browser");

class SearchForm extends Form {
  state = {
    data: {
      firstName: "",
      fatherName: "",
      grandName: "",
      phoneNo: "",
      houseNo: "",
    },
    errors: {},
    loading: false,
    backdrop: false,
  };

  schema = {
    firstName: Joi.label("First Name"),
    fatherName: Joi.label("Last Name"),
    grandName: Joi.label("Grand Name"),
    phoneNo: Joi.label("Phone"),
    houseNo: Joi.label("House No."),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    console.log("Data", data);

    const updatedData = _.omitBy(data, function (emp) {
      return emp === "" || emp == null;
    });

    let query = "";
    _.forIn(updatedData, function (value, key) {
      query += (query ? "&" : "") + `${key}=${value}`;
      console.log("QUERY", query);
    });

    this.setState({ backdrop: true });

    try {
      const { data } = await filterPatients(query);
      console.log("DATA", data.patients);

      this.setState({
        backdrop: false,
      });
      this.props.setSearchResult(data.patients);
      this.props.onCount(data.count);
      this.props.setOpenPopup(false);
      this.props.setIsSearch(false);
    } catch (ex) {
      if (ex.response && ex.response.status !== 200) {
        this.setState({
          backdrop: false,
        });
      }
    }
  };

  render() {
    const { backdrop, loading } = this.state;
    return (
      <>
        {backdrop && <BackdropLoader />}
        {loading && <Spinner />}
        {!loading && (
          <>
            <form onSubmit={this.handleSubmit}>
              <StyledFlex>
                <StyledFormContainer>
                  {this.renderInput("firstName", "First Name")}
                  {this.renderInput("fatherName", "Father's Name")}
                  {this.renderInput("grandName", "Grand Father's Name")}
                </StyledFormContainer>
                <StyledFormContainer>
                  {this.renderInput("phoneNo", "Phone", "number")}
                  {this.renderInput("houseNo", "House No.")}
                </StyledFormContainer>
              </StyledFlex>
              {this.renderButton("Search")}
            </form>
          </>
        )}
      </>
    );
  }
}

export default SearchForm;
