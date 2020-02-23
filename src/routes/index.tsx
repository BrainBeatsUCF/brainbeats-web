import * as React from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
  } from 'react-router-dom';
import Login from '../views/LoginView';
<<<<<<< HEAD
import Home from '../views/HomeView';
import PlaylistPage from '../views/PlaylistView';
=======
import Register from '../views/Register';
import Dashboard from '../views/DashboardView';
import PlaylistDetails from '../views/PlaylistDetails';
>>>>>>> Added playlistdetails view

const Routes = (): JSX.Element => {
  
  return (
    <BrowserRouter>
      <Switch>
		    <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/playlists" component={PlaylistPage} />
      </Switch>
    </BrowserRouter>
  )
};
  
export default Routes;
  