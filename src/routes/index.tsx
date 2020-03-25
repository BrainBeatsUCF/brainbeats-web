import * as React from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
  } from 'react-router-dom';
import Login from '../views/LoginView';
import Home from '../views/HomeView';
import PlaylistPage from '../views/PlaylistView';
import Register from '../views/Register';
import PlaylistDetails from '../views/PlaylistDetailsView';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

const Routes = (): JSX.Element => {
  
  return (
    <BrowserRouter>
      <Switch>
		    <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/playlists" component={PlaylistPage} />
        <Route path="/register" component={Register} />
        <Route path="/playlist/:playlistId" component={PlaylistDetails} />

        {/*  TESTING NARBAV */}
        <Route path="/navbar" component={NavBar} />
        <Route path="/sidebar" component={SideBar} />
      </Switch>
    </BrowserRouter>
  )
};
  
export default Routes;
  