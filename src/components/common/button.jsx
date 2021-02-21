import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { theme as myTheme } from "../../theme";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "0 0 0 auto",
    backgroundColor: myTheme.primary,
    color: "#fff",
    display: "flex",
    "&:hover": {
      backgroundColor: myTheme.primary,
      color: "#ececec",
    },
  },
  custom: {
    margin: "0 0 0 auto",
    backgroundColor: "#f9b115",
    color: "#000",
    display: "flex",
    "&:hover": {
      backgroundColor: "#f9b115",
      color: "#000",
    },
  },
}));

const ActionButton = ({ label, icon, onClick, custom }) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      className={custom ? `${classes.custom}` : classes.button}
      startIcon={icon}
      onClick={onClick ? onClick : null}
    >
      {label}
    </Button>
  );
};

export default ActionButton;
