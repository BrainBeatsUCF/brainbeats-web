import React from 'react';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';

import { History, LocationState } from 'history';
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;
const primaryColor = '#322e36';
const secondaryColor = '#2a272e';
const pageColor = '#28252B';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  '@global': {
    body: {
        background: pageColor,
    }
  },
  toolbar: theme.mixins.toolbar,
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: primaryColor,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  leftButtons: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  rightButtons: {
    marginLeft: 'auto',
    '& > *': {
      margin: theme.spacing(1),
    },    
  },
  button: {
    minWidth: '120px',
    maxWidth: '120px',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: primaryColor,
  },
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();
	const history = useHistory();

  const handlePageSelection = (page: any) => {
    history.push(`/${page}`);
  }

  const handleProfileMenuOpen = async (
    history: History<LocationState>): Promise<void> => {
    try {
      history.push('/profile');
    } catch (e) {
      alert(e.message);
    }
  };

  const menuId = 'primary-search-account-menu';
  
	return (
	  <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <div className={classes.leftButtons}>
            <a onClick={() => handlePageSelection('home')}>
              <Button variant="contained" color="primary" disableElevation className={classes.button}>
                Home
              </Button>
            </a>
            <a onClick={() => handlePageSelection('studio')}>
              <Button variant="contained" color="primary" disableElevation className={classes.button}>
                Studio
              </Button>
            </a>
          </div>
          <div className={classes.rightButtons}>
            <a onClick={() => handlePageSelection('logout')}>
              <Button variant="contained" color="primary" disableElevation className={classes.button}>
                Logout
              </Button>
            </a>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="right"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              sup
            </ListItem>
          ))}
        </List>
      </Drawer>
	  </div>
	);
}

export default Dashboard;