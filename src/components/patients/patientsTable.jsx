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

const PatientsTable = ({
  patients,
  onSort,
  sortColumn,
  searchValue,
  onSearchChange,
  onUpdated,
}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [id, setId] = useState("");

  const columns = [
    { path: "card_number", label: "Card Number" },
    { path: "firstname", label: "First Name" },
    { path: "fathername", label: "Father's Name" },
    { path: "grandname", label: "GrandFather's Name" },
    { path: "gender", label: "Gender" },
    { path: "age", label: "Age" },
    { path: "phone", label: "Phone" },
    { path: "created_date", label: "Registered Date" },
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
            <VisibilityOutlinedIcon style={{ color: "#000" }} />
          </Link>
        </div>
      ),
    },
  ];

  const handleClickOpen = (id) => {
    setOpenPopup(true);
    setId(id);
  };

  return (
    <>
      <ActionButton
        onClick={() => setOpenPopup(true)}
        label="Add Patient"
        icon={<PersonAddIcon />}
      />
      <SearchBox value={searchValue} onChange={onSearchChange} />
      <TableBox
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={patients}
      />
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setId={setId}
        title={id ? <span>Edit Patient</span> : <span>Add Patient</span>}
      >
        <PatientForm
          id={id}
          setOpenPopup={setOpenPopup}
          openPopup={openPopup}
          setId={setId}
          onUpdated={onUpdated}
        />
      </Popup>
    </>
  );
};

export default PatientsTable;
