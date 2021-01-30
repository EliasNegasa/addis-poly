import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import AvatarImage from "../common/avatar";
import auth from "../../services/authService";

const useStyles = makeStyles((theme) => ({
  paper: {
    border: "1px solid #fcfcfc",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    boxShadow: "2px 2px 18px 4px rgba(0,0,0,0.1)",
    zIndex: 99999,
  },
}));

const Profile = ({ user }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleLogout = () => {
    auth.logout();
    window.location = "/login";
  };

  return (
    <>
      <div className="header-profile">
        <div className="user-name">{user.username}</div>
        <div>
          <div
            className="logoutButton"
            aria-describedby={id}
            onClick={handleClick}
          >
            <AvatarImage />
          </div>
          <Popper id={id} open={open} anchorEl={anchorEl}>
            <div className={classes.paper} onClick={handleLogout}>
              Logout
            </div>
          </Popper>
        </div>
      </div>
    </>
  );
};

export default Profile;
