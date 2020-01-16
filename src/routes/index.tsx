import * as React from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
  } from 'react-router-dom';
import Login from '../views/Login';
import Home from '../views/Home';

const Routes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
		    <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  )
};
  
  export default Routes;
  