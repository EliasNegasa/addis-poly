import React, { Component } from "react";
import _ from "lodash";
import { paginate } from "../../utils/paginate";
import { getPatients } from "../../services/patientService";
import { StyledSubHeading } from "../styled-components/heading";
import Spinner from "../common/spinner";
import PatientsTable from "../patients/patientsTable";
import TablePaginate from "../common/TablePagination";

class Patients extends Component {
  state = {
    patients: [],
    currentPage: 0,
    pageSize: 50,
    searchQuery: "",
    sortColumn: { path: "cardNumber", order: "desc" },
    loading: false,
    isUpdated: false,
    count: 0,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const { data } = await getPatients();
      this.setState({
        patients: data.patients,
        count: data.count,
        loading: false,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.isUpdated !== this.state.isUpdated) {
      this.setState({ loading: true });
      const { data } = await getPatients();
      this.setState({
        patients: data.patients,
        loading: false,
        isUpdated: false,
      });
    }
  }

  handleIsUpdated = () => {
    this.setState({ isUpdated: true });
  };

  handleCount = (cnt) => {
    this.setState({ count: cnt });
  };

  handlePageChange = (event, newPage) => {
    this.setState({ currentPage: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      pageSize: parseInt(event.target.value, 10),
      currentPage: 0,
    });
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
          (patients.cardNumber &&
            patients.cardNumber
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (patients.firstName &&
            patients.firstName
              .toLowerCase()
              .startsWith(searchQuery.toLowerCase())) ||
          (patients.fatherName &&
            patients.fatherName
              .toLowerCase()
              .startsWith(searchQuery.toLowerCase())) ||
          (patients.grandName &&
            patients.grandName
              .toLowerCase()
              .startsWith(searchQuery.toLowerCase())) ||
          (patients.phone && patients.phone.includes(searchQuery))
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const patients = paginate(sorted, currentPage, pageSize);
    return filtered ? { totalCount: filtered.length, data: patients } : 0;
  };

  render() {
    const { pageSize, currentPage, sortColumn, loading } = this.state;

    const { totalCount, data: patients } = this.getPagedData();
    return (
      <>
        <StyledSubHeading left padding>
          Patients List
        </StyledSubHeading>
        <PatientsTable
          patients={patients}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onSearchChange={this.handleSearch}
          searchValue={this.searchQuery}
          onUpdated={this.handleIsUpdated}
          onCount={this.handleCount}
        />
        {loading && <Spinner />}

        {!loading && totalCount && (
          <TablePaginate
            count={totalCount}
            page={currentPage}
            onChangePage={this.handlePageChange}
            rowsPerPage={pageSize}
            // onChangeRowsPerPage={(event) => this.handleChangeRowsPerPage(event)}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        )}
      </>
    );
  }
}

export default Patients;
