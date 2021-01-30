import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../home';
import LoginForm from '../auth/loginForm';
import PatientForm from '../patients/patientForm';
import Patients from '../patients/patients';
import NotFound from '../notFound';

const Router = () => {
    return (
        <Switch>
            
            <Route path="/patients/:id" component={PatientForm} />
            <Route path="/patients" component={Patients} />
            
            <Route path="/logout" component={LoginForm} />

            <Route path="/dashboard" component={Home} />
            <Redirect from="/" to="/dashboard" />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
        </Switch>
    );
}

export default Router;