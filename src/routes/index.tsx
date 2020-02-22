import * as React from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
  } from 'react-router-dom';
import Login from '../views/LoginView';
import Home from '../views/HomeView';
import PlaylistPage from '../views/PlaylistView';

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
  