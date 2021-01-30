import { Button, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "0 0 1rem auto",
    backgroundColor: "#ffcd11",
    color: "#000",
    display: "flex",
    "&:hover": {
      backgroundColor: "#ffcd11",
      color: "#000",
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
