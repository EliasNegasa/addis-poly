import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./header";
import SideBar from "./sidebar";
import {
  StyledContainer,
  StyledContent,
  StyledSubContainer,
} from "../styled-components/container";
import Router from "../router/router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

export default function BoxContainer({ user }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Header open={open} setOpen={handleDrawerOpen} user={user} />
      <SideBar open={open} setOpen={handleDrawerClose} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <StyledContainer>
          <StyledContent>
            <StyledSubContainer>
              <Router />
            </StyledSubContainer>
          </StyledContent>
        </StyledContainer>
      </main>
    </div>
  );
}
