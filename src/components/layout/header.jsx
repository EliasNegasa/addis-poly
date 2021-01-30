import {
    AppBar,
    Badge,
    IconButton,
    makeStyles,
    Toolbar,
    Typography,
  } from "@material-ui/core";
  import React from "react";
  import clsx from "clsx";
  import Profile from "../auth/profile";
  import { StyledHeader } from "../styled-components/containers";
  import NotificationsIcon from "@material-ui/icons/Notifications";
  import MenuIcon from "@material-ui/icons/Menu";
  
  const drawerWidth = 240;
  
  const useStyles = makeStyles((theme) => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: "#fff",
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    toolbar: {
      paddingRight: 24,
    },
  
    title: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: 36,
      color: "#252b32",
    },
    menuButtonHidden: {
      display: "none",
    },
  }));
  
  const Header = ({ user, open, setOpen }) => {
    const classes = useStyles();
  
    return (
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={setOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Admin Panel
          </Typography>
          <IconButton>
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <StyledHeader>
            <Profile user={user} />
          </StyledHeader>
        </Toolbar>
      </AppBar>
    );
  };
  
  export default Header;
  