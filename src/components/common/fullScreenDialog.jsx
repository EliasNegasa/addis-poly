import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  AppBar,
  IconButton,
  makeStyles,
  Slide,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { theme as myTheme } from "../../theme";
import { StyledFlex } from "../styled-components/container";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: myTheme.dark,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: "#39f",
    padding: "12px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  title,
  children,
  openPopup,
  setOpenPopup,
  setId,
  setIsResult,
}) {
  const classes = useStyles();

  return (
    <>
      <Dialog
        open={openPopup}
        fullWidth={true}
        fullScreen={true}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <StyledFlex>
                <div style={{ flexGrow: 1, margin: 0 }}>
                  <Typography className={classes.title} variant="h6">
                    {title}
                  </Typography>
                </div>
                <IconButton
                  onClick={() => {
                    setOpenPopup(false);
                    setId("");
                    setIsResult("");
                  }}
                  edge="start"
                  color="inherit"
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </StyledFlex>
            </Toolbar>
          </AppBar>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </>
  );
}
