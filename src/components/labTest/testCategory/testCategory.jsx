import React, { Component } from "react";
import { getTestCategories } from "../../../services/testCategoryService";
import Spinner from "../../common/button";
import { StyledSubHeading } from "../../styled-components/heading";
import TestCategoryList from "./testCategoryList";

class TestCategory extends Component {
  state = {
    testCategories: [],
    loading: false,
    isUpdated: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data } = await getTestCategories();
    this.setState({ testCategories: data.testCategories, loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.isUpdated !== this.state.isUpdated) {
      const { data } = await getTestCategories();
      console.log("TC", data.testCategories);
      this.setState({ testCategories: data.testCategories, isUpdated: false });
    }
  }

  handleIsUpdated = () => {
    this.setState({ isUpdated: true });
  };

  render() {
    const { testCategories, loading } = this.state;

    return (
      <>
        <StyledSubHeading left>Available Test Categories</StyledSubHeading>
        {loading && <Spinner />}
        <TestCategoryList
          testCategories={testCategories}
          onUpdated={this.handleIsUpdated}
        />
      </>
    );
  }
}

export default TestCategory;
