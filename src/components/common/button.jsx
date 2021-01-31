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
}));

const ActionButton = ({ label, icon, onClick }) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      className={classes.button}
      startIcon={icon}
      onClick={onClick ? onClick : null}
    >
      {label}
    </Button>
  );
};

export default ActionButton;
