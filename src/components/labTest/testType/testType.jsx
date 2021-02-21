import React, { Component } from "react";
import { getTestTypes } from "../../../services/testTypeService";
import Spinner from "../../common/spinner";
import { StyledSubHeading } from "../../styled-components/heading";
import TestTypeList from "./testTypeList";

class TestType extends Component {
  state = {
    testTypes: [],
    loading: false,
    isUpdated: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data } = await getTestTypes();
    console.log("TEST TYPE:", data);
    this.setState({ testTypes: data.testTypes, loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.isUpdated !== this.state.isUpdated) {
      const { data } = await getTestTypes();
      console.log("TC", data.testTypes);
      this.setState({ testTypes: data.testTypes, isUpdated: false });
    }
  }

  handleIsUpdated = () => {
    this.setState({ isUpdated: true });
  };

  render() {
    const { testTypes, loading } = this.state;

    return (
      <>
        <StyledSubHeading left>Available Test Types</StyledSubHeading>
        {loading && <Spinner />}
        <TestTypeList testTypes={testTypes} onUpdated={this.handleIsUpdated} />
      </>
    );
  }
}

export default TestType;
