import * as React from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
  } from 'react-router-dom';
import Login from '../views/LoginView';
import Dashboard from '../views/DashboardView';

const Routes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
		    <Route path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  )
};
  
  export default Routes;
  