import React from "react";
import { NavLink } from "react-router-dom";
import { StyledNav } from "../styled-components/container";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
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
        <NavLink className="nav-link" to="/labs">
          <LocalShippingOutlinedIcon className={classes.navIcon} /> Labs
        </NavLink>
      </StyledNav>

    </ul>
  );
};

export default NavBar;
