import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  navbar: {
    height: 53,
    padding: 0,
    margin: 0,
    backgroundColor: '#1a1919',
  },
  navbarElement: {
    padding: 15,
    listStyle: 'none',
    display: 'inline-block',
    backgroundColor: '#1a1919',
  },
  active: {
    backgroundColor: '#003585'
  },
  tab: {
    color: 'white',
    textDecoration: 'none'
  }

}));

const NavBar: React.FC = () => {
  const classes = useStyles();
  
  return(
    
    <ul className={classes.navbar}>
      <li className={clsx(classes.navbarElement, classes.active)}>
        <Link to="/" className={classes.tab}>
          Home 
          <img style={{width: 20, height: 20, paddingLeft: 5}} src='images/HomeImage.png' alt=''></img>
        </Link>
      </li>
    </ul>
  );
}

export default NavBar;