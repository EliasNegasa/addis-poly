import React, { Component } from "react";
import { getLabRequests } from "../../../services/labRequestService";
import Spinner from "../../common/spinner";
import { StyledSubHeading } from "../../styled-components/heading";
import LabRequestCard from "./labRequestCard";

class LabRequests extends Component {
  state = {
    labRequests: [],
    loading: false,
    isUpdated: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const { data } = await getLabRequests();
    this.setState({
      labRequests: data.labRequests,
      loading: false,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.isUpdated !== this.state.isUpdated) {
      this.setState({ loading: true });
      const { data } = await getLabRequests();
      this.setState({
        labRequests: data.labRequests,
        loading: false,
        isUpdated: false,
      });
    }
  }

  handleIsUpdated = () => {
    this.setState({ isUpdated: true });
  };

  // handleSearch = (query) => {
  //   this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  // };

  render() {
    const { labRequests, loading } = this.state;
    return (
      <>
        <StyledSubHeading left>Lab Requests List</StyledSubHeading>
        {loading && <Spinner />}
        {labRequests && (
          <LabRequestCard
            labRequests={labRequests}
            onUpdated={this.handleIsUpdated}
          />
        )}
      </>
    );
  }
}

export default LabRequests;
