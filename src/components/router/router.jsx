import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../home";
import LoginForm from "../auth/loginForm";
import PatientForm from "../patients/patientForm";
import Patients from "../patients/patients";
import NotFound from "../notFound";
import SignIn from "../auth/login2";
import UserForm from "../users/userForm";
import Users from "../users/users";

const Router = () => {
  return (
    <Switch>
      <Route path="/patients/:id" component={PatientForm} />
      <Route path="/patients" component={Patients} />
      <Route path="/users/:id" component={UserForm} />
      <Route path="/users" component={Users} />
      <Route path="/logout" component={LoginForm} />
      {/* <Route path="/logout" component={SignIn} /> */}

      <Route path="/dashboard" component={Home} />
      <Redirect from="/" to="/dashboard" />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Router;