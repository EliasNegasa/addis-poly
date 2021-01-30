import React from "react";
import { store } from "react-notifications-component";
import "animate.css";

const Notification = ({ title, message, type }) => {
  const notification = {
    title: title,
    message: message,
    type: type,
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
  };
  return (
    <>
      {store.addNotification({
        ...notification,
        dismiss: {
          duration: 3000,
        },
      })}
    </>
  );
};

export default Notification;
