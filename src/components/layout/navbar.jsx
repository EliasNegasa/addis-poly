import React from "react";
import { NavLink } from "react-router-dom";
import { StyledNav } from "../styled-components/containers";
import MapIcon from "@material-ui/icons/Map";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import SpeakerNotesOutlinedIcon from "@material-ui/icons/SpeakerNotesOutlined";
import PermDataSettingOutlinedIcon from "@material-ui/icons/PermDataSettingOutlined";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import RoomIcon from '@material-ui/icons/Room';
import CreditCardIcon from "@material-ui/icons/CreditCard";
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
        <NavLink className="nav-link" to="/users">
          <PeopleAltOutlinedIcon className={classes.navIcon} /> Users
        </NavLink>
      </StyledNav>

      <StyledNav>
        <NavLink className="nav-link" to="/lowbeds">
          <LocalShippingOutlinedIcon className={classes.navIcon} /> Machineries
        </NavLink>
      </StyledNav>
      <StyledNav>
        <NavLink className="nav-link" to="/jobs">
          <MapIcon className={classes.navIcon} /> Jobs
        </NavLink>
      </StyledNav>
      <StyledNav>
        <NavLink className="nav-link" to="/requests">
          <SpeakerNotesOutlinedIcon className={classes.navIcon} /> Requests
        </NavLink>
      </StyledNav>
      <StyledNav>
        <NavLink className="nav-link" to="/payments">
          <CreditCardIcon className={classes.navIcon} /> Accounts
        </NavLink>
      </StyledNav>
      <StyledNav>
        <NavLink className="nav-link" to="/prices">
          <MonetizationOnOutlinedIcon className={classes.navIcon} /> Price Rate
        </NavLink>
      </StyledNav>
      <StyledNav>
        <NavLink className="nav-link" to="/machines">
          <PermDataSettingOutlinedIcon className={classes.navIcon} /> Machines
        </NavLink>
      </StyledNav>
      <StyledNav>
        <NavLink className="nav-link" to="/tracker">
          <RoomIcon className={classes.navIcon} /> Track on Map
        </NavLink>
      </StyledNav>
    </ul>
  );
};

export default NavBar;
