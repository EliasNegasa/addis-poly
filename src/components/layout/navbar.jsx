import React from "react";
import { NavLink } from "react-router-dom";
import { StyledNav } from "../styled-components/container";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import SpeakerNotesOutlinedIcon from "@material-ui/icons/SpeakerNotesOutlined";
import SupervisedUserCircleOutlinedIcon from "@material-ui/icons/SupervisedUserCircleOutlined";
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  navIcon: {
    fontSize: "1.75rem",
  },
});

const NavBar = () => {
  const classes = useStyles();
  return (
    <ul>
      <StyledNav>
        <NavLink className="nav-link" to="/dashboard">
          <DashboardOutlinedIcon className={classes.navIcon} /> Dashboard
        </NavLink>
      </StyledNav>
      <StyledNav>
        <NavLink className="nav-link" to="/patients">
          <PeopleAltOutlinedIcon className={classes.navIcon} /> Patients
        </NavLink>
      </StyledNav>
      <StyledNav>
        <NavLink className="nav-link" to="/labRequests">
          <QuestionAnswerOutlinedIcon className={classes.navIcon} /> Labs
          Requests
        </NavLink>
      </StyledNav>
      <StyledNav>
        <NavLink className="nav-link" to="/labResults">
          <SpeakerNotesOutlinedIcon className={classes.navIcon} /> Labs Results
        </NavLink>
      </StyledNav>
      <StyledNav>
        <NavLink className="nav-link" to="/users">
          <SupervisedUserCircleOutlinedIcon className={classes.navIcon} /> Users
        </NavLink>
      </StyledNav>
      <StyledNav>
        <NavLink className="nav-link" to="/testCategory">
          <NoteAddOutlinedIcon className={classes.navIcon} /> Test Category
        </NavLink>
      </StyledNav>
      <StyledNav>
        <NavLink className="nav-link" to="/testType">
          <NoteAddOutlinedIcon className={classes.navIcon} /> Test Type
        </NavLink>
      </StyledNav>
    </ul>
  );
};

export default NavBar;
