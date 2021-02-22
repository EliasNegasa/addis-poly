import React, { Component } from "react";
import _ from "lodash";
import Input from "./input";
import SaveIcon from "@material-ui/icons/Save";
import TextArea from "./textArea";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import SelectInput from "./select";
import PreloadedSelect from "./preloadedSelect";
import { StyledButton } from "../styled-components/button";
import MultiSelect from "./multiSelect";

const Joi = require("joi-browser");

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const { data } = this.state;
    const { error } = Joi.validate(data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const fieldschema = { [name]: this.schema[name] ? this.schema[name] : "" };
    const { error } = Joi.validate(obj, fieldschema);
    if (name === "phone") {
      if (value && (value.length < 10 || value.length > 17)) {
        return "Invalid Phone No.";
      }
    }
    if (name.includes("tType")) {
      if (value == null || value === "") return `Required`;
      return null;
    }
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    console.log("SAVE CLICKED");
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return console.log("ERROR OCCURED", errors);
    this.doSubmit();
  };

  handleFileChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.files[0];
    console.log("FILE", data[input.name]);
    this.setState({ data });
  };

  handleChange = ({ currentTarget: input }) => {
    //e.currentTarget
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    console.log("errorMessage", errorMessage);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] =
      input.type === "checkbox" ? input.checked : input.value || "";
    this.setState({ data, errors });
  };

  handlePreloadedSelectChange(e, name) {
    const data = { ...this.state.data };
    data[name] = e.value;
    this.setState({ data });
  }

  handleMultiSelectChange(e, name) {
    const data = { ...this.state.data };
    let valueArray = _.map(e, "value");
    data[name] = valueArray;
    this.setState({ data });
  }

  handleDateChange = (date, name) => {
    const data = { ...this.state.data };
    data[name] = date;
    this.setState({ data });
  };

  renderButton = (label) => {
    if (label === "Save") {
      return (
        <StyledButton square right>
          <SaveIcon /> {label}
        </StyledButton>
      );
    }
    return (
      <StyledButton square right noIcon>
        {label}
      </StyledButton>
    );
  };

  renderInput = (name, label, type = "text", disabled = false) => {
    const { data, errors } = this.state;
    return (
      <Input
        value={data[name] ? data[name] : ""}
        onChange={this.handleChange}
        type={type}
        name={name}
        label={label}
        errors={errors[name]}
        disabled={disabled}
      />
    );
  };

  renderCheckBox = (name, label) => {
    const { data, errors } = this.state;
    return (
      <FormControlLabel
        control={
          <Checkbox
            onChange={this.handleChange}
            name={name}
            color="primary"
            checked={data[name] ? data[name] : false}
            errors={errors[name]}
          />
        }
        label={label}
      />
    );
  };

  renderTextArea = (name, label) => {
    const { data, errors } = this.state;
    return (
      <TextArea
        value={data[name]}
        onChange={this.handleChange}
        name={name}
        label={label}
        errors={errors[name]}
      ></TextArea>
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <SelectInput
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        errors={errors[name]}
      />
    );
  };

  renderPreloadedSelect = (name, label, options) => {
    const { data } = this.state;
    return (
      <PreloadedSelect
        options={options}
        placeholder={label}
        onChange={(e) => this.handlePreloadedSelectChange(e, name)}
        // setValue={data[name] ? data[name] : undefined}
        value={data[name]}
      />
    );
  };

  renderMultiSelect = (name, label, options) => {
    // const { data } = this.state;
    return (
      <MultiSelect
        options={options}
        placeholder={label}
        onChange={(e) => this.handleMultiSelectChange(e, name)}
        // setValue={data[name] ? data[name] : undefined}
        // value={data[name]}
      />
    );
  };
}

export default Form;
