import React from 'react';

// Todo: Default Object for context probably better to create an interface and export to reduce clutter

// Todo: Consider changing the callback default return statement to an index depending if we go forward with this approach.
/**
 * @member {string} getId
 * 
 * Call back function for setId hook.
 * @callback setId
 */
const AudioIndexContext = React.createContext({
  getId: "0",
  setId: (newId: string) => { console.log('0') }
});

export default AudioIndexContext;