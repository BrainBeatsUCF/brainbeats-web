import * as React from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
  } from 'react-router-dom';
import Login from '../views/LoginView';
import Register from '../views/Register';
import Dashboard from '../views/DashboardView';
import PlaylistDetails from '../views/PlaylistDetails';

const Routes = (): JSX.Element => {
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/playlist/:playlistId" component={PlaylistDetails} />
      </Switch>
    </BrowserRouter>
  )
};
  
export default Routes;
  