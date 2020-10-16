import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Api, { BackendContext } from './util/api';
import MusicContextProvider, { MusicContext } from './util/contexts/music';
import UserContextProvider, { UserContext } from './util/contexts/user';

const api: Api = new Api();
const musicContextProvider: MusicContextProvider = new MusicContextProvider();
const userContextProvider: UserContextProvider = new UserContextProvider();

// Todo: rename /home to /
// if not authenticated, redirect to /login


ReactDOM.render(
    <BackendContext.Provider value={api}>
      <MusicContext.Provider value={musicContextProvider}>
        <UserContext.Provider value={userContextProvider}>
          <App />
        </UserContext.Provider>
      </MusicContext.Provider>
    </BackendContext.Provider>,
    document.getElementById('root'),
  
);

