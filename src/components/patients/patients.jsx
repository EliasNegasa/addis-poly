import React, { Component } from "react";
import _ from "lodash";
import { paginate } from "../../utils/paginate";
import { getPatients } from "../../services/patientService";
import Pagination from "../common/pagination";
import { StyledPaginationContainer } from "../styled-components/container";
import { StyledSubHeading } from "../styled-components/heading";
import Spinner from "../common/spinner";
import PatientsTable from "../patients/patientsTable";

class Patients extends Component {
  state = {
    patients: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "firstname", order: "asc" },
    loading: false,
    isUpdated: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: patients } = await getPatients();
    this.setState({ patients, loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.isUpdated !== this.state.isUpdated) {
      this.setState({ loading: true });
      const { data: patients } = await getPatients();
      this.setState({ patients, loading: false, isUpdated: false });
    }
  }

  handleIsUpdated = () => {
    this.setState({ isUpdated: true });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      searchQuery,
      sortColumn,
      patients: allPatients,
    } = this.state;

    let filtered = allPatients;
    if (searchQuery)
      filtered = allPatients.filter(
        (patients) =>
          (patients.card_number &&
            patients.card_number
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (patients.firstname &&
            patients.firstname
              .toLowerCase()
              .startsWith(searchQuery.toLowerCase())) ||
          (patients.fathername &&
            patients.fathername
              .toLowerCase()
              .startsWith(searchQuery.toLowerCase())) ||
          (patients.grandname &&
            patients.grandname
              .toLowerCase()
              .startsWith(searchQuery.toLowerCase()))
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const patients = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: patients };
  };

  render() {
    const { pageSize, currentPage, sortColumn, loading } = this.state;

    const { totalCount, data: patients } = this.getPagedData();
    return (
      <>
        <StyledSubHeading left>Patients List</StyledSubHeading>
        <PatientsTable
          patients={patients}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onSearchChange={this.handleSearch}
          searchValue={this.searchQuery}
          onUpdated={this.handleIsUpdated}
        />
        {loading && <Spinner />}

        <StyledPaginationContainer>
          <p>Showing {totalCount} Patients</p>
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </StyledPaginationContainer>
      </>
    );
  }
}

export default Patients;
