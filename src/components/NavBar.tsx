import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import CreatePlaylistPopup from './CreatePlaylistPopup';
import { Button } from '@material-ui/core';
import HomeImage from '../images/HomeImage.png';

const useStyles = makeStyles(() => ({
  navbar: {
    padding: 0,
    margin: 0,
  },
  navbarElement: {
    listStyle: 'none',
    display: 'inline-block',
    backgroundColor: '#003585',
    marginRight: '5px'
  },
  active: {
    backgroundColor: '#003585'
  },
  tab: {
    color: '#fff',
    textDecoration: 'none',
  },
  homeTab: {
    display: 'flex',
    flexDirection: 'row',
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
            <div className={classes.homeTab}>
              <div style={{paddingRight: '15px'}}>
              HOME
              </div>
              <div>
                <img style={{width: '16px', height: '16px'}} src={HomeImage}></img>
              </div>
            </div>
            
            
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