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
import LabResultForm from "../labResult/labResultForm";

const useStyles = makeStyles({
  root: {
    width: "22%",
    minWidth: 200,
    margin: "1rem",
  },
  rootRed: {
    borderLeft: "2px solid #da0000",
  },
  rootYellow: {
    borderLeft: "2px solid #f9b115",
  },
  rootGreen: {
    borderLeft: "2px solid #2eb85c",
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
  name: {
    color: "#828282",
  },
});

const LabRequestCard = ({ labRequests, onUpdated }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [id, setId] = useState("");
  const [isResult, setIsResult] = useState(false);

  const handleClickOpen = (id, isResult) => {
    console.log("ID", id);
    setOpenPopup(true);
    setId(id);
    setIsResult(isResult);
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
  return (
    <>
      <ActionButton
        onClick={() => setOpenPopup(true)}
        label="Request Lab Test"
        icon={<AddIcon />}
      />
      <StyledFlex wrapFlex>
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
              <Typography variant="h6" component="h2" className={classes.name}>
                {`${labRequest.patient.firstName} ${labRequest.patient.fatherName} ${labRequest.patient.grandName}`}
              </Typography>
              {/* <>
                {labRequest.testTypes.map((testType) => (
                  <span style={{ fontSize: "11px" }}>{testType.name}, </span>
                ))}
              </> */}
              {labRequest.physician && (
                <Typography style={{ fontSize: "11px" }}>
                  Requested By: {labRequest.physician.firstName}
                </Typography>
              )}
              {labRequest.updater && (
                <Typography style={{ fontSize: "11px" }}>
                  Result By: {labRequest.updater.firstName}
                </Typography>
              )}
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
              ) : labRequest.status === "New" ? (
                <Button
                  onClick={() => handleClickOpen(labRequest.id, true)}
                  size="small"
                  className={classes.btn}
                >
                  Take
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
        setIsResult={setIsResult}
        title={
          !id ? (
            <span>Add Lab Request</span>
          ) : isResult ? (
            <span>Submit Lab Result</span>
          ) : (
            <span>Edit Lab Request</span>
          )
        }
      >
        {isResult ? (
          <LabResultForm
            id={id}
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            setId={setId}
            onUpdated={onUpdated}
          />
        ) : (
          <LabRequestForm
            id={id}
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            setId={setId}
            onUpdated={onUpdated}
          />
        )}
      </FullScreenDialog>
    </>
  );
};

export default LabRequestCard;
