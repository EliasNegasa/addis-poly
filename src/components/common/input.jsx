import { TextField } from "@material-ui/core";
import React from "react";
import { Message } from "../styled-components/styledForm";

const Input = ({ name, label, errors, ...rest }) => {
  return (
    <div className="field-div">
      <TextField
        id={name}
        {...rest}
        name={name}
        label={label}
        variant="outlined"
        color="secondary"
        fullWidth
      />

      {errors && (
        <Message role="alert">
          <i className="fa fa-exclamation-triangle"></i> {errors}
        </Message>
      )}
    </div>
  );
};

export default Input;

/* <StyledInput id={name} {...rest} name={name} placeholder={`${label}`} /> */
/* {console.log("ERRORS: ", errors.message)} */
