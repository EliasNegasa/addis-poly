import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { StyledSubHeading } from "../styled-components/heading";
import { IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

export default function Popup({
  title,
  children,
  openPopup,
  setOpenPopup,
  setId,
  size,
  fullScreen,
}) {
  return (
    <>
      <Dialog
        open={openPopup}
        fullWidth={true}
        maxWidth={size ? size : "sm"}
        fullScreen={fullScreen ? fullScreen : false}
      >
        <DialogTitle>
          <div style={{ display: "flex" }}>
            <StyledSubHeading left style={{ flexGrow: 1, margin: 0 }}>
              <div>{title}</div>
            </StyledSubHeading>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpenPopup(false);
                setId("");
              }}
            >
              <IconButton edge="start" color="inherit" aria-label="close">
              <CloseIcon />
            </IconButton>
            </span>
          </div>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </>
  );
}
