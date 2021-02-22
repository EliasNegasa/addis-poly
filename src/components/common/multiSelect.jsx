import React from "react";
import Select from "react-select";

const MultiSelect = ({ placeholder, options, value, ...rest }) => {
  return (
    <>
      <div className="field-div">
        <Select
          options={options}
          placeholder={`Select ${placeholder}`}
          isMulti
          closeMenuOnSelect={false}
          {...rest}
        />
      </div>
    </>
  );
};

export default MultiSelect;
