import React, { Component } from 'react';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

import { History, LocationState } from 'history';
import { useHistory } from 'react-router-dom';
import LibraryPage from './LibraryPage';
import HomePage from './Home';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background : '#F36B5C', // theme background color
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
}));

export default function Dashboard() {
  const classes = useStyles();
	const history = useHistory();

  const [openSideBar, setOpen] = React.useState(false);
  const [selectedPage, setPage] = React.useState(<HomePage />);

	const handleDrawerOpen = () => {
	  setOpen(true);
  };
  
	const handleDrawerClose = () => {
	  setOpen(false);
  };

  const handlePageSelection = (page: React.SetStateAction<JSX.Element>) => {
    setPage(page);
  }

  const handleProfileMenuOpen = async (
    history: History<LocationState>): Promise<void> => {
    try {
      history.push('/profile');
    } catch (e) {
      alert(e.message);
    }
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const menuId = 'primary-search-account-menu';
  
	return (
	  <div className={classes.root}>
		<CssBaseline />
		<AppBar position="absolute" className={clsx(classes.appBar, openSideBar && classes.appBarShift)}>
		  <Toolbar className={classes.toolbar}>
			<IconButton
			  edge="start"
			  color="inherit"
			  aria-label="open drawer"
			  onClick={handleDrawerOpen}
			  className={clsx(classes.menuButton, openSideBar && classes.menuButtonHidden)}
			>
			  <MenuIcon />
			</IconButton>
			<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
			  Brain Beats
			</Typography>
			<div className={classes.search}>
				<div className={classes.searchIcon}>
				<SearchIcon />
				</div>
				<InputBase
				placeholder="Search…"
				classes={{
					root: classes.inputRoot,
					input: classes.inputInput,
				}}
				inputProps={{ 'aria-label': 'search' }}
				/>
			</div>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={async (): Promise<void> => {
              handleProfileMenuOpen(history);
        }}
        color="inherit"
        >
          <AccountCircle />
        </IconButton>
		  </Toolbar>
		</AppBar>
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !openSideBar && classes.drawerPaperClose),
      }}
      open={openSideBar}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button onClick={() => handlePageSelection(<HomePage/>)}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>
        <ListItem button onClick={() => handlePageSelection(<LibraryPage/>)}>
          <ListItemIcon>
            <LibraryMusicIcon />
          </ListItemIcon>
          <ListItemText primary="Your Library"/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <NewReleasesIcon />
          </ListItemIcon>
          <ListItemText primary="Discover" />
        </ListItem>        
      </List>
    </Drawer>
		<main className={classes.content}>
		  <div className={classes.appBarSpacer} />
		  <Container maxWidth="lg" className={classes.container}>
        {selectedPage}
		  </Container>
		</main>
	  </div>
	);
}