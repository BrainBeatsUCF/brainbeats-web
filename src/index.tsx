import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MusicContextProvider, { MusicContext } from './util/contexts/music';
import UserContextProvider, { UserContext } from './util/contexts/user';

const musicContextProvider: MusicContextProvider = new MusicContextProvider();
const userContextProvider: UserContextProvider = new UserContextProvider();

ReactDOM.render(
    <MusicContext.Provider value={musicContextProvider}>
      <UserContext.Provider value={userContextProvider}>
        <App />
      </UserContext.Provider>
    </MusicContext.Provider>,
    document.getElementById('root'),
  
);

