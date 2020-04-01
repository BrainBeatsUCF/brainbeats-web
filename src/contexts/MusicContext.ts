import React from 'react';

// why cannot import, identical syntax like api context
import MusicContextProvider from '.';

const MusicContext = React.createContext({} as MusicContextProvider);

export default MusicContext;
