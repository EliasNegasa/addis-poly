import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../home";
import LoginForm from "../auth/loginForm";
import PatientForm from "../patients/patientForm";
import Patients from "../patients/patients";
import NotFound from "../notFound";
import UserForm from "../users/userForm";
import Users from "../users/users";
import TestCategory from "../labTest/testCategory/testCategory";
import TestType from "../labTest/testType/testType";
import LabRequests from "../labs/labRequest/labRequests";

const Router = () => {
  return (
    <Switch>
      <Route path="/patients/:id" component={PatientForm} />
      <Route path="/patients" component={Patients} />
      
      <Route path="/users/:id" component={UserForm} />
      <Route path="/users" component={Users} />

      <Route path="/labRequests/:id" component={LabRequests} />
      <Route path="/labRequests" component={LabRequests} />

      <Route path="/testCategory" component={TestCategory} />
      <Route path="/testCategory/:id" component={TestCategory} />

      <Route path="/testType" component={TestType} />
      <Route path="/testType/:id" component={TestType} />

      <Route path="/logout" component={LoginForm} />

      <Route path="/dashboard" component={Home} />
      <Redirect from="/" to="/dashboard" />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Router;
