import React from "react";
import { useState } from "react";
import Popup from "../../common/popup";
import AddIcon from "@material-ui/icons/Add";
import ActionButton from "../../common/button";
import TestTypeForm from "./testTypeForm";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { StyledFlex } from "../../styled-components/container";
import { IconButton, ListItemSecondaryAction } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    borderColor: "#f0f0f0",
  },
}));

const TestTypeList = ({ testTypes, onUpdated }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [id, setId] = useState("");

  const handleClickOpen = (id) => {
    setOpenPopup(true);
    setId(id);
  };

  const classes = useStyles();

  return (
    <>
      <ActionButton
        onClick={() => setOpenPopup(true)}
        label="Add Test Type"
        icon={<AddIcon />}
      />
      <StyledFlex wrap>
        {testTypes.map((testType) => (
          <div className={classes.root} key={testType.id}>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <ArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary={testType.name} />

                <ListItemSecondaryAction>
                  <IconButton edge="end">
                    <span onClick={() => handleClickOpen(testType.id)}>
                      <EditOutlinedIcon style={{ color: "#face6e" }} />
                    </span>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <Divider />
          </div>
        ))}
      </StyledFlex>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setId={setId}
        title={id ? <span>Edit Test Type</span> : <span>Add Test Type</span>}
      >
        <TestTypeForm
          id={id}
          setOpenPopup={setOpenPopup}
          openPopup={openPopup}
          setId={setId}
          onUpdated={onUpdated}
        />
      </Popup>
    </>
  );
};

export default TestTypeList;
