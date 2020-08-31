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
import ProfileView from '../views/ProfileView';
import { useAuth0 } from '@auth0/auth0-react';
import { PrivateRoute } from '../components/PrivateRoute';

const Routes = (): JSX.Element => {

  const { user, isAuthenticated } = useAuth0();
  console.log("isAuthenticated: " + isAuthenticated);

  console.log(user);
  if (user) {
    console.log(user.given_name);
  }
  
  return (
    <BrowserRouter>
      <Switch>
		    {/* <PrivateRoute exact path="/" component={Home} isAuthenticated={isAuthenticated}/> */}
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/playlists" component={PlaylistPage} />
        <Route path="/register" component={Register} />
        <Route path="/playlist/:playlistId" component={PlaylistDetails} />
        <Route path="/user/profile" component={ProfileView} />
      </Switch>
    </BrowserRouter>
  )
};
  
export default Routes;
  