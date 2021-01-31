import { FormControl, InputLabel, Select } from "@material-ui/core";
import React from "react";
import { Message } from "../styled-components/styledForm";

const SelectInput = ({ name, label, options, errors, ...rest }) => {
  return (
    <div className="field-div">
      <FormControl variant="outlined">
        <InputLabel htmlFor={name} color="secondary">
          {label}
        </InputLabel>
        <Select
          name={name}
          id={name}
          {...rest}
          native
          label={label}
          color="secondary"
        >
          <option value=""></option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FormControl>

      {errors && (
        <Message role="alert">
          <div className="alert alert-danger" role="alert">
            {errors}
          </div>
        </Message>
      )}
    </div>
  );
};

export default SelectInput;