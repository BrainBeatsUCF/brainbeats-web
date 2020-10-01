import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import CreatePlaylistPopup from './CreatePlaylistPopup';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  navbar: {
    padding: 0,
    margin: 0,
    backgroundColor: '#1a1919',
  },
  navbarElement: {
    // padding: '15px',
    listStyle: 'none',
    display: 'inline-block',
    backgroundColor: '#003585',
  },
  active: {
    backgroundColor: '#003585'
  },
  tab: {
    color: '#fff',
    textDecoration: 'none',
  }
}));

const NavBar: React.FC = () => {
  const classes = useStyles();
  const [playListPopup, setPlaylistPopup] = useState(false);

  const openCreatePlaylistPopup = () => {
    setPlaylistPopup(true);
  }

  const closeCreatePlaylistPopup = () => {
    setPlaylistPopup(false);
  }
  
  return(
    
    <ul className={classes.navbar}>
      <li className={clsx(classes.navbarElement, classes.active)}>
        <Button>
          <Link to="/" className={classes.tab}>
            HOME
          </Link>
        </Button>
      </li>
      <li className={clsx(classes.navbarElement)}>
        <Button onClick={openCreatePlaylistPopup} className={classes.tab}>
          Create a playlist
        </Button>
        {playListPopup ? <CreatePlaylistPopup closeCreatePlaylistPopup={closeCreatePlaylistPopup}/> : ""}
      </li>
    </ul>
  );
}

export default NavBar;