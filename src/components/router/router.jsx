import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../home';
import JobDetails from '../jobs/jobDetails';
import JobForm from '../jobs/jobForm';
import Jobs from '../jobs/jobs';
import LoginForm from '../auth/loginForm';
import LowbedForm from '../lowbed/lowbedForm';
import Lowbeds from '../lowbed/lowbeds';
import Machine from '../machine/machine';
import MachineForm from '../machine/machineForm';
import NotFound from '../notFound';
import PriceForm from '../price/priceForm';
import Price from '../price/prices';
import RequestForm from '../request/requestForm';
import Requests from '../request/requests';
import UserDetails from '../users/userDetails';
import UserForm from '../users/userForm';
import Users from '../users/users';
import AccountForm from '../accounts/accountForm';
import Account from '../accounts/account';
import LocationTracker from '../map/tracker/mapContainer';

const Router = () => {
    return (
        <Switch>
            <Redirect exact from="/users/:id/details" to="/users/:id/details/personalTab" />
            <Route exact path="/users/:id/details/:tabUrl?" render={props => <UserDetails {...props} />} />
            <Route path="/users/:id" component={UserForm} />
            <Route path="/users" component={Users} />
            <Route path='/machines/:id' component={MachineForm} />
            <Route path='/machines' component={Machine} />
            <Route path="/jobs/:id/details" component={JobDetails} />
            {/* <Route path="/jobs/:id/address" component={JobDetails} /> */}
            <Route path='/jobs/:id/map' component={Map} />
            <Route path='/jobs/:id' component={JobForm} />
            <Route path='/jobs' component={Jobs} />
            <Route path='/lowbeds/:id' component={LowbedForm} />
            <Route path='/lowbeds' component={Lowbeds} />
            <Route path='/requests/:id' component={RequestForm} />
            <Route path='/requests' component={Requests} />
            <Route path='/prices/:id' component={PriceForm} />
            <Route path='/prices' component={Price} />
            <Route path='/payments/:id' component={AccountForm} />
            <Route path='/payments' component={Account} />
            <Route path="/logout" component={LoginForm} />

            <Route path="/tracker" component={LocationTracker} />

            <Route path="/dashboard" component={Home} />
            <Redirect from="/" to="/dashboard" />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
        </Switch>
    );
}

export default Router;