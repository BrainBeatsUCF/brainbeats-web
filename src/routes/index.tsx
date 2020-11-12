import * as React from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
  } from 'react-router-dom';
import Login from '../views/LoginView';
import Home from '../views/HomeView';
import PlaylistPage from '../views/PlaylistView';
// import Register from '../views/Register';
import ProfileView from '../views/ProfileView';

const Routes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/playlists" component={PlaylistPage} />
        {/* <Route path="/register" component={Register} /> */}
        <Route path="/user/profile" component={ProfileView} />
      </Switch>
    </BrowserRouter>
  )
};
  
export default Routes;
  