import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ActionButton from "../../common/button";
import { StyledBadge, StyledFlex } from "../../styled-components/container";
import LabRequestForm from "./labRequestForm";
import FullScreenDialog from "../../common/fullScreenDialog";

const useStyles = makeStyles({
  root: {
    width: "22%",
    minWidth: 200,
    margin: "1rem",
  },
  rootRed: {
    borderLeft: "5px solid #ff0000",
  },
  rootYellow: {
    borderLeft: "5px solid #f9b115",
  },
  rootGreen: {
    borderLeft: "5px solid #2eb85c",
  },
  cardNumber: {
    fontSize: 14,
  },
  badge: {
    marginBottom: 0,
  },
  cc: {
    paddingBottom: 0,
  },
  btn: {
    margin: "0 0 0 auto",
  },
});

const LabRequestCard = ({ labRequests, onUpdated }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [id, setId] = useState("");

  const handleClickOpen = (id) => {
    setOpenPopup(true);
    setId(id);
  };

  const setCardClass = (requestStatus) => {
    if (requestStatus === "New") {
      return classes.rootRed;
    }
    if (requestStatus === "Done") {
      return classes.rootGreen;
    } else {
      return classes.rootYellow;
    }
  };

  const classes = useStyles();
  console.log("PROPS", labRequests);
  return (
    <>
      <ActionButton
        onClick={() => setOpenPopup(true)}
        label="Request Lab Test"
        icon={<AddIcon />}
      />
      <StyledFlex wrap>
        {labRequests.map((labRequest) => (
          <Card
            key={labRequest.id}
            className={`${classes.root} ${setCardClass(labRequest.status)}`}
          >
            <CardContent className={classes.cc}>
              <Typography
                className={classes.cardNumber}
                color="textSecondary"
                gutterBottom
              >
                {labRequest.patient.cardNumber}
              </Typography>
              <Typography variant="h6" component="h2">
                {`${labRequest.patient.firstName} ${labRequest.patient.fatherName} ${labRequest.patient.grandName}`}
              </Typography>
              <>
                {labRequest.testTypes.map((testType) => (
                  <span style={{ fontSize: "11px" }}>{testType.name}, </span>
                ))}
              </>
              <Typography className={classes.badge} color="textSecondary">
                {labRequest.status === "New" ? (
                  <StyledBadge new>{labRequest.status}</StyledBadge>
                ) : labRequest.status === "Done" ? (
                  <StyledBadge approved>{labRequest.status}</StyledBadge>
                ) : (
                  <StyledBadge pending>{labRequest.status}</StyledBadge>
                )}
              </Typography>
            </CardContent>
            <CardActions>
              {labRequest.status === "Done" ? (
                <Button size="small" className={classes.btn}>
                  View Result
                </Button>
              ) : (
                <></>
              )}
            </CardActions>
          </Card>
        ))}
      </StyledFlex>
      <FullScreenDialog
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setId={setId}
        title={
          id ? <span>Edit Lab Request</span> : <span>Add Lab Request</span>
        }
      >
        <LabRequestForm
          id={id}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          setId={setId}
          onUpdated={onUpdated}
        />
      </FullScreenDialog>
    </>
  );
};

export default LabRequestCard;
