import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Playlists from '../components/Playlists';
import LibraryNavBar from '../components/LibraryNavBar';
import DashboardNavBar from '../components/DashboardNavBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}));

const PlaylistView: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
		<CssBaseline />
      <DashboardNavBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <LibraryNavBar />
        <Container maxWidth="lg" className={classes.container}>
          <Playlists />
        </Container>
      </main>
    </div>
  );
};
  
export default PlaylistView;