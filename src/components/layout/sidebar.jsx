import React from "react";
import clsx from "clsx";
import { StyledLogo, StyledSideBar } from "../styled-components/container";
import NavBar from "./navbar";
// import logo from "../../logo.JPG";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  makeStyles,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#313945",
    overflow: "hidden",
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },

  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    backgroundColor: "#252b32",
    ...theme.mixins.toolbar,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  chevron: {
    color: "#fff",
  },
}));

const SideBar = ({ open, setOpen }) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <StyledLogo>
          logo
          {/* <img src={logo} alt="logo" /> */}
        </StyledLogo>
        <IconButton onClick={setOpen}>
          <ChevronLeftIcon className={classes.chevron} />
        </IconButton>
      </div>
      <Divider />
      <List>
        <StyledSideBar>
          <NavBar />
        </StyledSideBar>{" "}
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideBar;
