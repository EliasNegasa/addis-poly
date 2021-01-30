import React from "react";
import { Message, StyledTextArea } from "../styled-components/styledForm";

const TextArea = ({ name, label, errors, ...rest }) => {
  return (
    <div className="field-div">
      <StyledTextArea
        id={name}
        {...rest}
        name={name}
        placeholder={`${label}`}
      />
      {/* {console.log("ERRORS: ", errors.message)} */}
      {errors && (
        <Message role="alert">
          <i className="fa fa-exclamation-triangle"></i> {errors}
        </Message>
      )}
    </div>
  );
};

export default TextArea;
