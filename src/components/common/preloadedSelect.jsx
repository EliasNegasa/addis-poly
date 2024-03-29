import React from "react";
import Select from "react-select";
import _ from "lodash";

const getIndex = (options, value) => {
  return _.findIndex(options, function (option) {
    // eslint-disable-next-line eqeqeq
    return option.value == value;
  });
};

const PreloadedSelect = ({ placeholder, options, value, ...rest }) => {
  return (
    <>
      <div className="field-div">
        <Select
          options={options}
          placeholder={`Select ${placeholder}`}
          {...rest}
          value={options ? options[getIndex(options, value)] : ""}
          // selectValue={options ? options[getIndex(options, value)] : ""}
        />
      </div>
    </>
  );
};

export default PreloadedSelect;
