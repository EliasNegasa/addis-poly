import React from "react";
import { Link } from "react-router-dom";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import Popup from "../common/popup";
import { useState } from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchBox from "../common/searchBox";
import TableBox from "../common/table";
import ActionButton from "../common/button";
import PatientForm from "./patientForm";
import { StyledFlex } from "../styled-components/container";
import { StyledLink } from "../styled-components/button";
import SearchForm from "./searchForm";

const PatientsTable = ({
  patients,
  onSort,
  sortColumn,
  searchValue,
  onSearchChange,
  onUpdated,
  onCount,
}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [id, setId] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [searchResult, setSearchResult] = useState("");

  const columns = [
    { path: "cardNumber", label: "Card Number" },
    { path: "firstName", label: "First Name" },
    { path: "fatherName", label: "Father's Name" },
    { path: "grandName", label: "GrandFather's Name" },
    { path: "gender", label: "Gender" },
    { path: "age", label: "Age" },
    { path: "phone", label: "Phone" },
    { path: "createdAt", label: "Registered Date" },
    {
      key: "edit",
      content: (patient) => (
        <div>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleClickOpen(patient.id)}
          >
            <EditOutlinedIcon style={{ color: "#f9b115" }} />
          </span>
          <Link to={`/patients/${patient.id}/details`}>
            <VisibilityOutlinedIcon style={{ color: "#b7b7b7" }} />
          </Link>
        </div>
      ),
    },
  ];

  const handleClickOpen = (id) => {
    setOpenPopup(true);
    setId(id);
  };

  const handleAdvancedSearch = (isSearch) => {
    isSearch && setOpenPopup(true);
    !isSearch && setSearchResult("");
    setIsSearch(isSearch);
    console.log("SEARCH RESURLT", searchResult);
  };

  return (
    <>
      <StyledFlex center>
        <SearchBox value={searchValue} onChange={onSearchChange} />
        {searchResult ? (
          <>
            <StyledLink onClick={() => handleAdvancedSearch(true)}>
              Edit Search
            </StyledLink>{" "}
            <StyledLink onClick={() => handleAdvancedSearch(false)}>
              Clear Search
            </StyledLink>
          </>
        ) : (
          <StyledLink onClick={() => handleAdvancedSearch(true)}>
            Advanced Search
          </StyledLink>
        )}
        <ActionButton
          onClick={() => setOpenPopup(true)}
          label="Add Patient"
          icon={<PersonAddIcon />}
        />
      </StyledFlex>
      <TableBox
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={searchResult ? searchResult : patients}
      />
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setId={setId}
        title={
          id ? (
            <span>Edit Patient</span>
          ) : isSearch ? (
            <span>Advanced Search</span>
          ) : (
            <span>Add Patient</span>
          )
        }
      >
        {isSearch ? (
          <SearchForm
            setOpenPopup={setOpenPopup}
            openPopup={openPopup}
            onUpdated={onUpdated}
            onCount={onCount}
            setSearchResult={setSearchResult}
            setIsSearch={setIsSearch}
          />
        ) : (
          <PatientForm
            id={id}
            setOpenPopup={setOpenPopup}
            openPopup={openPopup}
            setId={setId}
            onUpdated={onUpdated}
          />
        )}
      </Popup>
    </>
  );
};

export default PatientsTable;
