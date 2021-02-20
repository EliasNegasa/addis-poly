import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  spinner: {
    color: "#000",
  },
}));

export default function Spinner({ size }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress
        color="secondary"
        className={classes.spinner}
        size={size ? size : 40}
      />
    </div>
  );
}
