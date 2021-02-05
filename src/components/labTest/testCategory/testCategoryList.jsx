import React from "react";
import { useState } from "react";
import Popup from "../../common/popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AddIcon from "@material-ui/icons/Add";
import ActionButton from "../../common/button";
import TestCategoryForm from "./testCategoryForm";
import { makeStyles } from "@material-ui/core/styles";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Divider from "@material-ui/core/Divider";

import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderColor: "#f0f0f0",
  },
}));

const TestCategoryList = ({ testCategories, onUpdated }) => {
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
        label="Add Test Category"
        icon={<AddIcon />}
      />
      {testCategories.map((testCategory) => (
        <div className={classes.root} key={testCategory.id}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary={testCategory.name} />

              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <span onClick={() => handleClickOpen(testCategory.id)}>
                    <EditOutlinedIcon style={{ color: "#face6e" }} />
                  </span>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <Divider />
        </div>
      ))}
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setId={setId}
        title={
          id ? <span>Edit Test Category</span> : <span>Add Test Category</span>
        }
      >
        <TestCategoryForm
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

export default TestCategoryList;
