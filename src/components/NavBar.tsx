import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  navbar: {
    height: 40,
    padding: 0,
    margin: 0,
    color: 'white',
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

}));

const NavBar: React.FC = () => {
  const classes = useStyles();

  return(

    <ul className={classes.navbar}>
      <li className={clsx(classes.navbarElement, classes.active)}><a href=''>Home</a></li>
      <li className={clsx(classes.navbarElement)}><a href=''>Studio</a></li>
    </ul>
  );
}

export default NavBar;
