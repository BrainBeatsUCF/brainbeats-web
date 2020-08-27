import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Api, { BackendContext } from './util/api';
import MusicContextProvider, { MusicContext } from './util/contexts/music';
import UserContextProvider, { UserContext } from './util/contexts/user';
import { Auth0Provider } from '@auth0/auth0-react';
import auth0Config from '../src/config/auth0Config.json';

const api: Api = new Api();
const musicContextProvider: MusicContextProvider = new MusicContextProvider();
const userContextProvider: UserContextProvider = new UserContextProvider();

const domain = auth0Config.REACT_APP_AUTH0_DOMAIN;
const clientId = auth0Config.REACT_APP_AUTH0_CLIENT_ID;

// Todo: rename /home to /
// if not authenticated, redirect to /login


ReactDOM.render(
    <BackendContext.Provider value={api}>
      <MusicContext.Provider value={musicContextProvider}>
        <UserContext.Provider value={userContextProvider}>
          <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
          >
          <App />
          </Auth0Provider>
        </UserContext.Provider>
      </MusicContext.Provider>
    </BackendContext.Provider>,
    document.getElementById('root'),
  
);

